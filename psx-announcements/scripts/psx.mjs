#!/usr/bin/env node

const BASE = "https://dps.psx.com.pk";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      args[key] = next && !next.startsWith("--") ? argv[++i] : true;
    }
  }
  return args;
}

// The DPS page embeds a per-deploy token (window.__ps._k) that its AJAX calls send as X-Req-Id.
let token;
async function getToken() {
  if (token) return token;
  const res = await fetch(`${BASE}/announcements/companies`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`PSX page failed: HTTP ${res.status}`);
  token = (await res.text()).match(/"_k":"([^"]+)"/)?.[1];
  if (!token) throw new Error("PSX request token not found (page layout changed)");
  return token;
}

async function post(path, params) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "User-Agent": UA,
      "X-Req-Id": await getToken(),
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`PSX ${path} failed: HTTP ${res.status}`);
  return res.text();
}

const text = (s) => s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
const rows = (html) => [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1])).filter((r) => r.length);
const total = (html) => Number(html.match(/data-total="(\d+)"/)?.[1] ?? 0);

async function announcements({ symbol = "", count = 20 }) {
  const html = await post("/announcements", { type: "C", symbol, query: "", count, offset: 0, date_from: "", date_to: "", page: "annc" });
  const items = rows(html).map((c) => {
    const pdf = c[5]?.match(/href="(\/download\/[^"]+\.pdf)"/)?.[1];
    return { date: text(c[0]), time: text(c[1]), symbol: text(c[2]), company: text(c[3]), title: text(c[4]), link: pdf ? BASE + pdf : `${BASE}/company/${text(c[2])}` };
  });
  return { total: total(html), count: items.length, announcements: items };
}

// "06/11/2026" (DD/MM/YYYY) -> Date
const dmy = (s) => { const [d, m, y] = s.split("/").map(Number); return new Date(Date.UTC(y, m - 1, d)); };

async function payouts({ symbol = "", count = 100 }) {
  const html = await post("/payouts", { symbol, count, offset: 0 });
  return rows(html).map((c) => {
    const [from, to] = text(c[5]).split(/\s+-\s+/);
    return {
      symbol: text(c[0]), company: text(c[1]), sector: text(c[2]),
      payout: text(c[3]), announced: text(c[4]),
      bookClosureFrom: from || null, bookClosureTo: to || null,
      link: `${BASE}/company/${text(c[0])}`,
    };
  });
}

const PAYOUT_KEY = "Payout codes: (D) cash dividend, (B) bonus shares, (R) right shares; (i)/(ii)/(iii) interim number, (F) final. % is of face value (usually PKR 10).";

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = parseArgs(rest);
  let out;
  switch (cmd) {
    case "latest":
      out = await announcements({ count: Number(a.count) || 20 });
      break;
    case "company": {
      if (!a.symbol || a.symbol === true) throw new Error("--symbol required, e.g. --symbol OGDC");
      const symbol = String(a.symbol).toUpperCase();
      const [ann, pay] = await Promise.all([announcements({ symbol, count: Number(a.count) || 10 }), payouts({ symbol, count: 10 })]);
      if (!ann.count && !pay.length) throw new Error(`No PSX data for symbol ${symbol}`);
      out = { symbol, announcements: ann.announcements, payouts: pay, note: PAYOUT_KEY };
      break;
    }
    case "dividends": {
      const days = Number(a.days) || 30;
      const cutoff = Date.now() - days * 86400000;
      const list = (await payouts({ count: 200 })).filter((p) => Date.parse(p.announced) >= cutoff);
      out = { days, count: list.length, payouts: list, note: PAYOUT_KEY };
      break;
    }
    case "book-closures": {
      const today = new Date(); today.setUTCHours(0, 0, 0, 0);
      const list = (await payouts({ count: 200 }))
        .filter((p) => p.bookClosureTo && dmy(p.bookClosureTo) >= today)
        .sort((x, y) => dmy(x.bookClosureFrom) - dmy(y.bookClosureFrom));
      out = { count: list.length, upcoming: list, note: "Dates are DD/MM/YYYY. Buy before the ex-date (usually 1 business day before book closure starts) to qualify." };
      break;
    }
    default:
      console.error("Usage: psx.mjs <latest|company|dividends|book-closures> [--count N] [--symbol OGDC] [--days 30]");
      process.exit(1);
  }
  console.log(JSON.stringify({ ...out, source: "Pakistan Stock Exchange Data Portal (dps.psx.com.pk)" }, null, 2));
}

main().catch((e) => { console.error(e.message); process.exit(1); });

#!/usr/bin/env node

const URL_SBP = "https://www.sbp.org.pk/";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const SOURCE = "State Bank of Pakistan (sbp.org.pk) homepage";

// Cloudflare on sbp.org.pk rejects Node's TLS fingerprint (403) but accepts curl; fall back to the system curl binary.
async function fetchHtml() {
  const res = await fetch(URL_SBP, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) }).catch(() => null);
  if (res?.ok) return res.text();
  const { execFile } = await import("node:child_process");
  return new Promise((resolve, reject) => {
    execFile("curl", ["-s", "-f", "-L", "--max-time", "20", "-A", UA, URL_SBP], { maxBuffer: 10 * 1024 * 1024 }, (err, stdout) => {
      if (err) reject(new Error(`sbp.org.pk blocked (fetch HTTP ${res?.status ?? "error"}; curl ${err.code === "ENOENT" ? "not installed" : "failed"})`));
      else resolve(stdout);
    });
  });
}

async function tokens() {
  const html = await fetchHtml();
  const from = html.indexOf("SBP Policy Rate");
  if (from < 0) throw new Error("Rates block not found on sbp.org.pk (page layout changed)");
  return html.slice(from, from + 60000)
    .replace(/<[^>]*>/g, "\n").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
    .split("\n").map((s) => s.replace(/\s+/g, " ").trim()).filter(Boolean);
}

const num = (s) => { const n = parseFloat(String(s).replace(/[,%]/g, "")); return Number.isFinite(n) ? n : null; };
const findIdx = (t, re, from = 0) => { for (let i = Math.max(0, from); i < t.length; i++) if (re.test(t[i])) return i; return -1; };
const after = (t, re, from = 0) => { const i = findIdx(t, re, from); return i >= 0 ? t[i + 1] : null; };
const date = (s) => (s == null ? null : s.replace(/^\*?\(?\s*(KIBOR\s+)?as on\s*/i, "").replace(/\)$/, "").replace(/\s*-\s*/g, "-").trim());

function policy(t) {
  const reserveIdx = findIdx(t, /^Liquid Foreign Exchange Reserves/);
  const repoIdx = findIdx(t, /^Weighted - average overnight repo/);
  return {
    policyRate: num(after(t, /^SBP Policy Rate$/)),
    ceilingRate: num(after(t, /^Ceiling Rate$/)),
    floorRate: num(after(t, /^\(Floor\) Rate$/)),
    weightedAvgOvernightRepo: repoIdx >= 0 ? { asOf: date(t[findIdx(t, /^As on/i, repoIdx)]), rate: num(t[findIdx(t, /^As on/i, repoIdx) + 1]) } : null,
    fxReserves: reserveIdx >= 0 ? {
      asOf: date(t[reserveIdx + 1]), unit: "USD million",
      sbp: num(after(t, /^SBP.s Reserves$/)), banks: num(after(t, /^Bank.s Reserves$/)), total: num(after(t, /^Total Reserves$/)),
    } : null,
    unit: "% p.a.",
  };
}

function kibor(t) {
  const i = findIdx(t, /^KIBOR As on/);
  if (i < 0) throw new Error("KIBOR block not found (page layout changed)");
  const rates = [];
  for (let k = i + 1; k < i + 20 && rates.length < 6; k++) {
    if (/^\d+-[MY]$/.test(t[k])) rates.push({ tenor: t[k], bid: num(t[k + 1]), offer: num(t[k + 2]) });
  }
  return { asOf: date(t[i]), rates, unit: "% p.a." };
}

function cutoffTable(t, headerRe) {
  const i = findIdx(t, headerRe, findIdx(t, /^Cut-off Rates in the Latest Auctions/));
  if (i < 0) return null;
  const rows = [];
  for (let k = i + 1; k < i + 40 && !/^\*?\(?as on|^Floating -|^Fixed - Rate|^GIS/i.test(t[k]); k++) {
    if (/^\d+-[MY]$/.test(t[k])) rows.push({ tenor: t[k], cutoffYield: t[k + 1] === "Bids Rejected" ? "Bids Rejected" : num(t[k + 1]) });
  }
  const j = findIdx(t, /^\*?\(?as on/i, i);
  return { asOf: j >= 0 ? date(t[j]) : null, rows };
}

function tbills(t) {
  const upIdx = findIdx(t, /^Upcoming Auction/);
  const upcomingAuctions = {};
  let label = [];
  if (upIdx >= 0) for (let k = upIdx + 1; k < upIdx + 20 && !/^USD\/ PKR/.test(t[k]); k++) {
    if (/^\d{2}-[A-Za-z]{3}-\d{2}$/.test(t[k])) { upcomingAuctions[label.join(" ")] = t[k]; label = []; } else label.push(t[k]);
  }
  return {
    mtb: cutoffTable(t, /^MTBs$/),
    fixedRatePib: cutoffTable(t, /^Fixed - Rate PIB/),
    floatingPibQuarterly: cutoffTable(t, /^\(Quarterly Coupon\)/),
    floatingPibHalfYearly: cutoffTable(t, /^\(Half-Yearly/),
    upcomingAuctions,
    unit: "% cut-off yield",
  };
}

function interbank(t) {
  const i = findIdx(t, /^USD\/ PKR Rates/);
  if (i < 0) return null;
  return {
    asOf: date(t[i + 1]),
    m2mRevaluationRate: num(after(t, /^M2M Revaluation Rate$/, i)),
    weightedAvgBid: num(after(t, /^BID$/, i)),
    weightedAvgOffer: num(after(t, /^Offer$/, i)),
  };
}

async function main() {
  const cmd = process.argv[2];
  const fns = { "policy-rate": policy, kibor, tbills };
  if (!fns[cmd] && cmd !== "all") throw new Error("Usage: sbp.mjs <policy-rate|kibor|tbills|all>");
  const t = await tokens();
  const out = cmd === "all"
    ? { policy: policy(t), kibor: kibor(t), tbills: tbills(t), usdPkrInterbank: interbank(t) }
    : fns[cmd](t);
  const p = cmd === "all" ? out.policy : out;
  if ((cmd === "all" || cmd === "policy-rate") && p.policyRate == null) throw new Error("Could not parse policy rate (page layout changed)");
  console.log(JSON.stringify({ ...out, source: SOURCE }, null, 2));
}

main().catch((e) => { console.error(`Error: ${e.message}`); process.exit(1); });

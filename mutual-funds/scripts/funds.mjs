#!/usr/bin/env node

const API = "https://beta-restapi.sarmaaya.pk/api";
const PAGE = "https://sarmaaya.pk/mutual-funds";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const SOURCE = "Sarmaaya (sarmaaya.pk), data from MUFAP/AMC reports";

async function get(url, json = true) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: json ? "application/json" : "text/html" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`Request failed: HTTP ${res.status} for ${url}`);
  if (!json) return res.text();
  const body = await res.json();
  if (!body.success) throw new Error(`API error: ${[].concat(body.message).join("; ")}`);
  return body.response;
}

const allFunds = async () => (await get(`${API}/mutual-funds?page=1&limit=1000`)).data;

async function categories() {
  const html = await get(PAGE, false);
  const m = html.match(/\\"slug\\":\\"categoryName\\",\\"values\\":\[([^\]]*)\]/);
  if (!m) throw new Error("Could not read category list from sarmaaya.pk (page layout changed)");
  return JSON.parse(`[${m[1].replace(/\\"/g, '"')}]`);
}

async function snapshot(fund) {
  const r = await get(`${API}/mutual-funds/snapshot/${fund.fundId}`);
  const s = r.snapshot;
  return {
    name: s.miscellaneous.name, symbol: s.miscellaneous.symbol, amc: s.miscellaneous.amcName,
    category: s.nature.category, riskProfile: s.nature.riskProfile, shariah: s.nature.shariahStatus === "Yes",
    nav: s.price.nav, offerPrice: s.price.offerPrice, repurchasePrice: s.price.repurchasePrice,
    aumPkr: s.reputation.aum,
    returns: { "1m": s.performance.returns1m, "3m": s.performance.returns3m, "6m": s.performance.returns6m, "1y": s.performance.returns1y, yield: s.performance.yield },
    costs: { terYtd: s.costs.totalExpenseRatioYtd, managementFee: s.costs.managementFee, frontEndLoad: s.costs.frontEndLoad, backEndLoad: s.costs.backEndLoad },
    dataAsOf: r.dataAsOf,
  };
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function match(funds, q) {
  const n = norm(q);
  return funds.filter((f) => norm(f.name).includes(n) || norm(f.symbol) === n);
}

async function resolveCategory(input) {
  const cats = await categories();
  let n = norm(input).replace(/^islamic\b/, "shariah compliant");
  if (n === "shariah compliant") n = "shariah compliant equity";
  const hit = cats.find((c) => norm(c) === n);
  if (!hit) throw new Error(`Unknown category "${input}". Run "categories" for the list.`);
  return hit;
}

async function pool(items, size, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]).catch(() => null); }
  }));
  return out;
}

const pct = (v) => (v == null ? NaN : parseFloat(String(v)));

function arg(args, name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : def;
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  let out;
  switch (cmd) {
    case "search": {
      const q = arg(args, "query");
      if (!q) throw new Error("--query required");
      const hits = match(await allFunds(), q).map((f) => ({ name: f.name, symbol: f.symbol, nav: f.nav, riskProfile: f.riskProfile, shariah: f.isShariah, fundType: f.fundType, aumPkr: Number(f.aum) }));
      out = { query: q, count: hits.length, funds: hits, source: SOURCE };
      break;
    }
    case "nav": {
      const q = arg(args, "fund");
      if (!q) throw new Error("--fund required (name or symbol)");
      const hits = match(await allFunds(), q);
      if (!hits.length) throw new Error(`No fund matches "${q}". Try "search".`);
      const exact = hits.find((f) => norm(f.name) === norm(q) || norm(f.symbol) === norm(q)) || hits[0];
      const [snap, hist] = await Promise.all([snapshot(exact), get(`${API}/mutual-funds/nav-history/${exact.fundId}?days=7`).catch(() => [])]);
      const latest = hist[0];
      out = {
        ...snap,
        nav: latest ? latest.nav : exact.nav, navDate: latest ? latest.date.slice(0, 10) : null,
        navLast7Days: hist.map((h) => ({ date: h.date.slice(0, 10), nav: h.nav })),
        reportStatsAsOf: snap.dataAsOf, dataAsOf: undefined,
        otherMatches: hits.filter((f) => f !== exact).slice(0, 10).map((f) => f.name), source: SOURCE };
      break;
    }
    case "top": {
      const category = await resolveCategory(arg(args, "category", "equity"));
      const count = Math.max(1, parseInt(arg(args, "count", 10), 10) || 10);
      const list = await get(`${API}/mutual-funds/fund-by-category?category=${encodeURIComponent(category)}`);
      // ponytail: one snapshot request per fund in the category (≈5-60), cap 8 concurrent
      const snaps = (await pool(list.map((f) => ({ fundId: f.fundId })), 8, snapshot)).filter((s) => s && !isNaN(pct(s.returns["1y"])));
      snaps.sort((a, b) => pct(b.returns["1y"]) - pct(a.returns["1y"]));
      out = { category, rankedBy: "1-year return", fundsInCategory: list.length, top: snaps.slice(0, count).map(({ costs, ...s }) => s), source: SOURCE };
      break;
    }
    case "categories":
      out = { categories: await categories(), aliases: { equity: "Equity", "money-market": "Money Market", income: "Income", islamic: "Shariah Compliant Equity", "islamic-money-market": "Shariah Compliant Money Market" }, source: SOURCE };
      break;
    default:
      throw new Error('Usage: funds.mjs <search --query Q | nav --fund NAME | top --category C [--count N] | categories>');
  }
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => { console.error(`Error: ${e.message}`); process.exit(1); });

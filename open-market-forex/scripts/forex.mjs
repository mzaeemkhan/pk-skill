#!/usr/bin/env node

const OPEN_URL = "https://hamariweb.com/finance/forex/open_market_rates.aspx";
const INTERBANK_URL = "https://open.er-api.com/v6/latest/USD";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`Request failed: HTTP ${res.status} for ${url}`);
  return res;
}

// Cloudflare on hamariweb.com rejects Node's TLS fingerprint (403) but accepts curl; fall back to the system curl binary.
async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) }).catch(() => null);
  if (res?.ok) return res.text();
  const { execFile } = await import("node:child_process");
  return new Promise((resolve, reject) => {
    execFile("curl", ["-s", "-f", "-L", "--max-time", "20", "-A", UA, url], { maxBuffer: 10 * 1024 * 1024 }, (err, stdout) => {
      if (err) reject(new Error(`${new URL(url).host} blocked (fetch HTTP ${res?.status ?? "error"}; curl ${err.code === "ENOENT" ? "not installed" : "failed"})`));
      else resolve(stdout);
    });
  });
}

async function openMarket() {
  const html = await fetchHtml(OPEN_URL);
  const rows = [...html.matchAll(/<tr><td><a href='([a-z]{3})-to-pkr\/'>.*?&nbsp;([^<]+?)\s*<\/a><\/td><td[^>]*>([\d.,]+)<\/td><td[^>]*>([\d.,]+)<\/td><\/tr>/g)]
    .map(([, code, name, buy, sell]) => ({ currency: code.toUpperCase(), name: name.trim(), buy: Number(buy.replace(/,/g, "")), sell: Number(sell.replace(/,/g, "")) }));
  if (!rows.length) throw new Error("No rates parsed from hamariweb.com (page layout changed)");
  const updated = html.match(/Updated:\s*([^<]+?)\s*<\/div>/);
  return { asOf: updated ? updated[1].trim() : null, rates: rows, source: "hamariweb.com open market rates (Forex Association of Pakistan)" };
}

async function interbank() {
  const data = await (await get(INTERBANK_URL)).json();
  if (data.result !== "success" || !data.rates.PKR) throw new Error("Interbank rate API error");
  return { asOf: data.time_last_update_utc, pkrPerUsd: data.rates.PKR, rates: data.rates, source: "ExchangeRate-API mid-market (open.er-api.com)" };
}

const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

function arg(args, name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  let out;
  switch (cmd) {
    case "rates":
      out = await openMarket();
      break;
    case "rate": {
      const code = (arg(args, "currency") || "").toUpperCase();
      if (!code) throw new Error("--currency required (e.g. usd, sar, aed)");
      const om = await openMarket();
      const r = om.rates.find((x) => x.currency === code);
      if (!r) throw new Error(`No open-market rate for ${code}. Available: ${om.rates.map((x) => x.currency).join(", ")}`);
      out = { ...r, asOf: om.asOf, source: om.source };
      break;
    }
    case "compare": {
      const [om, ib] = await Promise.all([openMarket(), interbank()]);
      const rows = om.rates.filter((r) => ib.rates[r.currency]).map((r) => {
        const mid = ib.pkrPerUsd / ib.rates[r.currency];
        return { currency: r.currency, openBuy: r.buy, openSell: r.sell, interbankMid: round(mid, 4), sellPremiumPct: round(((r.sell - mid) / mid) * 100) };
      });
      out = {
        openMarket: { asOf: om.asOf, source: om.source },
        interbank: { asOf: ib.asOf, source: ib.source },
        rates: rows,
        note: "sellPremiumPct = how much more the open-market selling rate is than the interbank mid-market rate",
      };
      break;
    }
    default:
      throw new Error("Usage: forex.mjs <rates | rate --currency CODE | compare>");
  }
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => { console.error(`Error: ${e.message}`); process.exit(1); });

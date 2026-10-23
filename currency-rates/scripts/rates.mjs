#!/usr/bin/env node

const API = "https://open.er-api.com/v6/latest";

// Currencies most relevant to Pakistanis (remittances, trade, travel)
const PK_KEY_CURRENCIES = [
  "USD", "EUR", "GBP", "SAR", "AED", "CAD", "AUD", "CNY",
  "JPY", "CHF", "SGD", "MYR", "KWD", "OMR", "QAR", "BHD",
  "INR", "TRY", "SEK", "NOK", "DKK", "NZD", "HKD", "THB",
];

async function fetchRates(base = "USD") {
  const res = await fetch(`${API}/${encodeURIComponent(base)}`);
  if (!res.ok) throw new Error(`API failed: HTTP ${res.status}`);
  const data = await res.json();
  if (data.result !== "success") throw new Error(`API error: ${data.result}`);
  return data;
}

async function today() {
  const data = await fetchRates("USD");
  const pkr = data.rates.PKR;
  if (!pkr) throw new Error("PKR rate not found");

  const rates = PK_KEY_CURRENCIES.map(code => {
    const usdRate = data.rates[code];
    if (!usdRate) return null;
    // 1 <code> = how many PKR
    const toPkr = pkr / usdRate;
    return { currency: code, rate_per_pkr: round(toPkr) };
  }).filter(Boolean);

  return {
    base: "PKR",
    date: data.time_last_update_utc,
    rates,
    source: "ExchangeRate-API (exchangerate-api.com)",
    note: "Mid-market rates. Open market buying/selling may differ.",
  };
}

async function convert(from, to, amount) {
  if (!from || !to || !amount) throw new Error("--from, --to, --amount required");
  const data = await fetchRates(from.toUpperCase());
  const target = to.toUpperCase();
  const rate = data.rates[target];
  if (!rate) throw new Error(`Currency not found: ${target}`);
  const result = amount * rate;
  return {
    from: from.toUpperCase(),
    to: target,
    amount: Number(amount),
    rate: round(rate, 6),
    result: round(result),
    date: data.time_last_update_utc,
    source: "ExchangeRate-API (exchangerate-api.com)",
  };
}

async function currencies() {
  const data = await fetchRates("USD");
  const codes = Object.keys(data.rates).sort();
  return { count: codes.length, currencies: codes };
}

function round(n, d = 2) {
  return Math.round(n * 10 ** d) / 10 ** d;
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  rates.mjs today                          — key currency rates against PKR
  rates.mjs convert --from USD --to PKR --amount 100
  rates.mjs currencies                     — list all supported currencies`);
    return;
  }

  function getArg(flag) {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
  }

  try {
    let result;
    switch (cmd) {
      case "today":
        result = await today();
        break;
      case "convert": {
        const from = getArg("--from");
        const to = getArg("--to");
        const amount = parseFloat(getArg("--amount") || "");
        if (isNaN(amount)) throw new Error("--amount must be a number");
        result = await convert(from, to, amount);
        break;
      }
      case "currencies":
        result = await currencies();
        break;
      default:
        console.error(`Unknown command: ${cmd}`);
        process.exit(1);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();

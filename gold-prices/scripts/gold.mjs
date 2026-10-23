#!/usr/bin/env node

const YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart";
const FX_API = "https://open.er-api.com/v6/latest/USD";

const METALS = {
  XAU: { name: "Gold", yahoo: "GC=F", unit: "troy oz" },
  XAG: { name: "Silver", yahoo: "SI=F", unit: "troy oz" },
  XPT: { name: "Platinum", yahoo: "PL=F", unit: "troy oz" },
  XPD: { name: "Palladium", yahoo: "PA=F", unit: "troy oz" },
};

// 1 tola = 11.6638 grams, 1 troy oz = 31.1035 grams
const GRAMS_PER_TROY_OZ = 31.1035;
const GRAMS_PER_TOLA = 11.6638;
const TOLA_PER_OZ = GRAMS_PER_TOLA / GRAMS_PER_TROY_OZ;

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

async function fetchMetal(symbol) {
  const m = METALS[symbol];
  if (!m) throw new Error(`Unknown metal: ${symbol}`);
  const url = `${YAHOO_CHART}/${encodeURIComponent(m.yahoo)}?interval=1d&range=5d`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`Yahoo Finance HTTP ${r.status} for ${symbol}`);
  const data = await r.json();
  const meta = data.chart?.result?.[0]?.meta;
  if (!meta?.regularMarketPrice) throw new Error(`No price data for ${symbol}`);
  return { price: meta.regularMarketPrice, change: meta.fulldayChangePercent };
}

async function fetchPKR() {
  const r = await fetch(FX_API, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) throw new Error(`FX API HTTP ${r.status}`);
  const d = await r.json();
  return d.rates?.PKR;
}

async function today(metalArg) {
  const symbols = metalArg ? [metalArg.toUpperCase()] : ["XAU", "XAG"];
  const pkr = await fetchPKR();

  const results = [];
  for (const sym of symbols) {
    if (!METALS[sym]) {
      console.error(`Unknown metal: ${sym}. Use: ${Object.keys(METALS).join(", ")}`);
      process.exit(1);
    }
    const d = await fetchMetal(sym);
    const priceUSD = d.price;
    const pricePerOzPKR = priceUSD * pkr;
    const pricePerTolaPKR = pricePerOzPKR * TOLA_PER_OZ;
    const pricePerGramPKR = pricePerOzPKR / GRAMS_PER_TROY_OZ;
    const pricePerGramUSD = priceUSD / GRAMS_PER_TROY_OZ;

    results.push({
      metal: METALS[sym].name,
      symbol: sym,
      usd: {
        perTroyOz: round(priceUSD),
        perGram: round(pricePerGramUSD),
      },
      pkr: {
        perTroyOz: round(pricePerOzPKR),
        perTola: round(pricePerTolaPKR),
        perGram: round(pricePerGramPKR),
      },
      changePercent: d.change != null ? round(d.change) : null,
    });
  }

  console.log(JSON.stringify({
    usdPkr: round(pkr),
    metals: results,
    note: "1 tola = 11.6638g. Prices are international spot rates, not local sarafa market.",
  }, null, 2));
}

async function convert(args) {
  let metal = "XAU", amount = 1, unit = "tola";
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--metal" && args[i + 1]) metal = args[++i].toUpperCase();
    else if (args[i] === "--amount" && args[i + 1]) amount = parseFloat(args[++i]);
    else if (args[i] === "--unit" && args[i + 1]) unit = args[++i].toLowerCase();
  }

  if (!METALS[metal]) {
    console.error(`Unknown metal: ${metal}. Use: ${Object.keys(METALS).join(", ")}`);
    process.exit(1);
  }

  const [d, pkr] = await Promise.all([fetchMetal(metal), fetchPKR()]);
  const pricePerOzUSD = d.price;
  const pricePerOzPKR = pricePerOzUSD * pkr;

  let pricePerUnitPKR, pricePerUnitUSD;
  if (unit === "tola") {
    pricePerUnitPKR = pricePerOzPKR * TOLA_PER_OZ;
    pricePerUnitUSD = pricePerOzUSD * TOLA_PER_OZ;
  } else if (unit === "gram" || unit === "g") {
    pricePerUnitPKR = pricePerOzPKR / GRAMS_PER_TROY_OZ;
    pricePerUnitUSD = pricePerOzUSD / GRAMS_PER_TROY_OZ;
    unit = "gram";
  } else if (unit === "oz" || unit === "ounce" || unit === "troyoz") {
    pricePerUnitPKR = pricePerOzPKR;
    pricePerUnitUSD = pricePerOzUSD;
    unit = "troy oz";
  } else {
    console.error(`Unknown unit: ${unit}. Use: tola, gram, oz`);
    process.exit(1);
  }

  console.log(JSON.stringify({
    metal: METALS[metal].name,
    amount,
    unit,
    totalPKR: round(pricePerUnitPKR * amount),
    totalUSD: round(pricePerUnitUSD * amount),
    pricePerUnit: { pkr: round(pricePerUnitPKR), usd: round(pricePerUnitUSD) },
    usdPkr: round(pkr),
  }, null, 2));
}

function metals() {
  console.log(JSON.stringify({
    supported: Object.entries(METALS).map(([sym, m]) => ({
      symbol: sym, name: m.name, unit: m.unit,
    })),
    units: ["tola (11.6638g — Pakistan standard)", "gram", "troy oz (31.1035g — international standard)"],
  }, null, 2));
}

function round(n) { return Math.round(n * 100) / 100; }

const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === "today") {
  today(args[1]).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "convert") {
  convert(args.slice(1)).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "metals") {
  metals();
} else {
  console.error("Commands: today, convert, metals");
  console.error("  today [XAU|XAG|XPT|XPD]      — current prices in PKR and USD");
  console.error("  convert --metal XAU --amount 5 --unit tola");
  console.error("  metals                         — list supported metals");
  process.exit(1);
}

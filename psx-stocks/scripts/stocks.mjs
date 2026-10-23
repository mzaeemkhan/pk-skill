#!/usr/bin/env node

const YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart";

const PSX_STOCKS = {
  OGDC: "Oil & Gas Development",
  PPL: "Pakistan Petroleum",
  PSO: "Pakistan State Oil",
  HBL: "Habib Bank",
  UBL: "United Bank",
  MCB: "MCB Bank",
  NBP: "National Bank",
  MEBL: "Meezan Bank",
  BAHL: "Bank AL Habib",
  ABL: "Allied Bank",
  LUCK: "Lucky Cement",
  DGKC: "DG Khan Cement",
  MLCF: "Maple Leaf Cement",
  PIOC: "Pioneer Cement",
  ENGRO: "Engro Corporation",
  EFERT: "Engro Fertilizers",
  FFC: "Fauji Fertilizer",
  FFBL: "Fauji Fertilizer Bin Qasim",
  HUBC: "Hub Power",
  KAPCO: "Kot Addu Power",
  KEL: "K-Electric",
  TRG: "TRG Pakistan",
  SYS: "Systems Limited",
  NETSOL: "NetSol Technologies",
  AVN: "Avanceon",
  MARI: "Mari Petroleum",
  POL: "Pakistan Oilfields",
  ATRL: "Attock Refinery",
  NRL: "National Refinery",
  PRL: "Pakistan Refinery",
  COLG: "Colgate-Palmolive",
  NESTLE: "Nestle Pakistan",
  UNITY: "Unity Foods",
  SEARL: "Searle Company",
  AGP: "AGP Limited",
  GLAXO: "GlaxoSmithKline",
  ABOT: "Abbott Laboratories",
  LOTCHEM: "Lotte Chemical",
  ICI: "ICI Pakistan (Lucky Core)",
  PKGS: "Packages Limited",
  MTL: "Millat Tractors",
  GHNI: "Ghandhara Nissan",
  INDU: "Indus Motor",
  HCAR: "Honda Atlas Cars",
  PSMC: "Pak Suzuki Motor",
  ISL: "Islamabad Stock Exchange",
  SCBPL: "Standard Chartered Bank",
  BAFL: "Bank Alfalah",
  JSBL: "JS Bank",
  MUGHAL: "Mughal Iron & Steel",
};

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

async function fetchStock(symbol) {
  const ticker = `${symbol}.KA`;
  const url = `${YAHOO_CHART}/${encodeURIComponent(ticker)}?interval=1d&range=5d`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  const meta = data.chart?.result?.[0]?.meta;
  if (!meta) return null;
  return {
    symbol,
    name: PSX_STOCKS[symbol] || meta.longName || symbol,
    price: meta.regularMarketPrice,
    change: meta.fulldayChange,
    changePercent: meta.fulldayChangePercent,
    previousClose: meta.chartPreviousClose,
    high52w: meta.fiftyTwoWeekHigh,
    low52w: meta.fiftyTwoWeekLow,
    currency: meta.currency || "PKR",
  };
}

async function quote(symbols) {
  const results = [];
  // ponytail: sequential fetch, parallel batch if throughput matters
  for (const sym of symbols) {
    const r = await fetchStock(sym);
    if (r) results.push(r);
  }
  return results;
}

async function cmdQuote(symbolsArg) {
  const symbols = symbolsArg
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
  if (!symbols.length) {
    console.error("Usage: stocks.mjs quote --symbols OGDC,HBL,LUCK");
    process.exit(1);
  }
  const results = await quote(symbols);
  console.log(JSON.stringify(results.length === 1 ? results[0] : results, null, 2));
}

async function cmdMarket() {
  const top = ["OGDC", "HBL", "UBL", "MCB", "LUCK", "ENGRO", "FFC", "HUBC", "PSO", "PPL", "SYS", "TRG", "MEBL", "MARI", "EFERT"];
  const results = await quote(top);
  console.log(JSON.stringify({ market: "PSX (via Yahoo Finance)", stocks: results }, null, 2));
}

function cmdList() {
  const list = Object.entries(PSX_STOCKS).map(([symbol, name]) => ({ symbol, ticker: `${symbol}.KA`, name }));
  console.log(JSON.stringify({ count: list.length, stocks: list }, null, 2));
}

async function cmdHistory(symbol, range) {
  const ticker = `${symbol.toUpperCase()}.KA`;
  const url = `${YAHOO_CHART}/${encodeURIComponent(ticker)}?interval=1d&range=${range}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const result = data.chart?.result?.[0];
  if (!result) throw new Error("No data found");
  const timestamps = result.timestamp || [];
  const quotes = result.indicators?.quote?.[0] || {};
  const history = timestamps.map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().split("T")[0],
    open: quotes.open?.[i],
    high: quotes.high?.[i],
    low: quotes.low?.[i],
    close: quotes.close?.[i],
    volume: quotes.volume?.[i],
  }));
  console.log(JSON.stringify({
    symbol: symbol.toUpperCase(),
    name: PSX_STOCKS[symbol.toUpperCase()] || symbol,
    range,
    data: history,
  }, null, 2));
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const idx = args.indexOf(name);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : null;
}

if (cmd === "quote") {
  const symbols = getFlag("--symbols") || getFlag("--symbol") || args[1];
  if (!symbols) {
    console.error("Usage: stocks.mjs quote --symbols OGDC,HBL,LUCK");
    process.exit(1);
  }
  cmdQuote(symbols).catch((e) => { console.error(e.message); process.exit(1); });
} else if (cmd === "market") {
  cmdMarket().catch((e) => { console.error(e.message); process.exit(1); });
} else if (cmd === "list") {
  cmdList();
} else if (cmd === "history") {
  const symbol = getFlag("--symbol") || args[1];
  const range = getFlag("--range") || "1mo";
  if (!symbol) {
    console.error("Usage: stocks.mjs history --symbol OGDC [--range 1mo|3mo|6mo|1y|5y]");
    process.exit(1);
  }
  cmdHistory(symbol, range).catch((e) => { console.error(e.message); process.exit(1); });
} else {
  console.error("Commands: quote, market, list, history");
  console.error("  quote --symbols OGDC,HBL     Get current price for one or more stocks");
  console.error("  market                        Top 15 PSX stocks overview");
  console.error("  list                          All 50 tracked PSX symbols");
  console.error("  history --symbol OGDC         Price history (--range 1mo|3mo|6mo|1y|5y)");
  process.exit(1);
}

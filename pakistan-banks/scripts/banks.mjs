#!/usr/bin/env node

const BANKS = [
  { name: "Habib Bank Limited", short: "HBL", swift: "HABORPKAXXX", code: "HABB", type: "commercial" },
  { name: "United Bank Limited", short: "UBL", swift: "UNABORPKXXX", code: "UBLD", type: "commercial" },
  { name: "MCB Bank", short: "MCB", swift: "MUCBPKKA", code: "MUCB", type: "commercial" },
  { name: "Allied Bank Limited", short: "ABL", swift: "ABPAPKKAXXX", code: "ABPA", type: "commercial" },
  { name: "Bank Alfalah", short: "BAFL", swift: "ALFHPKKAXXX", code: "ALFH", type: "commercial" },
  { name: "Standard Chartered Bank", short: "SCB", swift: "SCBLPKKXXXX", code: "SCBL", type: "foreign" },
  { name: "Meezan Bank", short: "MEBL", swift: "MEABORPKXXX", code: "MEZN", type: "islamic" },
  { name: "Faysal Bank", short: "FBL", swift: "FABORPKAXXX", code: "FAYS", type: "islamic" },
  { name: "Askari Bank", short: "AKBL", swift: "ASCMPKKAXXX", code: "ASCM", type: "commercial" },
  { name: "Bank of Punjab", short: "BOP", swift: "BOPBPKKALHR", code: "BPUN", type: "commercial" },
  { name: "National Bank of Pakistan", short: "NBP", swift: "NBPAPKKAXXX", code: "NBPA", type: "government" },
  { name: "Habib Metropolitan Bank", short: "HMB", swift: "MPBLPKKAXXX", code: "MPBL", type: "commercial" },
  { name: "Summit Bank", short: "SMBL", swift: "JSBLPKKAXXX", code: "JSBL", type: "commercial" },
  { name: "Soneri Bank", short: "SNB", swift: "SONEPKKAXXX", code: "SONE", type: "commercial" },
  { name: "JS Bank", short: "JSB", swift: "JSBLPKKAXXX", code: "JSBL", type: "commercial" },
  { name: "BankIslami", short: "BIPL", swift: "BKIPPKKAXXX", code: "BKIP", type: "islamic" },
  { name: "Dubai Islamic Bank", short: "DIBL", swift: "DUABORPKXXX", code: "DUAB", type: "islamic" },
  { name: "Al Baraka Bank", short: "ABAR", swift: "AABORPKAXXX", code: "ABAR", type: "islamic" },
  { name: "Silk Bank", short: "SILK", swift: "SABOPKKAXXX", code: "SABO", type: "commercial" },
  { name: "First Women Bank", short: "FWBL", swift: "FWBOPKKAXXX", code: "FWBO", type: "specialized" },
  { name: "Industrial Development Bank", short: "IDBP", swift: "IDBPPKKAXXX", code: "IDBP", type: "development" },
  { name: "Zarai Taraqiati Bank", short: "ZTBL", swift: "ABORPKKAXXX", code: "ABOR", type: "development" },
];

function validateIBAN(iban) {
  const clean = iban.replace(/\s/g, "").toUpperCase();
  if (clean.length !== 24) return { valid: false, reason: `Length ${clean.length}, expected 24` };
  if (!clean.startsWith("PK")) return { valid: false, reason: "Must start with PK" };
  if (!/^PK\d{2}[A-Z]{4}\d{16}$/.test(clean)) return { valid: false, reason: "Invalid format. Expected: PK + 2 digits + 4 letters + 16 digits" };

  const bankCode = clean.slice(4, 8);
  const bank = BANKS.find(b => b.code === bankCode);

  // MOD-97 check
  const rearranged = clean.slice(4) + clean.slice(0, 4);
  const numeric = rearranged.split("").map(c => {
    const code = c.charCodeAt(0);
    return code >= 65 ? (code - 55).toString() : c;
  }).join("");

  let remainder = 0;
  for (const ch of numeric) {
    remainder = (remainder * 10 + parseInt(ch, 10)) % 97;
  }

  if (remainder !== 1) return { valid: false, reason: "Check digits invalid (MOD-97 failed)", bankCode, bank: bank?.name || "Unknown" };

  return {
    valid: true,
    iban: clean,
    formatted: `${clean.slice(0, 4)} ${clean.slice(4, 8)} ${clean.slice(8, 12)} ${clean.slice(12, 16)} ${clean.slice(16, 20)} ${clean.slice(20)}`,
    bankCode,
    bank: bank?.name || "Unknown bank",
    accountNumber: clean.slice(8),
  };
}

const CITIES = {
  lahore: { lat: 31.5497, lon: 74.3436 },
  karachi: { lat: 24.8607, lon: 67.0011 },
  islamabad: { lat: 33.6844, lon: 73.0479 },
  rawalpindi: { lat: 33.5651, lon: 73.0169 },
  faisalabad: { lat: 31.4504, lon: 73.135 },
  multan: { lat: 30.1575, lon: 71.5249 },
  peshawar: { lat: 34.0151, lon: 71.5249 },
  quetta: { lat: 30.1798, lon: 66.975 },
  hyderabad: { lat: 25.396, lon: 68.3578 },
  sialkot: { lat: 32.4945, lon: 74.5229 },
};

async function findBranches(bankName, city) {
  const c = CITIES[city.toLowerCase()];
  const query = `${bankName} ${city}`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10&countrycodes=pk`;
  const res = await fetch(url, { headers: { "User-Agent": "pk-skill/1.0" } });
  if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);
  const data = await res.json();
  return data.map(d => ({
    name: d.display_name.split(",")[0],
    address: d.display_name,
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
    type: d.type,
  }));
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "list") {
  console.log(JSON.stringify({ count: BANKS.length, banks: BANKS }, null, 2));

} else if (cmd === "search") {
  const query = (getFlag("query") || args.slice(1).join(" ")).toLowerCase();
  if (!query) { console.error("Usage: banks.mjs search --query <name>"); process.exit(1); }
  const results = BANKS.filter(b => {
    const hay = `${b.name} ${b.short} ${b.code} ${b.swift} ${b.type}`.toLowerCase();
    return hay.includes(query);
  });
  console.log(JSON.stringify({ query, count: results.length, banks: results }, null, 2));

} else if (cmd === "iban") {
  const number = getFlag("number") || args[1];
  if (!number) { console.error("Usage: banks.mjs iban --number <IBAN>"); process.exit(1); }
  console.log(JSON.stringify(validateIBAN(number), null, 2));

} else if (cmd === "branches") {
  const bank = getFlag("bank");
  const city = getFlag("city");
  if (!bank || !city) { console.error("Usage: banks.mjs branches --bank <name> --city <city>"); process.exit(1); }
  try {
    const results = await findBranches(bank, city);
    console.log(JSON.stringify({ bank, city, count: results.length, branches: results }, null, 2));
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }

} else {
  console.error("Commands: list, search, iban, branches");
  console.error("  list                            — all banks");
  console.error("  search --query <name>           — search by name/code");
  console.error("  iban --number <IBAN>             — validate Pakistan IBAN");
  console.error("  branches --bank <name> --city <city>  — find branches");
  process.exit(1);
}

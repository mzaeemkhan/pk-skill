#!/usr/bin/env node

// Same feed the PAA airport websites (lahoreairport.com.pk etc.) use for their flight boards.
const API = "https://paaconnectapi.paa.gov.pk/api/flights";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

const AIRPORTS = {
  LHE: { key: "lahore", name: "Allama Iqbal International Airport", city: "Lahore" },
  KHI: { key: "karachi", name: "Jinnah International Airport", city: "Karachi" },
  ISB: { key: "islamabad", name: "Islamabad International Airport", city: "Islamabad" },
  PEW: { key: "peshawar", name: "Bacha Khan International Airport", city: "Peshawar" },
  MUX: { key: "multan", name: "Multan International Airport", city: "Multan" },
  UET: { key: "quetta", name: "Quetta International Airport", city: "Quetta" },
  LYP: { key: "faisalabad", name: "Faisalabad International Airport", city: "Faisalabad" },
  GWD: { key: "gwadar", name: "New Gwadar International Airport", city: "Gwadar" },
};

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

function airport(code) {
  if (!code || code === true) throw new Error("--airport required, e.g. --airport LHE");
  const up = String(code).toUpperCase();
  const hit = AIRPORTS[up] || Object.entries(AIRPORTS).find(([, a]) => a.city.toUpperCase() === up)?.[1];
  if (!hit) {
    const extra = up === "SKT" || up === "SIALKOT" ? " Sialkot (SKT) is privately run and not on the PAA feed; see sial.com.pk." : "";
    throw new Error(`Unsupported airport "${code}". Supported: ${Object.keys(AIRPORTS).join(", ")}.${extra}`);
  }
  return hit;
}

// PKT date (UTC+5) as YYYY-MM-DD; --date accepts YYYY-MM-DD, today, tomorrow, yesterday.
function date(arg) {
  const offsets = { yesterday: -1, today: 0, tomorrow: 1 };
  if (arg && arg !== true && !(String(arg).toLowerCase() in offsets)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(arg)) throw new Error("--date must be YYYY-MM-DD, today, tomorrow or yesterday");
    return arg;
  }
  const days = offsets[String(arg ?? "today").toLowerCase()] ?? 0;
  return new Date(Date.now() + 5 * 3600000 + days * 86400000).toISOString().slice(0, 10);
}

async function board(ap, type, day) {
  const res = await fetch(`${API}/${day}/${type}/${encodeURIComponent(ap.key)}`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`PAA flight feed failed: HTTP ${res.status}`);
  return (await res.json()).map((f) => ({
    flight: f.FlightNumber,
    airline: f.AirlineName,
    from: f.EnglishFromCity,
    to: f.EnglishToCity,
    scheduled: f.ST,
    estimated: f.ET || null,
    status: f.EnglishRemarks || null,
    nature: f.Nature,
  }));
}

const norm = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]/g, "");

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = parseArgs(rest);
  let out;
  switch (cmd) {
    case "arrivals":
    case "departures": {
      const ap = airport(a.airport);
      const day = date(a.date);
      let flights = await board(ap, cmd === "arrivals" ? "Arrival" : "Departure", day);
      if (a.airline && a.airline !== true) flights = flights.filter((f) => f.airline?.toLowerCase().includes(String(a.airline).toLowerCase()));
      out = { airport: ap.name, city: ap.city, type: cmd, date: day, count: flights.length, flights };
      if (!flights.length) out.note = "No flights listed for this airport/date in the PAA feed.";
      break;
    }
    case "flight": {
      if (!a.number || a.number === true) throw new Error("--number required, e.g. --number PK303");
      const want = norm(a.number);
      const day = date(a.date);
      const boards = await Promise.all(Object.entries(AIRPORTS).flatMap(([code, ap]) =>
        ["Arrival", "Departure"].map((t) => board(ap, t, day).then((fl) => fl.map((f) => ({ ...f, airport: code, type: t.toLowerCase() }))).catch(() => []))));
      const matches = boards.flat().filter((f) => norm(f.flight) === want);
      if (!matches.length) throw new Error(`Flight ${a.number} not found on PAA boards for ${day}`);
      out = { flight: a.number, date: day, count: matches.length, legs: matches };
      break;
    }
    case "airports":
      out = { airports: Object.entries(AIRPORTS).map(([code, ap]) => ({ code, ...ap, key: undefined })), note: "Sialkot (SKT) is privately run and not covered." };
      break;
    default:
      console.error("Usage: flights.mjs <arrivals|departures|flight|airports> [--airport LHE] [--number PK303] [--date today|tomorrow|yesterday|YYYY-MM-DD] [--airline PIA]");
      process.exit(1);
  }
  console.log(JSON.stringify({ ...out, times: "PKT (UTC+5)", source: "Pakistan Airports Authority flight information (paaconnectapi.paa.gov.pk)" }, null, 2));
}

main().catch((e) => { console.error(e.message); process.exit(1); });

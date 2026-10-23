#!/usr/bin/env node

const API = "https://api.aladhan.com/v1";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const DEFAULT_METHOD = 1; // University of Islamic Sciences, Karachi

const PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const METHODS = {
  1: "University of Islamic Sciences, Karachi",
  2: "Islamic Society of North America (ISNA)",
  3: "Muslim World League (MWL)",
  4: "Umm Al-Qura University, Makkah",
  5: "Egyptian General Authority of Survey",
  7: "Institute of Geophysics, University of Tehran",
  8: "Gulf Region",
  9: "Kuwait",
  10: "Qatar",
  11: "Majlis Ugama Islam Singapura",
  12: "Union Organization Islamic de France",
  13: "Diyanet İşleri Başkanlığı, Turkey",
  14: "Spiritual Administration of Muslims of Russia",
  15: "Moonsighting Committee Worldwide",
  16: "Dubai",
  17: "JAKIM, Malaysia",
  18: "Tunisia",
  19: "Algeria",
  20: "Kementerian Agama, Indonesia",
  21: "Morocco",
  22: "Comunidade Islamica de Lisboa",
  23: "Ministry of Awqaf, Jordan",
  99: "Custom",
};

const PK_CITIES = {
  islamabad: { lat: 33.69, lon: 73.04 },
  rawalpindi: { lat: 33.60, lon: 73.05 },
  karachi: { lat: 24.86, lon: 67.01 },
  lahore: { lat: 31.55, lon: 74.35 },
  peshawar: { lat: 34.01, lon: 71.58 },
  quetta: { lat: 30.18, lon: 66.99 },
  multan: { lat: 30.20, lon: 71.45 },
  faisalabad: { lat: 31.42, lon: 73.08 },
  sialkot: { lat: 32.50, lon: 74.53 },
  gujranwala: { lat: 32.16, lon: 74.19 },
  hyderabad: { lat: 25.40, lon: 68.37 },
  bahawalpur: { lat: 29.39, lon: 71.68 },
  sargodha: { lat: 32.08, lon: 72.67 },
  sukkur: { lat: 27.71, lon: 68.86 },
  larkana: { lat: 27.56, lon: 68.21 },
  nawabshah: { lat: 26.25, lon: 68.41 },
  abbottabad: { lat: 34.15, lon: 73.22 },
  mardan: { lat: 34.20, lon: 72.05 },
  mingora: { lat: 34.78, lon: 72.36 }, swat: { lat: 34.78, lon: 72.36 },
  muzaffarabad: { lat: 34.37, lon: 73.47 },
  gilgit: { lat: 35.92, lon: 74.31 },
  skardu: { lat: 35.30, lon: 75.63 },
  chitral: { lat: 35.85, lon: 71.79 },
  "dera ismail khan": { lat: 31.83, lon: 70.90 },
  "rahim yar khan": { lat: 28.42, lon: 70.30 },
  gwadar: { lat: 25.12, lon: 62.33 },
  turbat: { lat: 26.00, lon: 63.04 },
  zhob: { lat: 31.35, lon: 69.45 },
  mirpur: { lat: 33.15, lon: 73.75 },
  sahiwal: { lat: 30.66, lon: 73.11 },
  okara: { lat: 30.81, lon: 73.45 },
  jhang: { lat: 31.27, lon: 72.32 },
  dera_ghazi_khan: { lat: 30.05, lon: 70.64 }, "dera ghazi khan": { lat: 30.05, lon: 70.64 },
  jacobabad: { lat: 28.28, lon: 68.44 },
  khuzdar: { lat: 27.80, lon: 66.62 },
  kohat: { lat: 33.59, lon: 71.44 },
  mansehra: { lat: 34.33, lon: 73.20 },
  bannu: { lat: 32.99, lon: 70.60 },
  nowshera: { lat: 34.02, lon: 71.97 },
  murree: { lat: 33.91, lon: 73.39 },
  naran: { lat: 34.91, lon: 73.65 },
  hunza: { lat: 36.32, lon: 74.65 },
};

async function resolveCity(input) {
  const lower = input.toLowerCase().trim();
  if (PK_CITIES[lower]) return { name: input, ...PK_CITIES[lower] };
  for (const [name, coords] of Object.entries(PK_CITIES)) {
    if (name.includes(lower) || lower.includes(name)) return { name, ...coords };
  }
  const res = await fetch(`${GEO_API}?name=${encodeURIComponent(input)}&count=5&language=en&format=json`);
  if (!res.ok) throw new Error(`Geocoding failed: HTTP ${res.status}`);
  const data = await res.json();
  const results = data.results || [];
  const pk = results.find(r => r.country_code === "PK") || results[0];
  if (!pk) throw new Error(`City not found: ${input}`);
  return { name: pk.name, lat: pk.latitude, lon: pk.longitude };
}

function cleanTime(t) {
  return t.replace(/\s*\(.*\)$/, "");
}

function pickTimings(raw) {
  const out = {};
  for (const p of PRAYER_ORDER) out[p] = cleanTime(raw[p]);
  return out;
}

async function getToday(city, method) {
  const loc = await resolveCity(city);
  const params = new URLSearchParams({
    latitude: loc.lat, longitude: loc.lon, method,
  });
  const res = await fetch(`${API}/timings?${params}`);
  if (!res.ok) throw new Error(`API failed: HTTP ${res.status}`);
  const data = await res.json();
  const t = data.data;
  return {
    city: loc.name,
    coordinates: { lat: loc.lat, lon: loc.lon },
    date: t.date.readable,
    hijri: `${t.date.hijri.day} ${t.date.hijri.month.en} ${t.date.hijri.year} AH`,
    method: METHODS[method] || `Method ${method}`,
    timings: pickTimings(t.timings),
    source: "Aladhan API (aladhan.com)",
  };
}

async function getMonthly(city, method, month, year) {
  const loc = await resolveCity(city);
  const params = new URLSearchParams({
    latitude: loc.lat, longitude: loc.lon, method,
  });
  const res = await fetch(`${API}/calendar/${year}/${month}?${params}`);
  if (!res.ok) throw new Error(`API failed: HTTP ${res.status}`);
  const data = await res.json();
  const days = data.data.map(d => ({
    date: d.date.readable,
    hijri: `${d.date.hijri.day} ${d.date.hijri.month.en} ${d.date.hijri.year}`,
    weekday: d.date.gregorian.weekday.en,
    timings: pickTimings(d.timings),
  }));
  return {
    city: loc.name,
    coordinates: { lat: loc.lat, lon: loc.lon },
    month: `${year}-${String(month).padStart(2, "0")}`,
    method: METHODS[method] || `Method ${method}`,
    days_count: days.length,
    days,
    source: "Aladhan API (aladhan.com)",
  };
}

async function getNext(city, method) {
  const loc = await resolveCity(city);
  const params = new URLSearchParams({
    latitude: loc.lat, longitude: loc.lon, method,
  });
  const res = await fetch(`${API}/timings?${params}`);
  if (!res.ok) throw new Error(`API failed: HTTP ${res.status}`);
  const data = await res.json();
  const timings = data.data.timings;

  const now = new Date();
  const pkNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  const nowMins = pkNow.getHours() * 60 + pkNow.getMinutes();

  for (const p of PRAYER_ORDER) {
    if (p === "Sunrise") continue;
    const t = cleanTime(timings[p]);
    const [h, m] = t.split(":").map(Number);
    if (h * 60 + m > nowMins) {
      return {
        city: loc.name,
        next_prayer: p,
        time: t,
        current_time_pkt: `${String(pkNow.getHours()).padStart(2, "0")}:${String(pkNow.getMinutes()).padStart(2, "0")}`,
        date: data.data.date.readable,
        hijri: `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year} AH`,
        method: METHODS[method] || `Method ${method}`,
        source: "Aladhan API (aladhan.com)",
      };
    }
  }
  // All prayers passed — next is tomorrow's Fajr
  return {
    city: loc.name,
    next_prayer: "Fajr (tomorrow)",
    time: cleanTime(timings.Fajr),
    current_time_pkt: `${String(pkNow.getHours()).padStart(2, "0")}:${String(pkNow.getMinutes()).padStart(2, "0")}`,
    note: "All prayers for today have passed. Time shown is tomorrow's Fajr.",
    method: METHODS[method] || `Method ${method}`,
    source: "Aladhan API (aladhan.com)",
  };
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  prayers.mjs today --city <name> [--method 1]
  prayers.mjs monthly --city <name> [--month M] [--year Y] [--method 1]
  prayers.mjs next --city <name> [--method 1]
  prayers.mjs methods
  prayers.mjs cities`);
    return;
  }

  function getArg(flag) {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
  }

  const method = parseInt(getArg("--method") || String(DEFAULT_METHOD), 10);

  try {
    let result;
    switch (cmd) {
      case "today": {
        const city = getArg("--city");
        if (!city) throw new Error("--city required");
        result = await getToday(city, method);
        break;
      }
      case "monthly": {
        const city = getArg("--city");
        if (!city) throw new Error("--city required");
        const now = new Date();
        const month = parseInt(getArg("--month") || String(now.getMonth() + 1), 10);
        const year = parseInt(getArg("--year") || String(now.getFullYear()), 10);
        result = await getMonthly(city, method, month, year);
        break;
      }
      case "next": {
        const city = getArg("--city");
        if (!city) throw new Error("--city required");
        result = await getNext(city, method);
        break;
      }
      case "methods":
        result = { count: Object.keys(METHODS).length, default: DEFAULT_METHOD, default_name: METHODS[DEFAULT_METHOD], methods: Object.entries(METHODS).map(([id, name]) => ({ id: parseInt(id, 10), name })) };
        break;
      case "cities": {
        const seen = new Set();
        const cities = [];
        for (const [name, c] of Object.entries(PK_CITIES)) {
          const key = `${c.lat},${c.lon}`;
          if (seen.has(key)) continue;
          seen.add(key);
          cities.push({ name, lat: c.lat, lon: c.lon });
        }
        result = { count: cities.length, cities };
        break;
      }
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

#!/usr/bin/env node

const PROVINCES = [
  { name: "Punjab", population: 127688922, area_sqkm: 205344, capital: "Lahore", districts: 36 },
  { name: "Sindh", population: 55696325, area_sqkm: 140914, capital: "Karachi", districts: 30 },
  { name: "Khyber Pakhtunkhwa", population: 40855843, area_sqkm: 74521, capital: "Peshawar", districts: 35 },
  { name: "Balochistan", population: 14894898, area_sqkm: 347190, capital: "Quetta", districts: 33 },
  { name: "Islamabad Capital Territory", population: 2363507, area_sqkm: 906, capital: "Islamabad", districts: 1 },
  { name: "Azad Jammu & Kashmir", population: 4360619, area_sqkm: 13297, capital: "Muzaffarabad", districts: 10 },
  { name: "Gilgit-Baltistan", population: 1492924, area_sqkm: 72971, capital: "Gilgit", districts: 10 },
];

const CITIES = [
  { name: "Karachi", province: "Sindh", population: 17024000, type: "megacity" },
  { name: "Lahore", province: "Punjab", population: 13979000, type: "megacity" },
  { name: "Faisalabad", province: "Punjab", population: 3675000, type: "city" },
  { name: "Rawalpindi", province: "Punjab", population: 3600000, type: "city" },
  { name: "Gujranwala", province: "Punjab", population: 2750000, type: "city" },
  { name: "Peshawar", province: "KPK", population: 2700000, type: "city" },
  { name: "Multan", province: "Punjab", population: 2500000, type: "city" },
  { name: "Islamabad", province: "ICT", population: 2363000, type: "city" },
  { name: "Hyderabad", province: "Sindh", population: 2200000, type: "city" },
  { name: "Quetta", province: "Balochistan", population: 1400000, type: "city" },
  { name: "Bahawalpur", province: "Punjab", population: 1100000, type: "city" },
  { name: "Sargodha", province: "Punjab", population: 900000, type: "city" },
  { name: "Sialkot", province: "Punjab", population: 850000, type: "city" },
  { name: "Sukkur", province: "Sindh", population: 750000, type: "city" },
  { name: "Larkana", province: "Sindh", population: 600000, type: "city" },
  { name: "Mardan", province: "KPK", population: 600000, type: "city" },
  { name: "Gujrat", province: "Punjab", population: 580000, type: "city" },
  { name: "Sheikhupura", province: "Punjab", population: 570000, type: "city" },
  { name: "Jhang", province: "Punjab", population: 540000, type: "city" },
  { name: "Rahim Yar Khan", province: "Punjab", population: 530000, type: "city" },
  { name: "Sahiwal", province: "Punjab", population: 500000, type: "city" },
  { name: "Okara", province: "Punjab", population: 480000, type: "city" },
  { name: "Wah Cantt", province: "Punjab", population: 470000, type: "city" },
  { name: "Dera Ghazi Khan", province: "Punjab", population: 460000, type: "city" },
  { name: "Mirpur Khas", province: "Sindh", population: 450000, type: "city" },
  { name: "Nawabshah", province: "Sindh", population: 430000, type: "city" },
  { name: "Mingora", province: "KPK", population: 420000, type: "city" },
  { name: "Chiniot", province: "Punjab", population: 400000, type: "city" },
  { name: "Kamoke", province: "Punjab", population: 390000, type: "city" },
  { name: "Mandi Bahauddin", province: "Punjab", population: 380000, type: "city" },
  { name: "Jhelum", province: "Punjab", population: 370000, type: "city" },
  { name: "Khanewal", province: "Punjab", population: 360000, type: "city" },
  { name: "Abbottabad", province: "KPK", population: 350000, type: "city" },
  { name: "Turbat", province: "Balochistan", population: 300000, type: "city" },
  { name: "Muzaffarabad", province: "AJK", population: 280000, type: "city" },
  { name: "Kohat", province: "KPK", population: 270000, type: "city" },
  { name: "Gwadar", province: "Balochistan", population: 130000, type: "city" },
  { name: "Gilgit", province: "GB", population: 120000, type: "city" },
  { name: "Skardu", province: "GB", population: 70000, type: "city" },
  { name: "Hunza", province: "GB", population: 50000, type: "town" },
];

const NATIONAL_TOTAL = PROVINCES.reduce((s, p) => s + p.population, 0);

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

function fmt(n) {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} crore`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)} lakh`;
  return n.toLocaleString();
}

if (cmd === "summary") {
  console.log(JSON.stringify({
    census: "2023 Digital Census (preliminary)",
    totalPopulation: NATIONAL_TOTAL,
    formatted: fmt(NATIONAL_TOTAL),
    provinces: PROVINCES.map(p => ({
      name: p.name, population: p.population, formatted: fmt(p.population),
      percentage: ((p.population / NATIONAL_TOTAL) * 100).toFixed(1) + "%",
    })),
    totalCitiesListed: CITIES.length,
  }, null, 2));

} else if (cmd === "province") {
  const name = (getFlag("name") || args[1] || "").toLowerCase();
  if (!name) { console.error("Usage: census.mjs province --name <province>"); process.exit(1); }
  const prov = PROVINCES.find(p => p.name.toLowerCase().includes(name));
  if (!prov) { console.error(`Province not found: ${name}`); process.exit(1); }
  const cities = CITIES.filter(c => c.province.toLowerCase().includes(name) || c.province.toLowerCase() === name.slice(0, 3));
  console.log(JSON.stringify({
    ...prov,
    formatted: fmt(prov.population),
    density: Math.round(prov.population / prov.area_sqkm) + " per km²",
    percentage: ((prov.population / NATIONAL_TOTAL) * 100).toFixed(1) + "%",
    majorCities: cities.sort((a, b) => b.population - a.population),
  }, null, 2));

} else if (cmd === "search") {
  const query = (getFlag("query") || args.slice(1).join(" ")).toLowerCase();
  if (!query) { console.error("Usage: census.mjs search --query <name>"); process.exit(1); }
  const provResults = PROVINCES.filter(p => p.name.toLowerCase().includes(query));
  const cityResults = CITIES.filter(c => c.name.toLowerCase().includes(query));
  console.log(JSON.stringify({
    query,
    provinces: provResults.map(p => ({ ...p, formatted: fmt(p.population) })),
    cities: cityResults.map(c => ({ ...c, formatted: fmt(c.population) })),
  }, null, 2));

} else if (cmd === "top") {
  const count = Math.min(parseInt(getFlag("count") || args[1] || "10", 10), CITIES.length);
  const top = [...CITIES].sort((a, b) => b.population - a.population).slice(0, count);
  console.log(JSON.stringify({
    top: count,
    cities: top.map((c, i) => ({ rank: i + 1, ...c, formatted: fmt(c.population) })),
  }, null, 2));

} else if (cmd === "compare") {
  const aName = (getFlag("a") || "").toLowerCase();
  const bName = (getFlag("b") || "").toLowerCase();
  if (!aName || !bName) { console.error("Usage: census.mjs compare --a <area> --b <area>"); process.exit(1); }

  function find(n) {
    return PROVINCES.find(p => p.name.toLowerCase().includes(n)) ||
           CITIES.find(c => c.name.toLowerCase().includes(n));
  }
  const a = find(aName);
  const b = find(bName);
  if (!a) { console.error(`Not found: ${aName}`); process.exit(1); }
  if (!b) { console.error(`Not found: ${bName}`); process.exit(1); }

  console.log(JSON.stringify({
    comparison: [
      { name: a.name, population: a.population, formatted: fmt(a.population) },
      { name: b.name, population: b.population, formatted: fmt(b.population) },
    ],
    difference: Math.abs(a.population - b.population),
    ratio: (Math.max(a.population, b.population) / Math.min(a.population, b.population)).toFixed(2) + "x",
    larger: a.population > b.population ? a.name : b.name,
  }, null, 2));

} else {
  console.error("Commands: summary, province, search, top, compare");
  console.error("  summary                     — national overview");
  console.error("  province --name <name>      — province detail");
  console.error("  search --query <name>       — search city/province");
  console.error("  top --count <N>             — top N cities");
  console.error("  compare --a <X> --b <Y>     — compare two areas");
  process.exit(1);
}

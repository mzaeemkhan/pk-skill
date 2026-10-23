#!/usr/bin/env node

const PK_CITIES = {
  karachi: { lat: 24.8607, lon: 67.0011 }, lahore: { lat: 31.5204, lon: 74.3587 },
  islamabad: { lat: 33.6844, lon: 73.0479 }, rawalpindi: { lat: 33.5651, lon: 73.0169 },
  faisalabad: { lat: 31.4504, lon: 73.135 }, peshawar: { lat: 34.0151, lon: 71.5249 },
  quetta: { lat: 30.1798, lon: 66.975 }, multan: { lat: 30.1575, lon: 71.5249 },
  hyderabad: { lat: 25.396, lon: 68.3578 }, sialkot: { lat: 32.4945, lon: 74.5229 },
  gujranwala: { lat: 32.1877, lon: 74.1945 }, bahawalpur: { lat: 29.3956, lon: 71.6836 },
  sargodha: { lat: 32.0836, lon: 72.6711 }, sukkur: { lat: 27.7052, lon: 68.8574 },
  larkana: { lat: 27.558, lon: 68.2141 }, mardan: { lat: 34.1986, lon: 72.0404 },
  abbottabad: { lat: 34.1495, lon: 73.2117 }, mansehra: { lat: 34.3341, lon: 73.1968 },
  mirpur: { lat: 33.1489, lon: 73.7515 }, muzaffarabad: { lat: 34.37, lon: 73.4711 },
  gilgit: { lat: 35.9208, lon: 74.3144 }, skardu: { lat: 35.2971, lon: 75.6336 },
  dera_ismail_khan: { lat: 31.8626, lon: 70.9019 }, bannu: { lat: 32.9889, lon: 70.6044 },
  swat: { lat: 35.2227, lon: 72.3528 }, chitral: { lat: 35.8508, lon: 71.7836 },
  gwadar: { lat: 25.1264, lon: 62.3225 }, turbat: { lat: 26.0031, lon: 63.0544 },
};

function resolveCity(name) {
  const key = name.toLowerCase().replace(/[\s-]+/g, "_");
  if (PK_CITIES[key]) return { name, ...PK_CITIES[key] };
  const match = Object.entries(PK_CITIES).find(([k]) => k.includes(key) || key.includes(k));
  if (match) return { name, lat: match[1].lat, lon: match[1].lon };
  return null;
}

async function geocodeCity(name) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5&language=en&format=json`,
    { signal: AbortSignal.timeout(8000) }
  );
  const data = await res.json();
  const pk = (data.results || []).find(r => r.country_code === "PK");
  if (!pk) return null;
  return { name: pk.name, lat: pk.latitude, lon: pk.longitude };
}

async function findMosques(cityName, radius = 2000, limit = 20) {
  let city = resolveCity(cityName);
  if (!city) city = await geocodeCity(cityName);
  if (!city) {
    console.log(JSON.stringify({ error: `City not found: ${cityName}` }));
    process.exit(1);
  }

  // ponytail: bbox from radius in meters, ~0.009 deg per km at PK latitudes
  const delta = (radius / 1000) * 0.009;
  const bbox = `${city.lat - delta},${city.lon - delta},${city.lat + delta},${city.lon + delta}`;

  const query = `[out:json][timeout:15];(node["amenity"="place_of_worship"]["religion"="muslim"](${bbox});way["amenity"="place_of_worship"]["religion"="muslim"](${bbox}););out center ${limit};`;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "data=" + encodeURIComponent(query),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("html")) throw new Error(`Overpass API returned ${res.status}. Service may be temporarily unavailable.`);
    throw new Error(`Overpass API HTTP ${res.status}`);
  }

  const data = await res.json();
  const mosques = (data.elements || []).map(e => {
    const lat = e.lat || e.center?.lat;
    const lon = e.lon || e.center?.lon;
    const tags = e.tags || {};
    return {
      name: tags.name || tags["name:en"] || tags["name:ur"] || "Unnamed Mosque",
      nameUrdu: tags["name:ur"] || "",
      lat, lon,
      address: tags["addr:street"] || tags["addr:full"] || "",
      denomination: tags.denomination || "",
    };
  });

  console.log(JSON.stringify({
    city: city.name,
    center: { lat: city.lat, lon: city.lon },
    radiusMeters: radius,
    found: mosques.length,
    mosques,
  }, null, 2));
}

function showCities() {
  const cities = Object.entries(PK_CITIES).map(([k, v]) => ({
    key: k, lat: v.lat, lon: v.lon,
  }));
  console.log(JSON.stringify({ count: cities.length, cities }, null, 2));
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
}

if (cmd === "find") {
  const city = getFlag("city", args[1]);
  if (!city) { console.error("Usage: mosques.mjs find --city Lahore [--radius 2000] [--limit 20]"); process.exit(1); }
  findMosques(city, parseInt(getFlag("radius", "2000")), parseInt(getFlag("limit", "20")))
    .catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "cities") {
  showCities();
} else {
  console.error("Commands: find, cities");
  console.error("  find --city Lahore [--radius 2000] [--limit 20]");
  console.error("  cities");
  process.exit(1);
}

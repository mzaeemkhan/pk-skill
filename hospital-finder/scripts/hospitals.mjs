#!/usr/bin/env node

const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const UA = "pk-skill/1.0 (hospital-finder)";

const FACILITY_TYPES = {
  hospital: "hospital",
  clinic: "clinic",
  pharmacy: "pharmacy",
  dentist: "dentist",
  doctors: "doctors",
};

async function searchFacilities(city, type, limit) {
  const facilityType = FACILITY_TYPES[type] || "hospital";
  const query = `${facilityType} in ${city} Pakistan`;
  const url = `${NOMINATIM}?q=${encodeURIComponent(query)}&format=json&limit=${limit}&countrycodes=pk&addressdetails=1`;

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json();

  return data.map(r => ({
    name: r.name || "Unnamed",
    type: r.type || facilityType,
    lat: parseFloat(r.lat),
    lon: parseFloat(r.lon),
    address: r.display_name,
    city: r.address?.city || r.address?.town || r.address?.county || city,
    province: r.address?.state || "",
  }));
}

async function nearby(lat, lon, type, radius) {
  const facilityType = FACILITY_TYPES[type] || "hospital";
  const degOffset = radius / 111000;
  const bbox = [
    (lon - degOffset).toFixed(6),
    (lat - degOffset).toFixed(6),
    (lon + degOffset).toFixed(6),
    (lat + degOffset).toFixed(6),
  ].join(",");

  const url = `${NOMINATIM}?q=${facilityType}&format=json&limit=20&countrycodes=pk&viewbox=${bbox}&bounded=1&addressdetails=1`;

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json();

  return data.map(r => {
    const rlat = parseFloat(r.lat);
    const rlon = parseFloat(r.lon);
    const dist = Math.round(haversine(lat, lon, rlat, rlon));
    return {
      name: r.name || "Unnamed",
      type: r.type || facilityType,
      lat: rlat,
      lon: rlon,
      distance_m: dist,
      address: r.display_name,
    };
  }).sort((a, b) => a.distance_m - b.distance_m);
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "search") {
  const city = getFlag("city") || args[1];
  const type = getFlag("type") || "hospital";
  const limit = parseInt(getFlag("limit") || "10", 10);
  if (!city) { console.error("Usage: hospitals.mjs search --city <city> [--type hospital|clinic|pharmacy] [--limit 10]"); process.exit(1); }
  searchFacilities(city, type, limit)
    .then(r => console.log(JSON.stringify({ city, type, count: r.length, facilities: r }, null, 2)))
    .catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "nearby") {
  const lat = parseFloat(getFlag("lat"));
  const lon = parseFloat(getFlag("lon"));
  const type = getFlag("type") || "hospital";
  const radius = parseInt(getFlag("radius") || "5000", 10);
  if (isNaN(lat) || isNaN(lon)) { console.error("Usage: hospitals.mjs nearby --lat <lat> --lon <lon> [--type hospital] [--radius 5000]"); process.exit(1); }
  nearby(lat, lon, type, radius)
    .then(r => console.log(JSON.stringify({ lat, lon, type, radius_m: radius, count: r.length, facilities: r }, null, 2)))
    .catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "types") {
  console.log(JSON.stringify({ types: Object.keys(FACILITY_TYPES) }, null, 2));
} else {
  console.error("Commands: search, nearby, types");
  console.error("  search --city <city> [--type hospital|clinic|pharmacy|dentist|doctors] [--limit 10]");
  console.error("  nearby --lat <lat> --lon <lon> [--type hospital] [--radius 5000]");
  console.error("  types");
  process.exit(1);
}

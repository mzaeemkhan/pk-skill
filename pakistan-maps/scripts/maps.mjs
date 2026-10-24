#!/usr/bin/env node

const OSRM = "https://router.project-osrm.org/route/v1/driving";
const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const UA = "pk-skill/1.0 (Pakistan daily-life skills)";

const PK_CITIES = {
  karachi:        { lat: 24.8607, lon: 67.0011 },
  lahore:         { lat: 31.5204, lon: 74.3587 },
  islamabad:      { lat: 33.6844, lon: 73.0479 },
  rawalpindi:     { lat: 33.5651, lon: 73.0169 },
  multan:         { lat: 30.1575, lon: 71.5249 },
  faisalabad:     { lat: 31.4504, lon: 73.1350 },
  peshawar:       { lat: 34.0151, lon: 71.5249 },
  quetta:         { lat: 30.1798, lon: 66.9750 },
  sialkot:        { lat: 32.4945, lon: 74.5229 },
  gujranwala:     { lat: 32.1877, lon: 74.1945 },
  hyderabad:      { lat: 25.3960, lon: 68.3578 },
  bahawalpur:     { lat: 29.3544, lon: 71.6911 },
  sargodha:       { lat: 32.0740, lon: 72.6861 },
  sukkur:         { lat: 27.7052, lon: 68.8574 },
  larkana:        { lat: 27.5570, lon: 68.2141 },
  abbottabad:     { lat: 34.1688, lon: 73.2215 },
  mardan:         { lat: 34.1981, lon: 72.0404 },
  mingora:        { lat: 34.7717, lon: 72.3602 },
  "dera ismail khan": { lat: 31.8626, lon: 70.9019 },
  "dera ghazi khan": { lat: 30.0489, lon: 70.6455 },
  sahiwal:        { lat: 30.6682, lon: 73.1114 },
  okara:          { lat: 30.8138, lon: 73.4534 },
  kasur:          { lat: 31.1167, lon: 74.4630 },
  attock:         { lat: 33.7667, lon: 72.3598 },
  jhelum:         { lat: 32.9425, lon: 73.7257 },
  gujrat:         { lat: 32.5744, lon: 74.0753 },
  mirpur:         { lat: 33.1476, lon: 73.7516 },
  muzaffarabad:   { lat: 34.3700, lon: 73.4711 },
  gilgit:         { lat: 35.9208, lon: 74.3144 },
  skardu:         { lat: 35.2971, lon: 75.6333 },
};

function resolveCity(name) {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  return PK_CITIES[key] || null;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

async function getRoute(fromCoords, toCoords) {
  const url = `${OSRM}/${fromCoords.lon},${fromCoords.lat};${toCoords.lon},${toCoords.lat}?overview=full&steps=true&geometries=geojson`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`OSRM HTTP ${res.status}`);
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.length) throw new Error(data.message || "No route found");

  const route = data.routes[0];
  const steps = route.legs[0].steps
    .filter(s => s.maneuver.type !== "depart" && s.maneuver.type !== "arrive")
    .slice(0, 15)
    .map(s => ({
      instruction: s.name ? `${s.maneuver.type} onto ${s.name}` : s.maneuver.type,
      distance_km: +(s.distance / 1000).toFixed(1),
      duration: formatDuration(s.duration),
    }));

  return {
    distance_km: +(route.distance / 1000).toFixed(1),
    duration: formatDuration(route.duration),
    duration_seconds: Math.round(route.duration),
    steps,
  };
}

async function searchNearby(lat, lon, type, limit) {
  const query = encodeURIComponent(`${type} near ${lat},${lon}`);
  const url = `${NOMINATIM}?q=${type}&format=json&limit=${limit}&countrycodes=pk&viewbox=${(lon - 0.1).toFixed(4)},${(lat - 0.1).toFixed(4)},${(lon + 0.1).toFixed(4)},${(lat + 0.1).toFixed(4)}&bounded=1&addressdetails=1`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json();

  return data.map(r => {
    const rlat = parseFloat(r.lat);
    const rlon = parseFloat(r.lon);
    return {
      name: r.name || r.display_name?.split(",")[0] || "Unnamed",
      type: r.type || type,
      lat: rlat,
      lon: rlon,
      distance_km: +haversine(lat, lon, rlat, rlon).toFixed(1),
      address: r.display_name,
    };
  }).sort((a, b) => a.distance_km - b.distance_km);
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "route" || cmd === "distance") {
  const fromName = getFlag("from");
  const toName = getFlag("to");
  if (!fromName || !toName) {
    console.error(`Usage: maps.mjs ${cmd} --from <city> --to <city>`);
    process.exit(1);
  }
  const fromCoords = resolveCity(fromName);
  const toCoords = resolveCity(toName);
  if (!fromCoords) { console.error(`Unknown city: ${fromName}. Use 'maps.mjs cities' to list.`); process.exit(1); }
  if (!toCoords) { console.error(`Unknown city: ${toName}. Use 'maps.mjs cities' to list.`); process.exit(1); }

  const straightLine = +haversine(fromCoords.lat, fromCoords.lon, toCoords.lat, toCoords.lon).toFixed(1);

  if (cmd === "distance") {
    getRoute(fromCoords, toCoords)
      .then(r => console.log(JSON.stringify({
        from: fromName,
        to: toName,
        straightLine_km: straightLine,
        driving_km: r.distance_km,
        driving_time: r.duration,
      }, null, 2)))
      .catch(e => {
        console.log(JSON.stringify({
          from: fromName, to: toName,
          straightLine_km: straightLine,
          driving_km: null,
          error: e.message,
        }, null, 2));
      });
  } else {
    getRoute(fromCoords, toCoords)
      .then(r => console.log(JSON.stringify({
        from: { city: fromName, ...fromCoords },
        to: { city: toName, ...toCoords },
        straightLine_km: straightLine,
        driving_km: r.distance_km,
        driving_time: r.duration,
        driving_seconds: r.duration_seconds,
        steps: r.steps,
      }, null, 2)))
      .catch(e => { console.error(e.message); process.exit(1); });
  }
} else if (cmd === "nearby") {
  const cityName = getFlag("city");
  const lat = parseFloat(getFlag("lat"));
  const lon = parseFloat(getFlag("lon"));
  const type = getFlag("type");
  const limit = parseInt(getFlag("limit") || "10", 10);

  if (!type) { console.error("Usage: maps.mjs nearby --city <city> --type <type> [--limit 10]"); process.exit(1); }

  let coords;
  if (cityName) {
    coords = resolveCity(cityName);
    if (!coords) { console.error(`Unknown city: ${cityName}. Use 'maps.mjs cities' to list.`); process.exit(1); }
  } else if (!isNaN(lat) && !isNaN(lon)) {
    coords = { lat, lon };
  } else {
    console.error("Usage: maps.mjs nearby --city <city> --type <type> [--limit 10]");
    console.error("   or: maps.mjs nearby --lat <lat> --lon <lon> --type <type> [--limit 10]");
    process.exit(1);
  }

  searchNearby(coords.lat, coords.lon, type, limit)
    .then(r => console.log(JSON.stringify({
      center: { ...coords, city: cityName || null },
      type,
      count: r.length,
      places: r,
    }, null, 2)))
    .catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "cities") {
  const list = Object.entries(PK_CITIES).map(([name, coords]) => ({
    city: name.charAt(0).toUpperCase() + name.slice(1),
    lat: coords.lat,
    lon: coords.lon,
  }));
  console.log(JSON.stringify({ count: list.length, cities: list }, null, 2));
} else {
  console.error("Commands: route, distance, nearby, cities");
  console.error("  route    --from <city> --to <city>                    — driving route with steps");
  console.error("  distance --from <city> --to <city>                    — distance only");
  console.error("  nearby   --city <city> --type <type> [--limit 10]     — find nearby places");
  console.error("  nearby   --lat <n> --lon <n> --type <type> [--limit 10]");
  console.error("  cities                                                — list supported cities");
  process.exit(1);
}

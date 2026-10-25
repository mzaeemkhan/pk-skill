#!/usr/bin/env node

const API = "https://earthquake.usgs.gov/fdsnws/event/1/query";
const PK_BOX = { minlatitude: 23.5, maxlatitude: 37.1, minlongitude: 60.8, maxlongitude: 77.9 };

const CITIES = {
  karachi: [24.8607, 67.0011], lahore: [31.5204, 74.3587], islamabad: [33.6844, 73.0479],
  rawalpindi: [33.5651, 73.0169], peshawar: [34.0151, 71.5249], quetta: [30.1798, 66.975],
  multan: [30.1575, 71.5249], faisalabad: [31.4504, 73.135], hyderabad: [25.396, 68.3578],
  gujranwala: [32.1877, 74.1945], sialkot: [32.4945, 74.5229], sukkur: [27.7052, 68.8574],
  bahawalpur: [29.3956, 71.6836], sargodha: [32.0836, 72.6711], abbottabad: [34.1688, 73.2215],
  mardan: [34.198, 72.0404], mingora: [34.7717, 72.3602], gilgit: [35.9208, 74.3089],
  skardu: [35.2971, 75.6333], muzaffarabad: [34.3700, 73.4711], gwadar: [25.1216, 62.3254],
  turbat: [26.0031, 63.0544], khuzdar: [27.8000, 66.6167], "dera ismail khan": [31.8314, 70.9019],
  "dera ghazi khan": [30.0561, 70.6348], larkana: [27.5570, 68.2264], nawabshah: [26.2483, 68.4096],
  chitral: [35.8518, 71.7864], zhob: [31.3417, 69.4486], kohat: [33.5869, 71.4429],
  mansehra: [34.3302, 73.1968], jhelum: [32.9405, 73.7276],
};

async function query(params) {
  const qs = new URLSearchParams({ format: "geojson", orderby: "time", ...params });
  const res = await fetch(`${API}?${qs}`, { signal: AbortSignal.timeout(20000) });
  if (res.status === 204) return { features: [] };
  if (!res.ok) throw new Error(`USGS API failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

const daysAgo = (d) => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);
const pkt = (ms) => new Date(ms + 5 * 3600000).toISOString().replace("T", " ").slice(0, 19) + " PKT";

function shape(f) {
  const p = f.properties, [lon, lat, depth] = f.geometry.coordinates;
  return {
    id: f.id, magnitude: p.mag, magType: p.magType, place: p.place,
    timeUtc: new Date(p.time).toISOString(), timePkt: pkt(p.time),
    depthKm: depth, lat, lon, tsunami: p.tsunami === 1, felt: p.felt, alert: p.alert, url: p.url,
  };
}

function list(data, meta) {
  const quakes = data.features.map(shape);
  return { ...meta, count: quakes.length, quakes, source: "USGS Earthquake Hazards Program" };
}

function arg(args, name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : def;
}

function num(v, name) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) throw new Error(`--${name} must be a non-negative number`);
  return n;
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  let out;
  switch (cmd) {
    case "recent": {
      const days = num(arg(args, "days", 7), "days"), minMag = num(arg(args, "min-mag", 3), "min-mag");
      out = list(await query({ ...PK_BOX, starttime: daysAgo(days), minmagnitude: minMag }),
        { region: "Pakistan bounding box", days, minMagnitude: minMag });
      break;
    }
    case "significant": {
      const days = num(arg(args, "days", 30), "days");
      out = list(await query({ ...PK_BOX, starttime: daysAgo(days), minmagnitude: 5 }),
        { region: "Pakistan bounding box", days, minMagnitude: 5 });
      break;
    }
    case "near": {
      const city = (arg(args, "city", "") || "").toLowerCase();
      const c = CITIES[city];
      if (!c) throw new Error(`Unknown city "${city}". Known: ${Object.keys(CITIES).join(", ")}`);
      const radius = num(arg(args, "radius-km", 300), "radius-km"), days = num(arg(args, "days", 30), "days");
      const minMag = num(arg(args, "min-mag", 2.5), "min-mag");
      out = list(await query({ latitude: c[0], longitude: c[1], maxradiuskm: radius, starttime: daysAgo(days), minmagnitude: minMag }),
        { city, radiusKm: radius, days, minMagnitude: minMag });
      break;
    }
    case "event": {
      const id = arg(args, "id");
      if (!id) throw new Error("--id required");
      const f = await query({ eventid: id });
      if (!f.properties) throw new Error(`Event ${id} not found`);
      out = { ...shape(f), source: "USGS Earthquake Hazards Program" };
      break;
    }
    case "cities":
      out = { cities: Object.keys(CITIES) };
      break;
    default:
      throw new Error("Usage: quakes.mjs <recent|significant|near|event|cities> [--days N] [--min-mag M] [--city NAME] [--radius-km KM] [--id ID]");
  }
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => { console.error(`Error: ${e.message}`); process.exit(1); });

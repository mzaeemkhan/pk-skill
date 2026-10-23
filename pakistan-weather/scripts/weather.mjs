#!/usr/bin/env node

const FORECAST_API = "https://api.open-meteo.com/v1/forecast";
const AQI_API = "https://air-quality-api.open-meteo.com/v1/air-quality";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const CAP_RSS = "https://cap-sources.s3.amazonaws.com/pk-pmd-en/rss.xml";
const TZ = "Asia/Karachi";

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

const WMO_CODES = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing rime fog",
  51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
  56: "Light freezing drizzle", 57: "Dense freezing drizzle",
  61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
  66: "Light freezing rain", 67: "Heavy freezing rain",
  71: "Slight snowfall", 73: "Moderate snowfall", 75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
  85: "Slight snow showers", 86: "Heavy snow showers",
  95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail",
};

function aqiLabel(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for sensitive groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very unhealthy";
  return "Hazardous";
}

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
  return { name: pk.name, lat: pk.latitude, lon: pk.longitude, country: pk.country, province: pk.admin1 };
}

async function getCurrent(city) {
  const loc = await resolveCity(city);
  const params = new URLSearchParams({
    latitude: loc.lat, longitude: loc.lon, timezone: TZ,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover,is_day",
  });
  const res = await fetch(`${FORECAST_API}?${params}`);
  if (!res.ok) throw new Error(`Weather API failed: HTTP ${res.status}`);
  const data = await res.json();
  const c = data.current;
  return {
    city: loc.name,
    coordinates: { lat: loc.lat, lon: loc.lon },
    time: c.time,
    condition: WMO_CODES[c.weather_code] || `Code ${c.weather_code}`,
    temperature_c: c.temperature_2m,
    feels_like_c: c.apparent_temperature,
    humidity_pct: c.relative_humidity_2m,
    wind_speed_kmh: c.wind_speed_10m,
    wind_direction_deg: c.wind_direction_10m,
    precipitation_mm: c.precipitation,
    pressure_hpa: c.surface_pressure,
    cloud_cover_pct: c.cloud_cover,
    is_day: c.is_day === 1,
    source: "Open-Meteo (open-meteo.com)",
  };
}

async function getForecast(city, days = 7) {
  const loc = await resolveCity(city);
  const params = new URLSearchParams({
    latitude: loc.lat, longitude: loc.lon, timezone: TZ,
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max",
    forecast_days: Math.min(days, 16),
  });
  const res = await fetch(`${FORECAST_API}?${params}`);
  if (!res.ok) throw new Error(`Weather API failed: HTTP ${res.status}`);
  const data = await res.json();
  const d = data.daily;
  const forecast = d.time.map((date, i) => ({
    date,
    condition: WMO_CODES[d.weather_code[i]] || `Code ${d.weather_code[i]}`,
    temp_max_c: d.temperature_2m_max[i],
    temp_min_c: d.temperature_2m_min[i],
    precipitation_mm: d.precipitation_sum[i],
    precipitation_probability_pct: d.precipitation_probability_max[i],
    wind_max_kmh: d.wind_speed_10m_max[i],
    uv_index_max: d.uv_index_max[i],
    sunrise: d.sunrise[i],
    sunset: d.sunset[i],
  }));
  return {
    city: loc.name,
    coordinates: { lat: loc.lat, lon: loc.lon },
    days: forecast.length,
    forecast,
    source: "Open-Meteo (open-meteo.com)",
  };
}

async function getAqi(city) {
  const loc = await resolveCity(city);
  const params = new URLSearchParams({
    latitude: loc.lat, longitude: loc.lon, timezone: TZ,
    current: "pm2_5,pm10,us_aqi,european_aqi,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone",
  });
  const res = await fetch(`${AQI_API}?${params}`);
  if (!res.ok) throw new Error(`AQI API failed: HTTP ${res.status}`);
  const data = await res.json();
  const c = data.current;
  return {
    city: loc.name,
    coordinates: { lat: loc.lat, lon: loc.lon },
    time: c.time,
    us_aqi: c.us_aqi,
    us_aqi_label: aqiLabel(c.us_aqi),
    european_aqi: c.european_aqi,
    pm2_5: c.pm2_5,
    pm10: c.pm10,
    carbon_monoxide: c.carbon_monoxide,
    nitrogen_dioxide: c.nitrogen_dioxide,
    sulphur_dioxide: c.sulphur_dioxide,
    ozone: c.ozone,
    source: "Open-Meteo (open-meteo.com)",
  };
}

async function getAlerts() {
  const res = await fetch(CAP_RSS);
  if (!res.ok) throw new Error(`CAP RSS failed: HTTP ${res.status}`);
  const xml = await res.text();
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const tag = (name) => {
      const t = m[1].match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`));
      return t ? t[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
    };
    items.push({
      title: tag("title"),
      description: tag("description"),
      link: tag("link"),
      published: tag("pubDate"),
    });
  }
  return { count: items.length, alerts: items, source: "PMD CAP Alerts (cap-sources.s3.amazonaws.com)" };
}

async function searchCity(query) {
  const res = await fetch(`${GEO_API}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`);
  if (!res.ok) throw new Error(`Geocoding failed: HTTP ${res.status}`);
  const data = await res.json();
  const results = (data.results || []).map(r => ({
    name: r.name, country: r.country, province: r.admin1,
    lat: r.latitude, lon: r.longitude, population: r.population, timezone: r.timezone,
  }));
  return { count: results.length, results };
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  weather.mjs current --city <name>
  weather.mjs forecast --city <name> [--days 7]
  weather.mjs aqi --city <name>
  weather.mjs alerts
  weather.mjs search --query <name>
  weather.mjs cities`);
    return;
  }

  function getArg(flag) {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
  }

  try {
    let result;
    switch (cmd) {
      case "current": {
        const city = getArg("--city");
        if (!city) throw new Error("--city required");
        result = await getCurrent(city);
        break;
      }
      case "forecast": {
        const city = getArg("--city");
        if (!city) throw new Error("--city required");
        const days = parseInt(getArg("--days") || "7", 10);
        result = await getForecast(city, days);
        break;
      }
      case "aqi": {
        const city = getArg("--city");
        if (!city) throw new Error("--city required");
        result = await getAqi(city);
        break;
      }
      case "search": {
        const query = getArg("--query");
        if (!query) throw new Error("--query required");
        result = await searchCity(query);
        break;
      }
      case "alerts":
        result = await getAlerts();
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

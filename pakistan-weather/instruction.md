# Pakistan Weather

## What this skill does

Provides weather data for Pakistan: current conditions, multi-day forecasts, air quality index, and severe weather alerts from PMD. Covers 45+ built-in Pakistan cities with geocoding fallback for any location worldwide.

## When to use

- "What's the weather in Islamabad?"
- "Lahore forecast for the next 5 days"
- "Air quality in Karachi"
- "Any weather warnings for Pakistan?"
- "Is it going to rain in Peshawar?"
- "Temperature in Murree right now"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Current weather

```bash
node scripts/weather.mjs current --city <name>
```

Returns: temperature, feels-like, humidity, wind speed/direction, precipitation, pressure, cloud cover, day/night, and WMO weather condition.

### 2. Multi-day forecast

```bash
node scripts/weather.mjs forecast --city <name> [--days 7]
```

- `--days`: 1 to 16 (default 7)
- Returns per day: condition, max/min temperature, precipitation amount and probability, max wind speed, UV index, sunrise/sunset.

### 3. Air quality index

```bash
node scripts/weather.mjs aqi --city <name>
```

Returns: US AQI with label (Good/Moderate/Unhealthy/etc.), European AQI, PM2.5, PM10, CO, NO2, SO2, O3.

### 4. PMD severe weather alerts

```bash
node scripts/weather.mjs alerts
```

Returns all active CAP alerts from Pakistan Meteorological Department. No city filter — alerts cover all of Pakistan.

### 5. City search (geocoding)

```bash
node scripts/weather.mjs search --query <name>
```

Finds cities by name. Prioritizes Pakistan results. Returns lat/lon, country, province, population.

### 6. List built-in cities

```bash
node scripts/weather.mjs cities
```

## How it works internally

### Weather & Forecast

Uses Open-Meteo free API (api.open-meteo.com). No API key required. Data sourced from ECMWF, GFS, and other global weather models. All times in Asia/Karachi timezone.

### Air Quality

Uses Open-Meteo Air Quality API (air-quality-api.open-meteo.com). Modeled AQI based on CAMS (Copernicus Atmosphere Monitoring Service) data. Not ground-station measurements.

### City Resolution

45+ Pakistan cities hardcoded with coordinates. Unknown cities resolved via Open-Meteo Geocoding API, prioritizing Pakistan results.

### PMD Alerts

Fetches CAP (Common Alerting Protocol) RSS feed from cap-sources.s3.amazonaws.com/pk-pmd-en/rss.xml. Published by Pakistan Meteorological Department.

## Sources and failure modes

- Open-Meteo: Free tier, no key. Rate-limited at ~10,000 requests/day. May differ from PMD ground readings.
- CAP RSS: S3-hosted, generally reliable. Feed may contain stale alerts — check published dates.
- Geocoding: May return non-Pakistan cities for ambiguous names (e.g., "Hyderabad" could match India). Script prioritizes Pakistan results.

## Hard boundaries

- No login or credentials
- No paid API keys
- No weather modification or alerts subscription
- No PMD internal data or station-level observations
- Read-only — no data submission

# Earthquake Alerts

## What this skill does

Fetches live earthquake data for Pakistan and nearby regions from the USGS FDSN event API. Returns magnitude, depth, place, UTC and Pakistan time (PKT, UTC+5), coordinates, tsunami flag and a USGS link.

## When to use

- "Was there an earthquake in Pakistan today?"
- "Any earthquakes near Quetta this month?"
- "Biggest earthquakes in Pakistan recently"
- "Earthquake details for event us6000…"

## Workflow

### 1. Recent quakes

```bash
node scripts/quakes.mjs recent --days 7 --min-mag 3
```

Defaults: 7 days, magnitude 3+. Results are newest first.

### 2. Significant quakes

```bash
node scripts/quakes.mjs significant --days 30
```

Magnitude 5 and above only.

### 3. Near a city

```bash
node scripts/quakes.mjs near --city Quetta --radius-km 300 --days 30 --min-mag 2.5
```

Run `cities` for the 32 built-in cities. Use lowercase or any case; multi-word names need quotes (`--city "dera ismail khan"`).

### 4. One event

```bash
node scripts/quakes.mjs event --id <usgs id>
```

Take the id from a previous `recent`/`significant`/`near` result.

## How it works internally

One endpoint: `earthquake.usgs.gov/fdsnws/event/1/query?format=geojson`. `recent` and `significant` use a bounding box (lat 23.5–37.1, lon 60.8–77.9). `near` uses `latitude`/`longitude`/`maxradiuskm`. `event` uses `eventid`. No key, no auth.

## Sources and failure modes

- USGS updates within minutes of an event. Magnitudes can be revised later.
- The bounding box includes parts of Afghanistan, Iran and India. Read the `place` field to tell the country.
- An empty `quakes` array means no events matched, not an error.

## Hard boundaries

- Not an official Pakistani alert source. Point users to PMD and NDMA for warnings and safety advice.
- No forecasting or prediction.

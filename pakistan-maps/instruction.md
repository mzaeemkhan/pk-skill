# Pakistan Maps

## What this skill does

Provides driving routes with distance and estimated time between 30+ Pakistan cities using OSRM, and finds nearby places (restaurants, hotels, ATMs, etc.) using Nominatim. Built-in city coordinates for quick lookup.

## When to use

- "How far is Lahore from Islamabad?"
- "Route from Karachi to Peshawar"
- "Driving time Multan to Faisalabad"
- "Restaurants near Lahore"
- "Hotels near 33.68, 73.04"
- "Distance between Quetta and Karachi"

## Prerequisites

- Node.js 18+
- Internet connection

## Workflow

### 1. Driving route

```bash
node scripts/maps.mjs route --from <city> --to <city>
```

Returns distance (km), estimated driving time, and route steps.

### 2. Distance only

```bash
node scripts/maps.mjs distance --from <city> --to <city>
```

Returns straight-line and driving distance.

### 3. Nearby places

```bash
node scripts/maps.mjs nearby --city <city> --type <type> [--limit 10]
node scripts/maps.mjs nearby --lat <lat> --lon <lon> --type <type> [--limit 10]
```

Types: restaurant, hotel, atm, bank, fuel, mosque, school, park, or any Nominatim category.

### 4. List cities

```bash
node scripts/maps.mjs cities
```

## Output

All commands return JSON with distances, coordinates, and place details.

## Sources and failure modes

- OSRM demo server (router.project-osrm.org) — free, no auth, no SLA
- Nominatim (nominatim.openstreetmap.org) — 1 request/second rate limit
- City coordinates hardcoded for 30+ major cities
- OSRM may be temporarily unavailable

## Hard boundaries

- Driving routes only — no walking, cycling, or public transit
- Route times are estimates, no live traffic
- Read-only — no navigation or turn-by-turn
- Pakistan cities only

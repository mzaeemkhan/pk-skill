---
name: pakistan-maps
description: "Driving route, distance and travel time between 30+ Pakistani cities (OSRM) and nearby place search (OpenStreetMap). Use for \"Lahore to Islamabad distance\", \"restaurants near\"."
license: MIT
metadata:
  category: maps
  locale: en-PK
  phase: v1
---

# Pakistan Maps

Driving routes, distances, and nearby place search for Pakistan.

## Commands

```bash
# Get driving route between cities
node scripts/maps.mjs route --from Lahore --to Islamabad

# Get distance only
node scripts/maps.mjs distance --from Karachi --to Peshawar

# Find nearby places
node scripts/maps.mjs nearby --city Lahore --type restaurant --limit 5

# Find nearby by GPS coordinates
node scripts/maps.mjs nearby --lat 31.5 --lon 74.3 --type hotel --limit 10

# List supported cities
node scripts/maps.mjs cities
```

## Prerequisites

- Node.js 18+
- Internet connection

## Limitations

- OSRM demo server — no SLA, may be slow or unavailable
- Driving routes only (no walking, cycling, or transit)
- 30+ built-in cities — other locations need --lat/--lon
- Nearby search uses Nominatim (1 req/sec rate limit)
- Route times are estimates — actual time depends on traffic, road conditions

---
name: mosque-finder
description: Find mosques near Pakistani cities via OpenStreetMap Overpass API. 28+ cities. No API key.
license: MIT
metadata:
  category: religious
  locale: en-PK
  phase: v1
---

# Mosque Finder

Find mosques and masjids near any Pakistani city using OpenStreetMap data.

## Commands

```bash
# Find mosques near a city
node scripts/mosques.mjs find --city Lahore [--radius 2000] [--limit 20]

# List built-in cities
node scripts/mosques.mjs cities
```

## Parameters

- `--city` — City name (28+ built-in, geocoding fallback for others)
- `--radius` — Search radius in meters (default 2000)
- `--limit` — Max results (default 20)

## Prerequisites

- Node.js 18+

## Limitations

- Depends on OpenStreetMap data quality — not all mosques are mapped
- Overpass API may be slow or temporarily unavailable
- No prayer times or mosque schedules (use prayer-times skill instead)

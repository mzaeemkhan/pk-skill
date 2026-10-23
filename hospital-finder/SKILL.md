---
name: hospital-finder
description: Find hospitals, clinics, pharmacies in Pakistani cities via OpenStreetMap.
license: MIT
metadata:
  category: health
  locale: en-PK
  phase: v1
---

# Hospital Finder

Find healthcare facilities across Pakistan.

## Commands

```bash
# Search hospitals in a city
node scripts/hospitals.mjs search --city Islamabad --type hospital --limit 10

# Search pharmacies
node scripts/hospitals.mjs search --city Lahore --type pharmacy

# Search clinics
node scripts/hospitals.mjs search --city Karachi --type clinic

# Find nearby facilities by GPS coordinates
node scripts/hospitals.mjs nearby --lat 33.6844 --lon 73.0479 --type hospital --radius 5000

# List supported facility types
node scripts/hospitals.mjs types
```

## Prerequisites

- Node.js 18+
- Internet connection

## Limitations

- OpenStreetMap data — coverage varies by area (major cities well-covered, rural areas sparse)
- No phone numbers, ratings, or visiting hours
- Nominatim rate limit: 1 request/second
- Results depend on OSM contributor coverage

---
name: blood-banks
description: Find blood banks and donation centers in Pakistani cities via OpenStreetMap.
license: MIT
metadata:
  category: health
  locale: en-PK
  phase: v1
---

# Blood Banks

Find blood banks and donation centers across Pakistan.

## Commands

```bash
# Search blood banks in a city
node scripts/blood.mjs search --city Karachi

# Limit results
node scripts/blood.mjs search --city Lahore --limit 10

# List major blood bank organizations
node scripts/blood.mjs major

# List supported cities
node scripts/blood.mjs cities
```

## Prerequisites

- Node.js 18+
- Internet connection (for city search)

## Limitations

- OpenStreetMap data — coverage varies by area
- No real-time blood stock availability
- No donor registration or appointment booking
- Major organizations list is static reference data
- Nominatim rate limit: 1 request/second

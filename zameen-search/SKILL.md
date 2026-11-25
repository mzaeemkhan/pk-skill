---
name: zameen-search
description: "Zameen.com property listings in 14 cities — buy, rent, plots with price/bedroom filters. Live search is currently blocked by Zameen's bot protection (since Nov 2026); returns the browser search link instead. Use for \"house for rent in Lahore\", \"5 marla plot price\". Not for cars — use pakwheels-search."
license: MIT
metadata:
  category: real-estate
  locale: en-PK
  phase: v1
---

# Zameen Search

Search Zameen.com property listings across 14 major Pakistan cities.

## Commands

Run these from this skill's base directory (cd there first); script paths are relative to it.

```bash
# Search homes for sale in Lahore
node scripts/zameen.mjs search --city Lahore

# Search with filters
node scripts/zameen.mjs search --city Karachi --bedrooms 3 --price-min 10000000 --price-max 50000000

# Search rentals
node scripts/zameen.mjs search --city Islamabad --purpose rent --bedrooms 2

# Search plots
node scripts/zameen.mjs search --city Multan --purpose plot --price-max 20000000

# Page 2 of results
node scripts/zameen.mjs search --city Lahore --page 2

# List supported cities
node scripts/zameen.mjs cities
```

## Prerequisites

- Node.js 18+

## Limitations

- 25 results per page (Zameen.com pagination)
- No keyword/text search — location + filter based only
- Prices shown are listing prices (asking prices, not market value)
- No direct link to agent contact info
- Read-only — no posting or booking

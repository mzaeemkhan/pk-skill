---
name: zameen-search
description: Search Zameen.com property listings — buy, rent, plot across 14 Pakistan cities with price and bedroom filters. No API key needed.
license: MIT
metadata:
  category: real-estate
  locale: en-PK
  phase: v1
---

# Zameen Search

Search Zameen.com property listings across 14 major Pakistan cities.

## Commands

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

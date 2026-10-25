---
name: pakwheels-search
description: "Search live PakWheels used-car listings — prices, model year, mileage, city. Use for \"used Corolla price\", \"Alto 2018 for sale\". Not for property (zameen-search) or general classifieds (olx-search)."
license: MIT
metadata:
  category: shopping
  locale: en-PK
  phase: v1
---

# PakWheels Search

Search Pakistan's largest automotive marketplace for used cars.

## Commands

```bash
# Search used cars
node scripts/pakwheels.mjs search --query 'civic 2020'

# Search with pagination
node scripts/pakwheels.mjs search --query 'corolla' --page 2
```

## Prerequisites

- Node.js 18+

## Limitations

- ~15-30 results per page from schema.org structured data
- No new car listings — used cars only
- No bike listings (PakWheels bikes section not covered)
- No detailed specs beyond what's in the listing card
- Read-only — no contact seller or bidding

---
name: pakistan-census
description: "Offline 2023 census population figures by province, district and city — rank, compare, growth. Use for \"population of Karachi\", \"largest cities\". Not for admin structure/districts — use pakistan-provinces."
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Census

Pakistan 2023 Digital Census population data. Search by province, district, or city. Compare and rank.

## Commands

```bash
# National summary
node scripts/census.mjs summary

# Province details
node scripts/census.mjs province --name Punjab

# Search city or district
node scripts/census.mjs search --query Lahore

# Top N cities by population
node scripts/census.mjs top --count 10

# Compare two areas
node scripts/census.mjs compare --a Punjab --b Sindh
```

## Prerequisites

- Node.js 18+

## Limitations

- Based on 2023 Digital Census preliminary results
- District-level data for major districts; some sub-divisions not listed
- Population figures are approximate (rounded to nearest thousand)
- Offline only

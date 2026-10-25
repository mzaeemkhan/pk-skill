---
name: pakistan-provinces
description: "Offline Pakistan provinces/territories — capitals, area, districts and divisions, governors, CMs. Use for \"districts of Punjab\", \"capital of GB\". Not for detailed population figures — use pakistan-census."
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Provinces

Pakistan administrative divisions — provinces, territories, districts with 2023 census data.

## Commands

```bash
# List all provinces/territories
node scripts/provinces.mjs list

# Get province details with districts
node scripts/provinces.mjs province --name Punjab

# Search districts
node scripts/provinces.mjs search --query "Lahore"

# Get district details
node scripts/provinces.mjs district --name "Rawalpindi"

# Compare provinces
node scripts/provinces.mjs compare

# Stats
node scripts/provinces.mjs stats
```

## Prerequisites

- Node.js 18+

## Limitations

- 2023 digital census data (approximate)
- District list may not reflect latest administrative changes
- Offline only

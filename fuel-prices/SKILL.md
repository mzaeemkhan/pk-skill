---
name: fuel-prices
description: "Offline OGRA petrol, diesel, kerosene, LDO price table with history — may lag the latest fortnightly revision. Use for \"petrol price\", \"diesel rate per litre\"."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Fuel Prices

Pakistan petroleum fuel prices from OGRA (Oil and Gas Regulatory Authority).

## Commands

```bash
# Current fuel prices
node scripts/fuel.mjs current

# Price history (last N months)
node scripts/fuel.mjs history --months 6

# Compare a specific fuel over time
node scripts/fuel.mjs compare --fuel petrol

# List fuel types
node scripts/fuel.mjs fuels
```

## Prerequisites

- Node.js 18+

## Limitations

- Prices updated fortnightly by government notification
- OGRA website may be unreachable (Cloudflare) — falls back to offline dataset
- Offline data has a lastUpdated date; prices may have changed since
- National average prices only (district-wise pump prices vary slightly)
- No CNG or LPG prices (separate OGRA notifications)

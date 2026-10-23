---
name: prize-bonds
description: Pakistan prize bond draw results, schedule, and denominations via savings.gov.pk. No API key needed.
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Prize Bonds

Check Pakistan National Savings prize bond draw results from savings.gov.pk.

## Commands

```bash
# Check if a bond number won (searches all draws)
node pk-skill/prize-bonds/scripts/bonds.mjs check --number 123456 --denomination 750

# Check against a specific draw
node pk-skill/prize-bonds/scripts/bonds.mjs check --number 123456 --denomination 750 --draw 456

# Latest draw info for a denomination
node pk-skill/prize-bonds/scripts/bonds.mjs latest --denomination 200

# Draw schedule for all active denominations
node pk-skill/prize-bonds/scripts/bonds.mjs schedule

# List all denominations (active and discontinued)
node pk-skill/prize-bonds/scripts/bonds.mjs denominations
```

## Denomination Keys

| Key | Name |
|-----|------|
| 100 | Rs. 100 Prize Bond |
| 200 | Rs. 200 Prize Bond |
| 750 | Rs. 750 Prize Bond |
| 1500 | Rs. 1,500 Prize Bond |
| 25000p | Rs. 25,000 Premium Prize Bond |
| 40000p | Rs. 40,000 Premium Prize Bond |

Discontinued: 7500, 15000, 25000, 40000 (historical results still searchable).

## Prerequisites

- Node.js 18+

## Limitations

- Read-only results check only
- Data from savings.gov.pk — "Errors and omissions are Expected" (their disclaimer)
- No purchase or encashment functionality
- No PDF download of full draw lists

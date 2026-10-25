---
name: gold-prices
description: "Live gold, silver, platinum prices in PKR per tola, gram and ounce, with weight/value conversion. Use for \"sone ka rate\", \"gold price per tola\". Not for zakat — use zakat-calculator."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Gold Prices

International spot prices for gold, silver, platinum, and palladium in PKR and USD — per tola, gram, and troy ounce.

## Commands

```bash
# Today's gold and silver prices in PKR and USD
node scripts/gold.mjs today

# Specific metal (XAU, XAG, XPT, XPD)
node scripts/gold.mjs today XAU

# Convert: value of 5 tola gold in PKR
node scripts/gold.mjs convert --metal XAU --amount 5 --unit tola

# Convert: value of 100 grams silver
node scripts/gold.mjs convert --metal XAG --amount 100 --unit gram

# List supported metals and units
node scripts/gold.mjs metals
```

## Prerequisites

- Node.js 18+

## Limitations

- International spot prices only — not local sarafa/jeweller market rates
- Updated during market hours, not real-time tick-by-tick
- No historical price data or charts
- No making charges or jewellery pricing
- 1 tola = 11.6638 grams (Pakistan standard)

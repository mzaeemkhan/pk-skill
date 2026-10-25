---
name: currency-rates
description: "Interbank mid-market exchange rates and conversion for 166 currencies vs PKR. Use for \"dollar rate\", \"convert 100 USD to PKR\". Not for kerb buy/sell rates (open-market-forex) or SBP official rates/KIBOR (sbp-rates)."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Currency Rates

Daily exchange rates for 166 currencies against PKR, with conversion between any pair.

## Commands

```bash
# Key currency rates against PKR (USD, EUR, GBP, SAR, AED, etc.)
node scripts/rates.mjs today

# Convert between any two currencies
node scripts/rates.mjs convert --from USD --to PKR --amount 100

# Convert remittance (SAR to PKR)
node scripts/rates.mjs convert --from SAR --to PKR --amount 5000

# List all 166 supported currencies
node scripts/rates.mjs currencies
```

## Prerequisites

- Node.js 18+

## Limitations

- Mid-market rates only — open market buying/selling spread not available
- Updated once daily (not real-time)
- No historical rate data
- SBP official rates not available (sbp.org.pk blocks automated access)

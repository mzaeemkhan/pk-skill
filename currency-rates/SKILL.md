---
name: currency-rates
description: Currency exchange rates against PKR — 166 currencies, conversion, daily mid-market rates. No API key needed.
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
node pk-skill/currency-rates/scripts/rates.mjs today

# Convert between any two currencies
node pk-skill/currency-rates/scripts/rates.mjs convert --from USD --to PKR --amount 100

# Convert remittance (SAR to PKR)
node pk-skill/currency-rates/scripts/rates.mjs convert --from SAR --to PKR --amount 5000

# List all 166 supported currencies
node pk-skill/currency-rates/scripts/rates.mjs currencies
```

## Prerequisites

- Node.js 18+

## Limitations

- Mid-market rates only — open market buying/selling spread not available
- Updated once daily (not real-time)
- No historical rate data
- SBP official rates not available (sbp.org.pk blocks automated access)

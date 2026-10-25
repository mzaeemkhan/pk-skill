---
name: open-market-forex
description: "Live open-market (kerb) buy/sell PKR rates for USD, SAR, AED, GBP, EUR and more, with gap to interbank. Use for \"dollar open market rate\", \"riyal rate today\". Not for conversion (currency-rates) or SBP rates (sbp-rates)."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Open Market Forex

Money-changer (open-market) buying and selling rates in Pakistan.

## Commands

```bash
# All 23 open-market rates
node scripts/forex.mjs rates

# One currency
node scripts/forex.mjs rate --currency usd
node scripts/forex.mjs rate --currency sar

# Open market vs interbank mid-market, with premium %
node scripts/forex.mjs compare
```

## Prerequisites

- Node.js 18+
- `curl` on PATH (built into Windows 10+, macOS and most Linux). hamariweb.com's Cloudflare blocks Node's own fetch, so the script falls back to curl

## Limitations

- Open-market rates are indicative (Forex Association of Pakistan via hamariweb.com). Actual exchange company rates vary by city and amount
- Interbank side is the ExchangeRate-API daily mid-market rate, not SBP's weighted average. For the SBP figure use the `sbp-rates` skill
- 23 currencies only; no history

---
name: sbp-rates
description: "Live State Bank of Pakistan rates — policy rate, KIBOR, T-bill/PIB cut-offs, FX reserves, interbank USD/PKR. Use for \"interest rate\", \"KIBOR today\". Not for kerb (open-market-forex) or general conversion (currency-rates)."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# SBP Rates

Live interest-rate data from the State Bank of Pakistan homepage.

## Commands

```bash
# Policy rate, corridor (ceiling/floor), overnight repo, FX reserves
node scripts/sbp.mjs policy-rate

# KIBOR bid/offer for 3M, 6M, 12M
node scripts/sbp.mjs kibor

# Latest MTB (T-bill) and PIB auction cut-off yields
node scripts/sbp.mjs tbills

# Everything, plus interbank USD/PKR
node scripts/sbp.mjs all
```

## Prerequisites

- Node.js 18+
- `curl` on PATH (built into Windows 10+, macOS and most Linux). sbp.org.pk's Cloudflare blocks Node's own fetch, so the script falls back to curl

## Limitations

- Only what the SBP homepage shows: latest values, no history
- KIBOR tenors on the homepage are 3M, 6M, 12M only
- Parses HTML, so an SBP page redesign will break it with a clear error

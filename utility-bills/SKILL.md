---
name: utility-bills
description: Pakistani electricity bill lookup for all 11 WAPDA DISCOs and K-Electric via PITC portal. Read-only — no payment or account changes.
license: MIT
metadata:
  category: utilities
  locale: en-PK
  phase: v1
---

# Pakistan Utility Bills

Check electricity bills for all 11 WAPDA distribution companies (DISCOs) and K-Electric.

## Commands

```bash
# Check bill by reference number
node scripts/bills.mjs check --provider lesco --ref 01234567890123

# Check bill by customer ID
node scripts/bills.mjs check --provider iesco --ref 0123456789 --by appno

# K-Electric bill
node scripts/bills.mjs check --provider ke --ref 0123456789012

# List all providers
node scripts/bills.mjs providers
```

## Providers

LESCO, FESCO, IESCO, MEPCO, PESCO, HESCO, SEPCO, QESCO, GEPCO, TESCO, HAZECO, K-Electric

## Prerequisites

- Node.js 18+

## Limitations

- Read-only bill data only
- No payment, account changes, or complaint filing
- Gas bills (SNGPL, SSGC) not supported — SNGPL blocked by image CAPTCHA, SSGC blocked by Google reCAPTCHA v2
- Bill data reflects last generated bill; real-time updates not guaranteed

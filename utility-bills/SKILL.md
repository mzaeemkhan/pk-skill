---
name: utility-bills
description: "Where and how to view your electricity bill for all 11 DISCOs (LESCO, MEPCO, IESCO…) and K-Electric — official bill page, steps, and a format check on the reference number. Bill pages need a CAPTCHA, so amounts are not fetched. Use for \"check my bijli bill\", \"bill due date\". Not for estimating a bill from units — use electricity-calculator."
license: MIT
metadata:
  category: utilities
  locale: en-PK
  phase: v1
---

# Pakistan Utility Bills

Find the official bill page and steps for all 11 WAPDA distribution companies (DISCOs) and K-Electric. Bill pages require a CAPTCHA that the user completes in a browser, so this skill does not fetch amounts.

## Commands

Run these from this skill's base directory (cd there first); script paths are relative to it.

```bash
# Bill page + steps for a reference number
node scripts/bills.mjs check --provider lesco --ref 01234567890123

# Same, by customer ID
node scripts/bills.mjs check --provider iesco --ref 0123456789 --by appno

# K-Electric (13-digit account number)
node scripts/bills.mjs check --provider ke --ref 0123456789012

# All providers and their bill pages
node scripts/bills.mjs providers
```

## Providers

LESCO, FESCO, IESCO, MEPCO, PESCO, HESCO, SEPCO, QESCO, GEPCO, TESCO, HAZECO, K-Electric

## Prerequisites

- Node.js 18+

## Limitations

- Does not fetch bill amounts: every bill page (bill.pitc.com.pk, ke.com.pk) requires a CAPTCHA, which the user completes. Give them the link and steps; never try to solve or submit a CAPTCHA.
- Format check only: a number can look valid and still not exist.
- Gas bills (SNGPL, SSGC) not supported.
- No payment, account changes, or complaint filing.

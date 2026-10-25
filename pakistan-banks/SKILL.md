---
name: pakistan-banks
description: "Pakistani banks reference — IBAN validator, SWIFT/BIC codes for 20+ banks (offline), live branch finder via OpenStreetMap. Use for \"Meezan SWIFT code\", \"validate IBAN\". Not for rates — use sbp-rates."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Pakistan Banks

Pakistan banking reference — bank directory, IBAN validator, SWIFT codes, and branch locator.

## Commands

```bash
# List all banks
node scripts/banks.mjs list

# Search bank by name
node scripts/banks.mjs search --query "HBL"

# Validate IBAN
node scripts/banks.mjs iban --number PK36SCBL0000001123456702

# Find branches near a city
node scripts/banks.mjs branches --bank "HBL" --city Lahore
```

## Prerequisites

- Node.js 18+
- Internet for branch locator (Nominatim)

## Limitations

- IBAN validation checks format and bank code — does not verify account exists
- Branch locator uses OpenStreetMap data — coverage varies
- 20+ major banks covered; microfinance banks may not be listed
- SWIFT codes are head office defaults

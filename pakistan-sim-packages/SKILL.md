---
name: pakistan-sim-packages
description: Pakistan SIM packages — Jazz, Telenor, Zong, Ufone. Prices, USSD codes. Offline.
license: MIT
metadata:
  category: telecom
  locale: en-PK
  phase: v1
---

# Pakistan SIM Packages

Mobile operator packages — Jazz, Telenor, Zong, Ufone, SCOM. Data/call/SMS bundles with USSD codes.

## Commands

```bash
# Search packages by keyword
node scripts/simpackages.mjs search --query "weekly"

# List packages for an operator
node scripts/simpackages.mjs list --operator jazz

# Filter by type
node scripts/simpackages.mjs list --type data

# Compare packages across operators by data amount
node scripts/simpackages.mjs compare --data 5

# List operators
node scripts/simpackages.mjs operators

# Show activation code for a package
node scripts/simpackages.mjs activate --operator jazz --package "weekly-mega"

# Balance check codes
node scripts/simpackages.mjs balance --operator jazz
```

## Prerequisites

- Node.js 18+

## Limitations

- Prices and packages are approximate — operators change frequently
- USSD codes may vary by region
- Does not include corporate or postpaid plans
- No live status or balance check

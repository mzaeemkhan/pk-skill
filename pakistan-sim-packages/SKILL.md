---
name: pakistan-sim-packages
description: "Offline Jazz, Telenor, Zong, Ufone, SCOM bundles — data/call/SMS packages, USSD subscribe and balance codes (prices partly estimates). Use for \"Jazz weekly package\", \"Zong internet code\". Not for prefixes (pakistan-phone-codes)."
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

- Prices change often; confirm with operator via USSD/website/app before subscribing
- 19 weekly/monthly bundles verified against the PTA price list (Oct 2026, `estimate: false`); older v1 entries are `estimate: true` and likely outdated — use `--verified` to hide them
- Jazz/Telenor PTA prices may exclude 15% withholding tax; Zong/Ufone include it
- Only the Ufone balance code (*124#) is re-verified; other USSD codes may vary by region or have changed
- Does not include corporate or postpaid plans
- No live status or balance check

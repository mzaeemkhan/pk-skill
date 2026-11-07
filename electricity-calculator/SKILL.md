---
name: electricity-calculator
description: "Offline NEPRA bill estimator from units used — tariff slabs, FPA, GST, TV fee, compare DISCOs. Use for \"300 units ka bill\", \"protected vs unprotected slab\". Not for your actual bill — use utility-bills."
license: MIT
metadata:
  category: utility
  locale: en-PK
  phase: v1
---

# Electricity Calculator

Calculate Pakistan residential electricity bills using NEPRA tariff slabs. Includes surcharges, taxes, and DISCO comparison.

## Commands

Run these from this skill's base directory (cd there first); script paths are relative to it.

```bash
# Calculate bill for 300 units
node scripts/electricity.mjs calculate --units 300

# Calculate for specific DISCO
node scripts/electricity.mjs calculate --units 500 --disco KELECTRIC

# Protected consumer (<=200 units, 6-month average <=200)
node scripts/electricity.mjs calculate --units 150 --protected

# Show tariff slabs
node scripts/electricity.mjs slabs

# List all DISCOs
node scripts/electricity.mjs discos

# Compare bill across all DISCOs
node scripts/electricity.mjs compare --units 300
```

## Prerequisites

- Node.js 18+

## Limitations

- Base rates: NEPRA FY2025-26 uniform tariff (2 Jul 2025). 1-300 unit and protected rates are from published reporting; 301+ slabs are estimates (`estimate: true`). GST 18% on all bills. Use `--protected` for consumers with <=200 units/month and a 6-month average <=200
- Fuel Price Adjustment (FPA) varies monthly — uses reference value
- Does not cover commercial, industrial, or agricultural tariffs
- Actual bills may include arrears, meter rent, and other charges
- Offline only — verify with your DISCO for exact rates

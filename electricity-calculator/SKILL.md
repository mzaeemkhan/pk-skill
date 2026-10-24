---
name: electricity-calculator
description: NEPRA electricity bill calculator — residential tariff slabs, surcharges, tax. Compare across DISCOs. Offline.
license: MIT
metadata:
  category: utility
  locale: en-PK
  phase: v1
---

# Electricity Calculator

Calculate Pakistan residential electricity bills using NEPRA tariff slabs. Includes surcharges, taxes, and DISCO comparison.

## Commands

```bash
# Calculate bill for 300 units
node scripts/electricity.mjs calculate --units 300

# Calculate for specific DISCO
node scripts/electricity.mjs calculate --units 500 --disco KELECTRIC

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

- Rates are approximate (FY2024-25 NEPRA schedule)
- Fuel Price Adjustment (FPA) varies monthly — uses reference value
- Does not cover commercial, industrial, or agricultural tariffs
- Actual bills may include arrears, meter rent, and other charges
- Offline only — verify with your DISCO for exact rates

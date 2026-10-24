---
name: vehicle-tax
description: Pakistan vehicle token tax / excise duty calculator by engine CC, province, and vehicle type. Offline.
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Vehicle Tax Calculator

Calculate Pakistan vehicle token tax / excise duty by engine capacity, province, and vehicle type.

## Commands

```bash
# Calculate token tax
node scripts/vehicletax.mjs calculate --cc 1300 --province punjab

# Calculate with vehicle age and type
node scripts/vehicletax.mjs calculate --cc 1800 --province sindh --year 2020 --type motorcycle

# List provinces
node scripts/vehicletax.mjs provinces

# Show tax slabs for a province
node scripts/vehicletax.mjs slabs --province punjab
```

## Prerequisites

- Node.js 18+

## Limitations

- Rates are approximate and based on publicly available schedules
- Actual tax may vary based on vehicle make, model, and registration date
- Does not cover commercial vehicle special rates
- Offline only — verify with provincial Excise & Taxation department

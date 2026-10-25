---
name: nikah-calculator
description: "Offline nikah financial helper — Haq Mehr in gold/silver (Mehr-e-Fatimi, minimum), wedding cost estimate by city tier, nikah document checklist. Use for \"haq mehr kitna\", \"shadi kharcha\"."
license: MIT
metadata:
  category: religious
  locale: en-PK
  phase: v1
---

# Nikah Calculator

Islamic marriage financial calculator and reference for Pakistan.

## Commands

```bash
# Calculate Mehr by gold tola
node scripts/nikah.mjs mehr --gold-tola 5

# Calculate Mehr by silver tola (Mehr-e-Fatimi)
node scripts/nikah.mjs mehr --silver-tola 131.25

# Check if amount meets minimum Mehr
node scripts/nikah.mjs mehr --amount 50000

# Reference: Mehr-e-Fatimi, minimum Mehr, rates
node scripts/nikah.mjs reference

# Wedding cost estimate
node scripts/nikah.mjs costs --guests 300 --city Lahore

# Nikah documentation checklist
node scripts/nikah.mjs checklist
```

## Prerequisites

- Node.js 18+

## Limitations

- Reference gold/silver rates are hardcoded approximations — verify current market rates
- Wedding cost ranges are rough estimates based on city tier
- Religious guidance is for reference only — consult a scholar for specific rulings
- Cost estimates do not include dowry (jahez) or other cultural customs

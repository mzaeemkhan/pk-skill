---
name: qurbani-calculator
description: Qurbani calculator — meat distribution, animal prices, Islamic rules. Offline.
license: MIT
metadata:
  category: religious
  locale: en-PK
  phase: v1
---

# Qurbani Calculator

Calculate Qurbani meat distribution, check animal eligibility, estimate prices, and review Islamic rules.

## Commands

```bash
# Calculate meat distribution
node scripts/qurbani.mjs calculate --animal cow --shares 7 --weight 300

# List eligible animals with share info
node scripts/qurbani.mjs animals

# Islamic rules for Qurbani (Hanafi fiqh)
node scripts/qurbani.mjs rules

# Estimated animal prices by city
node scripts/qurbani.mjs prices --city Lahore

# Explain 1/3 distribution rule
node scripts/qurbani.mjs distribution

# Eid-ul-Adha preparation checklist
node scripts/qurbani.mjs checklist
```

## Prerequisites

- Node.js 18+

## Limitations

- Prices are approximate 2024 estimates — actual prices vary by season and market
- Hanafi fiqh rules only — consult a scholar for other schools
- Meat yield percentages are approximate averages
- All data offline — no live price feeds

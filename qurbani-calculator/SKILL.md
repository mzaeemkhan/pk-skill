---
name: qurbani-calculator
description: "Offline Qurbani helper — animal shares and eligibility, meat yield from weight, 1/3 distribution, rules (Hanafi), estimated animal prices by city. Use for \"bakra price\", \"cow hissa\". Prices are estimates."
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

- Prices change often; confirm at the mandi or with sellers
- `prices` includes reported Eid ul Adha 2026 national ranges (and Lahore) from May 2026 news; per-city tables are unverified 2024 estimates (`estimate: true`)
- Hanafi fiqh rules only — consult a scholar for other schools
- Meat yield percentages are approximate averages
- All data offline — no live price feeds

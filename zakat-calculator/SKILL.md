---
name: zakat-calculator
description: "Offline zakat calculator (Hanafi) — 2.5% on gold, silver, cash, investments minus debts, nisab check. Use for \"how much zakat\", \"nisab\". Not for income tax (pakistan-tax-calculator) or Qurbani (qurbani-calculator)."
license: MIT
metadata:
  category: religious
  locale: en-PK
  phase: v1
---

# Zakat Calculator

Calculate Zakat on your assets — gold, silver, cash, investments, property minus debts.

## Commands

```bash
# Calculate zakat on assets
node scripts/zakat.mjs calculate --gold 10 --silver 0 --cash 500000 --investments 200000 --debts 100000

# Show nisab thresholds
node scripts/zakat.mjs nisab

# Show reference gold/silver rates
node scripts/zakat.mjs rates
```

## Prerequisites

- Node.js 18+

## Limitations

- Gold/silver rates are hardcoded reference values — verify current market rate before making decisions
- Zakat calculation follows Hanafi fiqh (most common in Pakistan)
- Does not cover zakat on livestock, agricultural produce, or business inventory separately
- Offline only — no live gold price fetching

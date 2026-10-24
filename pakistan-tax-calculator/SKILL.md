---
name: pakistan-tax-calculator
description: Pakistan income tax calculator — FBR slabs, freelancer rate, withholding. Offline.
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Pakistan Tax Calculator

FBR income tax calculator — salaried/business slabs, freelancer IT export rate, withholding taxes.

## Commands

```bash
# Calculate annual income tax (salaried)
node scripts/tax.mjs calculate --income 1500000 --type salaried

# Monthly salary tax
node scripts/tax.mjs calculate --income 200000 --type salaried --period monthly

# Show tax slabs
node scripts/tax.mjs slabs --year 2024

# Business income slabs
node scripts/tax.mjs slabs --type business

# Freelancer / IT export tax
node scripts/tax.mjs freelancer --income 5000 --currency usd

# Withholding tax rates
node scripts/tax.mjs withholding

# Filer vs non-filer benefits
node scripts/tax.mjs filer-status

# Tax filing deadlines
node scripts/tax.mjs deadlines
```

## Prerequisites

- Node.js 18+

## Limitations

- FBR 2024-25 slabs — update when new finance bill passes
- Freelancer rate uses approximate USD/PKR conversion
- Does not cover sales tax, customs, or provincial taxes
- Not a substitute for professional tax advice

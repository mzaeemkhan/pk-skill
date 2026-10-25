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
# Calculate annual income tax (salaried, default FY2026-27)
node scripts/tax.mjs calculate --income 1500000 --type salaried

# Earlier year
node scripts/tax.mjs calculate --income 1500000 --year 2025-26

# Monthly salary tax
node scripts/tax.mjs calculate --income 200000 --type salaried --period monthly

# Show tax slabs
node scripts/tax.mjs slabs --year 2025-26

# Business income slabs
node scripts/tax.mjs slabs --type business

# Freelancer / IT export tax
node scripts/tax.mjs freelancer --income 5000 --currency usd --rate 280 --pseb yes

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

- Years: 2026-27 (default, Finance Act 2026), 2025-26, 2024-25 — update after each budget
- Slabs verified from payroll-firm/advisor summaries (Mercans, Vialto), not FBR gazette text
- Non-salaried slabs assumed unchanged since Finance Act 2024; withholding rows with `verified: false` unconfirmed
- Surcharge on income > PKR 10M: salaried 10%/9%/none (FY25/26/27), non-salaried 10%
- Freelancer rate (0.25% PSEB / 1% otherwise) from a single secondary source
- Does not cover sales tax, customs, or provincial taxes
- Not a substitute for professional tax advice

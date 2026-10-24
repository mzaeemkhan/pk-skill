# Pakistan Tax Calculator

## What this skill does

Calculates Pakistan income tax using FBR 2024-25 slabs for salaried and business income. Includes freelancer/IT export reduced rate, withholding tax reference, filer benefits, and filing deadlines. All offline.

## When to use

- "How much tax on 2 million salary in Pakistan?"
- "Pakistan income tax slabs 2024"
- "Freelancer tax rate in Pakistan"
- "Withholding tax on bank profit"
- "Benefits of being a filer in Pakistan"
- "When is tax filing deadline?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Calculate income tax

```bash
node scripts/tax.mjs calculate --income 1500000 --type salaried
```

For monthly: add `--period monthly` (auto-annualizes, then shows monthly breakdown).

### 2. View slabs

```bash
node scripts/tax.mjs slabs --year 2024
node scripts/tax.mjs slabs --type business
```

### 3. Freelancer tax

```bash
node scripts/tax.mjs freelancer --income 5000 --currency usd
```

Uses 0.25% final tax on IT/ITeS export remittances.

### 4. Withholding rates

```bash
node scripts/tax.mjs withholding
```

Common withholding tax rates: bank profit, property, vehicles, dividends, etc.

### 5. Filer benefits

```bash
node scripts/tax.mjs filer-status
```

### 6. Deadlines

```bash
node scripts/tax.mjs deadlines
```

## Output

All commands return JSON with calculation breakdown.

## Hard boundaries

- 2024-25 rates only
- Income tax only (no sales tax, customs, provincial)
- Not professional tax advice

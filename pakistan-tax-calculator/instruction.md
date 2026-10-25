# Pakistan Tax Calculator

## What this skill does

Calculates Pakistan income tax using FBR slabs for tax years 2026-27 (default), 2025-26 and 2024-25, salaried and business income, including the PKR 10M surcharge. Includes freelancer/IT export reduced rate, withholding tax reference, filer benefits, and filing deadlines. All offline.

## When to use

- "How much tax on 2 million salary in Pakistan?"
- "Pakistan income tax slabs 2026-27"
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

For monthly: add `--period monthly` (auto-annualizes, then shows monthly breakdown). Add `--year 2025-26` or `--year 2024-25` for earlier years.

### 2. View slabs

```bash
node scripts/tax.mjs slabs --year 2025-26
node scripts/tax.mjs slabs --type business
```

### 3. Freelancer tax

```bash
node scripts/tax.mjs freelancer --income 5000 --currency usd
```

0.25% final tax for PSEB-registered IT/ITeS exporters, 1% otherwise (`--pseb no`). Pass `--rate` with the current USD/PKR rate.

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

All commands return JSON with calculation breakdown plus `source` and `asOf`. Always tell the user the tax year used and that figures should be confirmed with FBR.

## Hard boundaries

- Tax years 2024-25 to 2026-27 only
- Income tax only (no sales tax, customs, provincial)
- Not professional tax advice

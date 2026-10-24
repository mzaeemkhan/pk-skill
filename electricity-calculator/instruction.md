# Electricity Calculator

## What this skill does

Calculates residential electricity bills using NEPRA tariff slabs with surcharges and taxes. Compare across DISCOs. All offline.

## When to use

- "How much is 300 units of electricity?"
- "Calculate my light bill for 500 units"
- "NEPRA tariff slabs"
- "Compare electricity rates across DISCOs"
- "K-Electric bill for 400 units"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Calculate bill

```bash
node scripts/electricity.mjs calculate --units <number> [--disco <name>]
```

DISCO defaults to LESCO. Shows slab breakdown, base cost, surcharges, taxes, total.

### 2. Show slabs

```bash
node scripts/electricity.mjs slabs [--disco <name>]
```

NEPRA residential tariff slabs with per-unit rates.

### 3. List DISCOs

```bash
node scripts/electricity.mjs discos
```

All 11 WAPDA DISCOs + K-Electric.

### 4. Compare across DISCOs

```bash
node scripts/electricity.mjs compare --units <number>
```

Same unit count, all DISCOs side by side.

## Output

All commands return JSON.

## Hard boundaries

- Residential tariff only (not commercial/industrial/agricultural)
- FPA is a reference value, actual varies monthly
- Rates approximate FY2024-25 NEPRA schedule
- Not a substitute for official DISCO billing

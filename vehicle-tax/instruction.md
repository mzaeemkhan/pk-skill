# Vehicle Tax Calculator

## What this skill does

Calculates annual vehicle token tax / excise duty for Pakistan provinces based on engine CC, vehicle type, and age. All offline.

## When to use

- "How much is token tax for a 1300cc car in Punjab?"
- "Vehicle tax for 1800cc in Sindh"
- "Motorcycle tax rates in KP"
- "Show Punjab tax slabs"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Calculate tax

```bash
node scripts/vehicletax.mjs calculate --cc <engine-cc> --province <name> [--year <model-year>] [--type car|motorcycle|commercial]
```

Province: punjab, sindh, kp, balochistan, ict, ajk, gb. Type defaults to car. Year defaults to current.

### 2. List provinces

```bash
node scripts/vehicletax.mjs provinces
```

All provinces with Excise & Taxation department info.

### 3. Show slabs

```bash
node scripts/vehicletax.mjs slabs --province punjab
```

Tax slabs by CC range for the specified province.

## Output

All commands return JSON.

## Hard boundaries

- Rates are approximate reference values
- Does not replace official Excise & Taxation calculation
- No online verification
- Commercial vehicles use simplified rates

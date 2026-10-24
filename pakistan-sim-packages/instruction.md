# Pakistan SIM Packages

## What this skill does

Provides Pakistan mobile operator packages — Jazz, Telenor, Zong, Ufone, SCOM. Daily/weekly/monthly bundles for data, calls, SMS with USSD activation codes, prices, and balance check codes. All offline.

## When to use

- "Best Jazz data package"
- "Zong weekly bundle"
- "Compare 5GB packages across operators"
- "How to check Telenor balance"
- "Ufone monthly package USSD code"
- "Cheapest unlimited calls package"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search packages

```bash
node scripts/simpackages.mjs search --query "monthly data"
```

### 2. List by operator

```bash
node scripts/simpackages.mjs list --operator jazz
node scripts/simpackages.mjs list --operator telenor --type bundle
```

### 3. Compare packages

```bash
node scripts/simpackages.mjs compare --data 5
```

Finds closest match to the requested data amount across all operators.

### 4. Operators info

```bash
node scripts/simpackages.mjs operators
```

### 5. Activation codes

```bash
node scripts/simpackages.mjs activate --operator jazz --package "weekly-mega"
```

### 6. Balance check

```bash
node scripts/simpackages.mjs balance --operator jazz
```

## Output

All commands return JSON.

## Hard boundaries

- Prices approximate — operators change packages frequently
- Prepaid only (no postpaid/corporate)
- No live balance or status checks

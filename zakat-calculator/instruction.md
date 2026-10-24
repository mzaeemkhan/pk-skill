# Zakat Calculator

## What this skill does

Calculates Zakat (2.5% Islamic obligatory charity) on assets — gold, silver, cash, investments, property — minus debts. Checks nisab threshold. All offline, no network calls.

## When to use

- "How much zakat do I owe on 10 tola gold and 5 lakh cash?"
- "What is the nisab threshold?"
- "Calculate zakat on my savings"
- "Gold nisab in PKR"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Calculate zakat

```bash
node scripts/zakat.mjs calculate --gold <tola> --silver <tola> --cash <PKR> --investments <PKR> --property <PKR> --debts <PKR>
```

All flags optional, default 0. Gold/silver in tola. Cash/investments/property/debts in PKR.

Returns: totalAssets, nisab thresholds, meetsNisab, zakatDue (2.5% if above nisab).

### 2. Nisab thresholds

```bash
node scripts/zakat.mjs nisab
```

Shows gold nisab (7.5 tola / 87.48g) and silver nisab (52.5 tola / 612.36g) with PKR values.

### 3. Reference rates

```bash
node scripts/zakat.mjs rates
```

Shows hardcoded gold/silver rates per tola in PKR. User should verify against current market.

## Output

All commands return JSON.

## Islamic rules applied

- Zakat rate: 2.5% (1/40th) of net zakatable wealth
- Nisab: value of 7.5 tola gold OR 52.5 tola silver, whichever is LOWER
- Debts are subtracted from total assets before calculation
- If net assets < nisab, no zakat is due
- Follows Hanafi school (predominant in Pakistan)

## Hard boundaries

- Offline only — rates are reference values, not live
- No livestock or agricultural zakat
- No zakat on personal residence or personal vehicle
- Not a fatwa — consult a scholar for complex cases

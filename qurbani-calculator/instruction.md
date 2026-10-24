# Qurbani Calculator

## What this skill does

Calculates Qurbani (Udhiyah) meat distribution, lists eligible animals with share counts, provides estimated prices by city, and explains Islamic rules according to Hanafi fiqh. All offline.

## When to use

- "How much meat will I get from a 300kg cow?"
- "What are Qurbani animal prices in Lahore?"
- "How many shares in a cow/camel?"
- "What are the Islamic rules for Qurbani?"
- "Qurbani meat distribution calculator"
- "Eid-ul-Adha preparation checklist"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Calculate meat distribution

```bash
node scripts/qurbani.mjs calculate --animal cow --shares 7 --weight 300
```

Returns total meat yield, per-share amount, and 1/3 distribution breakdown (family, relatives, poor).

### 2. List animals

```bash
node scripts/qurbani.mjs animals
```

All eligible animals with shares, minimum age, and approximate meat yield percentage.

### 3. Rules

```bash
node scripts/qurbani.mjs rules
```

Hanafi fiqh rules for Qurbani.

### 4. Price estimates

```bash
node scripts/qurbani.mjs prices --city Lahore
```

Approximate prices by city and animal type. Use `--city all` for all cities.

### 5. Distribution explanation

```bash
node scripts/qurbani.mjs distribution
```

### 6. Checklist

```bash
node scripts/qurbani.mjs checklist
```

## Output

All commands return JSON.

## Sources and failure modes

- Offline data — prices are 2024 estimates
- Meat yield percentages are industry averages
- Hanafi fiqh only

## Hard boundaries

- Read-only, no transactions
- Not a fatwa — consult a scholar for personal rulings
- Prices are estimates, not live market rates

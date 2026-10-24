# Nikah Calculator

## What this skill does

Islamic marriage (nikah) financial calculator and reference. Calculates Mehr amounts based on gold/silver weight, estimates wedding costs by city tier, and provides nikah documentation checklist.

All data is offline — no network calls needed.

## When to use

- "How much is Mehr-e-Fatimi?"
- "Calculate Mehr for 5 tola gold"
- "Wedding cost for 300 guests in Karachi"
- "What documents do I need for nikah?"
- "What is the minimum Mehr in Islam?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Mehr calculation

```bash
node scripts/nikah.mjs mehr [--gold-tola <n>] [--silver-tola <n>] [--amount <PKR>]
```

- `--gold-tola`: calculates PKR equivalent at reference rate
- `--silver-tola`: calculates PKR equivalent (use 131.25 for Mehr-e-Fatimi)
- `--amount`: checks if amount meets minimum Mehr threshold

### 2. Reference rates

```bash
node scripts/nikah.mjs reference
```

Shows Mehr-e-Fatimi, minimum Mehr (10 dirhams), and current reference rates.

### 3. Wedding costs

```bash
node scripts/nikah.mjs costs --guests <number> [--city <name>]
```

Estimates hall, catering, and total cost based on city tier.

### 4. Checklist

```bash
node scripts/nikah.mjs checklist
```

Nikah documentation requirements.

## Output

All commands return JSON.

## Sources and failure modes

- Mehr calculations based on Islamic jurisprudence (Hanafi fiqh references)
- Gold/silver rates are reference approximations — actual rates change daily
- Wedding cost ranges from Pakistani market surveys (2024-2025 data)

## Hard boundaries

- Read-only reference tool
- Not a fatwa or religious ruling — consult a qualified scholar
- Gold/silver rates are approximate — verify from gold-prices skill or market
- Wedding costs are estimates only

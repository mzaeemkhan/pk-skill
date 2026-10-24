# Fuel Prices

## What this skill does

Returns Pakistan petroleum fuel prices — Petrol (MS), High Speed Diesel (HSD), Kerosene (SKO), and Light Diesel Oil (LDO). Attempts live data from OGRA; falls back to offline historical dataset.

## When to use

- "What is the current petrol price?"
- "Diesel price in Pakistan"
- "Fuel price history"
- "How much has petrol price changed?"
- "Compare fuel prices over time"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Current prices

```bash
node scripts/fuel.mjs current
```

Returns current prices for all 4 fuel types with effective date, previous price, and change amount/percentage.

### 2. Price history

```bash
node scripts/fuel.mjs history --months 6
```

Returns price changes over the last N months for all fuel types.

### 3. Compare one fuel

```bash
node scripts/fuel.mjs compare --fuel petrol
```

Fuel options: petrol, diesel, kerosene, ldo

### 4. List fuel types

```bash
node scripts/fuel.mjs fuels
```

## Output

All commands return JSON. Prices in PKR per liter.

## Sources and failure modes

- Primary: OGRA website (ogra.org.pk) — may be behind Cloudflare, can timeout
- Fallback: Built-in offline dataset of historical prices
- Offline data shows a `lastUpdated` field and `source: "offline"` flag
- Prices are government-notified, typically fortnightly

## Hard boundaries

- Read-only — no calculations for fill-up costs
- National average prices only
- No CNG, LPG, or RLNG prices
- No district/pump-wise price variation

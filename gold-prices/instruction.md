# Gold Prices

## What this skill does

Provides international spot prices for precious metals (gold, silver, platinum, palladium) in both PKR and USD, with per-tola, per-gram, and per-troy-oz breakdown. Includes weight/value conversion for Pakistan's tola-based gold market.

## When to use

- "What's the gold rate today?"
- "Gold price per tola in Pakistan"
- "How much is 5 tola gold worth?"
- "Silver rate in PKR"
- "Convert 10 grams of gold to PKR"
- "Platinum price today"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Today's prices

```bash
node scripts/gold.mjs today
```

Returns gold and silver prices by default. Shows USD per troy oz, PKR per troy oz, PKR per tola, PKR per gram.

For a specific metal:

```bash
node scripts/gold.mjs today XAU
```

Symbols: XAU (Gold), XAG (Silver), XPT (Platinum), XPD (Palladium).

### 2. Convert weight to value

```bash
node scripts/gold.mjs convert --metal XAU --amount 5 --unit tola
```

Units: tola, gram, oz (troy ounce). Returns total value in both PKR and USD.

### 3. List supported metals

```bash
node scripts/gold.mjs metals
```

## How it works internally

Two APIs combined:
1. **Yahoo Finance chart API** (`query1.finance.yahoo.com/v8/finance/chart/<symbol>`) — spot price in USD per troy ounce for each metal futures contract (GC=F, SI=F, PL=F, PA=F). Free, no auth.
2. **ExchangeRate-API** (`open.er-api.com/v6/latest/USD`) — USD to PKR conversion rate. Free, no auth.

Weight conversion: 1 troy oz = 31.1035g, 1 tola = 11.6638g. PKR per tola = (USD per oz × PKR/USD) × (11.6638 / 31.1035).

## Sources and failure modes

- Yahoo Finance: real-time during market hours, delayed otherwise. Futures prices, not physical delivery.
- ExchangeRate-API: mid-market rate, updated daily.
- These are international spot prices. Local sarafa market rates in Pakistan are typically 2-5% higher due to import duties, making charges, and dealer margins.
- The tola conversion uses the standard Pakistan tola (11.6638g), which matches what sarafa bazaars use.

## Hard boundaries

- No local sarafa bazaar or jeweller rates (would require scraping)
- No historical prices or price charts
- No jewellery making charges or wastage calculations
- No buy/sell spread — spot mid-price only
- Read-only — no trading

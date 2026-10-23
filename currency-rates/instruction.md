# Currency Rates

## What this skill does

Provides daily exchange rates for 166 currencies against PKR, plus conversion between any two currencies. Data from ExchangeRate-API (free, no auth, daily refresh).

## When to use

- "What's the dollar rate today?"
- "Convert 5000 SAR to PKR"
- "EUR to PKR rate"
- "How much is 100 GBP in rupees?"
- "Currency rates for Pakistan"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Today's rates (key currencies against PKR)

```bash
node pk-skill/currency-rates/scripts/rates.mjs today
```

Returns 24 key currencies against PKR: USD, EUR, GBP, SAR, AED, CAD, AUD, CNY, JPY, CHF, SGD, MYR, KWD, OMR, QAR, BHD, INR, TRY, SEK, NOK, DKK, NZD, HKD, THB.

### 2. Convert between currencies

```bash
node pk-skill/currency-rates/scripts/rates.mjs convert --from USD --to PKR --amount 100
```

Works between any pair of the 166 supported currencies, not just PKR. Useful for remittance calculations (SAR→PKR, AED→PKR, GBP→PKR).

### 3. List supported currencies

```bash
node pk-skill/currency-rates/scripts/rates.mjs currencies
```

Returns all 166 currency codes.

## How it works internally

Single API: `open.er-api.com/v6/latest/<BASE>` — free tier of ExchangeRate-API. Returns JSON with all 166 rates relative to the base currency. No API key, no auth headers, no rate limit for normal use.

For `today`, fetches USD-based rates and computes PKR equivalent (1 unit of each currency = X PKR). For `convert`, fetches rates with the source currency as base and reads the target rate directly.

## Sources and failure modes

- ExchangeRate-API free tier: updated once daily around 00:00 UTC. Aggregates from central bank and market data.
- These are mid-market rates — the midpoint between buy and sell. Actual money changer rates (open market) will differ by 1-3%.
- SBP official rates are not available — sbp.org.pk returns 403 to automated requests. forex.pk has open market rates but no API.

## Hard boundaries

- No open market buying/selling rates (would require HTML scraping)
- No historical rates (free tier limitation)
- No SBP official rates
- No real-time streaming — daily snapshot only
- Read-only — no trading or transactions

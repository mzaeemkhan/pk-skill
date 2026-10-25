# Open Market Forex

## What this skill does

Returns Pakistan open-market (kerb / money-changer) buying and selling rates in PKR for 23 currencies, and compares them with interbank mid-market rates.

## When to use

- "Open market dollar rate today"
- "Riyal rate in Pakistan" / "dirham rate today"
- "How much will a money changer give me for 1000 SAR?"
- "Gap between open market and interbank dollar"

## Workflow

### 1. All rates

```bash
node scripts/forex.mjs rates
```

`buy` = what the money changer pays you for 1 unit. `sell` = what you pay to buy 1 unit. Show `asOf` (PKT).

### 2. One currency

```bash
node scripts/forex.mjs rate --currency sar
```

Codes: USD, EUR, GBP, AED, SAR, KWD, CAD, AUD, OMR, JPY, MYR, QAR, BHD, THB, CNY, HKD, DKK, NZD, SGD, NOK, SEK, CHF, INR.

For a conversion, multiply the amount by `buy` (selling foreign currency) or `sell` (buying it).

### 3. Compare with interbank

```bash
node scripts/forex.mjs compare
```

`sellPremiumPct` shows how far the open-market selling rate is above the interbank mid-market rate.

## How it works internally

- Open market: HTML table on `hamariweb.com/finance/forex/open_market_rates.aspx`, parsed by regex on the `xxx-to-pkr/` rows. Node `fetch` gets a Cloudflare 403, so the script falls back to the system `curl` binary (no shell, fixed arguments).
- Interbank: `open.er-api.com/v6/latest/USD` (JSON, no key).

## Sources and failure modes

- forex.pk's open-market page is gone (404) and ecap.org.pk did not respond, so hamariweb.com is the source.
- If hamariweb changes its layout, the script exits with "page layout changed".
- If both fetch and curl fail, the error says which.

## Hard boundaries

- Indicative rates only. Tell users to confirm with an exchange company before a large transaction.
- No hawala/hundi rates.

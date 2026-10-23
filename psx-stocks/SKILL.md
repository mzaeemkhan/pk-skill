---
name: psx-stocks
description: PSX stock prices for 50 major companies — quotes, market overview, history via Yahoo Finance. No API key.
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# PSX Stocks

Pakistan Stock Exchange stock prices for 50 major KSE-listed companies.

## Commands

```bash
# Get price for one or more stocks
node scripts/stocks.mjs quote --symbols OGDC,HBL,LUCK

# Top 15 PSX stocks overview
node scripts/stocks.mjs market

# List all 50 tracked symbols
node scripts/stocks.mjs list

# Price history for a stock
node scripts/stocks.mjs history --symbol OGDC --range 1mo
```

## Prerequisites

- Node.js 18+

## Limitations

- Data from Yahoo Finance — may be 15-20 minutes delayed during trading hours
- KSE-100 index not available via Yahoo Finance
- Only 50 pre-selected blue-chip stocks tracked (not all ~500 listed companies)
- No order book, volume leaders, or IPO data
- Read-only — no trading

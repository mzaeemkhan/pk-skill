# PSX Stocks

## What this skill does

Provides stock prices for 50 major Pakistan Stock Exchange listed companies using Yahoo Finance. Supports individual quotes, market overview, symbol listing, and price history.

## When to use

- "What's the OGDC share price?"
- "PSX stock market today"
- "HBL stock price"
- "Show me LUCK cement history"
- "List all PSX stocks"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Get stock quotes

```bash
node scripts/stocks.mjs quote --symbols OGDC,HBL,LUCK
```

Returns: price, change, changePercent, previousClose, 52-week high/low. Fetches each stock sequentially via Yahoo Finance.

### 2. Market overview

```bash
node scripts/stocks.mjs market
```

Top 15 blue-chip stocks: OGDC, HBL, UBL, MCB, LUCK, ENGRO, FFC, HUBC, PSO, PPL, SYS, TRG, MEBL, MARI, EFERT.

### 3. List all tracked symbols

```bash
node scripts/stocks.mjs list
```

Returns all 50 stock symbols with company names and Yahoo Finance ticker (.KA suffix).

### 4. Price history

```bash
node scripts/stocks.mjs history --symbol OGDC --range 1mo
```

Ranges: 1mo, 3mo, 6mo, 1y, 5y. Returns daily OHLCV data.

## How it works internally

Yahoo Finance v8 chart API: `query1.finance.yahoo.com/v8/finance/chart/{SYMBOL}.KA?interval=1d&range=5d`. The `.KA` suffix is Karachi Stock Exchange. Free, no auth, no API key.

## Sources and failure modes

- Yahoo Finance: prices may be 15-20 min delayed during PSX trading hours (Mon-Fri 9:30-15:30 PKT). After hours shows last close.
- PSX direct APIs (dps.psx.com.pk) blocked by Cloudflare JS challenge — Yahoo Finance is the fallback.
- KSE-100 index is not available on Yahoo Finance.
- Only 50 pre-selected stocks. If user asks about a stock not in the list, try the symbol with `.KA` suffix anyway — it may work.

## Hard boundaries

- No KSE-100 or KSE-30 index values
- No order book depth or volume leaders
- No IPO data or company financials
- No real-time streaming — poll-based
- Read-only — no trading

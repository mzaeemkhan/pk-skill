# Mutual Funds

## What this skill does

Looks up Pakistani mutual and pension funds: latest NAV and its date, 7-day NAV history, 1M/3M/6M/1Y returns, expense ratio, loads, AMC, category, risk profile and Shariah status. Ranks funds in a category by 1-year return.

## When to use

- "What is the NAV of Meezan Islamic Fund?"
- "Best money market funds in Pakistan"
- "Top Islamic equity funds by return"
- "Which funds does HBL Asset Management run?"
- "Expense ratio of UBL Stock Advantage Fund"

## Workflow

### 1. Find the fund

```bash
node scripts/funds.mjs search --query "meezan"
```

Matches on name substring or exact symbol. Returns name, symbol, NAV, risk profile, Shariah flag, AUM.

### 2. Fund details

```bash
node scripts/funds.mjs nav --fund "Meezan Islamic Fund"
node scripts/funds.mjs nav --fund MIF
```

Picks an exact name/symbol match first, else the first partial match; `otherMatches` lists the rest. `nav` and `navDate` are the latest daily NAV. `returns`, `costs` and `aumPkr` are from the fund manager report dated `reportStatsAsOf`.

### 3. Top funds in a category

```bash
node scripts/funds.mjs top --category equity --count 10
```

Aliases: `equity`, `money-market`, `income`, `islamic` (= Shariah Compliant Equity), `islamic-money-market`. Any exact category name from `categories` also works, e.g. `--category "VPS-Equity"`.

### 4. Categories

```bash
node scripts/funds.mjs categories
```

Read live from the sarmaaya.pk page (35 categories including VPS pension funds).

## How it works internally

Public endpoints on `beta-restapi.sarmaaya.pk/api` (no auth): `mutual-funds?limit=1000` (all funds), `mutual-funds/snapshot/{fundId}` (report stats), `mutual-funds/nav-history/{fundId}?days=7`, `mutual-funds/fund-by-category?category=…`. Category names come from the `categoryName` filter on `sarmaaya.pk/mutual-funds`.

## Sources and failure modes

- MUFAP is the official source but is behind a Cloudflare challenge. Sarmaaya republishes MUFAP/AMC data.
- The sarmaaya API is undocumented and may change. Errors include the HTTP status and API message.
- Report stats can be one to two months old. Always show `reportStatsAsOf` with returns.

## Hard boundaries

- Never present returns as a recommendation. Say past returns do not guarantee future returns.
- No buying, redeeming or account access.

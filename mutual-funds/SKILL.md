---
name: mutual-funds
description: Pakistan mutual funds — search 560+ funds, latest NAV and date, returns, costs, top funds by category (equity, money market, income, Islamic). Live, no API key.
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Mutual Funds

Live NAVs, returns and costs for Pakistani mutual and pension funds.

## Commands

```bash
# Search funds by name or symbol
node scripts/funds.mjs search --query "meezan"

# Latest NAV, NAV date, last 7 NAVs, returns, costs for one fund
node scripts/funds.mjs nav --fund "Meezan Islamic Fund"

# Top funds in a category by 1-year return
node scripts/funds.mjs top --category equity --count 10
node scripts/funds.mjs top --category money-market
node scripts/funds.mjs top --category islamic

# List all categories
node scripts/funds.mjs categories
```

## Prerequisites

- Node.js 18+

## Limitations

- Source is sarmaaya.pk's public JSON API. MUFAP (mufap.com.pk) blocks automated access with a Cloudflare challenge
- Returns, costs and AUM come from monthly fund manager reports (see `reportStatsAsOf`); NAV is daily
- `top` makes one request per fund in the category, so large categories take a few seconds
- Read-only. No investing or redemption
- Not investment advice

---
name: olx-search
description: Search OLX Pakistan classifieds for listings with prices, locations, categories. No API key.
license: MIT
metadata:
  category: shopping
  locale: en-PK
  phase: v1
---

# OLX Search

Search OLX Pakistan classifieds — electronics, vehicles, property, services, and more.

## Commands

```bash
# Search OLX listings
node scripts/olx.mjs search --query 'iphone 15'

# Search with pagination
node scripts/olx.mjs search --query 'honda civic' --page 2
```

## Prerequisites

- Node.js 18+

## Limitations

- ~20-30 results per page
- No category filtering — keyword search only
- Some listings may have price as null (negotiable or contact-for-price)
- No detailed listing pages — search results only
- Read-only — no messaging or bidding

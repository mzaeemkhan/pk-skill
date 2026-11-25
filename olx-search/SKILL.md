---
name: olx-search
description: "OLX Pakistan classifieds — phones, furniture, electronics, bikes and more. Live search is currently blocked by OLX's bot protection (since Nov 2026); returns the browser search link instead. Use for \"second-hand on OLX\", \"used mobile price\". Not for new products (daraz-search)."
license: MIT
metadata:
  category: shopping
  locale: en-PK
  phase: v1
---

# OLX Search

Search OLX Pakistan classifieds — electronics, vehicles, property, services, and more.

## Commands

Run these from this skill's base directory (cd there first); script paths are relative to it.

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

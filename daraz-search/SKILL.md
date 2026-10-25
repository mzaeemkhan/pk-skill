---
name: daraz-search
description: "Search Daraz.pk products — live prices, ratings, discounts, sellers. Use for \"price on Daraz\", \"buy online in Pakistan\". Not for used/classified items (olx-search) or cars (pakwheels-search)."
license: MIT
metadata:
  category: shopping
  locale: en-PK
  phase: v1
---

# Daraz Search

Search Pakistan's largest e-commerce platform for products with prices, ratings, and seller info.

## Commands

```bash
# Search for products
node scripts/daraz.mjs search --query 'laptop'

# Search with pagination
node scripts/daraz.mjs search --query 'iphone case' --page 2
```

## Prerequisites

- Node.js 18+

## Limitations

- Up to 40 results per page
- No category filtering (search by keyword only)
- No product detail pages — search results only
- Prices shown are listing prices; flash sale prices may differ
- Read-only — no cart or purchase operations

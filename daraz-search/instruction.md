# Daraz Search

## What this skill does

Searches Daraz.pk (Pakistan's largest e-commerce platform, Lazada/Alibaba group) for products. Returns product names, prices, discounts, ratings, seller names, and direct URLs.

## When to use

- "Find laptops on Daraz"
- "Search Daraz for iPhone cases"
- "What's the price of X on Daraz?"
- "Compare prices on Daraz"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search for products

```bash
node scripts/daraz.mjs search --query 'wireless earbuds'
```

Returns up to 40 results per page: name, price, originalPrice, discount, rating, reviews count, seller name, location (province), product URL, image URL.

### 2. Paginate results

```bash
node scripts/daraz.mjs search --query 'wireless earbuds' --page 2
```

## How it works internally

Daraz AJAX catalog endpoint: `daraz.pk/catalog/?ajax=true&isFirstRequest=true&page=N&q=QUERY`. Returns JSON with `mods.listItems` array. Free, no auth.

## Sources and failure modes

- Daraz.pk (Lazada infrastructure): results may include sponsored listings at the top.
- Prices are in PKR. Some products show originalPrice and discount percentage.
- Product URLs link directly to the Daraz product detail page.
- Image URLs are from Lazada/Daraz CDN.

## Hard boundaries

- No category browsing — keyword search only
- No product detail pages (reviews, specs)
- No price history or price tracking
- No flash sale or campaign-specific pricing
- No cart, wishlist, or purchase operations
- Read-only

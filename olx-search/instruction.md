# OLX Search

## What this skill does

Searches OLX Pakistan classifieds. Returns listing titles, prices, cities, and direct URLs. Covers all OLX categories: electronics, vehicles, property, services, jobs, fashion, etc.

## When to use

- "Search OLX for iPhone 15"
- "Find used furniture on OLX"
- "OLX Karachi listings for bikes"
- "What's the going price for X on OLX?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search listings

```bash
node scripts/olx.mjs search --query 'iphone 15'
```

Returns: id, title, price (Rs.), city, listing URL.

### 2. Paginate

```bash
node scripts/olx.mjs search --query 'iphone 15' --page 2
```

## How it works internally

Fetches OLX search HTML (`olx.com.pk/items/q-QUERY?page=N`) and extracts listing data from embedded JSON objects in the server-rendered page. Listings have `externalID`, `slug`, `title`, `price`, `location`, and `formattedExtraFields` (contains the display price when the raw price field is 0).

## Sources and failure modes

- OLX Pakistan: C2C classifieds marketplace. Results include both individual sellers and businesses.
- Prices are seller-set asking prices. Some are negotiable, some listed as "contact for price" (null).
- Featured/promoted ads appear first and may have price=0 in raw data; the script extracts the formatted price from `formattedExtraFields` instead.
- Location is city-level (Karachi, Lahore, Islamabad, etc).

## Hard boundaries

- No category browsing — keyword search only
- No listing detail pages (full description, seller info, photos)
- No price negotiation or messaging
- No saved searches or alerts
- Read-only

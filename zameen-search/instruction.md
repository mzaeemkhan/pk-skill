# Zameen Search

## What this skill does

Searches Zameen.com property listings across 14 Pakistan cities. Supports buying, renting, and plot searches with filters for price range, bedrooms, and area. Parses structured LD+JSON data embedded in Zameen.com pages.

## When to use

- "Find houses for sale in Lahore under 5 crore"
- "Rent a 3-bedroom apartment in Karachi"
- "Search plots in Islamabad"
- "Property prices in Multan"
- "Show me DHA Lahore houses"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search properties

```bash
node scripts/zameen.mjs search --city <name> [--purpose buy|rent|plot] [--bedrooms N] [--price-min N] [--price-max N] [--area-min N] [--area-max N] [--page N]
```

Returns up to 25 listings per page with: title, URL, price (PKR), property type, bedrooms, bathrooms, area (Marla/Kanal/Sq Yards), locality, city, seller name, image URL, and description.

Purpose options:
- `buy` (default) — properties for sale
- `rent` — properties for rent
- `plot` — residential plots for sale

Price is in PKR. Common Pakistani amounts:
- 1 Lakh = 100,000
- 1 Crore = 10,000,000

### 2. List supported cities

```bash
node scripts/zameen.mjs cities
```

14 cities: Lahore, Karachi, Islamabad, Multan, Faisalabad, Peshawar, Quetta, Bahawalpur, Hyderabad, Rawalpindi, Gujranwala, Abbottabad, Mardan, Sialkot.

## How it works internally

Fetches the Zameen.com search page (server-side rendered HTML) and extracts the `application/ld+json` block containing structured `RealEstateListing` data per Schema.org. No API key, no auth, no scraping of arbitrary HTML elements.

URL format: `https://www.zameen.com/{Purpose}/{CitySlug}-{LocationID}-{Page}.html?{filters}`

## Sources and failure modes

- Zameen.com HTML pages with embedded LD+JSON. If Zameen changes their schema markup, parsing may break.
- Zameen.com may rate-limit automated requests for high-volume usage.
- City IDs are hardcoded — new cities require adding their Zameen location ID.
- Listings are Zameen.com's asking prices — actual market value and negotiated prices differ.

## Hard boundaries

- No posting or booking — read-only search
- No keyword/text search — filter by city, price, bedrooms, area only
- No Graana.com or other portals — Zameen.com only
- No agent contact details — use the listing URL to view on Zameen.com
- No historical price data or trends

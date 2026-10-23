# PakWheels Search

## What this skill does

Searches PakWheels.com for used cars in Pakistan. Returns car names, prices in PKR, brand, year, fuel type, transmission, condition, and direct listing URLs.

## When to use

- "Find used Civic on PakWheels"
- "Corolla prices in Pakistan"
- "Search PakWheels for SUVs"
- "Used cars under 30 lakh"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search used cars

```bash
node scripts/pakwheels.mjs search --query 'civic 2020'
```

Returns results from schema.org JSON-LD structured data: name, price (PKR), brand, year, fuel type, transmission, condition, image, listing URL.

### 2. Paginate

```bash
node scripts/pakwheels.mjs search --query 'corolla' --page 2
```

## How it works internally

Fetches PakWheels search HTML and parses schema.org JSON-LD blocks. Each listing is a `Product` type with structured automotive data (brand, fuelType, vehicleTransmission, mileageFromOdometer, offers with price).

URL pattern: `pakwheels.com/used-cars/search/-/ct_PAGE/?q=QUERY`

## Sources and failure modes

- PakWheels.com: Pakistan's largest used car marketplace.
- Prices are seller asking prices in PKR. Actual negotiated prices are typically 5-15% lower.
- Listings include both dealer and private seller cars.
- JSON-LD data has ~15-30 listings per page. Some fields (mileage, engine) may be null if the seller didn't provide them.

## Hard boundaries

- No new car listings or new car prices
- No bike listings (PakWheels bikes section)
- No auction or bidding data
- No price comparison or market value estimates
- No contact seller functionality
- Read-only

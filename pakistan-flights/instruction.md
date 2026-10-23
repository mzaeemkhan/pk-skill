# Pakistan Flights

## What this skill does

Searches flight schedules and fares across Pakistani and international routes via bookme.pk's flight API. Returns airline, flight number, departure/arrival times, duration, fares with breakdown, baggage allowance, refund/exchange policies, and aircraft info.

Covers all major Pakistani airlines: PIA, Airblue, AirSial, Fly Jinnah, Serene Air. Also covers international carriers on routes to/from Pakistan via multiple content providers (airsial, oneapi, amadeus-v2, southair, airblue-v3).

All paths are read-only. No login, booking, seat selection, payment, or cancellation.

## When to use

- "Flights from Lahore to Karachi tomorrow"
- "Cheapest flight from Islamabad to Dubai on Friday"
- "PIA flights from Karachi to London"
- "What airlines fly Peshawar to Islamabad?"
- "Flight schedule from Lahore to Jeddah next week"

## Prerequisites

- Node.js 18+

## Workflow

The script calls bookme.pk's sky API endpoints. All output is JSON.

### 1. Search flights between two cities

```bash
node pk-skill/pakistan-flights/scripts/flights.mjs search --from "Lahore" --to "Islamabad" --date 2026-10-22
```

City names and IATA codes both work. Date format: YYYY-MM-DD. Defaults to today if omitted. Optional flags: `--currency PKR` (also supports USD, AED, SAR, GBP, EUR), `--class economy` (also business, first).

The search queries ALL content providers for the route in parallel and aggregates results sorted by departure time.

### 2. Search airports

```bash
node pk-skill/pakistan-flights/scripts/flights.mjs airports --query "karachi"
```

Returns matching airports with IATA code, name, city, and country.

### 3. List popular airports

```bash
node pk-skill/pakistan-flights/scripts/flights.mjs popular
```

Returns frequently searched airports.

## Output

- Search: JSON with `query`, `count`, `providers_checked`, `flights[]`
- Each flight: `airline`, `airline_iata`, `flight_number`, `from`, `to`, `departure`, `arrival`, `duration_min`, `stops`, `aircraft`, `travel_class`, `fare` (base/taxes/fees/service_charges/total/currency), `fare_class`, `baggage` (pieces/weight_kg), `refund_policy`, `exchange_policy`, `provider`
- `source` URL for manual verification

## Major airports reference

| City | IATA | City | IATA |
|------|------|------|------|
| Islamabad | ISB | Dubai | DXB |
| Karachi | KHI | Jeddah | JED |
| Lahore | LHE | Riyadh | RUH |
| Peshawar | PEW | London | LHR |
| Quetta | UET | Doha | DOH |
| Multan | MUX | Istanbul | IST |
| Faisalabad | LYP | Abu Dhabi | AUH |
| Sialkot | SKT | Sharjah | SHJ |
| Gilgit | GIL | Muscat | MCT |
| Skardu | KDU | Toronto | YYZ |

## How it works internally

Bookme's flight API uses a separate domain (`api.bookmesky.com`) from buses. The search flow:

1. Get anonymous Bearer token via `POST /internal/sky-token` (on bookme.pk domain)
2. Get available content providers for the route via `POST /air/api/content-providers`
3. Search each provider in parallel via `POST /air/api/search`
4. Extract and aggregate flight data, sorted by departure time

Token is cached for 50 minutes and auto-refreshed.

## Sources and failure modes

- bookme.pk: Pakistan's largest transport aggregator. API may return partial results or go down during maintenance.
- Content providers may have different availability windows (some show flights further out than others).
- Fares are indicative — actual booking price may differ.

## Hard boundaries

- No login or credential handling
- No booking, payment, cancellation, or seat selection
- No CAPTCHA bypass or anti-bot circumvention
- No bulk/systematic scraping — single flight lookups only

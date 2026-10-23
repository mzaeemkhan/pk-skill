# Bookme.pk Bus Search

## What this skill does

Searches bus schedules across 120+ Pakistani operators via bookme.pk. Returns departure times, fares, seat availability, duration, terminal info, and operator ratings.

Covers all major operators: Daewoo Express, Faisal Movers, Skyways, Bilal Travels, Road Master, Manthar Transport, and 100+ more.

All paths are read-only. No login, booking, seat reservation, payment, or cancellation.

## When to use

- "Lahore to Islamabad bus schedule"
- "Cheapest bus from Karachi to Hyderabad tomorrow"
- "Daewoo bus times from Multan to Lahore"
- "Available buses from Peshawar to Rawalpindi on Friday"
- "Which bus companies operate Faisalabad to Lahore?"

## Prerequisites

- Node.js 18+

## Workflow

The script calls bookme.pk proxy endpoints. All output is JSON.

### 1. Search buses between two cities

```bash
node pk-skill/bookme-search/scripts/bookme.mjs search --from "Lahore" --to "Islamabad" --date 2026-10-22
```

City names resolve to common IDs automatically. Date format: YYYY-MM-DD. Defaults to today if omitted. Optional `--currency PKR` (also supports SAR, USD, GBP, EUR, AED).

The search queries ALL operators serving that route in parallel and aggregates results sorted by departure time.

### 2. List all operators

```bash
node pk-skill/bookme-search/scripts/bookme.mjs operators
```

Returns 120+ bus companies with their service IDs and route counts.

### 3. List all cities

```bash
node pk-skill/bookme-search/scripts/bookme.mjs cities
```

Returns 146 cities with IDs, codes, and destination counts.

### 4. List routes from a city

```bash
node pk-skill/bookme-search/scripts/bookme.mjs routes --city Lahore
```

Shows all destinations reachable from the given city.

## Output

- Search: JSON with `count`, `operators_checked`, `buses[]`
- Each bus: `service`, `bus_type`, `departure`, `arrival`, `duration`, `fare`, `currency`, `available_seats`, `total_seats`, `from_terminal`, `to_terminal`, `time_slot`, `rating`, `date`
- `_ids` object included for programmatic seat lookup if needed
- `source` URL for manual verification

## Major cities reference

| City | Common ID | Code |
|------|-----------|------|
| Lahore | 1 | LHE |
| Rawalpindi / Islamabad | 2 | RWP |
| Multan | 4 | MUL |
| Bahawalpur | 6 | BWP |
| Peshawar | 9 | PSH |
| Karachi | 18 | KHI |
| Faisalabad | 20 | FSD |
| Abbottabad | 21 | ABT |
| Sialkot | 22 | SKT |
| Hyderabad | 30 | HYD |
| Sukkur | 31 | SKR |
| Quetta | 32 | QTA |

## How it works internally

Bookme uses operator-specific city IDs (each bus company has its own terminal IDs). The search flow:

1. Fetch all operators from `/api/buses` (returns each operator's routes with internal city IDs)
2. Map the user's common city IDs to each operator's internal IDs via `origin_common_id` / `destination_common_id`
3. Call `POST /REST/API/bus_times` for each matching operator-route pair in parallel
4. Aggregate and sort results by departure time

## Sources and failure modes

- bookme.pk: Pakistan's largest transport aggregator. API may rate-limit, return partial results, or go down during maintenance.
- Operator schedules may not reflect last-minute cancellations or delays.
- Some operators update schedules more frequently than others.

## Hard boundaries

- No login or credential handling
- No booking, payment, cancellation, or seat selection
- No CAPTCHA bypass or anti-bot circumvention
- No bulk/systematic scraping — single schedule lookups only

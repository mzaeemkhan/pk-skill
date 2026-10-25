# Airport Flights

## What this skill does

Reads the live flight-information feed that the Pakistan Airports Authority airport websites use for their arrival and departure boards. Returns flight number, airline, origin, destination, scheduled and estimated time (PKT), status and domestic/international.

## When to use

- "Has QR-620 landed in Lahore?"
- "Departures from Karachi tonight"
- "Is PK303 delayed?"
- "Flights arriving in Islamabad tomorrow"

For fares or booking, use `pakistan-flights` instead.

## Workflow

### 1. Arrivals or departures

```bash
node scripts/flights.mjs arrivals --airport LHE
node scripts/flights.mjs departures --airport KHI --date tomorrow
```

- `--airport`: IATA code or city name (LHE/Lahore, KHI/Karachi, ISB/Islamabad, PEW/Peshawar, MUX/Multan, UET/Quetta, LYP/Faisalabad, GWD/Gwadar)
- `--date`: today (default), tomorrow, yesterday, or YYYY-MM-DD in that window
- `--airline`: optional substring filter, e.g. `PIA`, `Emirates`, `airblue`

### 2. One flight

```bash
node scripts/flights.mjs flight --number PK303 --date today
```

Searches all 8 airports' arrival and departure boards. Matching ignores spaces and dashes (PK303 = PK-303 = PK 303). A flight usually appears twice when both ends are PAA airports (departure leg and arrival leg).

### 3. Airports

```bash
node scripts/flights.mjs airports
```

## Reading results

- `scheduled` / `estimated` are HH:MM in PKT. `estimated` may be null before the airline updates it.
- `status` is PAA's remark: Arrived, Departed, Delayed, Cancelled, Boarding, etc. Null means no update yet.
- An empty list means the feed has no flights for that airport/date, not necessarily that none operate. Smaller airports often show few flights.

## Notes

- Sialkot (SKT) is run by a private company, not PAA, so it is not in this feed.
- Tell users to confirm with their airline before travelling; airport boards can lag.

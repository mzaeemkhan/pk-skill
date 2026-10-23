---
name: pakistan-flights
description: Flight search across Pakistani and international routes via bookme.pk. PIA, Airblue, AirSial, Fly Jinnah, Serene Air. Schedules, fares, aircraft info. Read-only — no booking or payment.
license: MIT
metadata:
  category: travel
  locale: en-PK
  phase: v1
---

# Pakistan Flights

Search flights across Pakistani airlines and international routes via bookme.pk (PIA, Airblue, AirSial, Fly Jinnah, Serene Air).

## Commands

```bash
# Search flights between cities
node scripts/flights.mjs search --from Lahore --to Islamabad --date 2026-10-22

# Search by IATA code
node scripts/flights.mjs search --from LHE --to KHI --date 2026-10-22 --class economy

# Search airports
node scripts/flights.mjs airports --query karachi

# List popular airports
node scripts/flights.mjs popular
```

## Prerequisites

- Node.js 18+

## Limitations

- Read-only schedule and fare data from bookme.pk
- No booking, payment, seat selection, or cancellation
- Covers flights only (not trains or buses)
- Fares may change between search and actual booking

---
name: airport-flights
description: Live arrivals/departures and flight status at 8 Pakistani airports from the Pakistan Airports Authority feed. No API key.
license: MIT
metadata:
  category: transport
  locale: en-PK
  phase: v1
---

# Airport Flights

Live flight boards for Pakistan Airports Authority airports.

## Commands

```bash
# Today's arrivals at Lahore
node scripts/flights.mjs arrivals --airport LHE

# Tomorrow's departures from Karachi, PIA only
node scripts/flights.mjs departures --airport KHI --date tomorrow --airline PIA

# Status of one flight (searches all airports)
node scripts/flights.mjs flight --number PK303

# Supported airports
node scripts/flights.mjs airports
```

## Prerequisites

- Node.js 18+

## Limitations

- Airports: LHE, KHI, ISB, PEW, MUX, UET, LYP, GWD. Sialkot (SKT) is privately run and not covered
- Dates: yesterday, today, tomorrow (or YYYY-MM-DD)
- No terminal or gate data in the feed
- Times are PKT; status text comes from PAA and can lag the airline's own updates
- Read-only. For booking use `pakistan-flights`

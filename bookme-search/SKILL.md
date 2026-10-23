---
name: bookme-search
description: Bookme.pk aggregated bus search across 120+ operators. Schedules, fares, seat availability, and routes. Read-only — no booking or payment.
license: MIT
metadata:
  category: travel
  locale: en-PK
  phase: v1
---

# Bookme Bus Search

Search bus schedules across 120+ Pakistani operators via bookme.pk (Daewoo, Faisal Movers, Skyways, etc.).

## Commands

```bash
# Search buses between cities
node scripts/bookme.mjs search --from Lahore --to Islamabad --date 2026-10-22

# List all bus operators
node scripts/bookme.mjs operators

# List all cities
node scripts/bookme.mjs cities

# List routes from a city
node scripts/bookme.mjs routes --city Lahore
```

## Prerequisites

- Node.js 18+

## Limitations

- Read-only schedule and fare data from bookme.pk
- No booking, payment, seat selection, or cancellation
- Covers intercity buses only (not trains or flights)
- Operator-specific terminal names may differ from common city names

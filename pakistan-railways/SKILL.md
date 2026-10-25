---
name: pakistan-railways
description: "Pakistan Railways train schedules, fares, routes and stations (live, read-only). Use for \"train timings\", \"Lahore to Karachi train\", \"Green Line fare\". No live train location (no public source)."
license: MIT
metadata:
  category: travel
  locale: en-PK
  phase: v1
---

# Pakistan Railways

Query Pakistan Railways schedules from pakrail.gov.pk.

## Commands

```bash
# Search trains between stations
node scripts/pak_railways.mjs search --from Lahore --to Karachi

# Get train schedule by train ID
node scripts/pak_railways.mjs schedule --id 60

# Get fares for a train
node scripts/pak_railways.mjs fares --id 60

# List trains from a station
node scripts/pak_railways.mjs station --code LHR

# List trains by type
node scripts/pak_railways.mjs type --type Express

# List major stations
node scripts/pak_railways.mjs stations
```

## Prerequisites

- Node.js 18+

## Limitations

- Read-only schedule data from pakrail.gov.pk
- No booking, payment, or cancellation
- Fare data may be incomplete on the API side

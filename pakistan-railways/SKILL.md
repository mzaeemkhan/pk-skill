---
name: pakistan-railways
description: Pakistan Railways train schedule, fare, and station lookup. Read-only — no booking, payment, or cancellation.
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
node pk-skill/pakistan-railways/scripts/pak_railways.mjs search --from Lahore --to Karachi

# Get train schedule by train ID
node pk-skill/pakistan-railways/scripts/pak_railways.mjs schedule --id 60

# Get fares for a train
node pk-skill/pakistan-railways/scripts/pak_railways.mjs fares --id 60

# List trains from a station
node pk-skill/pakistan-railways/scripts/pak_railways.mjs station --code LHR

# List trains by type
node pk-skill/pakistan-railways/scripts/pak_railways.mjs type --type Express

# List major stations
node pk-skill/pakistan-railways/scripts/pak_railways.mjs stations
```

## Prerequisites

- Node.js 18+

## Limitations

- Read-only schedule data from pakrail.gov.pk
- No booking, payment, or cancellation
- Fare data may be incomplete on the API side

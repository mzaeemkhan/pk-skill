---
name: pakistan-post
description: Pakistan Post and TCS Express parcel tracking — origin, destination, status, and event history.
license: MIT
metadata:
  category: courier
  locale: en-PK
  phase: v1
---

# Pakistan Post & Courier Tracking

Track parcels through Pakistan Post (EMTTS) and TCS Express.

## Commands

```bash
# Track a Pakistan Post parcel (auto-detected by prefix EP/CP/RP/RR/EG)
node pk-skill/pakistan-post/scripts/tracking.mjs track --id EP123456789PK

# Track a TCS Express shipment (auto-detected by prefix W)
node pk-skill/pakistan-post/scripts/tracking.mjs track --id W123456789

# Force a specific service
node pk-skill/pakistan-post/scripts/tracking.mjs track --id 123456789 --service pakpost

# List supported and unsupported courier services
node pk-skill/pakistan-post/scripts/tracking.mjs services
```

## Supported Services

- **Pakistan Post (EMTTS)** — EP, CP, RP, RR, EG prefixes
- **TCS Express** — W prefix

## Unsupported Services

- Leopards Courier — no public API (session-based only)
- CallCourier — JS-rendered, no public API

## Prerequisites

- Node.js 18+

## Limitations

- Read-only tracking data only
- Pakistan Post HTML parsing may break if EMTTS redesigns their page
- TCS API bridge may change without notice
- No support for Leopards or CallCourier

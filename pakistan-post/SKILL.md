---
name: pakistan-post
description: "Track parcels via Pakistan Post (EMTTS) and TCS — status and event history. Use for \"track my parcel\", \"TCS tracking\", \"EMS tracking number\". Not for postal codes — use postal-codes."
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
node scripts/tracking.mjs track --id EP123456789PK

# Track a TCS Express shipment (auto-detected by prefix W)
node scripts/tracking.mjs track --id W123456789

# Force a specific service
node scripts/tracking.mjs track --id 123456789 --service pakpost

# List supported and unsupported courier services
node scripts/tracking.mjs services
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

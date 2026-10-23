# Pakistan Post & Courier Tracking

## What this skill does

Tracks parcels through Pakistan Post (EMTTS) and TCS Express. Returns origin, destination, current status, and full event history as JSON.

## When to use

- "Track my Pakistan Post parcel EP123456789PK"
- "Where is my TCS shipment?"
- "Track courier W123456789"
- "Which courier services are supported?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Track a parcel

```bash
node scripts/tracking.mjs track --id <tracking_number> [--service pakpost|tcs]
```

Service is auto-detected from the tracking number prefix:
- **Pakistan Post**: EP, CP, RP, RR, EG prefixes
- **TCS Express**: W prefix

If the prefix is ambiguous, use `--service` to force.

Returns JSON with: trackingNo, origin, destination, events (date/time/location/status). TCS also returns weight, pieces, deliveredTo, deliveryDate.

### 2. List services

```bash
node scripts/tracking.mjs services
```

Lists supported and unsupported courier services with reasons.

## How it works internally

### Pakistan Post

Fetches the EMTTS iframe endpoint at `ep.gov.pk/emtts/EPTrack_Live.aspx?ArticleIDz=<id>`. This is a direct GET with no CAPTCHA (the main form at ep.gov.pk has reCAPTCHA, but the iframe data endpoint does not). Parses HTML spans for tracking number, origin, destination, and a tracking events table with dates, times, locations, and statuses.

### TCS Express

POSTs to `tcsexpress.com/apibridge` which proxies to the real TCS tracking API at `connect.tcscourier.com`. Returns clean JSON with shipment info, delivery info, and checkpoint history.

## Sources and failure modes

- Pakistan Post EMTTS: Government system, sometimes slow. HTML structure may change without warning. Returns empty data for invalid tracking numbers.
- TCS apibridge: React SPA proxy endpoint. May change endpoint format. Returns `isSuccess: false` for invalid numbers.

## Hard boundaries

- No login or credentials
- No paid API keys
- Read-only — no booking, no pickup scheduling
- Leopards Courier and CallCourier are not supported (no public API)

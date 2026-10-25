---
name: ndma-alerts
description: NDMA Pakistan disaster advisories, flood/weather alerts and situation reports (sitreps) from ndma.gov.pk. Live, no API key.
license: MIT
metadata:
  category: safety
  locale: en-PK
  phase: v1
---

# NDMA Alerts

Live disaster advisories, alerts and situation reports from Pakistan's National Disaster Management Authority.

## Commands

```bash
# Newest items across advisories, sitreps and active alerts
node scripts/ndma.mjs latest --count 10

# Search titles
node scripts/ndma.mjs search --query flood

# One type: advisory, sitrep or alert
node scripts/ndma.mjs type --name advisory --count 5
node scripts/ndma.mjs type --name sitrep --pages 2
```

## Prerequisites

- Node.js 18+

## Limitations

- Returns titles, dates and PDF links; PDF contents are not parsed
- `search` matches titles only and scans the first 3 pages per type by default (`--pages` to widen)
- National NDMA only, not provincial PDMAs
- For weather forecasts and PMD alerts use `pakistan-weather`; for quakes use `earthquake-alerts`

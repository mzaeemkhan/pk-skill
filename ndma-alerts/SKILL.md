---
name: ndma-alerts
description: "Live NDMA disaster advisories, flood/weather alerts and sitreps (PDF links). Use for \"flood alert\", \"NDMA advisory\", \"heatwave warning\". Not for forecasts (pakistan-weather) or earthquakes (earthquake-alerts)."
license: MIT
metadata:
  category: safety
  locale: en-PK
  phase: v1
---

# NDMA Alerts

Live disaster advisories, alerts and situation reports from Pakistan's National Disaster Management Authority.

## Commands

Run these from this skill's base directory (cd there first); script paths are relative to it.

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
- National NDMA only, not provincial PDMAs; no province filter, so for "flood alert in Sindh" search titles and say so if nothing matches
- Flood and weather warnings are usually filed as `advisory`, not `alert`
- For weather forecasts and PMD alerts use `pakistan-weather`; for quakes use `earthquake-alerts`

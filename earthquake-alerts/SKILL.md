---
name: earthquake-alerts
description: "Live earthquakes in and around Pakistan from USGS — recent, significant, near a city, magnitude/depth/PKT time. Use for \"zalzala\", \"earthquake today\". Not for weather (pakistan-weather) or floods (ndma-alerts)."
license: MIT
metadata:
  category: safety
  locale: en-PK
  phase: v1
---

# Earthquake Alerts

Live earthquake data for Pakistan and nearby regions from the USGS feed.

## Commands

```bash
# Earthquakes in the last 7 days, magnitude 3+
node scripts/quakes.mjs recent --days 7 --min-mag 3

# Significant quakes (magnitude 5+) in the last 30 days
node scripts/quakes.mjs significant --days 30

# Quakes within 300 km of a city
node scripts/quakes.mjs near --city Quetta --radius-km 300 --days 30

# Details for one event
node scripts/quakes.mjs event --id us6000u4h9

# List built-in cities
node scripts/quakes.mjs cities
```

## Prerequisites

- Node.js 18+

## Limitations

- The search box is a rectangle around Pakistan, so it also catches quakes in eastern Afghanistan, eastern Iran and northern India
- USGS coverage is global; small quakes (below about M2.5) may be missing
- Not an early-warning system. For official alerts see PMD (pmd.gov.pk) and NDMA

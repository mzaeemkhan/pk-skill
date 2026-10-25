---
name: prayer-times
description: "Daily namaz timings for 42+ Pakistani cities — today, monthly table, next prayer, sehri/iftar (Fajr/Maghrib). Use for \"namaz timings\", \"Maghrib time\". Not for Hijri dates — use hijri-calendar."
license: MIT
metadata:
  category: religious
  locale: en-PK
  phase: v1
---

# Prayer Times

Daily prayer times, monthly calendar, and next-prayer lookup for Pakistani cities.

## Commands

```bash
# Today's prayer times
node scripts/prayers.mjs today --city Lahore

# Monthly calendar with Hijri dates
node scripts/prayers.mjs monthly --city Karachi --month 10 --year 2026

# Next upcoming prayer
node scripts/prayers.mjs next --city Islamabad

# List calculation methods
node scripts/prayers.mjs methods

# List built-in Pakistan cities
node scripts/prayers.mjs cities
```

## Calculation Method

Default: University of Islamic Sciences, Karachi (method 1) — standard for Pakistan. Override with `--method <id>`. Run `methods` to see all 23 options.

## Prerequisites

- Node.js 18+

## Limitations

- Times are calculated, not from mosque announcements
- Hijri dates from Aladhan's algorithm — may differ from local moon sighting
- No adhan audio or notification scheduling

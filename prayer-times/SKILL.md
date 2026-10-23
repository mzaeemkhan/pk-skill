---
name: prayer-times
description: Prayer times for Pakistani cities via Aladhan API — today, monthly, next prayer. Karachi method default. No API key.
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
node pk-skill/prayer-times/scripts/prayers.mjs today --city Lahore

# Monthly calendar with Hijri dates
node pk-skill/prayer-times/scripts/prayers.mjs monthly --city Karachi --month 10 --year 2026

# Next upcoming prayer
node pk-skill/prayer-times/scripts/prayers.mjs next --city Islamabad

# List calculation methods
node pk-skill/prayer-times/scripts/prayers.mjs methods

# List built-in Pakistan cities
node pk-skill/prayer-times/scripts/prayers.mjs cities
```

## Calculation Method

Default: University of Islamic Sciences, Karachi (method 1) — standard for Pakistan. Override with `--method <id>`. Run `methods` to see all 23 options.

## Prerequisites

- Node.js 18+

## Limitations

- Times are calculated, not from mosque announcements
- Hijri dates from Aladhan's algorithm — may differ from local moon sighting
- No adhan audio or notification scheduling

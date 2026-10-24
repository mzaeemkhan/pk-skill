---
name: pakistan-radio
description: Pakistan FM radio stations directory — frequencies, cities, categories. 60+ stations. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Radio

Pakistan FM radio stations directory. Search by city, frequency, or category.

## Commands

```bash
# List all stations
node scripts/radio.mjs list

# Stations in a city
node scripts/radio.mjs city --name Lahore

# Search by name or frequency
node scripts/radio.mjs search --query "FM 101"

# Filter by category
node scripts/radio.mjs category --type music
```

## Prerequisites

- Node.js 18+

## Limitations

- Station data is a curated snapshot — new stations may not be listed
- Frequencies may vary slightly by transmission area
- Does not include AM/SW stations or internet-only streams
- Offline only

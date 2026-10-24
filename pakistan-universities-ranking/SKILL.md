---
name: pakistan-universities-ranking
description: Pakistan university rankings — HEC categories, QS, 60+ institutions. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Universities Ranking

Pakistan university rankings — HEC categories, QS world rankings, city, sector.

## Commands

```bash
# List top universities
node scripts/universities.mjs top --limit 20

# Search by name
node scripts/universities.mjs search --query "LUMS"

# Filter by HEC category
node scripts/universities.mjs category --name W4

# Filter by city
node scripts/universities.mjs city --name Lahore

# Filter by sector (public/private)
node scripts/universities.mjs sector --name public

# Get stats
node scripts/universities.mjs stats
```

## Prerequisites

- Node.js 18+

## Limitations

- Rankings are approximate and may not reflect latest HEC updates
- QS rankings are from 2024-2025 cycle
- Offline only

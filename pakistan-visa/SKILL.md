---
name: pakistan-visa
description: Visa requirements for Pakistani passport holders. 100+ countries. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Visa Requirements

Check visa requirements for Pakistani passport holders traveling abroad.

## Commands

```bash
# Check visa requirement for a country
node scripts/visa.mjs search --country "Turkey"

# List visa-free countries
node scripts/visa.mjs list --type visa-free

# List visa-on-arrival countries
node scripts/visa.mjs list --type visa-on-arrival

# List e-visa countries
node scripts/visa.mjs list --type e-visa

# List visa-required countries
node scripts/visa.mjs list --type visa-required

# Summary statistics
node scripts/visa.mjs stats

# Filter by region
node scripts/visa.mjs region --name "middle-east"
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline data — visa policies change frequently, verify with embassy before travel
- 100+ countries covered, not exhaustive
- General requirements only — specific document lists may vary
- Pakistani passport holders only

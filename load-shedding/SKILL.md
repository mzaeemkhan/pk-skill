---
name: load-shedding
description: Pakistan electricity load shedding info — DISCOs, helplines, SMS codes, schedule guidance.
license: MIT
metadata:
  category: utility
  locale: en-PK
  phase: v1
---

# Load Shedding

Pakistan electricity load shedding information for all power distribution companies.

## Commands

```bash
# List all DISCOs with helplines and SMS codes
node scripts/loadshedding.mjs discos

# Get info for a specific DISCO
node scripts/loadshedding.mjs disco --name LESCO

# How to find your schedule
node scripts/loadshedding.mjs schedule --disco LESCO

# Search DISCOs by city
node scripts/loadshedding.mjs search --city Multan

# General load shedding categories and info
node scripts/loadshedding.mjs info
```

## Prerequisites

- Node.js 18+

## Limitations

- Live schedules not available — DISCO websites use server-side ASP forms or are unreliable
- Provides SMS codes and website links for users to check their specific feeder schedule
- Load shedding varies by feeder, area, and loss category — no single schedule fits all
- K-Electric (Karachi) has a different system than WAPDA DISCOs

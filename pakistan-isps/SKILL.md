---
name: pakistan-isps
description: Pakistan ISPs — packages, coverage, speed comparison. 15+ providers. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan ISPs

Search and compare Pakistan internet service providers, packages, and coverage.

## Commands

```bash
# Search ISP by name
node scripts/isps.mjs search --query "PTCL"

# List all ISPs
node scripts/isps.mjs list

# Filter by connection type
node scripts/isps.mjs list --type fiber

# Show packages for an ISP
node scripts/isps.mjs packages --isp ptcl

# Which ISPs serve a city
node scripts/isps.mjs coverage --city Lahore

# Compare packages at a speed tier
node scripts/isps.mjs compare --speed 50
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline data — prices and packages change frequently
- 15+ ISPs covered (major providers)
- Prices are approximate 2024 rates
- Coverage is city-level, not area-specific

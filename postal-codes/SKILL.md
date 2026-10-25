---
name: postal-codes
description: "Offline Pakistan postal/ZIP codes — search by area or city, reverse lookup by code. Use for \"postal code of DHA Lahore\", \"zip code\". Not for parcel tracking (pakistan-post) or phone codes (pakistan-phone-codes)."
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Postal Codes

Look up Pakistan postal codes by area, city, or code number.

## Commands

```bash
# Search by area name
node scripts/postcodes.mjs search --query "DHA Lahore"

# Reverse lookup by code
node scripts/postcodes.mjs lookup --code 54000

# All postal codes in a city
node scripts/postcodes.mjs city --name Lahore

# List all cities
node scripts/postcodes.mjs cities
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline database of ~150 codes across 30+ cities (not exhaustive)
- GPO codes for smaller cities; detailed area codes for major cities only
- Update frequency: manual (postal codes rarely change)

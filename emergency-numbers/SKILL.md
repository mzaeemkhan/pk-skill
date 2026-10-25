---
name: emergency-numbers
description: "Offline Pakistan emergency and helpline numbers — police 15, Rescue 1122, Edhi 115, fire, utilities, city-specific. Use for \"ambulance number\", \"emergency helpline\"."
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Emergency Numbers

Pakistan emergency and helpline numbers — national and city-specific.

## Commands

```bash
# List all emergency numbers
node scripts/emergency.mjs list

# Search by service
node scripts/emergency.mjs search --query "ambulance"

# City-specific numbers
node scripts/emergency.mjs city --name Karachi

# Filter by category
node scripts/emergency.mjs category --type medical
```

## Prerequisites

- Node.js 18+

## Limitations

- Numbers are reference data — some may change without notice
- City-specific numbers limited to major cities
- Does not include private hospital emergency numbers
- No live status of service availability

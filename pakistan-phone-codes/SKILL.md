---
name: pakistan-phone-codes
description: Pakistan STD area codes and mobile operator prefixes. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Phone Codes

Look up Pakistan STD area codes and mobile operator prefixes.

## Commands

```bash
# Search area code by city name
node scripts/phonecodes.mjs search --query "Lahore"

# Reverse lookup: which city has this code
node scripts/phonecodes.mjs lookup --code 042

# List all mobile operator prefixes
node scripts/phonecodes.mjs mobile

# Specific operator prefixes
node scripts/phonecodes.mjs mobile --operator jazz

# List all city STD codes
node scripts/phonecodes.mjs list

# Filter by province
node scripts/phonecodes.mjs list --province punjab
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline database — codes rarely change but some newer exchanges may be missing
- 100+ cities covered, remote areas may have shared codes
- Mobile prefixes cover all 5 operators (Jazz, Telenor, Zong, Ufone, SCOM)

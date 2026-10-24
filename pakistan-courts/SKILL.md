---
name: pakistan-courts
description: Pakistan judiciary — court hierarchy, high courts, contact info. Offline.
license: MIT
metadata:
  category: government
  locale: en-PK
  phase: v1
---

# Pakistan Courts

Pakistan judiciary reference — court hierarchy, Supreme Court, high courts, special courts, bar councils.

## Commands

```bash
# Court hierarchy
node scripts/courts.mjs hierarchy

# Search courts by name or jurisdiction
node scripts/courts.mjs search --query "Lahore"

# High court details
node scripts/courts.mjs court --name "Lahore High Court"

# List special courts and tribunals
node scripts/courts.mjs special

# Bar councils
node scripts/courts.mjs bars
```

## Prerequisites

- Node.js 18+

## Limitations

- Reference data only — cannot search case records
- Case search requires login at individual court websites
- Offline only

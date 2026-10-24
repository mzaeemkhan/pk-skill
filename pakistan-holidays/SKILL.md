---
name: pakistan-holidays
description: Pakistan public holidays 2024-2027 — gazetted and Islamic. Next holiday, search, monthly view. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Holidays

Pakistan public and Islamic holidays for 2024-2027.

## Commands

```bash
# List all holidays for a year
node scripts/holidays.mjs list --year 2026

# Next upcoming holiday
node scripts/holidays.mjs next

# Holidays in a specific month
node scripts/holidays.mjs month --month 3 --year 2026

# Search by name
node scripts/holidays.mjs search --query "eid"
```

## Prerequisites

- Node.js 18+

## Limitations

- Islamic holiday dates are approximate — actual dates depend on moon sighting
- Covers 2024-2027 only
- Government may announce additional holidays or shift dates
- Does not include provincial holidays (e.g., Sindh Culture Day, Sikh holidays in Punjab)

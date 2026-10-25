---
name: hijri-calendar
description: "Hijri (Islamic) dates — today's date, Gregorian↔Hijri conversion, month calendar, upcoming Ramadan/Eid/Ashura (calculated; Ruet-e-Hilal may differ ±1 day). Not for namaz times (prayer-times) or public holidays (pakistan-holidays)."
license: MIT
metadata:
  category: religious
  locale: en-PK
  phase: v1
---

# Hijri Calendar

Islamic (Hijri) dates and upcoming Islamic events, live from the Aladhan API.

## Commands

```bash
# Today's Hijri date (Pakistan time)
node scripts/hijri.mjs today

# Gregorian -> Hijri
node scripts/hijri.mjs to-hijri --date 2026-10-25

# Hijri -> Gregorian (YYYY-MM-DD in Hijri)
node scripts/hijri.mjs to-gregorian --date 1448-09-01

# Gregorian month with Hijri date for every day (defaults to current month)
node scripts/hijri.mjs month --month 3 --year 2027

# Next Ramadan, Eid ul Fitr, Eid ul Adha, Ashura, Shab-e-Barat, Shab-e-Miraj, 12 Rabi ul Awal...
node scripts/hijri.mjs upcoming
```

## Prerequisites

- Node.js 18+

## Limitations

- Dates are astronomically calculated. Pakistan follows the Ruet-e-Hilal Committee moon sighting, so real dates can differ by ±1 day.
- Prayer times are not included — use the `prayer-times` skill.

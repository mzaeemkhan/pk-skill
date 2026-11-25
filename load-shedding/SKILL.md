---
name: load-shedding
description: "Live load shedding status for a WAPDA feeder (6-digit feeder code from the bill: power now, scheduled cuts, outage minutes today/yesterday) plus helplines, SMS codes and schedule pages for 11 DISCOs + K-Electric. Use for \"bijli kab jayegi\", \"load shedding on my feeder\", \"LESCO complaint\". Not for bills (utility-bills, electricity-calculator)."
license: MIT
metadata:
  category: utility
  locale: en-PK
  phase: v1
---

# Load Shedding

Pakistan electricity load shedding information for all power distribution companies.

## Commands

Run these from this skill's base directory (cd there first); script paths are relative to it.

```bash
# Live status of one feeder (6-digit code from the bill; WAPDA DISCOs)
node scripts/loadshedding.mjs feeder --code 006513

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

- Live data covers one feeder at a time and needs its 6-digit feeder code (printed on the bill). Bill reference numbers are rejected: PITC's lookup by reference exposes the account holder's name, CNIC and phone.
- K-Electric (Karachi) feeders are not in PITC's portal; use the KE Live app or 118.
- Helplines, SMS codes and DISCO details are offline reference data and not individually verified.
- Several DISCO websites' schedule pages are dead; those DISCOs point to PITC's feeder page instead.

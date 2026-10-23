---
name: pcb-cricket
description: Live cricket scores, upcoming matches, results, Pakistan schedule via ESPN. No API key needed.
license: MIT
metadata:
  category: sports
  locale: en-PK
  phase: v1
---

# PCB Cricket

Live cricket scores, upcoming fixtures, recent results, and Pakistan-specific matches from ESPN Cricinfo.

## Commands

```bash
# Live matches in progress
node scripts/cricket.mjs live

# Upcoming scheduled matches
node scripts/cricket.mjs upcoming

# Recent completed matches
node scripts/cricket.mjs recent

# Pakistan-related matches only (team or domestic league)
node scripts/cricket.mjs pakistan

# All current series and matches
node scripts/cricket.mjs all

# Matches in a specific series (get league ID from 'all')
node scripts/cricket.mjs series --id 24756
```

## Prerequisites

- Node.js 18+

## Limitations

- Shows current/recent matches only — no historical archive
- No ball-by-ball commentary or detailed scorecards
- No player stats or rankings
- Pakistan filter catches Pakistan team, PSL, and major domestic tournaments but may miss obscure club matches

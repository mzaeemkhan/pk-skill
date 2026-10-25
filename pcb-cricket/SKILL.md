---
name: pcb-cricket
description: "Pakistan cricket via ESPN Cricinfo (live): scores, fixtures, results, international player career stats (Test/ODI/T20I) and PSL points table/matches. Use for \"Pakistan match score\", \"Babar Azam stats\", \"PSL table\". No domestic/PSL player stats."
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

# Player international career stats (Test/ODI/T20I batting + bowling)
node scripts/cricket.mjs player --name "Babar Azam"

# PSL points table (current season, or latest completed one off-season)
node scripts/cricket.mjs psl-table

# PSL fixtures and results
node scripts/cricket.mjs psl-matches
```

## Prerequisites

- Node.js 18+

## Limitations

- Shows current/recent matches only — no historical archive
- No ball-by-ball commentary or detailed scorecards
- Player stats are international only (no PSL/domestic player stats), no rankings
- Pakistan filter catches Pakistan team, PSL, and major domestic tournaments but may miss obscure club matches

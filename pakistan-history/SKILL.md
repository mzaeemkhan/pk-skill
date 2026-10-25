---
name: pakistan-history
description: "Offline Pakistan history — 65+ events 1906–2023, eras, governors-general, presidents, PMs, on-this-day. Use for \"what happened in 1971\", \"list of prime ministers\"."
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan History

Key historical events from 1906 to present — eras, leaders, on-this-day lookup.

## Commands

```bash
# Search events by keyword
node scripts/history.mjs search --query "independence"

# List all events chronologically
node scripts/history.mjs list

# Filter by era
node scripts/history.mjs list --era "creation"

# Events in a specific year
node scripts/history.mjs year --year 1947

# List eras
node scripts/history.mjs eras

# List heads of state
node scripts/history.mjs leaders

# On this day
node scripts/history.mjs on-this-day --month 3 --day 23
```

## Prerequisites

- Node.js 18+

## Limitations

- Major events only — not exhaustive
- Brief summaries, not detailed accounts
- No live news or current events
- Historical dates are Gregorian calendar

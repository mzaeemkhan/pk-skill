---
name: pakistan-flags-symbols
description: Pakistan national symbols — flag, anthem, emblem, markhor, jasmine, deodar, motto. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Flags & Symbols

Pakistan national symbols — flag specifications, anthem, state emblem, national animal/bird/flower/tree/fruit, motto.

## Commands

```bash
# Flag specifications
node scripts/symbols.mjs flag

# National anthem (Urdu + romanized + English)
node scripts/symbols.mjs anthem

# List all national symbols
node scripts/symbols.mjs symbols

# Get details on a specific symbol
node scripts/symbols.mjs symbol --name "markhor"

# State emblem
node scripts/symbols.mjs emblem

# National motto
node scripts/symbols.mjs motto
```

## Prerequisites

- Node.js 18+

## Limitations

- Reference data only — all offline
- Anthem text is romanized transliteration (not official Urdu script rendering)

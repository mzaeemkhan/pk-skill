---
name: pakistan-army-ranks
description: Pakistan Armed Forces ranks — Army, Navy, Air Force. NATO equivalents. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Army Ranks

Pakistan Armed Forces rank reference — Army, Navy, Air Force with NATO equivalents.

## Commands

```bash
# List all ranks for a branch
node scripts/ranks.mjs branch --name army
node scripts/ranks.mjs branch --name navy
node scripts/ranks.mjs branch --name airforce

# Get specific rank details
node scripts/ranks.mjs rank --name "brigadier"

# Search ranks
node scripts/ranks.mjs search --query "general"

# List all branches
node scripts/ranks.mjs branches

# Compare equivalent ranks across branches
node scripts/ranks.mjs compare --nato OF-5
```

## Prerequisites

- Node.js 18+

## Limitations

- Static reference data
- Insignia described in text, not images
- Offline only

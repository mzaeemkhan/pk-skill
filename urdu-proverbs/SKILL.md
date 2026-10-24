---
name: urdu-proverbs
description: Urdu proverbs and idioms (muhavare/kahawatein) — 120+ entries with meanings and examples. Offline.
tools:
  - bash
---

# Urdu Proverbs

120+ Urdu muhavare (idioms) and kahawatein (proverbs) with romanized text, Urdu script, English meaning, and usage examples.

## Commands

```bash
# Search by keyword
node scripts/proverbs.mjs search --query "patience"

# List all proverbs
node scripts/proverbs.mjs list

# Filter by type
node scripts/proverbs.mjs list --type muhavara

# Get a random proverb
node scripts/proverbs.mjs random

# List topic categories
node scripts/proverbs.mjs categories
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline curated collection
- Transliterations are approximate — Urdu phonetics don't map exactly to Roman

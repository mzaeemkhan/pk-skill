---
name: urdu-dictionary
description: "Offline Urdu–English dictionary, 500+ words in 12 categories — search romanized, Urdu script or English. Use for \"meaning of\", \"Urdu word for\". Not for proverbs (urdu-proverbs) or transliteration (urdu-tools)."
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Urdu Dictionary

Urdu-English dictionary with romanized transliteration. Search across Urdu script, romanized, or English.

## Commands

```bash
# Search for a word
node scripts/dictionary.mjs search --query "hello"

# Browse a category
node scripts/dictionary.mjs category --name greetings

# List all categories
node scripts/dictionary.mjs categories

# Random words for learning
node scripts/dictionary.mjs random --count 10
```

## Prerequisites

- Node.js 18+

## Limitations

- ~500 common words — not a complete dictionary
- 12 categories: greetings, numbers, colors, family, food, time, body, animals, household, verbs, phrases, weather
- Offline only

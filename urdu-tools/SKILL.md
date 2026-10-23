---
name: urdu-tools
description: Urdu text utilities — transliteration, word count, number conversion. Offline, no API.
license: MIT
metadata:
  category: language
  locale: ur-PK
  phase: v1
---

# Urdu Tools

Urdu text processing utilities. Runs entirely offline — no API calls.

## Commands

```bash
# Roman Urdu to Urdu script transliteration
node scripts/urdu.mjs transliterate --text "pakistan zindabad"

# Word count (Urdu + Latin + numbers)
node scripts/urdu.mjs wordcount --text "some Urdu or English text"

# Number to Urdu words (supports lakh/crore system)
node scripts/urdu.mjs number --value 12345

# Number to Urdu numerals
node scripts/urdu.mjs numerals --value 2026
```

## Prerequisites

- Node.js 18+

## Limitations

- Transliteration is character-level mapping, not linguistic — complex words may not be perfectly rendered
- No spell checking
- No Nastaliq font rendering (terminal dependent)

---
name: quran-search
description: Quran verse lookup, search, and surah listing via alquran.cloud. Arabic + English + Urdu. No API key.
license: MIT
metadata:
  category: religious
  locale: en-PK
  phase: v1
---

# Quran Search

Quran verse lookup, keyword search, and surah info via alquran.cloud API.

## Commands

```bash
# Look up a specific ayah (Arabic + English + Urdu)
node scripts/quran.mjs ayah --ref 2:255 [--lang all|arabic|english|urdu]

# Search by keyword
node scripts/quran.mjs search --keyword mercy [--lang english|urdu] [--limit 20]

# Full surah text
node scripts/quran.mjs surah --number 1 [--lang all|arabic|english|urdu]

# List all 114 surahs
node scripts/quran.mjs surahs

# List Urdu translation editions
node scripts/quran.mjs editions
```

## Translations

- **Arabic**: Uthmani script
- **English**: Sahih International
- **Urdu**: Fateh Muhammad Jalandhry

## Prerequisites

- Node.js 18+

## Limitations

- Search works on English and Urdu translation text, not Arabic
- No audio/recitation
- No tafsir (commentary)

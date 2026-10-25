---
name: hadith-search
description: "Search hadith in Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasai, Ibn Majah — by number or keyword, English/Arabic/Urdu (live, keyless). Use for \"hadith about\", \"Bukhari 1\". Not for Quran — use quran-search."
tools:
  - bash
---

# Hadith Search

Search across six major Hadith collections via the free, keyless fawazahmed0/hadith-api (served from jsDelivr CDN).

## Commands

```bash
# Search hadith by keyword
node scripts/hadith.mjs search --query "patience"

# Search one collection only
node scripts/hadith.mjs search --query "intention" --collection bukhari --limit 5

# Get a random hadith
node scripts/hadith.mjs random [--collection muslim]

# List available collections
node scripts/hadith.mjs collections

# Get specific hadith by collection and number
node scripts/hadith.mjs hadith --collection bukhari --number 1

# Urdu translation
node scripts/hadith.mjs hadith --collection bukhari --number 1 --lang ur
```

## Prerequisites

- Node.js 18+

## Limitations

- Search is plain keyword match (all words must appear) over English text; no fuzzy/semantic search
- First search/random per collection downloads ~1MB edition JSON, cached in the OS temp dir
- Hadith numbering follows the hadith-api editions; sunnah.com links are best-effort
- Grades present only where the source edition includes them (mostly Sunan collections)
- Read-only

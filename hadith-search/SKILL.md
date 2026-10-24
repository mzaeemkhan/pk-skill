---
name: hadith-search
description: Search Hadith collections — Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasai, Ibn Majah via sunnah.com API
tools:
  - bash
---

# Hadith Search

Search across six major Hadith collections via sunnah.com API.

## Commands

```bash
# Search hadith by keyword
node scripts/hadith.mjs search --query "patience"

# Get a random hadith
node scripts/hadith.mjs random

# List available collections
node scripts/hadith.mjs collections

# Get specific hadith by collection and number
node scripts/hadith.mjs hadith --collection bukhari --number 1
```

## Prerequisites

- Node.js 18+

## Limitations

- Rate limited by sunnah.com API
- 10 results per page for search
- Some hadith may not have English translation
- Read-only — no bookmarking or saving

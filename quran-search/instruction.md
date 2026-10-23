# Quran Search

## What this skill does

Provides Quran verse lookup, keyword search, full surah text, and surah listing via the alquran.cloud API. Returns Arabic (Uthmani), English (Sahih International), and Urdu (Jalandhry) translations.

All data is read-only. No API key needed.

## When to use

- "Show me Ayatul Kursi" → `ayah --ref 2:255`
- "Quran verses about patience" → `search --keyword patience`
- "Read Surah Fatiha" → `surah --number 1`
- "How many surahs are there?" → `surahs`
- "Quran verse 36:1 in Urdu" → `ayah --ref 36:1 --lang urdu`

## Prerequisites

- Node.js 18+

## Workflow

### 1. Verse lookup

```bash
node scripts/quran.mjs ayah --ref 2:255 --lang all
```

Reference format: `surah:ayah` (e.g., 2:255 = Al-Baqara, ayah 255). Returns Arabic text and selected translations.

### 2. Keyword search

```bash
node scripts/quran.mjs search --keyword mercy --lang english --limit 10
```

Searches translation text. Returns matching ayahs with surah name, reference, and text. Shows total match count.

### 3. Full surah

```bash
node scripts/quran.mjs surah --number 112 --lang all
```

Returns all ayahs of a surah in selected language(s).

### 4. Surah list

```bash
node scripts/quran.mjs surahs
```

Returns all 114 surahs with Arabic name, English name, translation, ayah count, and revelation type (Meccan/Medinan).

### 5. Urdu editions

```bash
node scripts/quran.mjs editions
```

Lists available Urdu translation editions from alquran.cloud.

## Output

All commands return JSON.

## Sources and failure modes

- alquran.cloud: Free, community-maintained. No rate limit for normal use.
- Translations are scholarly works, not original revelation text.

## Hard boundaries

- No audio/recitation playback
- No tafsir (commentary)
- No word-by-word analysis
- Read-only

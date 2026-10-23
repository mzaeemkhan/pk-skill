# Urdu Tools

## What this skill does

Provides Urdu text processing utilities that run entirely offline:

- **Transliterate**: Convert Roman Urdu (Latin script) to Urdu script using character-level mapping
- **Word count**: Count Urdu words, Latin words, numbers, and characters in mixed text
- **Number to words**: Convert integers to Urdu words using the Pakistani numbering system (lakh, crore, arab)
- **Numerals**: Convert Western digits (0-9) to Urdu numerals (۰-۹)

No API calls. No internet required.

## When to use

- "Convert 'salam' to Urdu script"
- "How many words in this Urdu text?"
- "Write 50000 in Urdu words" → "پچاس ہزار"
- "Convert 2026 to Urdu numerals" → "۲۰۲۶"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Transliterate

```bash
node scripts/urdu.mjs transliterate --text "khuda hafiz"
```

Converts Roman Urdu to Urdu script. Uses greedy multi-character matching (e.g., "kh" → "خ" before "k" → "ک"). Handles spaces, punctuation, and digits.

### 2. Word count

```bash
node scripts/urdu.mjs wordcount --text "یہ ایک test ہے 123"
```

Returns: total words, Urdu words, Latin words, numbers, character count.

### 3. Number to words

```bash
node scripts/urdu.mjs number --value 1500000
```

Returns Urdu words using Pakistani numbering: lakh (لاکھ), crore (کروڑ), arab (ارب).

### 4. Numerals

```bash
node scripts/urdu.mjs numerals --value 2026
```

## Output

All commands return JSON.

## Hard boundaries

- Transliteration is character-level, not linguistic — no context-aware vowel placement
- No spell checking or grammar checking
- No OCR or image processing
- No Nastaliq rendering (depends on terminal font support)

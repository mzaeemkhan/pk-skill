# Urdu Dictionary

## What this skill does

Offline Urdu-English dictionary with ~500 common words across 12 categories. Each entry has Urdu script, romanized transliteration, and English translation. Search across all three forms.

No network calls needed.

## When to use

- "How do you say 'hello' in Urdu?"
- "What does 'shukriya' mean?"
- "Show me Urdu numbers"
- "Urdu words for food"
- "Random Urdu vocabulary"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search

```bash
node scripts/dictionary.mjs search --query <word>
```

Searches across Urdu, romanized, and English fields. Case-insensitive.

### 2. Browse category

```bash
node scripts/dictionary.mjs category --name <category>
```

### 3. List categories

```bash
node scripts/dictionary.mjs categories
```

### 4. Random words

```bash
node scripts/dictionary.mjs random --count <N>
```

## Output

All commands return JSON.

## Sources and failure modes

- Curated word list covering everyday Pakistani Urdu
- ~500 entries across 12 categories
- Romanization follows common Pakistani convention

## Hard boundaries

- Read-only
- Not a complete dictionary
- No grammar, conjugation, or pronunciation audio
- Static data — does not auto-update

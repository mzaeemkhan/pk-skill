# Pakistan Flags & Symbols

## What this skill does

Provides Pakistan national symbols reference — flag dimensions/colors, national anthem text, state emblem, and all official national symbols (animal, bird, flower, tree, fruit, sport, poet, mosque, heritage site, mausoleum). All offline.

## When to use

- "What is Pakistan's national animal?"
- "Pakistan flag specifications"
- "Pakistan national anthem lyrics"
- "What does Pakistan's state emblem represent?"
- "Pakistan national flower"
- "Pakistan motto"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Flag specifications

```bash
node scripts/symbols.mjs flag
```

Returns flag colors, dimensions, ratio, crescent/star specs, symbolism.

### 2. National anthem

```bash
node scripts/symbols.mjs anthem
```

Returns full anthem text: Urdu script, romanized, English translation, composer, lyricist.

### 3. List all symbols

```bash
node scripts/symbols.mjs symbols
```

Returns all national symbols with brief descriptions.

### 4. Specific symbol detail

```bash
node scripts/symbols.mjs symbol --name "markhor"
```

Returns detailed info on one symbol — scientific name, significance, facts.

### 5. State emblem

```bash
node scripts/symbols.mjs emblem
```

Returns emblem description and meaning of each element.

### 6. National motto

```bash
node scripts/symbols.mjs motto
```

Returns motto in Urdu, romanized, English with meaning.

## Output

All commands return JSON.

## Hard boundaries

- Reference data only
- No live data or API calls

# Pakistan Universities Ranking

## What this skill does

Offline reference for Pakistan university rankings. HEC category ratings (W4/W3/W2/W1/X/Y), QS World University Rankings, city, sector (public/private), and establishment year.

## When to use

- "Top universities in Pakistan"
- "Which universities are HEC W4?"
- "Universities in Islamabad"
- "Is LUMS public or private?"
- "QS ranked Pakistani universities"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Top ranked

```bash
node scripts/universities.mjs top --limit 10
```

### 2. Search

```bash
node scripts/universities.mjs search --query "engineering"
```

### 3. Filter by HEC category

```bash
node scripts/universities.mjs category --name W4
```

### 4. Filter by city

```bash
node scripts/universities.mjs city --name Karachi
```

### 5. Filter by sector

```bash
node scripts/universities.mjs sector --name private
```

### 6. Stats

```bash
node scripts/universities.mjs stats
```

## Output

All commands return JSON.

## Sources and failure modes

- HEC recognized universities list
- QS World University Rankings 2024-2025
- Static data — may not reflect latest changes

## Hard boundaries

- Read-only
- Reference only

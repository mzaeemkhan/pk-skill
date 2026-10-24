# Pakistan Census

## What this skill does

Offline database of Pakistan 2023 Digital Census population data. National summary, province breakdown, district and city populations. Search, compare, and rank areas.

No network calls needed.

## When to use

- "What is Pakistan's population?"
- "Population of Lahore"
- "Top 10 cities by population"
- "Compare Punjab and Sindh population"
- "Which province is most populated?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. National summary

```bash
node scripts/census.mjs summary
```

### 2. Province detail

```bash
node scripts/census.mjs province --name <province>
```

### 3. Search

```bash
node scripts/census.mjs search --query <city or district>
```

### 4. Top N

```bash
node scripts/census.mjs top --count <N>
```

### 5. Compare

```bash
node scripts/census.mjs compare --a <area> --b <area>
```

## Output

All commands return JSON.

## Sources and failure modes

- 2023 Digital Census preliminary results (PBS)
- Figures rounded to nearest thousand
- Some rural districts not individually listed

## Hard boundaries

- Read-only
- Approximate figures — verify with PBS for official data
- Static data — does not auto-update

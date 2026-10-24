# Pakistan History

## What this skill does

Provides key Pakistan historical events from 1906 (Muslim League founding) to present. Organized by era with on-this-day lookup and heads of state list. All offline.

## When to use

- "When did Pakistan gain independence?"
- "Pakistan history timeline"
- "Who was the first president of Pakistan?"
- "What happened on 23 March in Pakistan?"
- "List Pakistan prime ministers"
- "When were Pakistan's nuclear tests?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search events

```bash
node scripts/history.mjs search --query "nuclear"
```

### 2. List by era

```bash
node scripts/history.mjs list --era "creation"
```

Eras: pre-partition, creation, military-rule-1, east-pakistan-separation, bhutto-era, zia-era, democracy-returns, musharraf-era, modern-democracy

### 3. Year lookup

```bash
node scripts/history.mjs year --year 1971
```

### 4. Eras overview

```bash
node scripts/history.mjs eras
```

### 5. Heads of state

```bash
node scripts/history.mjs leaders
```

Governor-generals, presidents, and prime ministers chronologically.

### 6. On this day

```bash
node scripts/history.mjs on-this-day --month 8 --day 14
```

## Output

All commands return JSON.

## Hard boundaries

- Major events only
- Brief summaries
- No current political commentary

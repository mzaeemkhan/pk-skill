# Pakistan Army Ranks

## What this skill does

Offline reference for Pakistan Armed Forces ranks across all three branches — Army, Pakistan Navy, and Pakistan Air Force. Includes NATO equivalents and insignia descriptions.

## When to use

- "What rank is equivalent to Colonel in the Air Force?"
- "List Pakistan Army officer ranks"
- "What is NATO OF-7?"
- "Search for ranks with 'captain'"

## Prerequisites

- Node.js 18+

## Workflow

### 1. List ranks by branch

```bash
node scripts/ranks.mjs branch --name army
```

### 2. Get rank details

```bash
node scripts/ranks.mjs rank --name "major general"
```

### 3. Search ranks

```bash
node scripts/ranks.mjs search --query "admiral"
```

### 4. Compare across branches

```bash
node scripts/ranks.mjs compare --nato OF-5
```

### 5. List branches

```bash
node scripts/ranks.mjs branches
```

## Output

All commands return JSON.

## Sources and failure modes

- Pakistan Armed Forces official rank structure
- NATO STANAG 2116 equivalents
- Static data — does not reflect future restructuring

## Hard boundaries

- Read-only
- Reference only

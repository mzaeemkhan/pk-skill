# Pakistan Provinces

## What this skill does

Offline reference for Pakistan's administrative divisions. 4 provinces, Islamabad Capital Territory, Gilgit-Baltistan, and Azad Jammu & Kashmir — with districts, 2023 census population, area, and capitals.

## When to use

- "How many districts does Punjab have?"
- "Population of Sindh"
- "List districts in KPK"
- "What is the capital of Balochistan?"
- "Compare province populations"

## Prerequisites

- Node.js 18+

## Workflow

### 1. List provinces

```bash
node scripts/provinces.mjs list
```

### 2. Province details

```bash
node scripts/provinces.mjs province --name "Khyber Pakhtunkhwa"
```

### 3. Search districts

```bash
node scripts/provinces.mjs search --query "Quetta"
```

### 4. District info

```bash
node scripts/provinces.mjs district --name "Faisalabad"
```

### 5. Compare

```bash
node scripts/provinces.mjs compare
```

### 6. Stats

```bash
node scripts/provinces.mjs stats
```

## Output

All commands return JSON.

## Sources and failure modes

- Pakistan 2023 digital census
- PBS (Pakistan Bureau of Statistics)
- Static data

## Hard boundaries

- Read-only
- Reference only

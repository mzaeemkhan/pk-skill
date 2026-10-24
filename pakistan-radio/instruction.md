# Pakistan Radio

## What this skill does

Directory of Pakistan FM radio stations with frequencies, cities, and categories. All offline.

## When to use

- "What FM stations are in Lahore?"
- "Find radio stations playing music in Karachi"
- "What frequency is FM 101?"
- "List all religious radio stations"

## Prerequisites

- Node.js 18+

## Workflow

### 1. List all stations

```bash
node scripts/radio.mjs list
```

All stations with name, frequency, city, category.

### 2. Stations by city

```bash
node scripts/radio.mjs city --name <city>
```

Case-insensitive city match.

### 3. Search

```bash
node scripts/radio.mjs search --query <text>
```

Searches name, network, frequency.

### 4. Filter by category

```bash
node scripts/radio.mjs category --type <news|music|religious|talk|entertainment>
```

## Output

All commands return JSON.

## Hard boundaries

- FM stations only (no AM, SW, or internet radio)
- Curated data — may not include very new or community stations
- Frequencies are reference values for primary transmission area

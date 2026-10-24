# Postal Codes

## What this skill does

Looks up Pakistan postal codes. Search by area name, reverse-lookup by code, list all codes in a city. Offline database of ~150 codes across 30+ cities.

No network calls needed.

## When to use

- "What is the postal code for DHA Lahore?"
- "Which area has code 44000?"
- "All postal codes in Islamabad"
- "List cities with postal codes"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search by area

```bash
node scripts/postcodes.mjs search --query <area>
```

Partial match on area name and city. Case-insensitive.

### 2. Reverse lookup

```bash
node scripts/postcodes.mjs lookup --code <number>
```

Returns area(s) matching that postal code.

### 3. City codes

```bash
node scripts/postcodes.mjs city --name <city>
```

All postal codes in a city.

### 4. List cities

```bash
node scripts/postcodes.mjs cities
```

## Output

All commands return JSON.

## Sources and failure modes

- Offline database compiled from Pakistan Post sources
- ~150 codes covering 30+ cities — major areas well-covered, remote areas may be missing
- Postal codes rarely change

## Hard boundaries

- Read-only
- No address validation or verification
- No delivery tracking or mail services
- Static data — does not auto-update

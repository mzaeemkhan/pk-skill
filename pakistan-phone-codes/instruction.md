# Pakistan Phone Codes

## What this skill does

Looks up Pakistan STD area codes for 100+ cities and mobile operator prefixes for all 5 operators. Search by city name, reverse lookup by code, filter by province. All offline.

## When to use

- "What is the area code for Lahore?"
- "Which city has code 091?"
- "What are Jazz mobile prefixes?"
- "List all Telenor numbers"
- "STD codes in Punjab"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search by city

```bash
node scripts/phonecodes.mjs search --query <city>
```

Partial match on city name. Case-insensitive.

### 2. Reverse lookup

```bash
node scripts/phonecodes.mjs lookup --code <code>
```

Returns city/cities matching that STD code.

### 3. Mobile prefixes

```bash
node scripts/phonecodes.mjs mobile
node scripts/phonecodes.mjs mobile --operator jazz
```

Operators: jazz, telenor, zong, ufone, scom

### 4. List all codes

```bash
node scripts/phonecodes.mjs list
node scripts/phonecodes.mjs list --province punjab
```

Provinces: punjab, sindh, kpk, balochistan, islamabad, ajk, gilgit-baltistan

## Output

All commands return JSON.

## Sources and failure modes

- Offline database from PTA and PTCL published code lists
- STD codes rarely change

## Hard boundaries

- Read-only
- No phone number validation or carrier lookup
- No live data

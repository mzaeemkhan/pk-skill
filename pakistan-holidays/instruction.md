# Pakistan Holidays

## What this skill does

Lists Pakistan public holidays (gazetted and Islamic) for 2024-2027. Search by name, view by month, find the next upcoming holiday. All offline.

## When to use

- "What are the public holidays in Pakistan in 2026?"
- "When is Eid ul-Fitr this year?"
- "Next public holiday in Pakistan"
- "Is March 23 a holiday?"
- "List holidays in Ramadan month"

## Prerequisites

- Node.js 18+

## Workflow

### 1. List holidays for a year

```bash
node scripts/holidays.mjs list --year 2026
```

Default: current year. Returns all gazetted and Islamic holidays.

### 2. Next upcoming holiday

```bash
node scripts/holidays.mjs next
```

Returns the next holiday from today's date.

### 3. Holidays in a month

```bash
node scripts/holidays.mjs month --month 3 --year 2026
```

### 4. Search by name

```bash
node scripts/holidays.mjs search --query "eid"
```

Case-insensitive partial match against name and nameUrdu.

## Output

All commands return JSON. Each holiday has: name, nameUrdu, date, type (gazetted/optional/restricted), islamic (boolean).

## Hard boundaries

- Islamic dates are approximate — moon sighting determines actual date
- 2024-2027 only
- No provincial holidays
- Government may add/shift holidays at short notice

# Emergency Numbers

## What this skill does

Provides Pakistan emergency and helpline numbers — police, fire, ambulance, rescue services, utility helplines, citizen helplines. National coverage with city-specific numbers where available. All offline.

## When to use

- "What is the emergency number in Pakistan?"
- "Edhi ambulance number"
- "Rescue 1122 number"
- "Emergency numbers in Karachi"
- "Cyber crime helpline Pakistan"
- "K-Electric complaint number"

## Prerequisites

- Node.js 18+

## Workflow

### 1. List all numbers

```bash
node scripts/emergency.mjs list
```

Returns all national and city-specific emergency numbers.

### 2. Search by service

```bash
node scripts/emergency.mjs search --query "ambulance"
```

Case-insensitive search across name and description.

### 3. City-specific numbers

```bash
node scripts/emergency.mjs city --name Karachi
```

Returns numbers applicable to that city (national + city-specific).

### 4. Filter by category

```bash
node scripts/emergency.mjs category --type medical
```

Categories: medical, police, fire, rescue, utility, helpline, telecom

## Output

All commands return JSON. Each entry has: name, number, category, description, cities, available24x7.

## Hard boundaries

- Reference data only — numbers may change
- No live service status
- No private hospital numbers
- Major cities only for city-specific data

# Blood Banks

## What this skill does

Finds blood banks and donation centers in Pakistani cities using OpenStreetMap Nominatim search. Also provides a curated list of major blood bank organizations (Fatimid Foundation, Sundas Foundation, Indus Hospital, Red Crescent, etc.) with locations.

## When to use

- "Find blood banks in Karachi"
- "Where can I donate blood in Lahore?"
- "Major blood bank organizations in Pakistan"
- "Blood banks near Islamabad"

## Prerequisites

- Node.js 18+
- Internet connection (for city search)

## Workflow

### 1. Search by city

```bash
node scripts/blood.mjs search --city <city> [--limit 10]
```

Returns blood banks from OpenStreetMap + matching major organizations.

### 2. Major organizations

```bash
node scripts/blood.mjs major
```

Curated list of major blood bank organizations with cities and contacts.

### 3. List cities

```bash
node scripts/blood.mjs cities
```

## Output

All commands return JSON.

## Sources and failure modes

- OpenStreetMap Nominatim API for city-based search
- Curated major organizations list (static reference data)
- OSM coverage varies — major cities well-covered
- Nominatim rate limit: 1 request/second

## Hard boundaries

- Read-only — no donor registration or appointments
- No real-time blood stock or availability data
- No blood type matching
- No emergency dispatch
- Pakistan-only (countrycodes=pk filter)

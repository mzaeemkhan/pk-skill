# Load Shedding

## What this skill does

Provides Pakistan electricity load shedding reference data — all 11 WAPDA DISCOs and K-Electric with helplines, SMS codes, websites, coverage areas, and guidance on finding feeder-specific schedules.

## When to use

- "Load shedding schedule in Lahore"
- "LESCO helpline number"
- "How to check my loadshedding schedule"
- "Which DISCO covers Multan?"
- "K-Electric load shedding"

## Prerequisites

- Node.js 18+

## Workflow

### 1. List all DISCOs

```bash
node scripts/loadshedding.mjs discos
```

Returns all 12 distribution companies with full details.

### 2. Specific DISCO info

```bash
node scripts/loadshedding.mjs disco --name LESCO
```

### 3. Schedule guidance

```bash
node scripts/loadshedding.mjs schedule --disco LESCO
```

Provides instructions on how to find your specific feeder schedule.

### 4. Search by city

```bash
node scripts/loadshedding.mjs search --city Multan
```

### 5. General info

```bash
node scripts/loadshedding.mjs info
```

## Output

All commands return JSON with DISCO details and schedule lookup guidance.

## Sources and failure modes

- Offline reference data for all DISCOs
- Live schedules not scrapeable (ASP.NET forms, feeder-specific)
- Users directed to SMS codes and official websites for real-time schedules

## Hard boundaries

- No live schedule scraping (DISCO sites are server-rendered ASP forms)
- No feeder-level data — user must look up their feeder code
- No planned maintenance/shutdown schedules
- No UPS/generator/solar recommendations

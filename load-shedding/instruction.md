# Load Shedding

## What this skill does

Pakistan electricity load shedding: live status of one feeder (any of the 11 WAPDA DISCOs) from PITC's load-management portal, plus reference data for all 11 DISCOs and K-Electric — helplines, SMS codes, websites, coverage areas, and how to find a feeder schedule.

## When to use

- "Is there load shedding on my feeder 006513?"
- "Load shedding schedule in Lahore"
- "LESCO helpline number"
- "How to check my loadshedding schedule"
- "Which DISCO covers Multan?"
- "K-Electric load shedding"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Live feeder status (WAPDA DISCOs only)

```bash
node scripts/loadshedding.mjs feeder --code 006513
```

Needs the 6-digit feeder code printed on the electricity bill. Returns power status now, loss category, scheduled cuts for today and tomorrow, and unplanned outage minutes by hour for today and yesterday.

If the user only knows their area, ask for the feeder code from their bill. Never pass a 14-digit bill reference number: PITC's lookup by reference exposes the account holder's name, CNIC and phone, so the script rejects it. Don't repeat any personal details if a user pastes them.

### 2. List all DISCOs

```bash
node scripts/loadshedding.mjs discos
```

Returns all 12 distribution companies with full details.

### 3. Specific DISCO info

```bash
node scripts/loadshedding.mjs disco --name LESCO
```

### 4. Schedule guidance

```bash
node scripts/loadshedding.mjs schedule --disco LESCO
```

Provides instructions on how to find your specific feeder schedule.

### 5. Search by city

```bash
node scripts/loadshedding.mjs search --city Multan
```

### 6. General info

```bash
node scripts/loadshedding.mjs info
```

## Output

All commands return JSON. `feeder` returns `feeder`, `grid`, `subDivision`, `statusNow`, `lossCategory`, `lineLoss`, `scheduledCuts.today/tomorrow`, `unplannedOutages.today/yesterday` (`totalMinutes`, `byHour`), `asOf`, `source`.

## Sources and failure modes

- `feeder`: live from ccms.pitc.com.pk (PITC load-management portal). The server drops some connections; the script retries once.
- Everything else is offline reference data. Helpline and SMS numbers are not verified against each DISCO.
- K-Electric feeders are not in PITC's portal: use the KE Live app or 118.

## Hard boundaries

- Feeder lookup by 6-digit feeder code only — never by bill reference number or CNIC
- No personal or account data in output
- No planned maintenance/shutdown schedules
- No UPS/generator/solar recommendations

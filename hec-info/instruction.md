# HEC Universities

## What this skill does

Searches and filters HEC-recognized universities in Pakistan. Static database of 116 major universities with name, province, sector (public/private), and discipline (general, medical, engineering, agriculture, arts).

All data is offline — no network calls needed.

## When to use

- "Which medical universities are in Sindh?"
- "Is LUMS HEC recognized?"
- "Public engineering universities in Punjab"
- "How many universities are in Pakistan?"
- "List universities in Islamabad"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search by name

```bash
node scripts/hec.mjs search --query <name>
```

Returns matching universities. Partial match supported.

### 2. Filter/list

```bash
node scripts/hec.mjs list [--province Punjab|Sindh|KPK|Balochistan|ICT|AJK|GB] [--sector Public|Private] [--discipline Medical|Engineering]
```

All filters optional. Combine for precise results.

### 3. Statistics

```bash
node scripts/hec.mjs stats
```

Returns total count and breakdown by province, sector, discipline.

## Output

All commands return JSON.

## Sources and failure modes

- Offline database from hec.gov.pk (scraped October 2026)
- 116 major universities included. Some smaller/newer institutions may be missing.
- No degree verification or attestation status — HEC's e-portal requires login.

## Hard boundaries

- Read-only — no submissions
- No degree attestation verification
- No admission or fee information
- Static data — does not auto-update from HEC website

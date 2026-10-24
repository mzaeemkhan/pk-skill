# Pakistan Banks

## What this skill does

Pakistan banking reference. Lists 20+ banks with SWIFT codes and details. Validates Pakistan IBAN format (PK + 2 check digits + 4 bank code + 16 account = 24 chars). Finds bank branches via OpenStreetMap Nominatim.

## When to use

- "List Pakistan banks"
- "What is HBL's SWIFT code?"
- "Validate this IBAN: PK36SCBL0000001123456702"
- "Find HBL branches in Lahore"

## Prerequisites

- Node.js 18+
- Internet for branch locator

## Workflow

### 1. List or search banks

```bash
node scripts/banks.mjs list
node scripts/banks.mjs search --query <name>
```

### 2. Validate IBAN

```bash
node scripts/banks.mjs iban --number <IBAN>
```

Checks: starts with PK, 24 chars, valid bank code, MOD-97 check digit.

### 3. Find branches

```bash
node scripts/banks.mjs branches --bank <name> --city <city>
```

Uses Nominatim to search for bank branches in a city.

## Output

All commands return JSON.

## Sources and failure modes

- Bank data compiled from SBP (State Bank of Pakistan) directory
- IBAN format per SBP IBAN standard (PK + 2 + 4 + 16 = 24)
- Branch locator depends on OpenStreetMap coverage
- Network failure → branch search fails, other commands work offline

## Hard boundaries

- Read-only
- Cannot verify account balance or status
- Cannot process transactions
- Branch locator accuracy depends on OSM data

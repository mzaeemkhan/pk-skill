# Pakistan Visa Requirements

## What this skill does

Checks visa requirements for Pakistani passport holders. Search by country, filter by visa type (visa-free, visa-on-arrival, e-visa, visa-required), filter by region. 100+ countries. All offline.

## When to use

- "Do I need a visa for Turkey?"
- "Which countries can Pakistanis visit without visa?"
- "Visa-on-arrival countries for Pakistan passport"
- "E-visa countries for Pakistanis"
- "Visa requirements for Middle East"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search by country

```bash
node scripts/visa.mjs search --country <name>
```

Partial match. Case-insensitive.

### 2. List by visa type

```bash
node scripts/visa.mjs list --type <type>
```

Types: visa-free, visa-on-arrival, e-visa, visa-required

### 3. Statistics

```bash
node scripts/visa.mjs stats
```

Summary count by visa type.

### 4. Filter by region

```bash
node scripts/visa.mjs region --name <region>
```

Regions: middle-east, south-asia, southeast-asia, central-asia, east-asia, europe, north-america, south-america, africa, oceania, caribbean

## Output

All commands return JSON.

## Sources and failure modes

- Offline data compiled from MOFA and Henley Passport Index sources
- Visa policies change — always verify with the destination country's embassy

## Hard boundaries

- Read-only
- Pakistani passport holders only
- Not legal advice — verify with embassy before travel
- No visa application or booking

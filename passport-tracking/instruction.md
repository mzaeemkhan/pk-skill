# Passport Tracking

## What this skill does

Provides Pakistan passport reference data — passport offices with addresses and timings, fee schedule by processing speed and page count, requirements checklist, and application process overview. Tracking redirects to DGIP website.

## When to use

- "Passport office in Islamabad"
- "How much does a passport cost?"
- "Passport fees in Pakistan"
- "Documents needed for passport"
- "How to apply for a passport in Pakistan"
- "Track my passport application"
- "Urgent passport processing time"

## Prerequisites

- Node.js 18+

## Workflow

### 1. List passport offices

```bash
node scripts/passport.mjs offices
node scripts/passport.mjs offices --city Karachi
```

### 2. Fee schedule

```bash
node scripts/passport.mjs fees
```

### 3. Requirements and process

```bash
node scripts/passport.mjs info
```

### 4. Track application

```bash
node scripts/passport.mjs track --token <tracking-number>
```

Note: Tracking is not available via API. The command provides instructions for tracking via dgip.gov.pk or SMS 8500.

## Output

All commands return JSON with structured reference data.

## Sources and failure modes

- Offline data compiled from dgip.gov.pk public information
- No API calls for reference data — works without internet
- Tracking requires visiting dgip.gov.pk (session-based, no public API)

## Hard boundaries

- No live tracking — DGIP uses session auth
- No booking or appointment scheduling
- No payment processing
- Reference data only — verify at dgip.gov.pk

# Pakistan ISPs

## What this skill does

Search and compare Pakistan internet service providers. Lists 15+ ISPs with packages, pricing, connection types, and city coverage. Compare packages at a given speed tier. All offline.

## When to use

- "What ISPs are available in Lahore?"
- "PTCL fiber packages and prices"
- "Compare 50Mbps internet plans"
- "StormFiber vs Nayatel"
- "Best internet in Islamabad"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search ISP

```bash
node scripts/isps.mjs search --query <name>
```

Partial match. Case-insensitive.

### 2. List ISPs

```bash
node scripts/isps.mjs list
node scripts/isps.mjs list --type fiber
```

Types: fiber, dsl, wireless, cable, satellite

### 3. Packages

```bash
node scripts/isps.mjs packages --isp <slug>
```

Slugs: ptcl, stormfiber, nayatel, transworld, fiberlink, cybernet, connect, optix, witribe, jazz-home, zong-4g, telenor-4g, ufone-4g, starlink

### 4. Coverage

```bash
node scripts/isps.mjs coverage --city <city>
```

### 5. Compare

```bash
node scripts/isps.mjs compare --speed <mbps>
```

Finds packages closest to the specified speed across all ISPs.

## Output

All commands return JSON.

## Sources and failure modes

- Offline data from ISP websites — prices change frequently
- 2024 approximate rates

## Hard boundaries

- Read-only
- No speed tests or live availability checks
- No signup or subscription
- Prices are estimates

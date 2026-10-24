# Pakistan Courts

## What this skill does

Offline reference for Pakistan's judiciary system. Court hierarchy from Supreme Court down to district courts, high court details with benches, special courts and tribunals, and bar councils.

No network calls needed.

## When to use

- "What courts are in Pakistan?"
- "Lahore High Court details"
- "What is the Federal Shariat Court?"
- "List special tribunals"
- "Pakistan bar councils"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Hierarchy

```bash
node scripts/courts.mjs hierarchy
```

Full court system hierarchy.

### 2. Search

```bash
node scripts/courts.mjs search --query <term>
```

Search courts by name, city, or jurisdiction.

### 3. Court detail

```bash
node scripts/courts.mjs court --name <court name>
```

### 4. Special courts

```bash
node scripts/courts.mjs special
```

### 5. Bar councils

```bash
node scripts/courts.mjs bars
```

## Output

All commands return JSON.

## Sources and failure modes

- Court information from official judiciary websites
- Cannot search or retrieve case records (requires court-specific login)
- Static reference data

## Hard boundaries

- Read-only
- No case search (requires authenticated sessions)
- No legal advice
- Static data — does not auto-update

# SECP Company

## What this skill does

Provides offline reference data about SECP company registration in Pakistan — company types, registration fees, required documents, regional offices, and key forms.

## When to use

- "How do I register a company in Pakistan?"
- "What are SECP company types?"
- "SECP registration fees"
- "Documents needed for company registration"
- "Where is the SECP office in Lahore?"
- "What forms do I need for private limited company?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Company types and registration overview

```bash
node scripts/secp.mjs info
```

### 2. Registration fees

```bash
node scripts/secp.mjs fees
```

### 3. Regional offices

```bash
node scripts/secp.mjs offices
```

### 4. Required documents

```bash
node scripts/secp.mjs documents
```

### 5. Key forms reference

```bash
node scripts/secp.mjs forms
```

## Output

All commands return JSON with structured reference data.

## Sources and failure modes

- Offline data compiled from secp.gov.pk public information
- No API calls — works without internet
- Data reflects publicly available SECP guidelines
- Fees and requirements may have been updated — always verify at secp.gov.pk

## Hard boundaries

- No live company search — requires login at efiling.secp.gov.pk
- No name availability check
- No filing or payment capability
- Reference data only — not legal advice

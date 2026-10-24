# Pakistan Constitution

## What this skill does

Offline reference for the Constitution of Pakistan 1973. Browse articles by number or part, search by keyword, view fundamental rights (Articles 8-28), principles of policy (Articles 29-40), and all amendments.

No network calls needed.

## When to use

- "What does Article 19 say?"
- "What are fundamental rights in Pakistan?"
- "List constitutional amendments"
- "Search constitution for education"
- "What are principles of policy?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search articles

```bash
node scripts/constitution.mjs search --query <keyword>
```

### 2. Get specific article

```bash
node scripts/constitution.mjs article --number <N>
```

### 3. Browse by part

```bash
node scripts/constitution.mjs part --number <N>
```

### 4. Fundamental rights

```bash
node scripts/constitution.mjs rights
```

### 5. Principles of policy

```bash
node scripts/constitution.mjs principles
```

### 6. Amendments

```bash
node scripts/constitution.mjs amendments
```

### 7. List parts

```bash
node scripts/constitution.mjs parts
```

## Output

All commands return JSON.

## Sources and failure modes

- Constitution of Pakistan 1973 (as amended)
- Summarized text — not a substitute for official legal text
- Static data — does not reflect future amendments

## Hard boundaries

- Read-only
- Reference only — consult official gazette for legal proceedings

---
name: pakistan-constitution
description: "Offline Constitution of Pakistan 1973 — articles by number, fundamental rights, principles of policy, parts, amendments. Use for \"Article 19\", \"18th amendment\". Not for courts — use pakistan-courts."
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# Pakistan Constitution

Constitution of Pakistan 1973 reference. Browse articles, fundamental rights, principles of policy, and amendments.

## Commands

```bash
# Search articles by keyword
node scripts/constitution.mjs search --query "freedom of speech"

# Get specific article
node scripts/constitution.mjs article --number 19

# List articles in a part
node scripts/constitution.mjs part --number 2

# List all fundamental rights (Articles 8-28)
node scripts/constitution.mjs rights

# List principles of policy (Articles 29-40)
node scripts/constitution.mjs principles

# List all constitutional amendments
node scripts/constitution.mjs amendments

# List all parts of the constitution
node scripts/constitution.mjs parts
```

## Prerequisites

- Node.js 18+

## Limitations

- Summarized text for most articles; full text for fundamental rights
- Amendments summarized, not full legal text
- Offline only — static reference data

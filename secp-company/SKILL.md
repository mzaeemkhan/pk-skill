---
name: secp-company
description: "Offline SECP company registration reference — company types, fees, documents, offices, forms. Use for \"register a company in Pakistan\", \"private limited fees\". Live company search is unsupported."
license: MIT
metadata:
  category: government
  locale: en-PK
  phase: v1
---

# SECP Company

SECP (Securities and Exchange Commission of Pakistan) company registration reference.

## Commands

```bash
# Get company types and registration info
node scripts/secp.mjs info

# Get registration fees by company type
node scripts/secp.mjs fees

# List SECP regional offices
node scripts/secp.mjs offices

# Get required documents checklist
node scripts/secp.mjs documents

# Get key SECP forms reference
node scripts/secp.mjs forms
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline reference data only — SECP company search requires login at efiling.secp.gov.pk
- No live company lookup or name availability check
- Fees and requirements may change — verify at secp.gov.pk before filing
- No filing or submission capability

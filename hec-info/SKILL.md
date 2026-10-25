---
name: hec-info
description: "Offline list of HEC-recognized universities — search and filter by province, sector, discipline. Use for \"is X university HEC recognized\". Not for rankings (pakistan-universities-ranking) or results (exam-results)."
license: MIT
metadata:
  category: education
  locale: en-PK
  phase: v1
---

# HEC Universities

Search and filter HEC-recognized universities in Pakistan.

## Commands

```bash
# Search by name
node scripts/hec.mjs search --query LUMS

# List by province
node scripts/hec.mjs list --province Punjab

# Filter by sector and discipline
node scripts/hec.mjs list --sector Public --discipline Medical

# University statistics
node scripts/hec.mjs stats

# List provinces
node scripts/hec.mjs provinces

# List disciplines
node scripts/hec.mjs disciplines
```

## Prerequisites

- Node.js 18+

## Limitations

- Static database of 116 major recognized universities (not all ~260+)
- Data sourced from hec.gov.pk recognized universities page
- Does not include degree attestation status or verification
- Update frequency: manual (list changes ~yearly)

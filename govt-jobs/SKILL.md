---
name: govt-jobs
description: "Live federal government jobs from the National Job Portal — latest openings, keyword search, details with BPS and last date. Use for \"sarkari naukri\", \"govt jobs\". Not for exam results (exam-results) or tenders (ppra-tenders)."
license: MIT
metadata:
  category: government
  locale: en-PK
  phase: v1
---

# Government Jobs

Live federal government job openings from Pakistan's National Job Portal (njp.gov.pk).

## Commands

```bash
# Latest open jobs (default 20, max 100)
node scripts/jobs.mjs latest --count 20

# Keyword search
node scripts/jobs.mjs search --query "engineer"

# Full details for one job
node scripts/jobs.mjs job --id 9821
```

## Prerequisites

- Node.js 18+

## Limitations

- Federal jobs posted on NJP only. Not FPSC exams, provincial commissions (PPSC, SPSC, KPPSC, BPSC) or private jobs.
- NJP listings have no city field, so you can't filter by city.
- Read-only. Applying needs an NJP account on the website.
- Scrapes the public HTML. If NJP changes its page layout, fields may come back `null`.

---
name: exam-results
description: PPSC and FPSC exam results — written and final results from public service commissions.
license: MIT
metadata:
  category: education
  locale: en-PK
  phase: v1
---

# Exam Results

Check PPSC and FPSC public service commission exam results.

## Commands

```bash
# PPSC written results
node scripts/results.mjs ppsc --type written

# PPSC final results
node scripts/results.mjs ppsc --type final

# FPSC results (all categories)
node scripts/results.mjs fpsc

# FPSC filtered by category
node scripts/results.mjs fpsc --category merit_list

# Cross-source keyword search
node scripts/results.mjs search --query "assistant director"

# List supported services
node scripts/results.mjs services
```

## Prerequisites

- Node.js 18+
- Internet connection

## Limitations

- PPSC and FPSC only (no provincial boards like SPSC, KPPSC, BPSC)
- Board exam results (BISE) not supported — require roll number + CAPTCHA
- NTS results not supported — require login
- PPSC results are HTML-parsed, may break if site redesigns

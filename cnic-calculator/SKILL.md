---
name: cnic-calculator
description: Pakistan CNIC parser — extract region, province, gender from CNIC number. Validate format. Offline.
license: MIT
metadata:
  category: reference
  locale: en-PK
  phase: v1
---

# CNIC Calculator

Parse and validate Pakistan CNIC (Computerized National Identity Card) numbers. Extract region, province, and gender.

## Commands

```bash
# Parse CNIC — extract all info
node scripts/cnic.mjs parse --cnic 42201-1234567-1

# Validate format only
node scripts/cnic.mjs validate --cnic 42201-1234567-1

# List all region codes
node scripts/cnic.mjs regions

# Search region by name
node scripts/cnic.mjs search --region "Karachi"
```

## Prerequisites

- Node.js 18+

## Limitations

- CNIC does NOT encode date of birth — only region, sequence, and gender
- Region codes cover ~60 major areas; smaller tehsils may not be mapped
- Offline only — no NADRA verification
- Not a substitute for official CNIC verification

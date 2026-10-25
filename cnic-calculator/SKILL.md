---
name: cnic-calculator
description: "Offline CNIC number decoder — province, division, district, gender, format validation, CNIC eligibility age. Use for \"which city is this CNIC from\", \"validate CNIC\". No NADRA lookup."
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

# Age and CNIC eligibility from date of birth (CNIC does not encode DOB)
node scripts/cnic.mjs age --dob 2008-05-15
```

## Prerequisites

- Node.js 18+

## Limitations

- CNIC does NOT encode date of birth — only region, sequence, and gender
- Region codes cover ~60 major areas; smaller tehsils may not be mapped
- Offline only — no NADRA verification
- Not a substitute for official CNIC verification

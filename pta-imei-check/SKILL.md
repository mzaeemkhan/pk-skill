---
name: pta-imei-check
description: "Offline IMEI validator — Luhn check, manufacturer from TAC, PTA DIRBS registration guidance and fees. Use for \"is my phone PTA approved\", \"IMEI check\". Live DIRBS status needs dirbs.pta.gov.pk."
license: MIT
metadata:
  category: telecom
  locale: en-PK
  phase: v1
---

# PTA IMEI Check

Validate mobile device IMEI numbers and get PTA DIRBS registration guidance.

## Commands

```bash
# Validate IMEI format and identify manufacturer
node scripts/imei.mjs validate --imei 353456789012345

# Check PTA registration status (requires manual DIRBS check)
node scripts/imei.mjs check --imei 353456789012345

# PTA device registration process and fee info
node scripts/imei.mjs info
```

## Prerequisites

- Node.js 18+

## Limitations

- DIRBS portal (dirbs.pta.gov.pk) uses Google reCAPTCHA — cannot be automated
- `check` command provides guidance to check manually on DIRBS portal
- `validate` is fully offline — Luhn algorithm + TAC manufacturer lookup
- Manufacturer identification covers top 30+ brands by TAC prefix (not exhaustive)
- No SIM registration or mobile number lookup

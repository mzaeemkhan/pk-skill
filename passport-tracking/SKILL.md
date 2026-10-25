---
name: passport-tracking
description: "Offline Pakistan passport reference — DGIP offices, normal/urgent/fast-track fees, requirements, process; links to the official tracker. Use for \"passport fee\", \"passport office Lahore\". Not for visas — use pakistan-visa."
license: MIT
metadata:
  category: government
  locale: en-PK
  phase: v1
---

# Passport Tracking

Pakistan passport office reference — fees, offices, requirements, and process.

## Commands

```bash
# List passport offices by city
node scripts/passport.mjs offices

# Filter offices by city
node scripts/passport.mjs offices --city Lahore

# Get passport fee schedule
node scripts/passport.mjs fees

# Get requirements and process info
node scripts/passport.mjs info

# Track application (redirects to DGIP)
node scripts/passport.mjs track --token ABC123456
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline reference data — tracking requires visiting dgip.gov.pk or SMS 8500
- No live application status tracking (DGIP website requires session/CAPTCHA)
- Fees may change — verify at dgip.gov.pk before applying
- No booking or appointment scheduling

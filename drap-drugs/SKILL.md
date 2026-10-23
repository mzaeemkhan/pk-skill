---
name: drap-drugs
description: DRAP drug registry — UNSUPPORTED (site unreachable). Placeholder.
license: MIT
metadata:
  category: health
  locale: en-PK
  phase: unsupported
---

# DRAP Drug Registry

**STATUS: UNSUPPORTED**

The Drug Regulatory Authority of Pakistan (drap.gov.pk) website is unreachable from automated tools. Both drap.gov.pk and dfrpms.dfrsa.pk fail to connect.

## Why unsupported

- drap.gov.pk: connection refused / timeout
- dfrpms.dfrsa.pk (DRAP's drug registration system): connection refused
- No public API available
- Site appears to block non-browser requests or has intermittent availability

## Future implementation

If DRAP's website becomes accessible, this skill would support:
- Drug name search
- Registration status lookup
- Generic equivalent search
- Manufacturer information

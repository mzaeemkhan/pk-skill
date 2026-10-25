---
name: psx-announcements
description: "Live PSX corporate announcements, dividends, bonus/right shares and book closures. Use for \"OGDC dividend\", \"book closure dates\". Not for share prices (psx-stocks) or fund NAVs (mutual-funds)."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# PSX Announcements

Live corporate announcements and payouts from the Pakistan Stock Exchange Data Portal.

## Commands

```bash
# Latest company announcements
node scripts/psx.mjs latest --count 20

# Announcements + payout history for one company
node scripts/psx.mjs company --symbol OGDC

# Dividends/bonus/rights announced in the last 30 days
node scripts/psx.mjs dividends --days 30

# Upcoming book closures
node scripts/psx.mjs book-closures
```

## Prerequisites

- Node.js 18+

## Limitations

- Company announcements only (not PSX/SECP/CDC notices)
- `dividends` and `book-closures` scan the latest 200 payouts
- Announcement attachments are linked, not parsed
- For share prices use the `psx-stocks` skill
- Read-only

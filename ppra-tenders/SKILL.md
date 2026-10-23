---
name: ppra-tenders
description: Search Pakistan federal government procurement tenders — active tenders, history, details. Filter by keyword, category, sector, city.
license: MIT
metadata:
  category: government
  locale: en-PK
  phase: v1
---

# PPRA Tenders

Search Pakistan federal government procurement tenders via PPRA (Public Procurement Regulatory Authority).

## Commands

```bash
# Search active tenders
node scripts/tenders.mjs search

# Search with filters
node scripts/tenders.mjs search --keyword "IT equipment" --category Goods --sector "Info and Comm Tech"

# Search by city
node scripts/tenders.mjs search --keyword medicine --city Rawalpindi

# Paginate results
node scripts/tenders.mjs search --keyword vehicles --page 2

# Search historical (closed) tenders
node scripts/tenders.mjs history --keyword construction --category Works

# Get tender details
node scripts/tenders.mjs detail --id TS0000012493E

# List available filter categories and sectors
node scripts/tenders.mjs filters
```

## Prerequisites

- Node.js 18+

## Limitations

- Federal government tenders only (PPRA scope) — provincial tenders managed by SPPRAs not included
- HTML scraping — output may break if PPRA redesigns their portal
- No tender document download — only metadata and contact info
- Read-only — no bid submission

# PPRA Tenders

## What this skill does

Searches Pakistan's federal government procurement tenders published on PPRA's EPMS portal (epms.ppra.gov.pk). Active tenders, historical tenders, and individual tender details including organization, contact info, category, sector, dates, and estimated cost.

## When to use

- "Find government tenders for IT equipment"
- "Show active PPRA tenders in healthcare"
- "Search procurement tenders for construction in Islamabad"
- "Get details for tender TS0000012493E"
- "What government tenders are closing this week?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Search active tenders

```bash
node scripts/tenders.mjs search --keyword "IT equipment"
```

Filters: `--keyword`, `--category` (Goods/Works/Consultancy Services/Non-consultancy Services), `--sector` (Health/Medicines, Info and Comm Tech, Vehicles, Civil Works, etc.), `--type` (Tender Notice/Pre-qualification Notice/RFP/EOI), `--nature` (Local/International), `--city`, `--closing` (YYYY-MM-DD), `--page`.

### 2. Search historical tenders

```bash
node scripts/tenders.mjs history --keyword construction --category Works
```

Same filters as active search. Returns closed/awarded tenders.

### 3. Get tender details

```bash
node scripts/tenders.mjs detail --id TS0000012493E
```

Returns organization, office, address, contact person, email, tender type, category, procedure, sector, nature, dates, estimated cost, bid security, bid validity.

### 4. List filter options

```bash
node scripts/tenders.mjs filters
```

Returns all available categories, sectors, tender types, and nature values.

## How it works internally

Fetches HTML from `https://epms.ppra.gov.pk/public/tenders/active-tenders` (or `tenders-history`) with GET query parameters. Parses table rows for listings, and `<strong>Label:</strong> Value` patterns for details. No API key, no auth, no CAPTCHA.

## Sources and failure modes

- PPRA EPMS portal: public access, no rate limiting observed for normal use
- HTML scraping: will break if PPRA redesigns the portal layout
- Federal scope only: PPRA covers federal government procurement. Provincial procurement is managed by respective SPPRAs (e.g., SPPRA Sindh, PPRA Punjab) which are separate portals

## Hard boundaries

- No bid submission or document download
- No provincial SPPRA tenders (separate portals with different structures)
- No evaluation results or contract details (separate pages, not parsed)
- Read-only

# Exam Results

## What this skill does

Fetches exam results from PPSC (Punjab Public Service Commission) and FPSC (Federal Public Service Commission). Supports written results, final results, category filtering, and cross-source keyword search.

## When to use

- "Show PPSC written test results"
- "Any FPSC merit list updates?"
- "Search for assistant director results"
- "Which exam services are supported?"
- "Latest PPSC final results"

## Prerequisites

- Node.js 18+
- Internet connection (live data from government sites)

## Workflow

### 1. PPSC results

```bash
node scripts/results.mjs ppsc --type written
node scripts/results.mjs ppsc --type final
```

Returns date, case number, and post name for each result.

### 2. FPSC results

```bash
node scripts/results.mjs fpsc
node scripts/results.mjs fpsc --category merit_list
```

Categories: GR_SHORT_LISTING, GR_NOMINATIONS, GR_MERIT_LIST.

### 3. Cross-source search

```bash
node scripts/results.mjs search --query <keyword>
```

Searches both PPSC and FPSC in parallel. Matches against post titles and case numbers.

### 4. List supported services

```bash
node scripts/results.mjs services
```

Shows supported and unsupported exam result sources with reasons.

## Output

All commands return JSON.

## Sources and failure modes

- PPSC: HTML table parsing from ppsc.gop.pk. May break on site redesign.
- FPSC: JSON API at fpsc.gov.pk/api/results. Stable structured data.
- Both sites occasionally go down for maintenance.

## Hard boundaries

- Read-only — no submissions or applications
- No individual roll number lookup
- No BISE board results (require CAPTCHA)
- No NTS results (require login)
- No SPSC, KPPSC, or BPSC (different site structures)

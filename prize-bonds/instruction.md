# Prize Bonds

## What this skill does

Checks Pakistan National Savings prize bond draw results via savings.gov.pk. Searches by bond number across all historical draws or a specific draw. Also provides draw schedules and denomination info.

Read-only. No API key. No login.

## When to use

- "Did my prize bond win?" / "Check prize bond 123456"
- "Latest 750 prize bond draw results"
- "When is the next prize bond draw?"
- "What prize bond denominations are active?"
- "Check my bond number 654321 for Rs. 200"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Check a bond number

```bash
node pk-skill/prize-bonds/scripts/bonds.mjs check --number <bond-number> --denomination <value>
```

Searches all draws by default. Use `--draw <draw-id>` for a specific draw. Returns prize category, amount, draw place, draw number, and date if the bond won. Returns `found: false` if no match.

Denomination keys: `100`, `200`, `750`, `1500`, `25000p` (premium), `40000p` (premium). Discontinued: `7500`, `15000`, `25000`, `40000`.

### 2. Latest draw info

```bash
node pk-skill/prize-bonds/scripts/bonds.mjs latest --denomination <value>
```

Returns the latest draw date, draw ID, active status, total draws on record, and 8 most recent draw dates.

### 3. Draw schedule

```bash
node pk-skill/prize-bonds/scripts/bonds.mjs schedule
```

Fetches latest draw dates for all active denominations. Shows the 4 most recent draws per denomination.

### 4. List denominations

```bash
node pk-skill/prize-bonds/scripts/bonds.mjs denominations
```

Lists all denominations (active and discontinued) with their API IDs.

## How it works internally

Two endpoints on savings.gov.pk:

1. **ajaxData.php** — `POST id=<denomination_id>` returns HTML `<option>` tags of all draw dates for that denomination. Draw IDs are numeric and sequential.

2. **results.php** — `POST country=<denomination_id>&state=<draw_id|all>&pb_number_list=<numbers>&btnsearch=Search` returns HTML page with a `divTable` containing results. Fields: Prize Category, Prize Bond Number, Prize Amount, Draw Place, Draw No, Draw Date.

"OOPS! Try again later draws!!" in the response means no match found.

## Denomination ID mapping

| Amount | ID | Active |
|--------|-----|--------|
| 100 | 1 | Yes |
| 200 | 2 | Yes |
| 750 | 3 | Yes |
| 1500 | 4 | Yes |
| 7500 | 5 | No (last: Feb 2021) |
| 15000 | 6 | No (last: Apr 2021) |
| 25000 | 7 | No (last: Nov 2020) |
| 40000 | 8 | No (last: Jun 2019) |
| 40000 Premium | 9 | Yes |
| 25000 Premium | 10 | Yes |

## Sources and failure modes

- savings.gov.pk is the official CDNS (Central Directorate of National Savings) portal
- Site uses jQuery AJAX on an old PHP backend — no CAPTCHA, no authentication
- Their own disclaimer: "Errors and omissions are Expected"
- Site occasionally slow; may time out during high traffic after draw announcements
- Draw dates appear in the dropdown as soon as results are published

## Hard boundaries

- No bond purchase or encashment
- No full draw list download (PDF only on their site)
- No profit rate queries (separate product)
- No savings certificate data

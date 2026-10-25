# Pakistan Inflation

## What this skill does

Fetches the latest official inflation numbers from the Pakistan Bureau of Statistics:

- **CPI** (Consumer Price Index, base 2015-16): national, urban and rural year-on-year (YoY) and month-on-month (MoM) % change, with the previous month and the same month last year for comparison. Also monthly **SPI** and **WPI** (wholesale) changes.
- **Weekly SPI** (Sensitive Price Indicator): index value and % change over the previous week.

Data source: the PBS WordPress REST API (`pbs.gov.pk/wp-json/wp/v2/posts`) and the "Monthly Review on Price Indices" `.docx` attached to each monthly release. Nothing is hardcoded. No API key.

## When to use

- "What is Pakistan's inflation rate?" / "Latest CPI"
- "Urban vs rural inflation this month"
- "Did prices go up this week?" / "Latest SPI"
- "Inflation trend over the last few weeks"

## Workflow

1. `node scripts/inflation.mjs cpi` for monthly inflation, `spi [--weeks N]` for weekly prices, `latest` for both.
2. Read the JSON:
   - `period` — the month the CPI figures describe
   - `cpi.national.yoy` — the headline inflation number people quote
   - `yoyPrevMonth` / `yoyYearAgo` — for "up or down from last month / last year"
   - negative values mean prices fell (deflation)
   - `release.link` / `documents` — cite these as the source
3. Lead with the headline: "CPI inflation was 10.3% YoY in September 2026, down from 11.1% in August." Mention urban/rural only if asked or notably different.

## Fallback

If `figures` is `null` with a `note`, PBS changed its document format. Give the user the release title, date and document links instead of guessing numbers.

## Errors

Network or HTTP failures exit non-zero with a message on stderr.

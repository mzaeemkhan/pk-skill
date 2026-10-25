# Hijri Calendar

## What this skill does

Converts between Gregorian and Hijri dates and lists upcoming Islamic events, using the free Aladhan API (`api.aladhan.com`). No API key. "Today" uses Pakistan time (Asia/Karachi).

## When to use

- "What is the Islamic date today?"
- "When does Ramadan start?" / "How many days until Eid?"
- "Convert 15 Shaban 1448 to a normal date"
- "What Hijri date is 23 March 2027?"
- "Show the Hijri dates for this month"

For prayer times use the `prayer-times` skill. For gazetted public holidays use `pakistan-holidays`.

## Workflow

1. Pick the subcommand:
   - `today` — current Hijri date
   - `to-hijri --date YYYY-MM-DD` — Gregorian to Hijri
   - `to-gregorian --date YYYY-MM-DD` — Hijri (year 14xx) to Gregorian
   - `month [--month M --year Y]` — every day of a Gregorian month with its Hijri date
   - `upcoming` — next occurrence of 10 key events, sorted, with `daysAway`
2. Run `node scripts/hijri.mjs <subcommand> ...`. Output is JSON.
3. Present the date in plain words (e.g. "Ramadan is expected to start on Monday 8 February 2027, about 106 days away").

## Always tell the user

Every response includes a `note`: these are calculated dates. In Pakistan, Ramadan, Eid and Muharram dates are confirmed by the **Ruet-e-Hilal Committee** moon sighting the evening before, and can shift by one day. Say "expected" for future religious dates.

## Errors

Invalid dates exit non-zero with a message on stderr (e.g. `--date must be YYYY-MM-DD`). If Aladhan is down, report that and retry later.

# PSX Announcements

## What this skill does

Fetches live data from the Pakistan Stock Exchange Data Portal (dps.psx.com.pk): company announcements (board meetings, results, notices) with PDF links, and payouts (cash dividends, bonus and right shares) with book closure dates.

## When to use

- "Any PSX announcements today?"
- "What has OGDC announced recently?" / "OGDC dividend history"
- "Which companies announced dividends this week?"
- "Upcoming book closures on PSX"

## Workflow

### 1. Latest announcements

```bash
node scripts/psx.mjs latest --count 20
```

Newest first: date, time, symbol, company, title, link (PDF when available, else the company page).

### 2. One company

```bash
node scripts/psx.mjs company --symbol OGDC --count 10
```

Returns recent announcements plus up to 10 recent payouts. Symbol is case-insensitive. Exits with an error if the symbol has no data.

### 3. Recent dividends

```bash
node scripts/psx.mjs dividends --days 30
```

Payouts announced in the last N days (default 30).

### 4. Upcoming book closures

```bash
node scripts/psx.mjs book-closures
```

Payouts whose book closure has not ended yet, sorted by start date.

## Reading payouts

`payout` keeps PSX's notation, e.g. `35%(iii) (D)`:
- `(D)` cash dividend, `(B)` bonus shares, `(R)` right shares
- `(i)`, `(ii)`, `(iii)` = 1st/2nd/3rd interim; `(F)` = final
- % is of face value (usually PKR 10), so 35% = PKR 3.50 per share

Book closure dates are DD/MM/YYYY. To qualify, shares must be bought before the ex-date, usually one business day before book closure starts. Tell the user to confirm with their broker.

## Notes

- The portal requires a per-page token; the script fetches it automatically.
- Not investment advice. Present data only.

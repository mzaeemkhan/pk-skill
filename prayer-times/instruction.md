# Prayer Times

## What this skill does

Returns Islamic prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) for any Pakistani city. Supports today's times, monthly calendars with Hijri dates, and next-prayer lookup. 42+ built-in cities, geocoding fallback for any location.

Default calculation method: University of Islamic Sciences, Karachi — the standard used across Pakistan. 22 other methods available via `--method`.

All data is read-only. No API key needed.

## When to use

- "What time is Fajr in Lahore?"
- "Prayer times for Islamabad today"
- "When is the next prayer in Karachi?"
- "Ramadan prayer schedule for Peshawar"
- "Monthly prayer calendar for Quetta"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Today's prayer times

```bash
node scripts/prayers.mjs today --city Lahore
```

Returns: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha times. Also returns Gregorian date, Hijri date, and calculation method.

### 2. Monthly calendar

```bash
node scripts/prayers.mjs monthly --city Karachi [--month 10] [--year 2026]
```

Returns all days in the month with prayer times, Hijri dates, and weekday names. Defaults to current month/year.

### 3. Next prayer

```bash
node scripts/prayers.mjs next --city Islamabad
```

Compares current PKT time against today's prayer schedule. Returns the next upcoming prayer and its time. If all prayers have passed, returns tomorrow's Fajr.

### 4. Calculation methods

```bash
node scripts/prayers.mjs methods
```

Lists all 23 available methods with IDs. Default is 1 (Karachi).

### 5. Built-in cities

```bash
node scripts/prayers.mjs cities
```

## Output

All commands return JSON. Times are in 24-hour HH:MM format (PKT).

## How it works internally

Uses the Aladhan API (api.aladhan.com) — free, no authentication, no rate limit for normal use.

- **Timings endpoint** (`/v1/timings`) — today's prayer times by lat/lon and method
- **Calendar endpoint** (`/v1/calendar/{year}/{month}`) — full month of prayer times
- **Geocoding** — Open-Meteo geocoding API for cities not in the built-in map

Built-in city map resolves 42+ Pakistani cities instantly without geocoding.

## Sources and failure modes

- Aladhan API: Free, community-maintained. Calculation-based, not observatory data.
- Hijri dates: Algorithmic — may differ by ±1 day from local moon sighting committees. Pakistan's Ruet-e-Hilal Committee announcements override these for Ramadan/Eid.
- Geocoding: May return non-Pakistani cities for ambiguous names. Script prioritizes Pakistan results.

## Hard boundaries

- No adhan audio playback
- No notification scheduling
- No mosque-specific timing adjustments
- No Ramadan-specific sehri/iftar labels (use Fajr and Maghrib)
- Read-only — no data submission

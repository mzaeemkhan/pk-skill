# pk-skill

پاکستانیوں کے لیے اسکلز کا مجموعہ — ایجنٹ کو پاکستانی بنائیں

A collection of Claude Code skills for Pakistani daily life. Train schedules, bus tickets, flights, utility bills, weather, and more — let your AI agent handle the mundane stuff.

Supports Claude Code, Codex, OpenCode, and other coding agents.

## Installation

```bash
# Install all skills
npx --yes skills add mzaeemkhan/pk-skill --all -g

# Install a specific skill
npx --yes skills add mzaeemkhan/pk-skill --skill pakistan-railways -g
```

Requires Node.js 18+ and npx. Some skills need Python 3.11+ and uv.

## Transport Skills

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-railways | Pakistan Railways train schedules, fares, and station lookup (read-only) | Done |
| bookme-search | Bookme.pk aggregated bus search across 120+ operators — Daewoo, Faisal Movers, Skyways, etc. | Done |
| pakistan-flights | Flight search across Pakistani and international routes via bookme.pk — PIA, Airblue, AirSial, Fly Jinnah, Serene Air | Done |

> **Note:** Daewoo Express redirects all booking to bookme.pk. The `bookme-search` skill covers Daewoo and all other bus operators.

## Utility Skills

| Skill | Description | Status |
|-------|-------------|--------|
| utility-bills | Electricity bill check for all 11 WAPDA DISCOs (LESCO, FESCO, IESCO, MEPCO, PESCO, HESCO, SEPCO, QESCO, GEPCO, TESCO, HAZECO) + K-Electric | Done |

> **Note:** Gas bills not supported — SNGPL blocked by image CAPTCHA, SSGC blocked by Google reCAPTCHA v2.

## Weather & Environment

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-weather | Current weather, 7-day forecast, air quality index (AQI), and PMD severe weather alerts for 45+ Pakistan cities via Open-Meteo + CAP RSS | Done |

## Religious

| Skill | Description | Status |
|-------|-------------|--------|
| prayer-times | Daily prayer times, monthly calendar with Hijri dates, and next-prayer lookup for 42+ Pakistan cities via Aladhan API. Karachi method default. | Done |

## Finance

| Skill | Description | Status |
|-------|-------------|--------|
| currency-rates | Currency exchange rates against PKR — 166 currencies, conversion between any pair via ExchangeRate-API. No API key needed. | Done |
| prize-bonds | Check prize bond draw results, latest draws, schedule, and denominations for all active + discontinued bonds via savings.gov.pk | Done |

## Courier & Tracking

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-post | Track parcels via Pakistan Post (EMTTS) and TCS Express — origin, destination, status, and full event history | Done |

> **Note:** Leopards Courier and CallCourier are not supported — no public API available.

## License

MIT

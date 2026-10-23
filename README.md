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

Requires Node.js 18+ and npx.

## Transport

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-railways | Pakistan Railways train schedules, fares, and station lookup (read-only) | Done |
| bookme-search | Bookme.pk aggregated bus search across 120+ operators — Daewoo, Faisal Movers, Skyways, etc. | Done |
| pakistan-flights | Flight search across Pakistani and international routes via bookme.pk — PIA, Airblue, AirSial, Fly Jinnah, Serene Air | Done |

> **Note:** Daewoo Express redirects all booking to bookme.pk. The `bookme-search` skill covers Daewoo and all other bus operators. Careem not supported — all APIs require authenticated session (Uber-owned, no public API). Motorway traffic cameras/alerts not supported — NHMP website down, NHA behind Cloudflare, no public API.

## Utility

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
| quran-search | Quran verse lookup by surah:ayah, keyword search, Arabic + English + Urdu translations via alquran.cloud API | Done |
| mosque-finder | Find mosques near any Pakistan city using OpenStreetMap Overpass API spatial queries. 28+ built-in cities. | Done |

## Finance

| Skill | Description | Status |
|-------|-------------|--------|
| currency-rates | Currency exchange rates against PKR — 166 currencies, conversion between any pair via ExchangeRate-API. No API key needed. | Done |
| prize-bonds | Check prize bond draw results, latest draws, schedule, and denominations for all active + discontinued bonds via savings.gov.pk | Done |
| psx-stocks | Pakistan Stock Exchange — live quotes for 50+ major companies, market summary, top gainers/losers via Yahoo Finance .KA tickers | Done |
| gold-prices | Gold, silver, platinum, palladium prices in PKR and USD — per tola, per gram, per ounce via Yahoo Finance futures + ExchangeRate-API | Done |

> **Note:** JazzCash/Easypaisa not supported — require authenticated sessions. Hawala rates not available via public API.

## Government

| Skill | Description | Status |
|-------|-------------|--------|
| ppra-tenders | Search PPRA federal government procurement tenders — active tenders, history, details. Filter by keyword, category, sector, city. 29 sectors, 4 categories. | Done |

> **Note:** NADRA (CNIC verification requires biometric/login), FBR (Active Taxpayer List blocked by image CAPTCHA), and ECP (voter verification only via SMS 8300) are not supported — no public API available.

## Real Estate

| Skill | Description | Status |
|-------|-------------|--------|
| zameen-search | Search Zameen.com property listings — buy, rent, or plot search across 14 Pakistan cities. Filter by price, bedrooms, area. Structured data from LD+JSON. | Done |

> **Note:** Land records (PLRA Punjab fard) not supported — requires paid PSID (Payment Slip ID) obtained via bank payment. Graana.com not supported — no public API.

## Shopping & Classifieds

| Skill | Description | Status |
|-------|-------------|--------|
| daraz-search | Search Daraz.pk product listings — prices, ratings, reviews, seller info via AJAX catalog API | Done |
| pakwheels-search | Search PakWheels.com car listings — new and used cars, prices, specs via schema.org JSON-LD | Done |
| olx-search | Search OLX Pakistan classifieds — cars, phones, property, electronics, furniture via embedded JSON | Done |

> **Note:** Foodpanda not supported — requires authenticated session.

## News

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-news | Pakistan news headlines from Dawn, Geo, Express Tribune, The News, Business Recorder via RSS feeds. Search by keyword or source. | Done |

## Sports

| Skill | Description | Status |
|-------|-------------|--------|
| pcb-cricket | Pakistan cricket — live scores, upcoming matches, recent results, series details via ESPN Cricinfo API | Done |

> **Note:** Pakistan Football Federation (PFF) not supported — no public API or data source.

## Education

| Skill | Description | Status |
|-------|-------------|--------|
| hec-info | HEC recognized universities — search, filter by city/sector/level, stats. 116+ institutions. Offline data. | Done |
| exam-results | PPSC and FPSC exam results — search by name, roll number, or keyword via HTML scraping and JSON API | Done |

> **Note:** Board exam results (BISE) not supported — each board has different portals with varying CAPTCHA requirements.

## Healthcare

| Skill | Description | Status |
|-------|-------------|--------|
| hospital-finder | Find hospitals, clinics, and pharmacies near any Pakistan city via OpenStreetMap Nominatim search | Done |

> **Note:** DRAP drug lookup not supported — drap.gov.pk unreachable. PIMS/Shifa appointment booking requires login.

## Urdu Tools

| Skill | Description | Status |
|-------|-------------|--------|
| urdu-tools | Urdu text utilities — Roman-to-Urdu transliteration, word count, number-to-Urdu-words (lakh/crore system), numeral conversion. All offline. | Done |

## Courier & Tracking

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-post | Track parcels via Pakistan Post (EMTTS) and TCS Express — origin, destination, status, and full event history | Done |

> **Note:** Leopards Courier and CallCourier are not supported — no public API available.

## License

MIT

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
| electricity-calculator | NEPRA electricity bill calculator — 8 tariff slabs, 12 DISCOs, FPA/QTA/GST/TV fee breakdown, cross-DISCO comparison. Offline. | Done |
| load-shedding | Load shedding reference — all 11 DISCOs + K-Electric with helplines, SMS codes, complaint numbers, schedule categories. Offline reference. | Done |

> **Note:** Gas bills not supported — SNGPL blocked by image CAPTCHA, SSGC blocked by Google reCAPTCHA v2. Live load shedding schedules not available — DISCOs don't expose schedules via API; use SMS codes listed in the skill.

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
| zakat-calculator | Zakat calculator — gold/silver nisab, asset categories, 2.5% calculation. Hanafi fiqh. All offline. | Done |
| nikah-calculator | Islamic marriage financial calculator — Mehr (gold/silver tola), Mehr-e-Fatimi reference, wedding cost estimator by city tier, nikah documentation checklist. All offline. | Done |

## Finance

| Skill | Description | Status |
|-------|-------------|--------|
| currency-rates | Currency exchange rates against PKR — 166 currencies, conversion between any pair via ExchangeRate-API. No API key needed. | Done |
| prize-bonds | Check prize bond draw results, latest draws, schedule, and denominations for all active + discontinued bonds via savings.gov.pk | Done |
| psx-stocks | Pakistan Stock Exchange — live quotes for 50+ major companies, market summary, top gainers/losers via Yahoo Finance .KA tickers | Done |
| gold-prices | Gold, silver, platinum, palladium prices in PKR and USD — per tola, per gram, per ounce via Yahoo Finance futures + ExchangeRate-API | Done |

| fuel-prices | Pakistan petroleum prices — Petrol, HSD, Kerosene, LDO. OGRA rates with price history. | Done |

> **Note:** JazzCash/Easypaisa not supported — require authenticated sessions. Hawala rates not available via public API.

## Government

| Skill | Description | Status |
|-------|-------------|--------|
| ppra-tenders | Search PPRA federal government procurement tenders — active tenders, history, details. Filter by keyword, category, sector, city. 29 sectors, 4 categories. | Done |

| secp-company | SECP company registration reference — company types, fees, required documents, regional offices, key forms. Offline reference. | Done |
| passport-tracking | Pakistan passport office directory, fee schedule (normal/urgent/fast-track), requirements and process. Track via DGIP redirect. | Done |
| cnic-calculator | CNIC number parser — province, division, district, gender from 13-digit number. 100+ region codes. Offline. | Done |

> **Note:** NADRA (CNIC verification requires biometric/login), FBR (Active Taxpayer List blocked by image CAPTCHA), and ECP (voter verification only via SMS 8300) are not supported — no public API available. SECP company search requires login at efiling.secp.gov.pk. DGIP passport tracking requires session auth.

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
| blood-banks | Find blood banks and donation centers — Nominatim search + curated list of 10 major organizations (Fatimid, Sundas, Indus, AFIP, etc.) with phone numbers. 28+ cities. | Done |

> **Note:** DRAP drug lookup not supported — drap.gov.pk unreachable. PIMS/Shifa appointment booking requires login.

## Urdu Tools

| Skill | Description | Status |
|-------|-------------|--------|
| urdu-tools | Urdu text utilities — Roman-to-Urdu transliteration, word count, number-to-Urdu-words (lakh/crore system), numeral conversion. All offline. | Done |
| urdu-dictionary | Urdu-English dictionary — 200+ words across 12 categories, romanized + Urdu script + English meanings. Offline. | Done |

## Courier & Tracking

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-post | Track parcels via Pakistan Post (EMTTS) and TCS Express — origin, destination, status, and full event history | Done |

> **Note:** Leopards Courier and CallCourier are not supported — no public API available.

## Mobile & Devices

| Skill | Description | Status |
|-------|-------------|--------|
| pta-imei-check | PTA IMEI validator — Luhn check, manufacturer identification from TAC prefix, device registration info and fee reference. Offline validation + DIRBS reference. | Done |

> **Note:** Live PTA DIRBS lookup requires session auth. The skill validates IMEI format and identifies manufacturer offline; for registration status check dirbs.pta.gov.pk.

## Reference & Tools

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-holidays | Pakistan public holidays 2024-2027 — gazetted and Islamic holidays, next upcoming, search by name. Offline. | Done |
| emergency-numbers | Pakistan emergency numbers — police, fire, ambulance, rescue, helplines, utility. 32+ entries with city-specific numbers. Offline. | Done |
| postal-codes | Pakistan postal codes — 122 codes across 49 cities. Search by area, reverse lookup, city listing. Offline. | Done |
| pakistan-maps | Driving routes and distances between 30+ Pakistan cities via OSRM. Nearby places via Nominatim. | Done |

## Banking

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-banks | 22 Pakistani banks — IBAN validator (PK format, 24 chars), SWIFT codes, branch locator via Nominatim. Offline + API. | Done |

## Vehicles & Transport Tax

| Skill | Description | Status |
|-------|-------------|--------|
| vehicle-tax | Token tax calculator — 7 provinces, car + motorcycle slabs, age-based depreciation. Offline. | Done |

## Media & Entertainment

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-radio | FM radio directory — 64+ stations across 12+ cities, 5 categories. Offline. | Done |

## Population & Demographics

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-census | 2023 digital census data — 7 provinces/territories, 40+ cities, population, growth rate, density. Offline. | Done |

## Legal & Judiciary

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-courts | Judiciary hierarchy — 9 constitutional courts, 13 special courts, 8 bar councils, fee schedules. Offline. | Done |

## License

MIT

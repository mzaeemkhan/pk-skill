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
| hadith-search | Hadith search — Bukhari, Muslim, Tirmidhi, Abu Dawud, and more via sunnah.com API. Search, random, browse collections. | Done |
| mosque-finder | Find mosques near any Pakistan city using OpenStreetMap Overpass API spatial queries. 28+ built-in cities. | Done |
| zakat-calculator | Zakat calculator — gold/silver nisab, asset categories, 2.5% calculation. Hanafi fiqh. All offline. | Done |
| nikah-calculator | Islamic marriage financial calculator — Mehr (gold/silver tola), Mehr-e-Fatimi reference, wedding cost estimator by city tier, nikah documentation checklist. All offline. | Done |
| hajj-umrah-guide | Hajj & Umrah guide — step-by-step rituals, packing checklists, costs, airlines, Saudi offices, essential duas. Offline. | Done |
| qurbani-calculator | Qurbani/Udhiyah calculator — animal shares, meat distribution (1/3 rule), weight estimates, cost breakdown. Offline. | Done |

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
| urdu-proverbs | Urdu proverbs & idioms (muhavare/kahawatein) — 120+ entries with meanings, categories, usage examples. Offline. | Done |

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

## Food & Culture

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-recipes | 43 authentic Pakistani recipes — biryani, nihari, haleem, chapli kebab, gulab jamun and more. Ingredients, steps, tips. Offline. | Done |

## Telecom

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-phone-codes | STD/area codes for 100+ cities, mobile network prefixes (Jazz, Zong, Telenor, Ufone, SCO). Offline. | Done |

## Travel & Immigration

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-visa | Visa requirements for Pakistani passport holders — 50+ countries, visa-free, on-arrival, e-visa, and embassy info. Offline. | Done |

## Internet & ISPs

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-isps | Internet service providers — PTCL, StormFiber, Nayatel, Transworld, local ISPs. Packages, coverage, contact info. Offline. | Done |
| pakistan-sim-packages | Mobile operator packages — Jazz, Telenor, Zong, Ufone, SCOM. 55+ packages with USSD activation codes. Compare data/call/SMS bundles. Offline. | Done |

## Constitution & Law

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-constitution | Constitution of Pakistan 1973 — 100+ articles, 26 amendments, fundamental rights, principles of policy. Full text. Offline. | Done |

## Military

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-army-ranks | Military ranks — Army, Navy, Air Force. 55 ranks with NATO equivalents, insignia descriptions. Offline. | Done |

## University Rankings

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-universities-ranking | 65 Pakistani universities — HEC categories (W1-W4/X), QS rankings, programs, city, sector. Offline. | Done |

## Administrative Divisions

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-provinces | 7 provinces/territories, 154 districts, 2023 census data, capitals, governors, chief ministers. Offline. | Done |

## National Symbols

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-flags-symbols | Flag specs, national anthem (Urdu + English), state emblem, 15+ national symbols (markhor, jasmine, deodar, mango…). Offline. | Done |

## Tax & Finance

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-tax-calculator | FBR income tax calculator — salaried/business slabs 2024-25, freelancer 0.25% IT export rate, withholding taxes, filer benefits. Offline. | Done |

## History

| Skill | Description | Status |
|-------|-------------|--------|
| pakistan-history | 68 key events (1906-2023), 9 eras, heads of state, on-this-day lookup. Offline. | Done |

## Live Data

| Skill | Description | Status |
|-------|-------------|--------|
| earthquake-alerts | Recent and significant earthquakes in/around Pakistan, near-city search — USGS FDSN API. | Done |
| mutual-funds | Mutual fund NAVs, returns, top funds by category — Sarmaaya public API (MUFAP is behind Cloudflare). | Done |
| sbp-rates | SBP policy rate, daily KIBOR, T-bill cut-offs — sbp.org.pk. Needs `curl`. | Done |
| open-market-forex | Open-market buy/sell PKR rates vs interbank — hamariweb.com + open.er-api.com. Needs `curl`. | Done |
| hijri-calendar | Gregorian↔Hijri conversion, monthly calendar, upcoming Islamic events — Aladhan API. Dates may shift ±1 day per Ruet-e-Hilal. | Done |
| pakistan-inflation | Latest monthly CPI (national/urban/rural) and weekly SPI — PBS releases. | Done |
| govt-jobs | Federal government job listings, search, details — National Job Portal (njp.gov.pk). No city filter. | Done |

> **Note:** Prices in pakistan-sim-packages, pakistan-isps, and qurbani-calculator are partly estimates (`estimate: true` in output) — confirm with the operator/vendor.

## License

MIT

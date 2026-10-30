# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [Semantic Versioning](https://semver.org/).

## [2.0.1] - 2026-10-30

### Fixed
- mosque-finder: Overpass mirror chain with Nominatim fallback (overpass-api.de at capacity); output adds `source`.
- Smoke CI: Nominatim-backed skills share `"group": "nominatim"` and run serially (1 req/s policy). `--ci` flag skips sources that block non-Pakistani datacenter IPs (`"ci": false` in smoke.json: exam-results, govt-jobs, pakistan-railways, sbp-rates, open-market-forex, prize-bonds).

### Changed
- prize-bonds: savings.gov.pk firewall now blocks automated lookups; check/latest/schedule exit with a clear message and the official results link.

## [2.0.0] - 2026-10-25

### Added
- pcb-cricket: player stats and PSL points table
- Urdu README (`README.ur.md`)

### Changed
- Rewrote skill descriptions across all skills so agents can tell overlapping skills apart (e.g. prayer-times vs hijri-calendar, currency-rates vs open-market-forex vs sbp-rates).

## [1.6.0] - 2026-10-25

### Added
- psx-announcements, airport-flights, ndma-alerts
- Smoke tests: `smoke.json` + `scripts/smoke.mjs` (one read-only check per skill)
- GitHub Actions `smoke.yml`: offline checks on push/PR, full run daily at 08:00 PKT; opens/closes a "Smoke test failures" issue

### Fixed
- mosque-finder: send User-Agent (Overpass returns 406 without one)

### Removed
- drap-drugs placeholder — no reachable DRAP source

## [1.5.0] - 2026-10-25

### Added
- earthquake-alerts, mutual-funds, sbp-rates, open-market-forex, hijri-calendar, pakistan-inflation, govt-jobs
- cnic-calculator: `age --dob` (merged from stray cnic-age-calculator)

### Changed
- pakistan-tax-calculator: default FY2026-27 slabs; FY2025-26 and FY2024-25 selectable; `source`/`asOf` in output
- hadith-search: switched to keyless fawazahmed0/hadith-api; hardcoded API key removed
- pakistan-sim-packages, pakistan-isps, qurbani-calculator: refreshed prices; unverified entries marked `estimate: true`

### Fixed
- qurbani-calculator: 1/3 distribution described as recommended (mustahab), not required, per Hanafi fiqh
- pakistan-tax-calculator: table labelled 2024-25 actually held FY2023-24 rates

## [1.4.0] - 2026-10-24

### Added
- pakistan-constitution, pakistan-army-ranks, pakistan-universities-ranking, pakistan-provinces, pakistan-flags-symbols, pakistan-tax-calculator, pakistan-sim-packages, pakistan-history

## [1.3.0] - 2026-10-24

### Added
- hadith-search, pakistan-recipes, urdu-proverbs, hajj-umrah-guide, qurbani-calculator, pakistan-phone-codes, pakistan-visa, pakistan-isps

## [1.2.0] - 2026-10-24

### Added
- cnic-calculator, vehicle-tax, electricity-calculator, pakistan-radio, pakistan-banks, urdu-dictionary, pakistan-census, pakistan-courts

## [1.1.0] - 2026-10-24

### Added
- zakat-calculator, pakistan-holidays, emergency-numbers, postal-codes, nikah-calculator, blood-banks, fuel-prices, pta-imei-check, load-shedding, secp-company, passport-tracking, pakistan-maps

## [1.0.0] - 2026-10-23

### Added
- Initial 24 skills: pakistan-railways, bookme-search, pakistan-flights, utility-bills, pakistan-weather, prayer-times, currency-rates, prize-bonds, pakistan-post, ppra-tenders, zameen-search, psx-stocks, gold-prices, pcb-cricket, daraz-search, pakwheels-search, olx-search, pakistan-news, quran-search, mosque-finder, urdu-tools, hec-info, exam-results, hospital-finder
- drap-drugs placeholder (not functional)
- `.claude-plugin/plugin.json` manifest for `npx skills add` installation

[2.0.1]: https://github.com/mzaeemkhan/pk-skill/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/mzaeemkhan/pk-skill/compare/v1.6.0...v2.0.0
[1.6.0]: https://github.com/mzaeemkhan/pk-skill/compare/1b13bdb...9dec3a4
[1.5.0]: https://github.com/mzaeemkhan/pk-skill/compare/7e8dc8e...1b13bdb
[1.4.0]: https://github.com/mzaeemkhan/pk-skill/compare/2bc7524...7e8dc8e
[1.3.0]: https://github.com/mzaeemkhan/pk-skill/compare/6a30349...2bc7524
[1.2.0]: https://github.com/mzaeemkhan/pk-skill/compare/8736c0f...6a30349
[1.1.0]: https://github.com/mzaeemkhan/pk-skill/compare/2015cf7...8736c0f
[1.0.0]: https://github.com/mzaeemkhan/pk-skill/commit/2015cf7

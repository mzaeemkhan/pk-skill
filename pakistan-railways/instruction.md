# Pakistan Railways Schedule Lookup

## What this skill does

Queries Pakistan Railways train schedules from pakrail.gov.pk. Covers all train types: Express, Mail, Rail Car, Passenger, and Freight.

All paths are read-only. No login, booking, seat reservation, payment, or cancellation.

## When to use

- "Lahore to Karachi train schedule"
- "Next train from Islamabad to Lahore"
- "Pakistan Railways fare from Rawalpindi to Multan"
- "Train timings for Karakoram Express"
- "List all stations on Lahore-Quetta route"

## Prerequisites

- Node.js 18+

## Workflow

The script calls pakrail.gov.pk ASP.NET AJAX endpoints. All output is JSON.

### 1. Search trains between two stations

```bash
node scripts/pak_railways.mjs search --from "Lahore" --to "Karachi"
```

Station names resolve to codes automatically (e.g. "Lahore" → LHR). You can also pass codes directly: `--from LHR --to KC`.

### 2. Get full schedule for a train

```bash
node scripts/pak_railways.mjs schedule --id 60
```

Train IDs come from the `search` command output. Optional: `--date MM/DD/YYYY`.

### 3. Get fares for a train

```bash
node scripts/pak_railways.mjs fares --id 60
```

Note: fare data may be incomplete on the API side.

### 4. List trains from a station

```bash
node scripts/pak_railways.mjs station --code LHR
```

### 5. List trains by type

```bash
node scripts/pak_railways.mjs type --type Express
```

Types: Express, Mail, Passenger, RailCar, Freight.

### 6. List major stations

```bash
node scripts/pak_railways.mjs stations
```

## Output

- JSON with `count`, `trains[]` or `stops[]`
- Each train: `train_id`, `train_code`, `train_name`, `from_station`, `to_station`, `departure`, `arrival`
- Each stop: `station_code`, `station_name`, `arrival`, `departure`, `stay_time`, `day`, `lat`, `lng`
- Fares: `economy`, `ac_business`, `ac_sleeper`, `ac_lower`, `parlour` (may be null)
- `source` URL for manual verification

Results are from the public schedule. Actual delays, cancellations, and seat availability may differ.

## Major stations reference

| Station | Code |
|---------|------|
| Karachi Cantt | KC |
| Karachi City | KYC |
| Lahore Junction | LHR |
| Islamabad (Margalla) | MGLA |
| Rawalpindi | RWP |
| Faisalabad | FSLD |
| Multan | MUL |
| Peshawar Cantt | PSC |
| Quetta | QTA |
| Hyderabad | HDR |
| Sukkur | SUK |
| Bahawalpur | BWPR |
| Sialkot | SLK |
| Gujranwala | GRW |
| Sahiwal | SWAL |
| Larkana | LRK |
| Khanewal | KWL |
| Rohri | ROH |

## Major trains reference

| Train | Route | Type |
|-------|-------|------|
| Karakoram Express | Lahore–Karachi | Express |
| Green Line | Islamabad–Karachi | Express |
| Tezgam | Rawalpindi–Karachi | Express |
| Shalimar Express | Lahore–Karachi | Express |
| Khyber Mail | Peshawar–Karachi | Mail |
| Pakistan Express | Lahore–Karachi | Express |
| Awam Express | Peshawar–Karachi | Express |
| Business Express | Lahore–Karachi | Express |
| Jaffar Express | Quetta–Peshawar | Express |
| Bolan Mail | Karachi–Quetta | Mail |

## Sources and failure modes

- pakrail.gov.pk: Public schedule page with AJAX data loading. Site may go down, HTML structure may change, or AJAX endpoints may be restructured.
- No robots.txt found on pakrail.gov.pk. Personal non-commercial schedule lookup only.

## Hard boundaries

- No login or credential handling
- No booking, payment, cancellation, or seat selection
- No CAPTCHA bypass or anti-bot circumvention
- No bulk/systematic scraping — single schedule lookups only

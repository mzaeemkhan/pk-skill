# Hospital Finder

## What this skill does

Finds hospitals, clinics, pharmacies, dentists, and doctor offices in Pakistani cities using OpenStreetMap Nominatim. Supports city-based search and GPS coordinate proximity search with haversine distance calculation.

## When to use

- "Find hospitals in Islamabad"
- "Nearest pharmacy to my location"
- "Clinics in Lahore"
- "Dentists near 33.68, 73.04"
- "What types of healthcare facilities can you search?"

## Prerequisites

- Node.js 18+
- Internet connection

## Workflow

### 1. Search by city

```bash
node scripts/hospitals.mjs search --city <city> [--type hospital|clinic|pharmacy|dentist|doctors] [--limit 10]
```

Returns facility name, type, lat/lon, address, city, province.

### 2. Search nearby (GPS)

```bash
node scripts/hospitals.mjs nearby --lat <lat> --lon <lon> [--type hospital] [--radius 5000]
```

Radius in meters. Returns facilities sorted by distance (haversine).

### 3. List facility types

```bash
node scripts/hospitals.mjs types
```

## Output

All commands return JSON with facility details including coordinates and addresses.

## Sources and failure modes

- OpenStreetMap Nominatim API (nominatim.openstreetmap.org)
- Coverage depends on OSM contributors — excellent in major cities, sparse in rural areas
- Rate limited to 1 request/second by Nominatim policy
- No authentication required

## Hard boundaries

- Read-only — no bookings or appointments
- No phone numbers, ratings, or hours of operation
- No emergency services dispatch
- Pakistan-only (countrycodes=pk filter)
- OSM data may be outdated in some areas

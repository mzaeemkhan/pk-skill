# Mosque Finder

## What this skill does

Finds mosques and masjids near any Pakistani city using the OpenStreetMap Overpass API. Returns mosque name (English + Urdu if available), coordinates, address, and denomination.

28+ built-in cities with instant resolution. Geocoding fallback for any other Pakistan location.

All data is read-only. No API key needed.

## When to use

- "Find mosques near me in Lahore"
- "Masjids in Islamabad"
- "Mosques near Gulberg, Lahore"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Find mosques

```bash
node scripts/mosques.mjs find --city Lahore --radius 3000 --limit 10
```

Returns mosques within the radius (meters) of the city center. Each result has name, Urdu name, lat/lon, address, and denomination.

### 2. Built-in cities

```bash
node scripts/mosques.mjs cities
```

Lists 28+ pre-configured Pakistani cities with coordinates.

## Output

All commands return JSON.

## How it works internally

Uses the Overpass API to query OpenStreetMap for nodes/ways tagged as `amenity=place_of_worship` + `religion=muslim` within a bounding box around the city center.

Built-in city map resolves common Pakistani cities instantly. Others fall back to Open-Meteo geocoding (filtered for Pakistan).

## Sources and failure modes

- Overpass API: Free, community-maintained, often overloaded (502/504/timeouts). The script tries overpass-api.de, maps.mail.ru, overpass.private.coffee, overpass.kumi.systems in order (6s each).
- Fallback: Nominatim `[amenity=place_of_worship]` search in the same bounding box, filtered to `religion=muslim` (or mosque/masjid/مسجد in the name). Fewer results than Overpass. Output `source` says which backend answered; `fallbackReason` lists mirror errors — mention to the user when results came from the fallback.
- OpenStreetMap data: Community-contributed, not comprehensive. Many smaller mosques are not mapped.
- Geocoding: May return unexpected results for ambiguous city names.

## Hard boundaries

- No prayer times (use prayer-times skill)
- No mosque schedules or contact info
- No directions or routing
- Read-only

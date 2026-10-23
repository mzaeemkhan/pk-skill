---
name: pakistan-weather
description: Pakistan weather — current conditions, forecast, AQI, and PMD alerts for 45+ cities via Open-Meteo and CAP RSS.
license: MIT
metadata:
  category: weather
  locale: en-PK
  phase: v1
---

# Pakistan Weather

Current weather, forecasts, air quality, and PMD severe weather alerts for Pakistan.

## Commands

```bash
# Current weather
node scripts/weather.mjs current --city islamabad

# 7-day forecast (default) or custom days (up to 16)
node scripts/weather.mjs forecast --city lahore --days 7

# Air quality index
node scripts/weather.mjs aqi --city karachi

# PMD severe weather alerts
node scripts/weather.mjs alerts

# Search for a city (geocoding)
node scripts/weather.mjs search --query "abbottabad"

# List all built-in Pakistan cities
node scripts/weather.mjs cities
```

## Built-in Cities

45+ Pakistan cities including Islamabad, Karachi, Lahore, Peshawar, Quetta, Multan, Faisalabad, Sialkot, Gilgit, Skardu, Hunza, Murree, Naran, Gwadar, and more. Any city worldwide can be looked up via geocoding.

## Prerequisites

- Node.js 18+

## Limitations

- Read-only weather data only
- Open-Meteo data may differ slightly from PMD official readings
- AQI is modeled, not from ground stations
- CAP alerts RSS may lag behind PMD website updates

---
name: pakistan-inflation
description: "Live Pakistan inflation from PBS — latest CPI (national/urban/rural, YoY/MoM), weekly SPI, WPI with release links. Use for \"inflation rate\", \"mehngai\", \"SPI this week\"."
license: MIT
metadata:
  category: finance
  locale: en-PK
  phase: v1
---

# Pakistan Inflation

Latest official inflation figures from the Pakistan Bureau of Statistics (pbs.gov.pk).

## Commands

```bash
# Latest monthly CPI: national, urban, rural YoY + MoM, plus monthly SPI and WPI
node scripts/inflation.mjs cpi

# Latest weekly SPI (index + weekly % change)
node scripts/inflation.mjs spi

# Last 4 weeks of SPI
node scripts/inflation.mjs spi --weeks 4

# CPI + weekly SPI together
node scripts/inflation.mjs latest
```

## Prerequisites

- Node.js 18+

## Limitations

- Monthly CPI comes from PBS's "Monthly Review on Price Indices" document. If PBS changes that format, the script returns the release links without figures.
- Weekly SPI reports the index and the change from the previous week only. Item-level prices are in the linked Excel/PDF.
- PBS publishes CPI around the 1st of each month and SPI every Friday.

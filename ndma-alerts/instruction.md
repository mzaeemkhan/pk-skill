# NDMA Alerts

## What this skill does

Reads ndma.gov.pk for three kinds of official disaster information:
- **advisory**: weather, flood, heatwave and monsoon advisories (PDF)
- **sitrep**: situation reports, including daily monsoon sitreps (PDF)
- **alert**: currently active alerts shown on the NDMA alerts page (often empty outside emergencies)

Each item has title, date, type and link.

## When to use

- "Any NDMA flood warnings?"
- "Latest NDMA advisory"
- "Monsoon situation report"
- "Is there a disaster alert in Pakistan right now?"

## Workflow

### 1. Latest across all types

```bash
node scripts/ndma.mjs latest --count 10
```

Newest first. `activeAlerts` shows how many live alerts exist.

### 2. Search

```bash
node scripts/ndma.mjs search --query heatwave --pages 5
```

Case-insensitive title match. Default scans 3 pages of each listing.

### 3. One type

```bash
node scripts/ndma.mjs type --name advisory --count 5
node scripts/ndma.mjs type --name sitrep --pages 2
node scripts/ndma.mjs type --name alert
```

## Presenting results

- Give the title, date and the PDF link; advise the user to open the PDF for details. Do not invent its contents.
- If `type --name alert` returns none, say there are no active NDMA alerts right now and mention the latest advisory instead.
- In an emergency, point users to Rescue 1122 and the `emergency-numbers` skill.

# PTA IMEI Check

## What this skill does

Validates mobile device IMEI numbers using the Luhn algorithm, identifies the device manufacturer from TAC (Type Allocation Code), and provides PTA DIRBS device registration guidance and fee information. All offline — no API calls needed for validation.

## When to use

- "Is this IMEI valid?"
- "Check my phone IMEI"
- "Is my phone PTA approved?"
- "How to register phone with PTA"
- "PTA registration fees"
- "What brand is this IMEI?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Validate IMEI

```bash
node scripts/imei.mjs validate --imei <15-digit-number>
```

Returns: valid/invalid, Luhn check result, TAC code, identified manufacturer, and IMEI structure breakdown.

### 2. Check PTA status

```bash
node scripts/imei.mjs check --imei <15-digit-number>
```

Validates IMEI locally, then provides DIRBS portal link and instructions for manual PTA status check (automated check not possible due to reCAPTCHA).

### 3. Registration info

```bash
node scripts/imei.mjs info
```

Returns PTA device registration process, fee structure, DIRBS categories, and blocking timelines.

## Output

All commands return JSON.

## Sources and failure modes

- IMEI validation: offline Luhn algorithm (RFC)
- TAC identification: built-in database of 30+ major manufacturers
- PTA registration info: offline reference data
- DIRBS live check: not automated (Google reCAPTCHA) — user directed to portal

## Hard boundaries

- Cannot check live PTA/DIRBS status (reCAPTCHA protected)
- TAC database covers major brands only — may show "Unknown" for rare devices
- No SIM registration, mobile number lookup, or PTA complaint filing
- IMEI validation is mathematical — does not confirm device existence

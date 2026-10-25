# CNIC Calculator

## What this skill does

Parses Pakistan CNIC numbers to extract region/locality, province, and gender. Validates CNIC format. Lists and searches region codes. All offline.

## When to use

- "Parse this CNIC number 42201-1234567-1"
- "Which area is CNIC 35202 from?"
- "Validate my CNIC format"
- "List CNIC region codes for Lahore"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Parse CNIC

```bash
node scripts/cnic.mjs parse --cnic 42201-1234567-1
```

Accepts with or without dashes. Returns: region code, region name, province, gender, validity.

### 2. Validate format

```bash
node scripts/cnic.mjs validate --cnic 42201-1234567-1
```

Checks 13-digit format only.

### Age / CNIC eligibility

```bash
node scripts/cnic.mjs age --dob 2008-05-15
```

Returns age, days to next birthday, and the date the person turns 18 (adult CNIC eligibility). The CNIC number does not contain the date of birth — ask the user for it.

### 3. List regions

```bash
node scripts/cnic.mjs regions
```

All ~60 mapped region codes with names and provinces.

### 4. Search region

```bash
node scripts/cnic.mjs search --region "Karachi"
```

Case-insensitive search across region names.

## Output

All commands return JSON.

## Hard boundaries

- No NADRA verification — offline parsing only
- CNIC does NOT contain date of birth
- Region mapping covers major areas; some rural codes unmapped
- Gender: last digit odd = male, even = female

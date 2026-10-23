# Pakistan Utility Bills

## What this skill does

Checks electricity bills for all 11 WAPDA distribution companies (DISCOs) and K-Electric via their web portals. Returns consumer details, billing month, units consumed, current charges, arrears, amount payable, due date, and payment status.

Covers: LESCO (Lahore), FESCO (Faisalabad), IESCO (Islamabad), MEPCO (Multan), PESCO (Peshawar), HESCO (Hyderabad), SEPCO (Sukkur), QESCO (Quetta), GEPCO (Gujranwala), TESCO (Tribal Areas), HAZECO (Hazara), K-Electric (Karachi).

Gas bills not available — SNGPL blocked by image CAPTCHA, SSGC blocked by Google reCAPTCHA v2.

All paths are read-only. No login, payment, complaint, or account modification.

## When to use

- "Check my LESCO bill, reference 01234567890123"
- "IESCO bill for customer ID 0123456789"
- "Is my electricity bill paid? MEPCO ref 01234567890123"
- "How much is my K-Electric bill?"
- "Which electricity companies can you check?"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Check a DISCO bill (LESCO, FESCO, IESCO, etc.)

```bash
node scripts/bills.mjs check --provider lesco --ref 01234567890123
```

- `--provider`: DISCO code (lesco, fesco, iesco, mepco, pesco, hesco, sepco, qesco, gepco, tesco, hazeco)
- `--ref`: 14-digit reference number (printed on bill) or customer ID
- `--by`: `refno` (default) or `appno` (for customer ID lookup)
- `--ru`: `U` (Urban, default) or `R` (Rural)

### 2. Check a K-Electric bill

```bash
node scripts/bills.mjs check --provider ke --ref 0123456789012
```

- `--ref`: 13-digit account number
- `--consumer`: 8-digit consumer number (optional)

### 3. List all supported providers

```bash
node scripts/bills.mjs providers
```

## Output

JSON with: `provider`, `consumer_name`, `reference_no`, `consumer_no`, `tariff`, `billing_month`, `units_consumed`, `current_charges`, `arrears`, `payable_within_due_date`, `payable_after_due_date`, `due_date`, `status`, `address`, `source`.

Fields vary by provider — not all fields present for every bill.

## How it works internally

### PITC DISCOs (10 companies)

All 11 WAPDA DISCOs share the same ASP.NET WebForms portal at `bill.pitc.com.pk`. No CAPTCHA.

1. GET `https://bill.pitc.com.pk/<disco>bill` to extract `__VIEWSTATE`, `__EVENTVALIDATION`, `__RequestVerificationToken`, and session cookies
2. POST the same URL with ASP.NET tokens + reference number as form-urlencoded
3. Parse the HTML response table for bill data

### K-Electric

K-Electric uses a separate ASP.NET portal at `staging.ke.com.pk:24555`. It has a text-based CAPTCHA (displayed in a `lblCaptcha` span) that is automatically extracted and submitted.

## Sources and failure modes

- PITC portal (`bill.pitc.com.pk`): May go down for maintenance. ViewState tokens expire per session.
- K-Electric portal: The CAPTCHA format may change, breaking auto-solve.
- Bill data shows the last generated bill. It may not reflect same-day payments.
- Reference numbers must be exact — partial or incorrect numbers return "input does not belong to [DISCO]".

## Hard boundaries

- No login or credential handling
- No payment processing
- No complaint filing or account modification
- No CAPTCHA bypass for SNGPL (image CAPTCHA) or SSGC (Google reCAPTCHA v2) — both unsupported
- No bulk querying — single bill lookups only

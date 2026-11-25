# Pakistan Utility Bills

## What this skill does

Tells the user exactly where and how to view their electricity bill for any of the 11 WAPDA distribution companies (DISCOs) or K-Electric, and checks that the number they gave has the right format.

It does **not** fetch the bill amount. Every official bill page (bill.pitc.com.pk for the DISCOs, ke.com.pk for K-Electric) requires a CAPTCHA, which is the user's to complete. Never try to solve, read, or submit a CAPTCHA on the user's behalf.

Covers: LESCO (Lahore), FESCO (Faisalabad), IESCO (Islamabad), MEPCO (Multan), PESCO (Peshawar), HESCO (Hyderabad), SEPCO (Sukkur), QESCO (Quetta), GEPCO (Gujranwala), TESCO (Tribal Areas), HAZECO (Hazara), K-Electric (Karachi).

## When to use

- "Check my LESCO bill, reference 01234567890123"
- "How much is my K-Electric bill?"
- "Where can I see my MEPCO bill?"
- "Which electricity companies can you check?"

For an estimate from units consumed, use `electricity-calculator` instead.

## Workflow

```bash
# DISCO by reference number (14 digits)
node scripts/bills.mjs check --provider mepco --ref 01234567890123

# DISCO by customer ID
node scripts/bills.mjs check --provider iesco --ref 0123456789 --by appno

# K-Electric by account number (13 digits)
node scripts/bills.mjs check --provider ke --ref 0123456789012

# All providers and their bill pages
node scripts/bills.mjs providers
```

## Output

JSON with `provider`, `billPage`, `lookupBy`, `numberLooksValid`, `warning` (when the number's format looks wrong), `steps`, `alternative`, `note`.

Give the user the bill page link and the steps. If `warning` is present, mention it so they can recheck the number. Don't put the user's reference number into a URL; they type it on the page.

## Hard boundaries

- No automated form submission and no CAPTCHA handling of any kind
- No login, payment, complaint filing, or account changes
- Gas bills (SNGPL, SSGC) are out of scope

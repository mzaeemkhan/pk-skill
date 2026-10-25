# SBP Rates

## What this skill does

Reads the State Bank of Pakistan homepage and returns the policy rate, interest rate corridor, weighted-average overnight repo rate, liquid FX reserves, KIBOR, MTB and PIB auction cut-off yields, and the interbank USD/PKR rate. Every block carries the as-of date printed by SBP.

## When to use

- "What is the SBP policy rate?" / "current interest rate in Pakistan"
- "KIBOR today" (for loan and mortgage pricing)
- "Latest T-bill yields" / "PIB cut-off rates"
- "Pakistan forex reserves"
- "Interbank dollar rate"

## Workflow

```bash
node scripts/sbp.mjs policy-rate   # policyRate, ceilingRate, floorRate, overnight repo, fxReserves
node scripts/sbp.mjs kibor         # asOf + 3-M/6-M/12-M bid and offer
node scripts/sbp.mjs tbills        # mtb, fixedRatePib, floatingPibQuarterly, floatingPibHalfYearly, upcomingAuctions
node scripts/sbp.mjs all           # all of the above + usdPkrInterbank
```

Always quote the `asOf` date with a rate. MTB, PIB and floating PIB tables have different dates. A floating PIB tenor may show `"Bids Rejected"` instead of a yield.

`upcomingAuctions` is copied as SBP labels it. SBP sometimes leaves past dates under that heading, so check the date before calling it upcoming.

## How it works internally

One request to `https://www.sbp.org.pk/`. The script tries Node `fetch` first. Cloudflare returns 403 to Node's TLS fingerprint, so it falls back to running the system `curl` binary (no shell, fixed arguments). The rates block is converted to text tokens and read by label.

## Sources and failure modes

- No API key. All values come from the page; nothing is hardcoded.
- If both fetch and curl fail, the error says which one failed and why (for example `curl not installed`).
- If SBP changes the page layout, the script exits non-zero with "page layout changed".

## Hard boundaries

- Latest values only. For history, point users to SBP's Economic Data pages.
- Not financial advice.

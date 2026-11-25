#!/usr/bin/env node
// Bill pages for all DISCOs and K-Electric sit behind a CAPTCHA, which is the
// user's to solve. This script never submits those forms: it validates the
// number and returns the official page and steps.

const PITC_BASE = "https://bill.pitc.com.pk";
const KE_BILL_PAGE = "https://ke.com.pk/bills-e-payments/";

const DISCOS = {
  lesco:   { path: "lescobill",   name: "LESCO — Lahore Electric Supply Company" },
  fesco:   { path: "fescobill",   name: "FESCO — Faisalabad Electric Supply Company" },
  iesco:   { path: "iescobill",   name: "IESCO — Islamabad Electric Supply Company" },
  mepco:   { path: "mepcobill",   name: "MEPCO — Multan Electric Power Company" },
  pesco:   { path: "pescobill",   name: "PESCO — Peshawar Electric Supply Company" },
  hesco:   { path: "hescobill",   name: "HESCO — Hyderabad Electric Supply Company" },
  sepco:   { path: "sepcobill",   name: "SEPCO — Sukkur Electric Power Company" },
  qesco:   { path: "qescobill",   name: "QESCO — Quetta Electric Supply Company" },
  gepco:   { path: "gepcobill",   name: "GEPCO — Gujranwala Electric Power Company" },
  tesco:   { path: "tescobill",   name: "TESCO — Tribal Areas Electric Supply Company" },
  hazeco:  { path: "hazecobill",  name: "HAZECO — Hazara Electric Power Company" },
};

const PAY_ELSEWHERE = "Your bank app, JazzCash or Easypaisa (Bill Payment → Electricity) also shows the amount due after you enter the same number.";

function checkFormat(digits, expected, label) {
  if (!/^\d+$/.test(digits)) return `${label} should contain digits only.`;
  if (digits.length !== expected) return `${label} is usually ${expected} digits; this one has ${digits.length}. Check it against a printed bill.`;
  return null;
}

function discoGuide(code, ref, by) {
  const info = DISCOS[code];
  const isRef = by !== "appno";
  const warning = isRef ? checkFormat(ref, 14, "A reference number") : (/^\d+$/.test(ref) ? null : "A customer ID should contain digits only.");
  return {
    provider: info.name,
    billPage: `${PITC_BASE}/${info.path}`,
    lookupBy: isRef ? "14-digit reference number (top of the printed bill)" : "Customer ID",
    numberLooksValid: !warning,
    ...(warning && { warning }),
    steps: [
      `Open ${PITC_BASE}/${info.path} in a browser.`,
      `Choose "${isRef ? "Reference Number" : "Customer ID"}" and enter the number.`,
      "Type the CAPTCHA shown on the page and press Search.",
      "The page shows the amount, due date, units and a printable duplicate bill.",
    ],
    alternative: PAY_ELSEWHERE,
    note: "Bill lookup needs a CAPTCHA, so it can't be fetched automatically. Give the user these steps.",
  };
}

function keGuide(account) {
  const warning = checkFormat(account, 13, "A K-Electric account number");
  return {
    provider: "K-Electric — Karachi Electric Supply",
    billPage: KE_BILL_PAGE,
    lookupBy: "13-digit account number (on the printed bill)",
    numberLooksValid: !warning,
    ...(warning && { warning }),
    steps: [
      `Open ${KE_BILL_PAGE} and choose the duplicate bill option, or use the KE Live app.`,
      "Enter the account number and complete the CAPTCHA.",
      "View or download the bill.",
    ],
    alternative: PAY_ELSEWHERE,
    note: "Bill lookup needs a CAPTCHA, so it can't be fetched automatically. Give the user these steps.",
  };
}

function printProviders() {
  console.log(JSON.stringify({
    electricity_discos: Object.entries(DISCOS).map(([k, v]) => ({
      code: k, name: v.name, billPage: `${PITC_BASE}/${v.path}`, lookupBy: ["14-digit reference number", "Customer ID"],
    })),
    ke: { code: "ke", name: "K-Electric — Karachi Electric Supply", billPage: KE_BILL_PAGE, lookupBy: ["13-digit account number"] },
    automatedLookup: "Not available: every bill page requires a CAPTCHA, which the user completes in a browser.",
    unavailable: {
      sngpl: "SNGPL gas — image CAPTCHA on bill.sngpl.com.pk",
      ssgc: "SSGC gas — Google reCAPTCHA on viewbill.ssgc.com.pk",
    },
  }, null, 2));
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const flag = (name) => { const i = args.indexOf(name); return i >= 0 && i + 1 < args.length ? args[i + 1] : null; };

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  bills.mjs check --provider <disco|ke> --ref <number> [--by refno|appno]
  bills.mjs providers

Returns the official bill page and steps; bill pages require a CAPTCHA, so amounts are not fetched.
Providers: ${Object.keys(DISCOS).join(", ")}, ke`);
    return;
  }
  if (cmd === "providers") return printProviders();
  if (cmd !== "check") { console.error(`Unknown command: ${cmd}. Use: check, providers, help`); process.exit(1); }

  const provider = (flag("--provider") || "").toLowerCase();
  const ref = (flag("--ref") || "").replace(/[\s-]/g, "");
  if (!provider) { console.error("Error: --provider required"); process.exit(1); }
  if (!ref) { console.error("Error: --ref required"); process.exit(1); }

  if (provider === "ke") return console.log(JSON.stringify(keGuide(ref), null, 2));
  if (DISCOS[provider]) return console.log(JSON.stringify(discoGuide(provider, ref, flag("--by") || "refno"), null, 2));
  console.error(`Unknown provider: ${provider}. Use: ${Object.keys(DISCOS).join(", ")}, ke`);
  process.exit(1);
}

main();

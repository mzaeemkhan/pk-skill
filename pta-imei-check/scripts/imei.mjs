#!/usr/bin/env node

// PTA IMEI validation — Luhn check, manufacturer ID, DIRBS guidance

// TAC (Type Allocation Code) prefixes for manufacturer identification
// First 8 digits of IMEI = TAC. We match on 2-digit reporting body + common prefixes.
const TAC_PREFIXES = [
  { prefix: "35332", brand: "Apple", note: "iPhone" },
  { prefix: "35391", brand: "Apple", note: "iPhone" },
  { prefix: "35405", brand: "Apple", note: "iPhone" },
  { prefix: "35## 41", brand: "Apple", note: "iPhone" },
  { prefix: "35692", brand: "Apple", note: "iPhone" },
  { prefix: "35384", brand: "Apple", note: "iPhone" },
  { prefix: "35320", brand: "Apple", note: "iPhone" },
  { prefix: "35900", brand: "Samsung", note: "Galaxy" },
  { prefix: "35258", brand: "Samsung", note: "Galaxy" },
  { prefix: "35467", brand: "Samsung", note: "Galaxy" },
  { prefix: "35195", brand: "Samsung", note: "Galaxy" },
  { prefix: "35445", brand: "Samsung", note: "Galaxy" },
  { prefix: "86150", brand: "Huawei", note: "" },
  { prefix: "86820", brand: "Huawei", note: "" },
  { prefix: "86760", brand: "Huawei", note: "" },
  { prefix: "86768", brand: "Huawei", note: "" },
  { prefix: "86098", brand: "Xiaomi", note: "Redmi/POCO" },
  { prefix: "86095", brand: "Xiaomi", note: "Redmi/POCO" },
  { prefix: "86828", brand: "Xiaomi", note: "" },
  { prefix: "86470", brand: "OPPO", note: "" },
  { prefix: "86495", brand: "OPPO", note: "" },
  { prefix: "86089", brand: "Vivo", note: "" },
  { prefix: "86127", brand: "Vivo", note: "" },
  { prefix: "86416", brand: "Realme", note: "" },
  { prefix: "35181", brand: "Nokia", note: "" },
  { prefix: "35426", brand: "Nokia", note: "" },
  { prefix: "35402", brand: "Motorola", note: "" },
  { prefix: "35403", brand: "LG", note: "" },
  { prefix: "35421", brand: "Sony", note: "Xperia" },
  { prefix: "35478", brand: "OnePlus", note: "" },
  { prefix: "35816", brand: "Google", note: "Pixel" },
  { prefix: "86488", brand: "Infinix", note: "" },
  { prefix: "86467", brand: "Tecno", note: "" },
  { prefix: "86072", brand: "Itel", note: "" },
  { prefix: "35268", brand: "ZTE", note: "" },
  { prefix: "35397", brand: "Lenovo", note: "" },
];

// Reporting body identifiers (first 2 digits)
const REPORTING_BODIES = {
  "01": "PTCRB (USA)",
  "10": "DECT (Europe)",
  "30": "IFAST (India)",
  "33": "DGPT (France)",
  "35": "BABT (UK)",
  "44": "JATE (Japan)",
  "45": "KCC (South Korea)",
  "49": "BQB (Bluetooth)",
  "50": "China (MIIT)",
  "51": "China (CQC)",
  "52": "China (CCC)",
  "53": "CETECOM (Europe)",
  "54": "TCA (Turkey)",
  "86": "TAF (China)",
  "91": "MSAI (India)",
  "98": "BABT (UK ext)",
  "99": "GCF (Global)",
};

function luhnCheck(imei) {
  const digits = imei.split("").map(Number);
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits[i];
    if ((digits.length - 1 - i) % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

function identifyManufacturer(imei) {
  const tac = imei.substring(0, 8);
  for (const entry of TAC_PREFIXES) {
    if (tac.startsWith(entry.prefix)) {
      return { brand: entry.brand, note: entry.note, tac };
    }
  }
  return { brand: "Unknown", note: "TAC not in local database", tac };
}

function validateImei(imei) {
  const cleaned = imei.replace(/[\s-]/g, "");

  if (!/^\d{15}$/.test(cleaned)) {
    return {
      imei: cleaned,
      valid: false,
      error: "IMEI must be exactly 15 digits",
      length: cleaned.length,
    };
  }

  const luhnValid = luhnCheck(cleaned);
  const manufacturer = identifyManufacturer(cleaned);
  const reportingBody = REPORTING_BODIES[cleaned.substring(0, 2)] || "Unknown";

  return {
    imei: cleaned,
    valid: luhnValid,
    luhnCheck: luhnValid ? "PASS" : "FAIL",
    structure: {
      reportingBodyId: cleaned.substring(0, 2),
      reportingBody,
      tac: cleaned.substring(0, 8),
      serialNumber: cleaned.substring(8, 14),
      checkDigit: cleaned.substring(14),
    },
    manufacturer: manufacturer.brand,
    manufacturerNote: manufacturer.note || undefined,
    note: luhnValid
      ? "IMEI format is valid. This confirms the number structure — it does not confirm PTA registration status."
      : "IMEI check digit is invalid. This number may be mistyped or fake.",
  };
}

function checkPta(imei) {
  const validation = validateImei(imei);
  if (!validation.valid) return validation;

  return {
    ...validation,
    ptaStatus: "manual_check_required",
    ptaNote: "PTA DIRBS portal uses Google reCAPTCHA — automated checking is not possible.",
    howToCheck: [
      "1. Visit https://dirbs.pta.gov.pk/",
      "2. Enter your IMEI number in the search field",
      "3. Complete the reCAPTCHA verification",
      "4. View your device status",
      "Alternative: Dial *#06# on your phone to see IMEI, then SMS your IMEI to 8484",
    ],
    dirbsUrl: "https://dirbs.pta.gov.pk/",
    smsCheck: "Send IMEI to 8484 from any Pakistani mobile network",
    categories: {
      compliant: "Device is registered and approved for use on Pakistani networks",
      nonCompliant: "Device is not registered — may be blocked after grace period",
      provisionallyCompliant: "Device registered via passport — valid for specific period",
    },
  };
}

function registrationInfo() {
  return {
    title: "PTA Device Registration (DIRBS)",
    description: "Pakistan Telecommunication Authority requires all mobile devices to be registered through the Device Identification, Registration and Blocking System (DIRBS).",
    howToRegister: [
      "1. Check your IMEI: Dial *#06# on your phone",
      "2. Visit https://dirbs.pta.gov.pk/ or use the PTA DIRBS app",
      "3. Register using your CNIC or passport number",
      "4. Pay applicable duty (if any) through bank/JazzCash/Easypaisa",
      "5. Device will be approved within 24-48 hours after payment",
    ],
    fees: {
      passportPhones: {
        description: "Phones brought on international passport (1 phone per passport per year)",
        fee: "Free (no duty for 1 device per year)",
        note: "Must be registered within 60 days of arrival",
      },
      localPurchase: {
        description: "Phones purchased locally from authorized dealers",
        fee: "No separate PTA fee — duty included in purchase price",
        note: "Dealer registers the device at point of sale",
      },
      importedDevices: {
        description: "Devices imported or purchased abroad beyond passport allowance",
        fee: "Varies by device value — typically PKR 500 to PKR 50,000+",
        note: "Higher-value phones (iPhone, Samsung flagship) attract higher duty",
        dutyRanges: [
          { category: "Phones up to $30", duty: "PKR 550" },
          { category: "Phones $30-$100", duty: "PKR 2,680" },
          { category: "Phones $100-$200", duty: "PKR 5,510" },
          { category: "Phones $200-$350", duty: "PKR 11,400" },
          { category: "Phones $350-$500", duty: "PKR 18,100" },
          { category: "Phones above $500", duty: "PKR 36,780" },
        ],
      },
    },
    categories: {
      compliant: "Device is registered and approved — no action needed",
      nonCompliant: "Device is not registered — will be blocked if not registered",
      provisionallyCompliant: "Temporarily approved — complete registration before expiry",
      stolen: "Device reported stolen — blocked on all networks",
    },
    blockingTimeline: "Non-compliant devices receive SMS warnings before blocking. Typical grace period: 60 days from first network use.",
    usefulLinks: {
      dirbs: "https://dirbs.pta.gov.pk/",
      ptaApp: "Search 'PTA DIRBS' on Google Play Store or Apple App Store",
      smsCheck: "Send IMEI to 8484",
      helpline: "0800-28225 (PTA helpline)",
    },
  };
}

// CLI
const args = process.argv.slice(2);
const cmd = args[0];
function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "validate") {
  const imei = getFlag("imei") || args[1];
  if (!imei) { console.error("Usage: imei.mjs validate --imei <15-digit-IMEI>"); process.exit(1); }
  console.log(JSON.stringify(validateImei(imei), null, 2));
} else if (cmd === "check") {
  const imei = getFlag("imei") || args[1];
  if (!imei) { console.error("Usage: imei.mjs check --imei <15-digit-IMEI>"); process.exit(1); }
  console.log(JSON.stringify(checkPta(imei), null, 2));
} else if (cmd === "info") {
  console.log(JSON.stringify(registrationInfo(), null, 2));
} else {
  console.error("Commands: validate, check, info");
  console.error("  validate --imei <IMEI>  — validate IMEI format + identify manufacturer");
  console.error("  check --imei <IMEI>     — validate + PTA registration guidance");
  console.error("  info                    — PTA registration process and fees");
  process.exit(1);
}

#!/usr/bin/env node

// Reference rates (approximate — verify current market rates)
const GOLD_PER_TOLA_PKR = 230000;
const SILVER_PER_TOLA_PKR = 2800;
const GRAMS_PER_TOLA = 11.664;

// Islamic reference values
const MEHR_E_FATIMI_SILVER_TOLA = 131.25; // 1531.25g silver
const MINIMUM_MEHR_SILVER_GRAMS = 30.618; // 10 dirhams
const MINIMUM_MEHR_SILVER_TOLA = MINIMUM_MEHR_SILVER_GRAMS / GRAMS_PER_TOLA;

const CITY_TIERS = {
  1: ["Karachi", "Lahore", "Islamabad"],
  2: ["Rawalpindi", "Multan", "Faisalabad", "Peshawar", "Hyderabad", "Sialkot", "Gujranwala"],
  3: ["Quetta", "Sahiwal", "Bahawalpur", "Sukkur", "Mardan", "Abbottabad", "Dera Ghazi Khan", "Sargodha"],
};

const COST_RANGES = {
  1: { hall: [300000, 1500000], catering: [2500, 5000], decor: [100000, 500000], photography: [100000, 400000] },
  2: { hall: [150000, 800000], catering: [1500, 3500], decor: [50000, 250000], photography: [50000, 200000] },
  3: { hall: [50000, 300000], catering: [800, 2000], decor: [20000, 100000], photography: [20000, 100000] },
};

function getCityTier(city) {
  const c = city.toLowerCase();
  for (const [tier, cities] of Object.entries(CITY_TIERS)) {
    if (cities.some(ct => ct.toLowerCase() === c)) return parseInt(tier);
  }
  return 3;
}

function formatPKR(n) {
  return `PKR ${Math.round(n).toLocaleString("en-PK")}`;
}

function mehr(opts) {
  const result = { type: "mehr_calculation", referenceRates: { goldPerTola: GOLD_PER_TOLA_PKR, silverPerTola: SILVER_PER_TOLA_PKR, note: "Reference rates — verify current market prices via gold-prices skill" } };

  if (opts.goldTola) {
    const tola = parseFloat(opts.goldTola);
    result.input = { goldTola: tola };
    result.value = { pkr: Math.round(tola * GOLD_PER_TOLA_PKR), grams: Math.round(tola * GRAMS_PER_TOLA * 100) / 100 };
    result.description = `${tola} tola gold`;
  } else if (opts.silverTola) {
    const tola = parseFloat(opts.silverTola);
    result.input = { silverTola: tola };
    result.value = { pkr: Math.round(tola * SILVER_PER_TOLA_PKR), grams: Math.round(tola * GRAMS_PER_TOLA * 100) / 100 };
    result.description = `${tola} tola silver`;
    if (Math.abs(tola - MEHR_E_FATIMI_SILVER_TOLA) < 0.01) {
      result.note = "This equals Mehr-e-Fatimi (the Mehr of Fatimah RA)";
    }
  } else if (opts.amount) {
    const amount = parseFloat(opts.amount);
    const minMehrPKR = MINIMUM_MEHR_SILVER_TOLA * SILVER_PER_TOLA_PKR;
    result.input = { amountPKR: amount };
    result.minimumMehr = { pkr: Math.round(minMehrPKR), silverGrams: MINIMUM_MEHR_SILVER_GRAMS, description: "10 dirhams silver" };
    result.meetsMinimum = amount >= minMehrPKR;
    result.equivalentGold = { tola: Math.round(amount / GOLD_PER_TOLA_PKR * 100) / 100 };
    result.equivalentSilver = { tola: Math.round(amount / SILVER_PER_TOLA_PKR * 100) / 100 };
  } else {
    return reference();
  }

  return result;
}

function reference() {
  const fatimi = MEHR_E_FATIMI_SILVER_TOLA * SILVER_PER_TOLA_PKR;
  const minMehr = MINIMUM_MEHR_SILVER_TOLA * SILVER_PER_TOLA_PKR;
  return {
    type: "mehr_reference",
    mehrEFatimi: {
      description: "Mehr of Fatimah (RA) — the Mehr given by Prophet Muhammad (PBUH) to his daughter",
      silverTola: MEHR_E_FATIMI_SILVER_TOLA,
      silverGrams: Math.round(MEHR_E_FATIMI_SILVER_TOLA * GRAMS_PER_TOLA * 100) / 100,
      approximatePKR: Math.round(fatimi),
    },
    minimumMehr: {
      description: "Minimum Mehr in Hanafi fiqh — 10 dirhams of silver",
      silverGrams: MINIMUM_MEHR_SILVER_GRAMS,
      silverTola: Math.round(MINIMUM_MEHR_SILVER_TOLA * 1000) / 1000,
      approximatePKR: Math.round(minMehr),
    },
    mehrEMisl: {
      description: "Mehr-e-Misl — customary Mehr matching the bride's family status and local norms. No fixed amount.",
    },
    referenceRates: {
      goldPerTola: GOLD_PER_TOLA_PKR,
      silverPerTola: SILVER_PER_TOLA_PKR,
      note: "Reference rates — verify current market prices",
    },
    disclaimer: "Consult a qualified Islamic scholar for specific rulings on Mehr.",
  };
}

function costs(guests, city) {
  const tier = getCityTier(city);
  const ranges = COST_RANGES[tier];
  const tierLabel = `Tier ${tier}`;

  const cateringLow = guests * ranges.catering[0];
  const cateringHigh = guests * ranges.catering[1];
  const totalLow = ranges.hall[0] + cateringLow + ranges.decor[0] + ranges.photography[0];
  const totalHigh = ranges.hall[1] + cateringHigh + ranges.decor[1] + ranges.photography[1];

  return {
    type: "wedding_cost_estimate",
    city,
    cityTier: tierLabel,
    guests,
    breakdown: {
      hall: { low: ranges.hall[0], high: ranges.hall[1] },
      cateringTotal: { low: cateringLow, high: cateringHigh, perHead: { low: ranges.catering[0], high: ranges.catering[1] } },
      decor: { low: ranges.decor[0], high: ranges.decor[1] },
      photography: { low: ranges.photography[0], high: ranges.photography[1] },
    },
    totalEstimate: { low: totalLow, high: totalHigh },
    note: "Estimates only. Excludes: mehndi, baraat, walima if separate events. Excludes clothing, jewelry, dowry. Actual costs vary significantly by venue and vendor.",
  };
}

function checklist() {
  return {
    type: "nikah_checklist",
    groomDocuments: [
      "Original CNIC (computerized)",
      "2 passport-size photographs",
      "CNIC of father/guardian",
      "Divorce decree (if previously married)",
      "Death certificate of previous spouse (if applicable)",
    ],
    brideDocuments: [
      "Original CNIC (computerized)",
      "2 passport-size photographs",
      "CNIC of father/wali (guardian)",
      "Consent of wali (guardian)",
      "Divorce decree or khula decree (if previously married)",
    ],
    witnesses: [
      "Minimum 2 adult Muslim male witnesses (or 1 male + 2 female per Hanafi fiqh)",
      "CNIC copies of all witnesses",
    ],
    nikahRegistrar: [
      "Licensed Nikah Khwan / Nikah Registrar",
      "Registered with local Union Council",
      "Nikah Nama (marriage contract form) — official form from Union Council",
    ],
    nikahNama: [
      "Mehr amount (agreed and documented)",
      "Haq Mehr: prompt (muajjal) and deferred (muwajjal) portions if applicable",
      "Conditions (if any) — bride's right to divorce (delegated talaq), education, employment, etc.",
      "Signatures of bride, groom, witnesses, and nikah registrar",
    ],
    registration: [
      "Register nikah at Union Council within 30 days",
      "Obtain Nikah Nama certificate (computerized)",
      "Update NADRA records (marital status)",
    ],
    note: "Requirements may vary by province and local Union Council. Consult your local nikah registrar.",
  };
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "mehr") {
  const goldTola = getFlag("gold-tola");
  const silverTola = getFlag("silver-tola");
  const amount = getFlag("amount");
  console.log(JSON.stringify(mehr({ goldTola, silverTola, amount }), null, 2));

} else if (cmd === "reference") {
  console.log(JSON.stringify(reference(), null, 2));

} else if (cmd === "costs") {
  const guests = parseInt(getFlag("guests") || "200", 10);
  const city = getFlag("city") || "Lahore";
  console.log(JSON.stringify(costs(guests, city), null, 2));

} else if (cmd === "checklist") {
  console.log(JSON.stringify(checklist(), null, 2));

} else {
  console.error("Commands: mehr, reference, costs, checklist");
  console.error("  mehr [--gold-tola <n>] [--silver-tola <n>] [--amount <PKR>]");
  console.error("  reference");
  console.error("  costs --guests <number> [--city <name>]");
  console.error("  checklist");
  process.exit(1);
}

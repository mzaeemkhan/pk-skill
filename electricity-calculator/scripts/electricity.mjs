#!/usr/bin/env node

// NEPRA uniform base tariff FY2025-26 (decision of 2 Jul 2025, reported by Pakistan Observer).
// 1-300 unit rates are from that report; 301+ are estimates (the report gives only one TOU rate, Rs 41.78).
const TARIFF_SOURCE = {
  asOf: "2025-07-02",
  basis: "NEPRA FY2025-26 uniform base tariff (residential, excl. FPA/QTA/taxes)",
  source: "https://pakobserver.net/new-per-unit-electricity-price-of-all-slabs-as-nepra-cuts-base-tariff-for-fy2026/",
};
const RESIDENTIAL_SLABS = [
  { min: 1, max: 100, rate: 22.44, label: "1-100 units" },
  { min: 101, max: 200, rate: 28.91, label: "101-200 units" },
  { min: 201, max: 300, rate: 33.10, label: "201-300 units" },
  { min: 301, max: 400, rate: 37.99, label: "301-400 units", estimate: true },
  { min: 401, max: 500, rate: 40.22, label: "401-500 units", estimate: true },
  { min: 501, max: 600, rate: 41.62, label: "501-600 units", estimate: true },
  { min: 601, max: 700, rate: 42.76, label: "601-700 units", estimate: true },
  { min: 701, max: Infinity, rate: 47.69, label: "Above 700 units", estimate: true },
];
// Protected: <=200 units/month and a 6-month average <=200.
const PROTECTED_SLABS = [
  { min: 1, max: 100, rate: 10.54, label: "1-100 units (protected)" },
  { min: 101, max: 200, rate: 13.01, label: "101-200 units (protected)" },
];
const GST_RATE = 0.18;

const DISCOS = {
  LESCO: { name: "Lahore Electric Supply Company", region: "Lahore Division", fpa: 3.23, qta: 0.43 },
  GEPCO: { name: "Gujranwala Electric Power Company", region: "Gujranwala Division", fpa: 3.23, qta: 0.43 },
  FESCO: { name: "Faisalabad Electric Supply Company", region: "Faisalabad Division", fpa: 3.23, qta: 0.43 },
  IESCO: { name: "Islamabad Electric Supply Company", region: "Islamabad / Rawalpindi", fpa: 3.23, qta: 0.43 },
  MEPCO: { name: "Multan Electric Power Company", region: "Multan / South Punjab", fpa: 3.23, qta: 0.43 },
  PESCO: { name: "Peshawar Electric Supply Company", region: "Khyber Pakhtunkhwa", fpa: 3.23, qta: 0.43 },
  HESCO: { name: "Hyderabad Electric Supply Company", region: "Hyderabad / Lower Sindh", fpa: 3.23, qta: 0.43 },
  SEPCO: { name: "Sukkur Electric Power Company", region: "Sukkur / Upper Sindh", fpa: 3.23, qta: 0.43 },
  QESCO: { name: "Quetta Electric Supply Company", region: "Balochistan", fpa: 3.23, qta: 0.43 },
  TESCO: { name: "Tribal Areas Electric Supply Company", region: "Merged Tribal Areas", fpa: 3.23, qta: 0.43 },
  PEDO: { name: "Pakhtunkhwa Energy Development Org", region: "KP Hydro Areas", fpa: 3.23, qta: 0.43 },
  KELECTRIC: { name: "K-Electric", region: "Karachi", fpa: 3.95, qta: 0.50 },
};

function calculateBill(units, discoKey, isProtected = false) {
  const disco = DISCOS[discoKey] || DISCOS.LESCO;
  const discoName = discoKey && DISCOS[discoKey] ? discoKey : "LESCO";

  if (units <= 0) return { success: false, error: "Units must be positive" };
  const protectedApplied = isProtected && units <= 200;
  const slabs = protectedApplied ? PROTECTED_SLABS : RESIDENTIAL_SLABS;

  // ponytail: telescoping slabs; the non-protected "one previous slab benefit" rule isn't modelled.
  const slabBreakdown = [];
  let remaining = units;
  let baseCost = 0;
  for (const slab of slabs) {
    if (remaining <= 0) break;
    const slabUnits = Math.min(remaining, slab.max - slab.min + 1);
    const cost = slabUnits * slab.rate;
    baseCost += cost;
    slabBreakdown.push({
      slab: slab.label,
      units: slabUnits,
      rate_pkr: slab.rate,
      cost_pkr: Math.round(cost * 100) / 100,
      ...(slab.estimate && { estimate: true }),
    });
    remaining -= slabUnits;
  }

  const fpaTotal = units * disco.fpa;
  const qtaTotal = units * disco.qta;
  const electricityDuty = baseCost * 0.015;
  const tvFee = 35;

  const subtotal = baseCost + fpaTotal + qtaTotal + electricityDuty + tvFee;
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  return {
    success: true,
    disco: discoName,
    disco_name: disco.name,
    region: disco.region,
    units,
    consumer_type: protectedApplied ? "protected" : "non-protected",
    ...(isProtected && !protectedApplied && { protected_note: "Protected rates apply only up to 200 units; non-protected rates used." }),
    slab_breakdown: slabBreakdown,
    base_cost_pkr: Math.round(baseCost),
    fuel_price_adjustment_pkr: Math.round(fpaTotal),
    quarterly_tariff_adjustment_pkr: Math.round(qtaTotal),
    electricity_duty_pkr: Math.round(electricityDuty),
    tv_fee_pkr: tvFee,
    subtotal_pkr: Math.round(subtotal),
    gst_18_percent_pkr: Math.round(gst),
    total_bill_pkr: Math.round(total),
    tariff: TARIFF_SOURCE,
    estimate: true,
    note: "Estimate. FPA/QTA change monthly, slab rules and income tax (non-filers) are simplified. Verify with your DISCO.",
  };
}

function showSlabs(discoKey) {
  const disco = discoKey && DISCOS[discoKey] ? DISCOS[discoKey] : DISCOS.LESCO;
  const name = discoKey && DISCOS[discoKey] ? discoKey : "LESCO";
  return {
    success: true,
    disco: name,
    tariff_type: "Residential",
    tariff: TARIFF_SOURCE,
    slabs: RESIDENTIAL_SLABS.map((s) => ({
      range: s.label,
      rate_per_unit_pkr: s.rate,
      ...(s.estimate && { estimate: true }),
    })),
    protected_slabs: PROTECTED_SLABS.map((s) => ({ range: s.label, rate_per_unit_pkr: s.rate })),
    surcharges: {
      fuel_price_adjustment_per_unit: disco.fpa,
      quarterly_tariff_adjustment_per_unit: disco.qta,
      electricity_duty: "1.5% of base cost",
      tv_fee: "Rs 35 fixed",
      gst: "18% on the bill",
    },
  };
}

function listDiscos() {
  return {
    success: true,
    count: Object.keys(DISCOS).length,
    discos: Object.entries(DISCOS).map(([key, d]) => ({
      key,
      name: d.name,
      region: d.region,
    })),
  };
}

function compareBills(units) {
  if (units <= 0) return { success: false, error: "Units must be positive" };

  const results = Object.keys(DISCOS).map((key) => {
    const bill = calculateBill(units, key);
    return {
      disco: key,
      name: DISCOS[key].name,
      total_bill_pkr: bill.total_bill_pkr,
    };
  });

  results.sort((a, b) => a.total_bill_pkr - b.total_bill_pkr);

  return {
    success: true,
    units,
    comparison: results,
    cheapest: results[0].disco,
    most_expensive: results[results.length - 1].disco,
  };
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "--help") {
    console.log(JSON.stringify({
      usage: "node electricity.mjs <command> [options]",
      commands: {
        calculate: "--units <number> [--disco <name>] [--protected] — Calculate bill",
        slabs: "[--disco <name>] — Show tariff slabs",
        discos: "List all DISCOs",
        compare: "--units <number> — Compare across DISCOs",
      },
    }, null, 2));
    return;
  }

  const getFlag = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  if (cmd === "calculate") {
    const units = parseInt(getFlag("--units"));
    if (!units) {
      console.error(JSON.stringify({ error: "Required: --units <number>" }));
      process.exit(1);
    }
    const disco = (getFlag("--disco") || "LESCO").toUpperCase();
    console.log(JSON.stringify(calculateBill(units, disco, args.includes("--protected")), null, 2));
  } else if (cmd === "slabs") {
    const disco = getFlag("--disco") ? getFlag("--disco").toUpperCase() : undefined;
    console.log(JSON.stringify(showSlabs(disco), null, 2));
  } else if (cmd === "discos") {
    console.log(JSON.stringify(listDiscos(), null, 2));
  } else if (cmd === "compare") {
    const units = parseInt(getFlag("--units"));
    if (!units) {
      console.error(JSON.stringify({ error: "Required: --units <number>" }));
      process.exit(1);
    }
    console.log(JSON.stringify(compareBills(units), null, 2));
  } else {
    console.error(JSON.stringify({ error: `Unknown command: ${cmd}` }));
    process.exit(1);
  }
}

main();

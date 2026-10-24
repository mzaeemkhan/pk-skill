#!/usr/bin/env node

const TAX_SLABS = {
  punjab: {
    name: "Punjab",
    department: "Punjab Excise & Taxation Department",
    car: [
      { min: 0, max: 800, tax: 1500, label: "Up to 800cc" },
      { min: 801, max: 1000, tax: 3000, label: "801-1000cc" },
      { min: 1001, max: 1300, tax: 6000, label: "1001-1300cc" },
      { min: 1301, max: 1600, tax: 12000, label: "1301-1600cc" },
      { min: 1601, max: 1800, tax: 18000, label: "1601-1800cc" },
      { min: 1801, max: 2000, tax: 30000, label: "1801-2000cc" },
      { min: 2001, max: 2500, tax: 45000, label: "2001-2500cc" },
      { min: 2501, max: 3000, tax: 75000, label: "2501-3000cc" },
      { min: 3001, max: Infinity, tax: 120000, label: "Above 3000cc" },
    ],
    motorcycle: [
      { min: 0, max: 70, tax: 200, label: "Up to 70cc" },
      { min: 71, max: 100, tax: 400, label: "71-100cc" },
      { min: 101, max: 125, tax: 600, label: "101-125cc" },
      { min: 126, max: 150, tax: 1000, label: "126-150cc" },
      { min: 151, max: 200, tax: 1500, label: "151-200cc" },
      { min: 201, max: Infinity, tax: 2500, label: "Above 200cc" },
    ],
  },
  sindh: {
    name: "Sindh",
    department: "Sindh Excise & Taxation Department",
    car: [
      { min: 0, max: 800, tax: 1200, label: "Up to 800cc" },
      { min: 801, max: 1000, tax: 2500, label: "801-1000cc" },
      { min: 1001, max: 1300, tax: 5000, label: "1001-1300cc" },
      { min: 1301, max: 1600, tax: 10000, label: "1301-1600cc" },
      { min: 1601, max: 1800, tax: 15000, label: "1601-1800cc" },
      { min: 1801, max: 2000, tax: 25000, label: "1801-2000cc" },
      { min: 2001, max: 2500, tax: 40000, label: "2001-2500cc" },
      { min: 2501, max: 3000, tax: 65000, label: "2501-3000cc" },
      { min: 3001, max: Infinity, tax: 100000, label: "Above 3000cc" },
    ],
    motorcycle: [
      { min: 0, max: 70, tax: 150, label: "Up to 70cc" },
      { min: 71, max: 100, tax: 300, label: "71-100cc" },
      { min: 101, max: 125, tax: 500, label: "101-125cc" },
      { min: 126, max: 150, tax: 800, label: "126-150cc" },
      { min: 151, max: 200, tax: 1200, label: "151-200cc" },
      { min: 201, max: Infinity, tax: 2000, label: "Above 200cc" },
    ],
  },
  kp: {
    name: "Khyber Pakhtunkhwa",
    department: "KP Excise & Taxation Department",
    car: [
      { min: 0, max: 800, tax: 1000, label: "Up to 800cc" },
      { min: 801, max: 1000, tax: 2000, label: "801-1000cc" },
      { min: 1001, max: 1300, tax: 4500, label: "1001-1300cc" },
      { min: 1301, max: 1600, tax: 9000, label: "1301-1600cc" },
      { min: 1601, max: 1800, tax: 14000, label: "1601-1800cc" },
      { min: 1801, max: 2000, tax: 22000, label: "1801-2000cc" },
      { min: 2001, max: 2500, tax: 35000, label: "2001-2500cc" },
      { min: 2501, max: 3000, tax: 55000, label: "2501-3000cc" },
      { min: 3001, max: Infinity, tax: 90000, label: "Above 3000cc" },
    ],
    motorcycle: [
      { min: 0, max: 70, tax: 150, label: "Up to 70cc" },
      { min: 71, max: 100, tax: 300, label: "71-100cc" },
      { min: 101, max: 125, tax: 500, label: "101-125cc" },
      { min: 126, max: 150, tax: 750, label: "126-150cc" },
      { min: 151, max: 200, tax: 1200, label: "151-200cc" },
      { min: 201, max: Infinity, tax: 2000, label: "Above 200cc" },
    ],
  },
  balochistan: {
    name: "Balochistan",
    department: "Balochistan Excise & Taxation Department",
    car: [
      { min: 0, max: 800, tax: 800, label: "Up to 800cc" },
      { min: 801, max: 1000, tax: 1800, label: "801-1000cc" },
      { min: 1001, max: 1300, tax: 4000, label: "1001-1300cc" },
      { min: 1301, max: 1600, tax: 8000, label: "1301-1600cc" },
      { min: 1601, max: 1800, tax: 12000, label: "1601-1800cc" },
      { min: 1801, max: 2000, tax: 20000, label: "1801-2000cc" },
      { min: 2001, max: 2500, tax: 32000, label: "2001-2500cc" },
      { min: 2501, max: 3000, tax: 50000, label: "2501-3000cc" },
      { min: 3001, max: Infinity, tax: 80000, label: "Above 3000cc" },
    ],
    motorcycle: [
      { min: 0, max: 70, tax: 100, label: "Up to 70cc" },
      { min: 71, max: 100, tax: 200, label: "71-100cc" },
      { min: 101, max: 125, tax: 400, label: "101-125cc" },
      { min: 126, max: 150, tax: 600, label: "126-150cc" },
      { min: 151, max: 200, tax: 1000, label: "151-200cc" },
      { min: 201, max: Infinity, tax: 1500, label: "Above 200cc" },
    ],
  },
  ict: {
    name: "Islamabad Capital Territory",
    department: "ICT Excise & Taxation Office",
    car: [
      { min: 0, max: 800, tax: 1500, label: "Up to 800cc" },
      { min: 801, max: 1000, tax: 3000, label: "801-1000cc" },
      { min: 1001, max: 1300, tax: 6000, label: "1001-1300cc" },
      { min: 1301, max: 1600, tax: 12000, label: "1301-1600cc" },
      { min: 1601, max: 1800, tax: 18000, label: "1601-1800cc" },
      { min: 1801, max: 2000, tax: 30000, label: "1801-2000cc" },
      { min: 2001, max: 2500, tax: 45000, label: "2001-2500cc" },
      { min: 2501, max: 3000, tax: 75000, label: "2501-3000cc" },
      { min: 3001, max: Infinity, tax: 120000, label: "Above 3000cc" },
    ],
    motorcycle: [
      { min: 0, max: 70, tax: 200, label: "Up to 70cc" },
      { min: 71, max: 100, tax: 400, label: "71-100cc" },
      { min: 101, max: 125, tax: 600, label: "101-125cc" },
      { min: 126, max: 150, tax: 1000, label: "126-150cc" },
      { min: 151, max: 200, tax: 1500, label: "151-200cc" },
      { min: 201, max: Infinity, tax: 2500, label: "Above 200cc" },
    ],
  },
  ajk: {
    name: "Azad Jammu & Kashmir",
    department: "AJK Excise & Taxation Department",
    car: [
      { min: 0, max: 800, tax: 800, label: "Up to 800cc" },
      { min: 801, max: 1000, tax: 1800, label: "801-1000cc" },
      { min: 1001, max: 1300, tax: 4000, label: "1001-1300cc" },
      { min: 1301, max: 1600, tax: 8000, label: "1301-1600cc" },
      { min: 1601, max: 1800, tax: 12000, label: "1601-1800cc" },
      { min: 1801, max: 2000, tax: 20000, label: "1801-2000cc" },
      { min: 2001, max: 2500, tax: 32000, label: "2001-2500cc" },
      { min: 2501, max: 3000, tax: 50000, label: "2501-3000cc" },
      { min: 3001, max: Infinity, tax: 80000, label: "Above 3000cc" },
    ],
    motorcycle: [
      { min: 0, max: 70, tax: 100, label: "Up to 70cc" },
      { min: 71, max: 100, tax: 200, label: "71-100cc" },
      { min: 101, max: 125, tax: 400, label: "101-125cc" },
      { min: 126, max: 150, tax: 600, label: "126-150cc" },
      { min: 151, max: 200, tax: 1000, label: "151-200cc" },
      { min: 201, max: Infinity, tax: 1500, label: "Above 200cc" },
    ],
  },
  gb: {
    name: "Gilgit-Baltistan",
    department: "GB Excise & Taxation Department",
    car: [
      { min: 0, max: 800, tax: 600, label: "Up to 800cc" },
      { min: 801, max: 1000, tax: 1500, label: "801-1000cc" },
      { min: 1001, max: 1300, tax: 3500, label: "1001-1300cc" },
      { min: 1301, max: 1600, tax: 7000, label: "1301-1600cc" },
      { min: 1601, max: 1800, tax: 10000, label: "1601-1800cc" },
      { min: 1801, max: 2000, tax: 18000, label: "1801-2000cc" },
      { min: 2001, max: 2500, tax: 28000, label: "2001-2500cc" },
      { min: 2501, max: 3000, tax: 45000, label: "2501-3000cc" },
      { min: 3001, max: Infinity, tax: 70000, label: "Above 3000cc" },
    ],
    motorcycle: [
      { min: 0, max: 70, tax: 80, label: "Up to 70cc" },
      { min: 71, max: 100, tax: 150, label: "71-100cc" },
      { min: 101, max: 125, tax: 300, label: "101-125cc" },
      { min: 126, max: 150, tax: 500, label: "126-150cc" },
      { min: 151, max: 200, tax: 800, label: "151-200cc" },
      { min: 201, max: Infinity, tax: 1200, label: "Above 200cc" },
    ],
  },
};

function getDepreciation(currentYear, modelYear) {
  const age = currentYear - modelYear;
  if (age <= 0) return 1.0;
  if (age <= 1) return 1.0;
  if (age <= 2) return 0.9;
  if (age <= 3) return 0.85;
  if (age <= 5) return 0.75;
  if (age <= 7) return 0.65;
  if (age <= 10) return 0.5;
  if (age <= 15) return 0.35;
  return 0.25;
}

function findSlab(slabs, cc) {
  return slabs.find((s) => cc >= s.min && cc <= s.max);
}

function calculate(cc, provinceKey, modelYear, type) {
  const currentYear = new Date().getFullYear();
  const province = TAX_SLABS[provinceKey];
  if (!province) {
    return { success: false, error: `Unknown province: ${provinceKey}. Use: ${Object.keys(TAX_SLABS).join(", ")}` };
  }

  const vehicleType = type || "car";
  const slabs = province[vehicleType];
  if (!slabs) {
    return { success: false, error: `No slabs for type '${vehicleType}'. Use: car, motorcycle` };
  }

  const slab = findSlab(slabs, cc);
  if (!slab) {
    return { success: false, error: `No slab found for ${cc}cc` };
  }

  const year = modelYear || currentYear;
  const depreciation = getDepreciation(currentYear, year);
  const baseTax = slab.tax;
  const adjustedTax = Math.round(baseTax * depreciation);

  return {
    success: true,
    province: province.name,
    department: province.department,
    engine_cc: cc,
    vehicle_type: vehicleType,
    model_year: year,
    vehicle_age: currentYear - year,
    slab: slab.label,
    base_tax_pkr: baseTax,
    depreciation_factor: depreciation,
    annual_token_tax_pkr: adjustedTax,
    note: "Rates are approximate. Verify with provincial Excise & Taxation department.",
  };
}

function listProvinces() {
  return {
    success: true,
    provinces: Object.entries(TAX_SLABS).map(([key, p]) => ({
      key,
      name: p.name,
      department: p.department,
    })),
  };
}

function showSlabs(provinceKey) {
  const province = TAX_SLABS[provinceKey];
  if (!province) {
    return { success: false, error: `Unknown province: ${provinceKey}. Use: ${Object.keys(TAX_SLABS).join(", ")}` };
  }
  return {
    success: true,
    province: province.name,
    car_slabs: province.car.map((s) => ({ range: s.label, annual_tax_pkr: s.tax })),
    motorcycle_slabs: province.motorcycle.map((s) => ({ range: s.label, annual_tax_pkr: s.tax })),
  };
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "--help") {
    console.log(JSON.stringify({
      usage: "node vehicletax.mjs <command> [options]",
      commands: {
        calculate: "--cc <number> --province <name> [--year <model-year>] [--type car|motorcycle]",
        provinces: "List all provinces",
        slabs: "--province <name> — Show tax slabs",
      },
    }, null, 2));
    return;
  }

  const getFlag = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  if (cmd === "calculate") {
    const cc = parseInt(getFlag("--cc"));
    const province = getFlag("--province");
    if (!cc || !province) {
      console.error(JSON.stringify({ error: "Required: --cc <number> --province <name>" }));
      process.exit(1);
    }
    const year = getFlag("--year") ? parseInt(getFlag("--year")) : undefined;
    const type = getFlag("--type");
    console.log(JSON.stringify(calculate(cc, province.toLowerCase(), year, type), null, 2));
  } else if (cmd === "provinces") {
    console.log(JSON.stringify(listProvinces(), null, 2));
  } else if (cmd === "slabs") {
    const province = getFlag("--province");
    if (!province) {
      console.error(JSON.stringify({ error: "Required: --province <name>" }));
      process.exit(1);
    }
    console.log(JSON.stringify(showSlabs(province.toLowerCase()), null, 2));
  } else {
    console.error(JSON.stringify({ error: `Unknown command: ${cmd}` }));
    process.exit(1);
  }
}

main();

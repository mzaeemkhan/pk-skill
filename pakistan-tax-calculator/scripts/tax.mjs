#!/usr/bin/env node

const SALARIED_SLABS = [
  { min: 0, max: 600000, fixed: 0, rate: 0 },
  { min: 600001, max: 1200000, fixed: 0, rate: 2.5, base: 600000 },
  { min: 1200001, max: 2200000, fixed: 15000, rate: 12.5, base: 1200000 },
  { min: 2200001, max: 3200000, fixed: 140000, rate: 22.5, base: 2200000 },
  { min: 3200001, max: 4100000, fixed: 365000, rate: 27.5, base: 3200000 },
  { min: 4100001, max: Infinity, fixed: 612500, rate: 35, base: 4100000 }
];

const BUSINESS_SLABS = [
  { min: 0, max: 600000, fixed: 0, rate: 0 },
  { min: 600001, max: 1200000, fixed: 0, rate: 15, base: 600000 },
  { min: 1200001, max: 1600000, fixed: 90000, rate: 20, base: 1200000 },
  { min: 1600001, max: 3200000, fixed: 170000, rate: 30, base: 1600000 },
  { min: 3200001, max: 5600000, fixed: 650000, rate: 40, base: 3200000 },
  { min: 5600001, max: Infinity, fixed: 1610000, rate: 45, base: 5600000 }
];

const WITHHOLDING = [
  { category: "Bank Profit", filer: "15%", nonFiler: "30%", section: "151" },
  { category: "Dividend", filer: "15%", nonFiler: "30%", section: "150" },
  { category: "Cash Withdrawal (>50K)", filer: "0%", nonFiler: "0.6%", section: "231A" },
  { category: "Property Sale", filer: "3%", nonFiler: "6%", section: "236C" },
  { category: "Property Purchase", filer: "3%", nonFiler: "6%", section: "236K" },
  { category: "Vehicle Registration", filer: "Varies by engine CC", nonFiler: "Double filer rate", section: "231B" },
  { category: "Mobile Phone Purchase", filer: "PKR 100-16,000 by price", nonFiler: "Double filer rate", section: "236H" },
  { category: "Function/Gathering", filer: "5%", nonFiler: "10%", section: "236D" },
  { category: "Education Fee (>200K/yr)", filer: "5%", nonFiler: "5%", section: "236I" },
  { category: "Electricity Bill (>25K/month)", filer: "0%", nonFiler: "7.5%", section: "235" },
  { category: "International Air Ticket", filer: "0%", nonFiler: "PKR 5,000-50,000 by class/destination", section: "236L" },
  { category: "Salary", filer: "Average rate on taxable income", nonFiler: "N/A", section: "149" }
];

const FILER_BENEFITS = [
  "Lower withholding tax rates (typically half of non-filer rates)",
  "No withholding tax on cash withdrawals",
  "No extra tax on electricity bills",
  "No advance tax on international travel",
  "Lower property transfer tax",
  "Lower vehicle registration tax",
  "Can purchase property above PKR 50 million (non-filers restricted)",
  "Can purchase vehicles above 1300cc (non-filers restricted since 2024)",
  "Can open new bank accounts without restrictions",
  "Required for government contracts above PKR 500,000",
  "Better banking limits — higher transaction thresholds"
];

const DEADLINES = [
  { type: "Salaried", deadline: "30 September", year: "Following tax year" },
  { type: "Business (AOP/Individual)", deadline: "30 September", year: "Following tax year" },
  { type: "Company", deadline: "31 December", year: "Following tax year" },
  { type: "Withholding Statement", deadline: "Monthly by 15th", year: "Each month" },
  { type: "Advance Tax (Quarterly)", deadline: "15 Sep, 15 Dec, 15 Mar, 15 Jun", year: "During tax year" },
  { type: "Wealth Statement", deadline: "30 September", year: "With income tax return" }
];

const FREELANCER_RATE = 0.25;
const DEFAULT_USD_PKR = 278;

function calculateTax(income, slabs) {
  for (const slab of slabs) {
    if (income >= slab.min && income <= slab.max) {
      if (slab.rate === 0) return { tax: 0, effectiveRate: 0, slab: `Up to PKR ${slab.max.toLocaleString()}` };
      const excess = income - slab.base;
      const tax = slab.fixed + (excess * slab.rate / 100);
      return {
        tax: Math.round(tax),
        effectiveRate: ((tax / income) * 100).toFixed(2) + '%',
        slab: `PKR ${slab.min.toLocaleString()} - ${slab.max === Infinity ? 'Above' : 'PKR ' + slab.max.toLocaleString()}`,
        breakdown: {
          fixedAmount: slab.fixed,
          rateApplied: slab.rate + '%',
          onExcessAbove: slab.base,
          excessAmount: excess,
          taxOnExcess: Math.round(excess * slab.rate / 100)
        }
      };
    }
  }
  return { tax: 0, effectiveRate: '0%' };
}

function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === 'help') {
    console.log(JSON.stringify({
      commands: [
        'calculate --income <amount> --type salaried|business [--period monthly]',
        'slabs [--year 2024] [--type salaried|business]',
        'freelancer --income <usd> [--currency usd]',
        'withholding',
        'filer-status',
        'deadlines'
      ]
    }));
    return;
  }

  if (cmd === 'calculate') {
    const incomeIdx = args.indexOf('--income');
    const typeIdx = args.indexOf('--type');
    const periodIdx = args.indexOf('--period');
    if (incomeIdx === -1 || !args[incomeIdx + 1]) {
      process.stderr.write('Usage: calculate --income <amount> --type salaried|business [--period monthly]\n');
      process.exit(1);
    }
    let income = parseFloat(args[incomeIdx + 1]);
    const type = typeIdx !== -1 ? args[typeIdx + 1] : 'salaried';
    const period = periodIdx !== -1 ? args[periodIdx + 1] : 'annual';
    const isMonthly = period === 'monthly';
    const annualIncome = isMonthly ? income * 12 : income;
    const slabs = type === 'business' ? BUSINESS_SLABS : SALARIED_SLABS;
    const result = calculateTax(annualIncome, slabs);
    const output = {
      input: { income, type, period },
      annualIncome,
      annualTax: result.tax,
      monthlyTax: Math.round(result.tax / 12),
      effectiveRate: result.effectiveRate,
      slab: result.slab,
      breakdown: result.breakdown || null,
      taxYear: "2024-25",
      note: "FBR income tax only. Does not include provincial or sales tax."
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  if (cmd === 'slabs') {
    const typeIdx = args.indexOf('--type');
    const type = typeIdx !== -1 ? args[typeIdx + 1] : 'salaried';
    const slabs = type === 'business' ? BUSINESS_SLABS : SALARIED_SLABS;
    const display = slabs.map(s => ({
      range: s.max === Infinity ? `Above PKR ${s.base.toLocaleString()}` : `PKR ${s.min.toLocaleString()} - ${s.max.toLocaleString()}`,
      fixedTax: s.fixed,
      rate: s.rate + '%',
      onExcessAbove: s.base || 0
    }));
    console.log(JSON.stringify({ taxYear: "2024-25", type, slabs: display }, null, 2));
    return;
  }

  if (cmd === 'freelancer') {
    const incomeIdx = args.indexOf('--income');
    if (incomeIdx === -1 || !args[incomeIdx + 1]) {
      process.stderr.write('Usage: freelancer --income <amount> [--currency usd]\n');
      process.exit(1);
    }
    const income = parseFloat(args[incomeIdx + 1]);
    const currIdx = args.indexOf('--currency');
    const currency = currIdx !== -1 ? args[currIdx + 1].toUpperCase() : 'USD';
    const incomePKR = currency === 'PKR' ? income : income * DEFAULT_USD_PKR;
    const tax = Math.round(incomePKR * FREELANCER_RATE / 100);
    console.log(JSON.stringify({
      input: { income, currency },
      incomePKR: Math.round(incomePKR),
      exchangeRate: currency === 'PKR' ? null : `1 ${currency} = ${DEFAULT_USD_PKR} PKR (approximate)`,
      taxRate: FREELANCER_RATE + '% (final tax)',
      tax,
      section: "154A — IT/ITeS Export Remittances",
      note: "Reduced rate for IT and IT-enabled services export income. Register with PSEB for eligibility. Rate valid for tax year 2024-25.",
      requirements: [
        "Must be registered with Pakistan Software Export Board (PSEB)",
        "Income must be received through proper banking channels",
        "Must file annual income tax return",
        "Applies to freelancers, IT companies, and call centers"
      ]
    }, null, 2));
    return;
  }

  if (cmd === 'withholding') {
    console.log(JSON.stringify({ taxYear: "2024-25", rates: WITHHOLDING, note: "Filer rates apply to Active Taxpayer List (ATL) members. Non-filer rates are typically double." }, null, 2));
    return;
  }

  if (cmd === 'filer-status') {
    console.log(JSON.stringify({
      title: "Benefits of Being an Active Taxpayer (Filer)",
      benefits: FILER_BENEFITS,
      howToCheck: "SMS your CNIC to 9966 — reply confirms ATL status",
      howToFile: "Visit iris.fbr.gov.pk to file returns online",
      note: "Active Taxpayer List (ATL) is published by FBR. Updated biweekly."
    }, null, 2));
    return;
  }

  if (cmd === 'deadlines') {
    console.log(JSON.stringify({ taxYear: "2024-25 (July 2024 - June 2025)", deadlines: DEADLINES, portal: "iris.fbr.gov.pk" }, null, 2));
    return;
  }

  process.stderr.write(`Unknown command: ${cmd}\n`);
  process.exit(1);
}

run();

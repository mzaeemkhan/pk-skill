#!/usr/bin/env node

const AS_OF = '2026-10-25';
const DEFAULT_YEAR = '2026-27';

// Slab: income up to `upTo` pays fixed + rate% of (income - base).
const BUSINESS_SLABS = [
  { upTo: 600000, fixed: 0, rate: 0, base: 0 },
  { upTo: 1200000, fixed: 0, rate: 15, base: 600000 },
  { upTo: 1600000, fixed: 90000, rate: 20, base: 1200000 },
  { upTo: 3200000, fixed: 170000, rate: 30, base: 1600000 },
  { upTo: 5600000, fixed: 650000, rate: 40, base: 3200000 },
  { upTo: Infinity, fixed: 1610000, rate: 45, base: 5600000 }
];

const YEARS = {
  '2026-27': {
    law: 'Finance Act 2026 (assent 26 Jun 2026), tax year 2027',
    salaried: [
      { upTo: 600000, fixed: 0, rate: 0, base: 0 },
      { upTo: 1200000, fixed: 0, rate: 1, base: 600000 },
      { upTo: 2200000, fixed: 6000, rate: 11, base: 1200000 },
      { upTo: 3200000, fixed: 116000, rate: 20, base: 2200000 },
      { upTo: 4100000, fixed: 316000, rate: 25, base: 3200000 },
      { upTo: 5600000, fixed: 541000, rate: 29, base: 4100000 },
      { upTo: 7000000, fixed: 976000, rate: 32, base: 5600000 },
      { upTo: Infinity, fixed: 1424000, rate: 35, base: 7000000 }
    ],
    business: BUSINESS_SLABS,
    surcharge: { salaried: 0, business: 10 },
    source: 'Mercans statutory alert (Finance Act 2026-27); taxwizard.pk FY26 vs FY27 comparison'
  },
  '2025-26': {
    law: 'Finance Act 2025, tax year 2026',
    salaried: [
      { upTo: 600000, fixed: 0, rate: 0, base: 0 },
      { upTo: 1200000, fixed: 0, rate: 1, base: 600000 },
      { upTo: 2200000, fixed: 6000, rate: 11, base: 1200000 },
      { upTo: 3200000, fixed: 116000, rate: 23, base: 2200000 },
      { upTo: 4100000, fixed: 346000, rate: 30, base: 3200000 },
      { upTo: Infinity, fixed: 616000, rate: 35, base: 4100000 }
    ],
    business: BUSINESS_SLABS,
    surcharge: { salaried: 9, business: 10 },
    source: 'Vialto Partners Finance Act 2025-26 summary; taxwizard.pk FY26 vs FY27 comparison'
  },
  '2024-25': {
    law: 'Finance Act 2024, tax year 2025',
    salaried: [
      { upTo: 600000, fixed: 0, rate: 0, base: 0 },
      { upTo: 1200000, fixed: 0, rate: 5, base: 600000 },
      { upTo: 2200000, fixed: 30000, rate: 15, base: 1200000 },
      { upTo: 3200000, fixed: 180000, rate: 25, base: 2200000 },
      { upTo: 4100000, fixed: 430000, rate: 30, base: 3200000 },
      { upTo: Infinity, fixed: 700000, rate: 35, base: 4100000 }
    ],
    business: BUSINESS_SLABS,
    surcharge: { salaried: 10, business: 10 },
    source: 'Vialto Partners Finance Bill 2024-25 amendments; EY Global Tax News 2024-1196'
  }
};

const SURCHARGE_THRESHOLD = 10000000;

// Section 151 conflicts across sources (20/40 vs 15/30); rows with verified:false are unconfirmed.
const WITHHOLDING = [
  { category: 'Profit on debt (bank deposits)', filer: '20%', nonFiler: '40%', section: '151', verified: true, note: 'Some rate cards show 15%/30% for individuals; confirm with your bank' },
  { category: 'Dividend (general)', filer: '15%', nonFiler: '30%', section: '150', verified: true },
  { category: 'Cash withdrawal (>50K/day)', filer: 'Nil', nonFiler: '0.8%', section: '231AB', verified: true },
  { category: 'Property sale (seller)', filer: '2.75%', nonFiler: '11.5%', section: '236C', verified: true },
  { category: 'Property purchase (buyer)', filer: '1.25%', nonFiler: '10.5% (≤50M), 14.5% (50-100M), 18.5% (>100M)', section: '236K', verified: true },
  { category: 'Electricity bill (>25K/month)', filer: 'Nil', nonFiler: '7.5%', section: '235', verified: true },
  { category: 'Vehicle registration', filer: 'Varies by engine CC / value', nonFiler: 'Multiple of filer rate', section: '231B', verified: false },
  { category: 'Function/gathering', filer: '5%', nonFiler: '10%', section: '236D', verified: false },
  { category: 'Education fee (>200K/yr)', filer: '5%', nonFiler: '5%', section: '236I', verified: false },
  { category: 'International air ticket', filer: 'Nil', nonFiler: 'Fixed amount by class/destination', section: '236L', verified: false },
  { category: 'Salary', filer: 'Average rate on taxable income', nonFiler: 'N/A', section: '149', verified: true }
];
const WITHHOLDING_SOURCE = 'filing.pk WHT rate card 2026-27; trustpointconsultants.com WHT card 2026-27 (secondary sources)';

const FILER_BENEFITS = [
  'Lower withholding tax rates (non-filer rates are typically 2x or more)',
  'No withholding tax on cash withdrawals',
  'No extra tax on electricity bills',
  'Lower property transfer tax',
  'Lower vehicle registration tax',
  'Fewer restrictions on large property and vehicle purchases',
  'Required for most government contracts',
  'Better banking limits — higher transaction thresholds'
];

const DEADLINES = [
  { type: 'Salaried', deadline: '30 September', year: 'Following tax year' },
  { type: 'Business (AOP/Individual)', deadline: '30 September', year: 'Following tax year' },
  { type: 'Company', deadline: '31 December', year: 'Following tax year' },
  { type: 'Withholding Statement', deadline: 'Monthly by 15th', year: 'Each month' },
  { type: 'Advance Tax (Quarterly)', deadline: '15 Sep, 15 Dec, 15 Mar, 15 Jun', year: 'During tax year' },
  { type: 'Wealth Statement', deadline: '30 September', year: 'With income tax return' }
];

const FREELANCER_RATE_PSEB = 0.25;
const FREELANCER_RATE_DEFAULT = 1;
const DEFAULT_USD_PKR = 280;

function arg(args, name) {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
}

function getYear(args) {
  const year = arg(args, '--year') || DEFAULT_YEAR;
  if (!YEARS[year]) {
    process.stderr.write(`Unknown --year ${year}. Use one of: ${Object.keys(YEARS).join(', ')}\n`);
    process.exit(1);
  }
  return year;
}

function calculateTax(income, slabs) {
  const slab = slabs.find(s => income <= s.upTo);
  const excess = Math.max(0, income - slab.base);
  const tax = slab.fixed + excess * slab.rate / 100;
  return {
    tax: Math.round(tax),
    effectiveRate: income > 0 ? ((tax / income) * 100).toFixed(2) + '%' : '0%',
    slab: slab.upTo === Infinity ? `Above PKR ${slab.base.toLocaleString()}` : `PKR ${slab.base.toLocaleString()} - ${slab.upTo.toLocaleString()}`,
    breakdown: { fixedAmount: slab.fixed, rateApplied: slab.rate + '%', onExcessAbove: slab.base, excessAmount: excess, taxOnExcess: Math.round(excess * slab.rate / 100) }
  };
}

function meta(year) {
  return { taxYear: year, law: YEARS[year].law, source: YEARS[year].source, asOf: AS_OF };
}

function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === 'help') {
    console.log(JSON.stringify({
      commands: [
        'calculate --income <amount> [--type salaried|business] [--period monthly] [--year 2026-27|2025-26|2024-25]',
        'slabs [--type salaried|business] [--year ...]',
        'freelancer --income <amount> [--currency usd|pkr] [--rate <pkr per usd>] [--pseb yes|no]',
        'withholding',
        'filer-status',
        'deadlines'
      ],
      defaultYear: DEFAULT_YEAR
    }, null, 2));
    return;
  }

  if (cmd === 'calculate') {
    const income = parseFloat(arg(args, '--income'));
    if (!Number.isFinite(income) || income < 0) {
      process.stderr.write('Usage: calculate --income <amount> [--type salaried|business] [--period monthly] [--year ...]\n');
      process.exit(1);
    }
    const type = arg(args, '--type') === 'business' ? 'business' : 'salaried';
    const period = arg(args, '--period') === 'monthly' ? 'monthly' : 'annual';
    const year = getYear(args);
    const annualIncome = period === 'monthly' ? income * 12 : income;
    const result = calculateTax(annualIncome, YEARS[year][type]);
    const surchargePct = annualIncome > SURCHARGE_THRESHOLD ? YEARS[year].surcharge[type] : 0;
    const surcharge = Math.round(result.tax * surchargePct / 100);
    const annualTax = result.tax + surcharge;
    console.log(JSON.stringify({
      input: { income, type, period },
      annualIncome,
      baseTax: result.tax,
      surcharge: { rate: surchargePct + '%', amount: surcharge, appliesAbove: SURCHARGE_THRESHOLD },
      annualTax,
      monthlyTax: Math.round(annualTax / 12),
      effectiveRate: annualIncome > 0 ? ((annualTax / annualIncome) * 100).toFixed(2) + '%' : '0%',
      slab: result.slab,
      breakdown: result.breakdown,
      ...meta(year),
      note: 'FBR income tax only. Excludes provincial and sales tax. Verify with FBR/a tax advisor before filing.'
    }, null, 2));
    return;
  }

  if (cmd === 'slabs') {
    const type = arg(args, '--type') === 'business' ? 'business' : 'salaried';
    const year = getYear(args);
    const slabs = YEARS[year][type].map(s => ({
      range: s.upTo === Infinity ? `Above PKR ${s.base.toLocaleString()}` : `PKR ${s.base.toLocaleString()} - ${s.upTo.toLocaleString()}`,
      fixedTax: s.fixed,
      rate: s.rate + '%',
      onExcessAbove: s.base
    }));
    console.log(JSON.stringify({
      ...meta(year),
      type,
      slabs,
      surcharge: `${YEARS[year].surcharge[type]}% of tax if income > PKR ${SURCHARGE_THRESHOLD.toLocaleString()}`,
      ...(type === 'business' ? { note: 'Non-salaried slabs unchanged since Finance Act 2024 per Vialto summaries; full enacted table not confirmed from FBR text.' } : {})
    }, null, 2));
    return;
  }

  if (cmd === 'freelancer') {
    const income = parseFloat(arg(args, '--income'));
    if (!Number.isFinite(income) || income < 0) {
      process.stderr.write('Usage: freelancer --income <amount> [--currency usd|pkr] [--rate <pkr per usd>] [--pseb yes|no]\n');
      process.exit(1);
    }
    const currency = (arg(args, '--currency') || 'USD').toUpperCase();
    const fx = parseFloat(arg(args, '--rate')) || DEFAULT_USD_PKR;
    const pseb = arg(args, '--pseb') !== 'no';
    const rate = pseb ? FREELANCER_RATE_PSEB : FREELANCER_RATE_DEFAULT;
    const incomePKR = currency === 'PKR' ? income : income * fx;
    console.log(JSON.stringify({
      input: { income, currency, psebRegistered: pseb },
      incomePKR: Math.round(incomePKR),
      exchangeRate: currency === 'PKR' ? null : `1 ${currency} = ${fx} PKR${arg(args, '--rate') ? '' : ' (approximate default; pass --rate)'}`,
      taxRate: rate + '% (final tax, withheld by bank under s.154A)',
      tax: Math.round(incomePKR * rate / 100),
      rule: '0.25% for PSEB-registered IT/ITeS exporters receiving via banking channels; 1% otherwise. 0.25% regime reported extended to 30 Jun 2029 in Budget 2026-27.',
      source: 'beancount.io guide (Aug 2026) — single secondary source; confirm with FBR/PSEB',
      asOf: AS_OF,
      requirements: [
        'Register with Pakistan Software Export Board (PSEB) and renew annually',
        'Receive income through proper banking channels',
        'File annual income tax return'
      ]
    }, null, 2));
    return;
  }

  if (cmd === 'withholding') {
    console.log(JSON.stringify({
      taxYear: DEFAULT_YEAR,
      rates: WITHHOLDING,
      source: WITHHOLDING_SOURCE,
      asOf: AS_OF,
      note: 'Filer = on Active Taxpayer List (ATL). Rows with verified:false are not confirmed for the current year.'
    }, null, 2));
    return;
  }

  if (cmd === 'filer-status') {
    console.log(JSON.stringify({
      title: 'Benefits of Being an Active Taxpayer (Filer)',
      benefits: FILER_BENEFITS,
      howToCheck: 'SMS "ATL <space> 13-digit CNIC" to 9966',
      howToFile: 'iris.fbr.gov.pk',
      asOf: AS_OF
    }, null, 2));
    return;
  }

  if (cmd === 'deadlines') {
    console.log(JSON.stringify({ taxYear: `${DEFAULT_YEAR} (July - June)`, deadlines: DEADLINES, portal: 'iris.fbr.gov.pk', asOf: AS_OF, note: 'FBR often extends the 30 September deadline; check fbr.gov.pk.' }, null, 2));
    return;
  }

  process.stderr.write(`Unknown command: ${cmd}\n`);
  process.exit(1);
}

run();

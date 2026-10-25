#!/usr/bin/env node

const OPERATORS = [
  { name: "Jazz", prefixes: ["0300","0301","0302","0303","0304","0305","0306","0307","0308","0309"], balanceUSSD: "*111#", dataUSSD: "*999#", parent: "Jazz (VEON / PMCL)" },
  { name: "Telenor", prefixes: ["0340","0341","0342","0343","0344","0345","0346","0347","0348","0349"], balanceUSSD: "*444#", dataUSSD: "*222#", parent: "PTCL group (acquired Telenor Pakistan 31 Dec 2025; integration into PTML/Ufone reported Jul 2026)" },
  { name: "Zong", prefixes: ["0310","0311","0312","0313","0314","0315","0316","0317","0318","0319"], balanceUSSD: "*222#", dataUSSD: "*369#", parent: "CMPak (China Mobile Pakistan)" },
  { name: "Ufone", prefixes: ["0330","0331","0332","0333","0334","0335","0336","0337","0338","0339"], balanceUSSD: "*124#", dataUSSD: "*706#", parent: "PTML (PTCL group)", note: "*706# shows Super Card/bundle usage" },
  { name: "SCOM", prefixes: ["0355","0356","0357"], balanceUSSD: "*444#", dataUSSD: "*777#", parent: "SCO (Special Communications Organization)", note: "Operates in AJK and Gilgit-Baltistan only" }
];
// Only Ufone *124# balance code was re-verified (2026-10-25); other USSD codes are unverified.
const CODES_VERIFIED = { Ufone: true };

const DISCLAIMER = "Prices change often; confirm with operator via USSD/website/app before subscribing. Jazz/Telenor PTA list prices may exclude 15% withholding tax.";

// Verified against PTA price list (30 Sep 2026) as reported by pakera.pk, 10-21 Oct 2026.
const VERIFIED = [
  { operator: "Jazz", name: "Weekly X Plus", type: "bundle", dataGB: 100, minutes: 2000, offNetMinutes: 600, sms: null, pricePKR: 695, validity: "7 days", ussd: "*852#", lastVerified: "2026-10-19" },
  { operator: "Jazz", name: "Weekly Freedom", type: "bundle", dataGB: 50, minutes: 1000, offNetMinutes: 300, sms: null, pricePKR: 652, validity: "7 days", ussd: "*737#", lastVerified: "2026-10-19", note: "Another source lists Rs 565 / *711#" },
  { operator: "Jazz", name: "Weekly Super Max", type: "bundle", dataGB: 30, minutes: 1000, offNetMinutes: 150, sms: null, pricePKR: 608, validity: "7 days", ussd: "*506#", lastVerified: "2026-10-19" },
  { operator: "Jazz", name: "Weekly Super Plus", type: "bundle", dataGB: 10, minutes: 1000, offNetMinutes: 120, sms: null, pricePKR: 521, validity: "7 days", ussd: "*505#", lastVerified: "2026-10-19" },
  { operator: "Jazz", name: "Lajawab Haftawar Offer", type: "bundle", dataGB: 2, minutes: 2000, offNetMinutes: 30, sms: null, pricePKR: 209, validity: "7 days", ussd: "*565#", lastVerified: "2026-10-19" },
  { operator: "Jazz", name: "Monthly X Plus", type: "bundle", dataGB: 200, minutes: 5000, offNetMinutes: 1500, sms: 5000, pricePKR: 2695, validity: "30 days", ussd: "*872#", lastVerified: "2026-10-10" },
  { operator: "Jazz", name: "Monthly Freedom", type: "bundle", dataGB: 100, minutes: null, offNetMinutes: null, sms: null, pricePKR: 2608, validity: "30 days", ussd: null, lastVerified: "2026-10-10", note: "Price excludes WHT" },
  { operator: "Telenor", name: "Monthly Prime", type: "bundle", dataGB: 300, minutes: null, offNetMinutes: null, sms: null, pricePKR: 2087, validity: "30 days", ussd: null, lastVerified: "2026-10-10", note: "Price excludes WHT" },
  { operator: "Telenor", name: "Monthly Ultimate", type: "bundle", dataGB: 200, minutes: "Unlimited", offNetMinutes: 1200, sms: null, pricePKR: 1739, validity: "30 days", ussd: null, lastVerified: "2026-10-10", note: "Price excludes WHT" },
  { operator: "Telenor", name: "Weekly Prime", type: "bundle", dataGB: 100, minutes: null, offNetMinutes: null, sms: null, pricePKR: 630, validity: "7 days", ussd: null, lastVerified: "2026-10-10", note: "Price excludes WHT" },
  { operator: "Zong", name: "Monthly Pro Max Basic", type: "bundle", dataGB: 200, minutes: null, offNetMinutes: null, sms: null, pricePKR: 2700, validity: "30 days", ussd: null, lastVerified: "2026-10-10" },
  { operator: "Zong", name: "Monthly Digital Max Basic", type: "bundle", dataGB: 100, minutes: null, offNetMinutes: null, sms: null, pricePKR: 2600, validity: "30 days", ussd: null, lastVerified: "2026-10-10" },
  { operator: "Zong", name: "Weekly Digital Max", type: "bundle", dataGB: 100, minutes: null, offNetMinutes: null, sms: null, pricePKR: 750, validity: "7 days", ussd: null, lastVerified: "2026-10-10" },
  { operator: "Ufone", name: "Weekly Mega Offer", type: "bundle", dataGB: 150, minutes: 10000, offNetMinutes: 1500, sms: 10000, pricePKR: 730, validity: "7 days", ussd: null, lastVerified: "2026-10-20", note: "50 GB of the data is social-only" },
  { operator: "Ufone", name: "Weekly Power Grand", type: "bundle", dataGB: 100, minutes: 10000, offNetMinutes: 1200, sms: 7000, pricePKR: 680, validity: "7 days", ussd: null, lastVerified: "2026-10-20" },
  { operator: "Ufone", name: "Weekly Power Prime", type: "bundle", dataGB: 50, minutes: 5000, offNetMinutes: 500, sms: 5000, pricePKR: 630, validity: "7 days", ussd: "*7777#", lastVerified: "2026-10-20" },
  { operator: "Ufone", name: "Weekly Power Max", type: "bundle", dataGB: 25, minutes: 3000, offNetMinutes: 450, sms: 3000, pricePKR: 600, validity: "7 days", ussd: "*1234*2#", lastVerified: "2026-10-20" },
  { operator: "Ufone", name: "Digital Mega Offer", type: "bundle", dataGB: 200, minutes: null, offNetMinutes: null, sms: null, pricePKR: 1878, validity: "30 days", ussd: null, lastVerified: "2026-10-10" },
  { operator: "Ufone", name: "Monthly Grand Offer", type: "bundle", dataGB: 200, minutes: null, offNetMinutes: null, sms: null, pricePKR: 2300, validity: "30 days", ussd: null, lastVerified: "2026-10-10" }
].map(p => ({ ...p, estimate: false, source: "pakera.pk (PTA price list)" }));

// v1 entries: never verified, prices predate 2026 increases. Kept for reference only.
const LEGACY = [
  { operator: "Jazz", name: "Daily Mega", type: "bundle", dataGB: 0.5, minutes: 25, sms: 25, pricePKR: 30, validity: "1 day", ussd: "*340#" },
  { operator: "Jazz", name: "Daily Social", type: "data", dataGB: 1, minutes: 0, sms: 0, pricePKR: 15, validity: "1 day", ussd: "*661#", note: "Social media only (WhatsApp, Facebook, Instagram)" },
  { operator: "Jazz", name: "Weekly Mega", type: "bundle", dataGB: 3, minutes: 150, sms: 150, pricePKR: 190, validity: "7 days", ussd: "*505#" },
  { operator: "Jazz", name: "Weekly Premium", type: "bundle", dataGB: 5, minutes: 300, sms: 300, pricePKR: 330, validity: "7 days", ussd: "*5050#" },
  { operator: "Jazz", name: "Weekly Internet", type: "data", dataGB: 5, minutes: 0, sms: 0, pricePKR: 170, validity: "7 days", ussd: "*117*11#" },
  { operator: "Jazz", name: "Monthly Supreme", type: "bundle", dataGB: 12, minutes: 1500, sms: 1500, pricePKR: 799, validity: "30 days", ussd: "*706#" },
  { operator: "Jazz", name: "Monthly Mega Plus", type: "bundle", dataGB: 8, minutes: 1000, sms: 1000, pricePKR: 599, validity: "30 days", ussd: "*707#" },
  { operator: "Jazz", name: "Monthly Internet Plus", type: "data", dataGB: 20, minutes: 0, sms: 0, pricePKR: 650, validity: "30 days", ussd: "*117*30#" },
  { operator: "Jazz", name: "Monthly Social", type: "data", dataGB: 15, minutes: 0, sms: 0, pricePKR: 250, validity: "30 days", ussd: "*661*30#", note: "Social media only" },
  { operator: "Jazz", name: "Super Duper Card", type: "bundle", dataGB: 2, minutes: 500, sms: 500, pricePKR: 399, validity: "30 days", ussd: "*601#" },
  { operator: "Jazz", name: "Daily Data", type: "data", dataGB: 1, minutes: 0, sms: 0, pricePKR: 25, validity: "1 day", ussd: "*117*1#" },
  { operator: "Jazz", name: "3-Day Bundle", type: "bundle", dataGB: 2, minutes: 60, sms: 60, pricePKR: 85, validity: "3 days", ussd: "*340*3#" },
  { operator: "Telenor", name: "Daily Mega", type: "bundle", dataGB: 0.5, minutes: 30, sms: 30, pricePKR: 29, validity: "1 day", ussd: "*5*1#" },
  { operator: "Telenor", name: "Daily Data", type: "data", dataGB: 1, minutes: 0, sms: 0, pricePKR: 22, validity: "1 day", ussd: "*10#" },
  { operator: "Telenor", name: "Weekly Mega", type: "bundle", dataGB: 3, minutes: 150, sms: 150, pricePKR: 170, validity: "7 days", ussd: "*5*7#" },
  { operator: "Telenor", name: "Weekly Internet", type: "data", dataGB: 4, minutes: 0, sms: 0, pricePKR: 150, validity: "7 days", ussd: "*10*7#" },
  { operator: "Telenor", name: "Weekly Premium", type: "bundle", dataGB: 6, minutes: 300, sms: 300, pricePKR: 300, validity: "7 days", ussd: "*5*77#" },
  { operator: "Telenor", name: "Monthly Premium", type: "bundle", dataGB: 12, minutes: 1500, sms: 1500, pricePKR: 750, validity: "30 days", ussd: "*5*30#" },
  { operator: "Telenor", name: "Monthly Mega", type: "bundle", dataGB: 8, minutes: 800, sms: 800, pricePKR: 550, validity: "30 days", ussd: "*5*300#" },
  { operator: "Telenor", name: "Monthly Internet", type: "data", dataGB: 18, minutes: 0, sms: 0, pricePKR: 600, validity: "30 days", ussd: "*10*30#" },
  { operator: "Telenor", name: "Monthly Social", type: "data", dataGB: 12, minutes: 0, sms: 0, pricePKR: 200, validity: "30 days", ussd: "*345*30#", note: "Social media only" },
  { operator: "Telenor", name: "Daily Night", type: "data", dataGB: 2, minutes: 0, sms: 0, pricePKR: 15, validity: "1 day (12am-9am)", ussd: "*10*1#", note: "Night hours only" },
  { operator: "Telenor", name: "3-Day Mega", type: "bundle", dataGB: 1.5, minutes: 60, sms: 60, pricePKR: 65, validity: "3 days", ussd: "*5*3#" },
  { operator: "Zong", name: "Daily Data Max", type: "data", dataGB: 1, minutes: 0, sms: 0, pricePKR: 35, validity: "1 day", ussd: "*6464#" },
  { operator: "Zong", name: "Daily Bundle", type: "bundle", dataGB: 0.5, minutes: 30, sms: 30, pricePKR: 32, validity: "1 day", ussd: "*3000#" },
  { operator: "Zong", name: "Weekly Mega", type: "bundle", dataGB: 3.5, minutes: 200, sms: 200, pricePKR: 200, validity: "7 days", ussd: "*3007#" },
  { operator: "Zong", name: "Weekly Internet", type: "data", dataGB: 5, minutes: 0, sms: 0, pricePKR: 180, validity: "7 days", ussd: "*6464*7#" },
  { operator: "Zong", name: "Weekly Premium", type: "bundle", dataGB: 6, minutes: 350, sms: 350, pricePKR: 320, validity: "7 days", ussd: "*3077#" },
  { operator: "Zong", name: "Monthly Supreme", type: "bundle", dataGB: 15, minutes: 1500, sms: 1500, pricePKR: 850, validity: "30 days", ussd: "*30030#" },
  { operator: "Zong", name: "Monthly Mega", type: "bundle", dataGB: 10, minutes: 1000, sms: 1000, pricePKR: 650, validity: "30 days", ussd: "*300030#" },
  { operator: "Zong", name: "Monthly Internet", type: "data", dataGB: 25, minutes: 0, sms: 0, pricePKR: 700, validity: "30 days", ussd: "*6464*30#" },
  { operator: "Zong", name: "Monthly Social", type: "data", dataGB: 15, minutes: 0, sms: 0, pricePKR: 250, validity: "30 days", ussd: "*567*30#", note: "Social media only" },
  { operator: "Zong", name: "Zong 4G Device Bundle", type: "data", dataGB: 50, minutes: 0, sms: 0, pricePKR: 1500, validity: "30 days", ussd: "*6060#", note: "MiFi/Dongle devices only" },
  { operator: "Zong", name: "3-Day Bundle", type: "bundle", dataGB: 2, minutes: 75, sms: 75, pricePKR: 95, validity: "3 days", ussd: "*3003#" },
  { operator: "Ufone", name: "Daily Pakistan", type: "bundle", dataGB: 0.5, minutes: 25, sms: 25, pricePKR: 28, validity: "1 day", ussd: "*5200#" },
  { operator: "Ufone", name: "Daily Data", type: "data", dataGB: 1, minutes: 0, sms: 0, pricePKR: 20, validity: "1 day", ussd: "*8888#" },
  { operator: "Ufone", name: "Weekly Mega", type: "bundle", dataGB: 3, minutes: 150, sms: 150, pricePKR: 175, validity: "7 days", ussd: "*5207#" },
  { operator: "Ufone", name: "Weekly Data", type: "data", dataGB: 4, minutes: 0, sms: 0, pricePKR: 140, validity: "7 days", ussd: "*8887#" },
  { operator: "Ufone", name: "Weekly Premium", type: "bundle", dataGB: 5, minutes: 300, sms: 300, pricePKR: 290, validity: "7 days", ussd: "*52077#" },
  { operator: "Ufone", name: "Monthly Data", type: "data", dataGB: 15, minutes: 0, sms: 0, pricePKR: 550, validity: "30 days", ussd: "*888830#" },
  { operator: "Ufone", name: "Monthly Mega", type: "bundle", dataGB: 8, minutes: 800, sms: 800, pricePKR: 600, validity: "30 days", ussd: "*520030#" },
  { operator: "Ufone", name: "Monthly Supreme", type: "bundle", dataGB: 12, minutes: 1500, sms: 1500, pricePKR: 800, validity: "30 days", ussd: "*5200030#" },
  { operator: "Ufone", name: "Monthly Social", type: "data", dataGB: 10, minutes: 0, sms: 0, pricePKR: 200, validity: "30 days", ussd: "*4455*30#", note: "Social media only" },
  { operator: "Ufone", name: "3-Day Bundle", type: "bundle", dataGB: 1.5, minutes: 50, sms: 50, pricePKR: 60, validity: "3 days", ussd: "*5203#" },
  { operator: "Ufone", name: "Daily Night", type: "data", dataGB: 2, minutes: 0, sms: 0, pricePKR: 12, validity: "1 day (12am-9am)", ussd: "*8881#", note: "Night hours only" },
  { operator: "SCOM", name: "Daily Bundle", type: "bundle", dataGB: 0.3, minutes: 20, sms: 20, pricePKR: 25, validity: "1 day", ussd: "*123*1#" },
  { operator: "SCOM", name: "Weekly Bundle", type: "bundle", dataGB: 2, minutes: 100, sms: 100, pricePKR: 150, validity: "7 days", ussd: "*123*7#" },
  { operator: "SCOM", name: "Monthly Bundle", type: "bundle", dataGB: 6, minutes: 500, sms: 500, pricePKR: 500, validity: "30 days", ussd: "*123*30#" }
].map(p => ({ ...p, estimate: true, lastVerified: null, note: [p.note, "v1 entry, likely outdated"].filter(Boolean).join("; ") }));

const PACKAGES = [...VERIFIED, ...LEGACY];

function arg(args, name) {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
}

function validityFilter(v) {
  return v === 'daily' ? '1 day' : v === 'weekly' ? '7 day' : '30 day';
}

function byOperator(pkgs, op) {
  return op ? pkgs.filter(p => p.operator.toLowerCase() === op.toLowerCase()) : pkgs;
}

function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const verifiedOnly = args.includes('--verified');
  const pool = verifiedOnly ? VERIFIED : PACKAGES;

  if (!cmd || cmd === 'help') {
    console.log(JSON.stringify({ commands: [
      'search [--operator <name>] [--type bundle|data] [--validity daily|weekly|monthly] [--verified]',
      'list [--operator <name>] [--verified]',
      'compare --operator1 <name> --operator2 <name> --validity <daily|weekly|monthly> [--verified]',
      'operators',
      'activate --operator <name> --package <name>',
      'balance --operator <name>'
    ]}, null, 2));
    return;
  }

  if (cmd === 'operators') {
    const summary = OPERATORS.map(o => ({
      name: o.name, parent: o.parent,
      prefixes: o.prefixes.slice(0, 3).join(', ') + '...',
      balanceCheck: o.balanceUSSD, dataCheck: o.dataUSSD, codesVerified: !!CODES_VERIFIED[o.name],
      note: o.note || null
    }));
    console.log(JSON.stringify({ count: summary.length, operators: summary }, null, 2));
    return;
  }

  if (cmd === 'list') {
    const summary = byOperator(pool, arg(args, '--operator')).map(p => ({
      operator: p.operator, name: p.name, type: p.type,
      price: `PKR ${p.pricePKR}`, validity: p.validity,
      data: p.dataGB + ' GB', minutes: p.minutes, offNetMinutes: p.offNetMinutes ?? null, sms: p.sms,
      estimate: p.estimate, lastVerified: p.lastVerified
    }));
    console.log(JSON.stringify({ count: summary.length, packages: summary, disclaimer: DISCLAIMER }, null, 2));
    return;
  }

  if (cmd === 'search') {
    let pkgs = byOperator(pool, arg(args, '--operator'));
    const type = arg(args, '--type');
    const validity = arg(args, '--validity');
    if (type) pkgs = pkgs.filter(p => p.type === type);
    if (validity) pkgs = pkgs.filter(p => p.validity.toLowerCase().includes(validityFilter(validity.toLowerCase())));
    console.log(JSON.stringify({ count: pkgs.length, packages: pkgs, disclaimer: DISCLAIMER }, null, 2));
    return;
  }

  if (cmd === 'compare') {
    const op1 = arg(args, '--operator1');
    const op2 = arg(args, '--operator2');
    const v = arg(args, '--validity');
    if (!op1 || !op2 || !v) {
      process.stderr.write('Usage: compare --operator1 <name> --operator2 <name> --validity <daily|weekly|monthly>\n');
      process.exit(1);
    }
    const vf = validityFilter(v.toLowerCase());
    const pick = op => byOperator(pool, op).filter(p => p.validity.toLowerCase().includes(vf))
      .map(p => ({ ...p, pkrPerGB: p.dataGB ? Math.round(p.pricePKR / p.dataGB * 10) / 10 : null }));
    console.log(JSON.stringify({
      validity: v,
      [op1.toLowerCase()]: pick(op1),
      [op2.toLowerCase()]: pick(op2),
      disclaimer: DISCLAIMER
    }, null, 2));
    return;
  }

  if (cmd === 'activate') {
    const op = arg(args, '--operator');
    const pkgName = arg(args, '--package');
    if (!op || !pkgName) {
      process.stderr.write('Usage: activate --operator <name> --package <name>\n');
      process.exit(1);
    }
    const pkg = PACKAGES.find(p => p.operator.toLowerCase() === op.toLowerCase() && p.name.toLowerCase().includes(pkgName.toLowerCase()));
    if (!pkg) {
      console.log(JSON.stringify({ error: 'Package not found', operator: op, query: pkgName }));
      return;
    }
    console.log(JSON.stringify({
      package: pkg.name, operator: pkg.operator,
      activationCode: pkg.ussd,
      instruction: pkg.ussd ? `Dial ${pkg.ussd} from your ${pkg.operator} number` : `No verified code; subscribe via the ${pkg.operator} app or helpline`,
      price: `PKR ${pkg.pricePKR}`,
      validity: pkg.validity,
      estimate: pkg.estimate,
      lastVerified: pkg.lastVerified,
      disclaimer: DISCLAIMER
    }, null, 2));
    return;
  }

  if (cmd === 'balance') {
    const name = arg(args, '--operator');
    if (!name) {
      process.stderr.write('Usage: balance --operator <name>\n');
      process.exit(1);
    }
    const op = OPERATORS.find(o => o.name.toLowerCase() === name.toLowerCase());
    if (!op) {
      console.log(JSON.stringify({ error: 'Operator not found', available: OPERATORS.map(o => o.name) }));
      return;
    }
    console.log(JSON.stringify({
      operator: op.name,
      checkBalance: op.balanceUSSD,
      checkData: op.dataUSSD,
      instruction: `Dial ${op.balanceUSSD} for balance, ${op.dataUSSD} for remaining data`,
      prefixes: op.prefixes,
      codesVerified: !!CODES_VERIFIED[op.name],
      disclaimer: DISCLAIMER
    }, null, 2));
    return;
  }

  process.stderr.write(`Unknown command: ${cmd}\n`);
  process.exit(1);
}

run();

#!/usr/bin/env node

const OPERATORS = [
  { name: "Jazz", prefixes: ["0300","0301","0302","0303","0304","0305","0306","0307","0308","0309"], balanceUSSD: "*111#", dataUSSD: "*999#", parent: "Jazz (VEON/PMCL)", subscribers: "75M+" },
  { name: "Telenor", prefixes: ["0340","0341","0342","0343","0344","0345","0346","0347","0348","0349"], balanceUSSD: "*444#", dataUSSD: "*222#", parent: "Telenor Pakistan (CMPak)", subscribers: "50M+" },
  { name: "Zong", prefixes: ["0310","0311","0312","0313","0314","0315","0316","0317","0318","0319"], balanceUSSD: "*222#", dataUSSD: "*369#", parent: "Zong (China Mobile Pakistan)", subscribers: "45M+" },
  { name: "Ufone", prefixes: ["0330","0331","0332","0333","0334","0335","0336","0337","0338","0339"], balanceUSSD: "*706#", dataUSSD: "*5050#", parent: "Ufone (PTML/Etisalat)", subscribers: "35M+" },
  { name: "SCOM", prefixes: ["0355","0356","0357"], balanceUSSD: "*444#", dataUSSD: "*777#", parent: "SCO (Special Communications Organization)", subscribers: "3M+", note: "Operates in AJK and Gilgit-Baltistan only" }
];

const PACKAGES = [
  // Jazz
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

  // Telenor
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

  // Zong
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

  // Ufone
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

  // SCOM
  { operator: "SCOM", name: "Daily Bundle", type: "bundle", dataGB: 0.3, minutes: 20, sms: 20, pricePKR: 25, validity: "1 day", ussd: "*123*1#" },
  { operator: "SCOM", name: "Weekly Bundle", type: "bundle", dataGB: 2, minutes: 100, sms: 100, pricePKR: 150, validity: "7 days", ussd: "*123*7#" },
  { operator: "SCOM", name: "Monthly Bundle", type: "bundle", dataGB: 6, minutes: 500, sms: 500, pricePKR: 500, validity: "30 days", ussd: "*123*30#" }
];

function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === 'help') {
    console.log(JSON.stringify({ commands: [
      'search --operator <name> [--type bundle|data] [--validity daily|weekly|monthly]',
      'list [--operator <name>]',
      'compare --operator1 <name> --operator2 <name> --validity <daily|weekly|monthly>',
      'operators',
      'activate --operator <name> --package <name>',
      'balance --operator <name>'
    ]}));
    return;
  }

  if (cmd === 'operators') {
    const summary = OPERATORS.map(o => ({
      name: o.name, parent: o.parent, subscribers: o.subscribers,
      prefixes: o.prefixes.slice(0, 3).join(', ') + '...',
      balanceCheck: o.balanceUSSD, dataCheck: o.dataUSSD,
      note: o.note || null
    }));
    console.log(JSON.stringify({ count: summary.length, operators: summary }, null, 2));
    return;
  }

  if (cmd === 'list') {
    const opIdx = args.indexOf('--operator');
    const op = opIdx !== -1 ? args[opIdx + 1] : null;
    let pkgs = PACKAGES;
    if (op) pkgs = pkgs.filter(p => p.operator.toLowerCase() === op.toLowerCase());
    const summary = pkgs.map(p => ({
      operator: p.operator, name: p.name, type: p.type,
      price: `PKR ${p.pricePKR}`, validity: p.validity,
      data: p.dataGB + ' GB', minutes: p.minutes, sms: p.sms
    }));
    console.log(JSON.stringify({ count: summary.length, packages: summary }, null, 2));
    return;
  }

  if (cmd === 'search') {
    const opIdx = args.indexOf('--operator');
    const typeIdx = args.indexOf('--type');
    const valIdx = args.indexOf('--validity');
    let pkgs = PACKAGES;
    if (opIdx !== -1 && args[opIdx + 1]) pkgs = pkgs.filter(p => p.operator.toLowerCase() === args[opIdx + 1].toLowerCase());
    if (typeIdx !== -1 && args[typeIdx + 1]) pkgs = pkgs.filter(p => p.type === args[typeIdx + 1]);
    if (valIdx !== -1 && args[valIdx + 1]) {
      const v = args[valIdx + 1].toLowerCase();
      pkgs = pkgs.filter(p => p.validity.toLowerCase().includes(v === 'daily' ? '1 day' : v === 'weekly' ? '7 day' : '30 day'));
    }
    console.log(JSON.stringify({ count: pkgs.length, packages: pkgs }, null, 2));
    return;
  }

  if (cmd === 'compare') {
    const op1Idx = args.indexOf('--operator1');
    const op2Idx = args.indexOf('--operator2');
    const valIdx = args.indexOf('--validity');
    if (op1Idx === -1 || op2Idx === -1 || valIdx === -1) {
      process.stderr.write('Usage: compare --operator1 <name> --operator2 <name> --validity <daily|weekly|monthly>\n');
      process.exit(1);
    }
    const op1 = args[op1Idx + 1].toLowerCase();
    const op2 = args[op2Idx + 1].toLowerCase();
    const v = args[valIdx + 1].toLowerCase();
    const vFilter = v === 'daily' ? '1 day' : v === 'weekly' ? '7 day' : '30 day';
    const pkgs1 = PACKAGES.filter(p => p.operator.toLowerCase() === op1 && p.validity.toLowerCase().includes(vFilter));
    const pkgs2 = PACKAGES.filter(p => p.operator.toLowerCase() === op2 && p.validity.toLowerCase().includes(vFilter));
    console.log(JSON.stringify({
      validity: v,
      [op1]: pkgs1,
      [op2]: pkgs2,
      note: "Compare data/price ratio. Prices in PKR, inclusive of tax."
    }, null, 2));
    return;
  }

  if (cmd === 'activate') {
    const opIdx = args.indexOf('--operator');
    const pkgIdx = args.indexOf('--package');
    if (opIdx === -1 || pkgIdx === -1) {
      process.stderr.write('Usage: activate --operator <name> --package <name>\n');
      process.exit(1);
    }
    const op = args[opIdx + 1].toLowerCase();
    const pkgName = args[pkgIdx + 1].toLowerCase();
    const pkg = PACKAGES.find(p => p.operator.toLowerCase() === op && p.name.toLowerCase().includes(pkgName));
    if (!pkg) {
      console.log(JSON.stringify({ error: 'Package not found', operator: args[opIdx + 1], query: args[pkgIdx + 1] }));
      return;
    }
    console.log(JSON.stringify({
      package: pkg.name, operator: pkg.operator,
      activationCode: pkg.ussd,
      instruction: `Dial ${pkg.ussd} from your ${pkg.operator} number`,
      price: `PKR ${pkg.pricePKR}`,
      validity: pkg.validity,
      note: "Balance will be deducted from prepaid credit. Ensure sufficient balance."
    }, null, 2));
    return;
  }

  if (cmd === 'balance') {
    const opIdx = args.indexOf('--operator');
    if (opIdx === -1 || !args[opIdx + 1]) {
      process.stderr.write('Usage: balance --operator <name>\n');
      process.exit(1);
    }
    const op = OPERATORS.find(o => o.name.toLowerCase() === args[opIdx + 1].toLowerCase());
    if (!op) {
      console.log(JSON.stringify({ error: 'Operator not found', available: OPERATORS.map(o => o.name) }));
      return;
    }
    console.log(JSON.stringify({
      operator: op.name,
      checkBalance: op.balanceUSSD,
      checkData: op.dataUSSD,
      instruction: `Dial ${op.balanceUSSD} for balance, ${op.dataUSSD} for remaining data`,
      prefixes: op.prefixes
    }, null, 2));
    return;
  }

  process.stderr.write(`Unknown command: ${cmd}\n`);
  process.exit(1);
}

run();

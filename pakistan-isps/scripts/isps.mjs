#!/usr/bin/env node

const ISPS = [
  {
    name: 'PTCL', slug: 'ptcl', type: ['dsl', 'fiber'], website: 'ptcl.com.pk', helpline: '1218',
    cities: ['Nationwide'],
    packages: [
      { name: 'CharJi 8', speed: 8, upload: 1, dataLimit: 'Unlimited', pricePKR: 1799, type: 'dsl' },
      { name: 'CharJi 15', speed: 15, upload: 2, dataLimit: 'Unlimited', pricePKR: 2299, type: 'dsl' },
      { name: 'CharJi 25', speed: 25, upload: 3, dataLimit: 'Unlimited', pricePKR: 2799, type: 'dsl' },
      { name: 'Flash Fiber 25', speed: 25, upload: 5, dataLimit: 'Unlimited', pricePKR: 3199, type: 'fiber' },
      { name: 'Flash Fiber 50', speed: 50, upload: 10, dataLimit: 'Unlimited', pricePKR: 4199, type: 'fiber' },
      { name: 'Flash Fiber 100', speed: 100, upload: 20, dataLimit: 'Unlimited', pricePKR: 5999, type: 'fiber' },
      { name: 'Flash Fiber 150', speed: 150, upload: 30, dataLimit: 'Unlimited', pricePKR: 7999, type: 'fiber' },
      { name: 'Flash Fiber 200', speed: 200, upload: 40, dataLimit: 'Unlimited', pricePKR: 9999, type: 'fiber' },
    ],
  },
  {
    name: 'StormFiber', slug: 'stormfiber', type: ['fiber'], website: 'stormfiber.com', helpline: '0800-11-786',
    cities: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Hyderabad'],
    packages: [
      { name: 'Storm 15', speed: 15, upload: 15, dataLimit: 'Unlimited', pricePKR: 2500 },
      { name: 'Storm 30', speed: 30, upload: 30, dataLimit: 'Unlimited', pricePKR: 3500 },
      { name: 'Storm 50', speed: 50, upload: 50, dataLimit: 'Unlimited', pricePKR: 4500 },
      { name: 'Storm 75', speed: 75, upload: 75, dataLimit: 'Unlimited', pricePKR: 5500 },
      { name: 'Storm 100', speed: 100, upload: 100, dataLimit: 'Unlimited', pricePKR: 7000 },
      { name: 'Storm 150', speed: 150, upload: 150, dataLimit: 'Unlimited', pricePKR: 9000 },
    ],
  },
  {
    name: 'Nayatel', slug: 'nayatel', type: ['fiber'], website: 'nayatel.com', helpline: '111-114-114',
    cities: ['Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Lahore'],
    packages: [
      { name: 'Naya 15', speed: 15, upload: 15, dataLimit: 'Unlimited', pricePKR: 2500 },
      { name: 'Naya 25', speed: 25, upload: 25, dataLimit: 'Unlimited', pricePKR: 3200 },
      { name: 'Naya 50', speed: 50, upload: 50, dataLimit: 'Unlimited', pricePKR: 4500 },
      { name: 'Naya 100', speed: 100, upload: 100, dataLimit: 'Unlimited', pricePKR: 6500 },
    ],
  },
  {
    name: 'Transworld (TWA)', slug: 'transworld', type: ['fiber'], website: 'twa.com.pk', helpline: '021-111-892-892',
    cities: ['Karachi', 'Lahore', 'Islamabad'],
    packages: [
      { name: 'TWA 10', speed: 10, upload: 10, dataLimit: 'Unlimited', pricePKR: 2000 },
      { name: 'TWA 25', speed: 25, upload: 25, dataLimit: 'Unlimited', pricePKR: 3000 },
      { name: 'TWA 50', speed: 50, upload: 50, dataLimit: 'Unlimited', pricePKR: 4500 },
      { name: 'TWA 100', speed: 100, upload: 100, dataLimit: 'Unlimited', pricePKR: 7000 },
    ],
  },
  {
    name: 'Fiberlink (Worldcall)', slug: 'fiberlink', type: ['cable', 'fiber'], website: 'worldcall.net.pk', helpline: '111-456-789',
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'],
    packages: [
      { name: 'Basic 10', speed: 10, upload: 2, dataLimit: 'Unlimited', pricePKR: 1800 },
      { name: 'Standard 25', speed: 25, upload: 5, dataLimit: 'Unlimited', pricePKR: 2800 },
      { name: 'Premium 50', speed: 50, upload: 10, dataLimit: 'Unlimited', pricePKR: 4200 },
    ],
  },
  {
    name: 'Cybernet', slug: 'cybernet', type: ['wireless', 'fiber'], website: 'cybernet.pk', helpline: '021-111-222-345',
    cities: ['Karachi', 'Lahore', 'Islamabad'],
    packages: [
      { name: 'CyberFiber 25', speed: 25, upload: 25, dataLimit: 'Unlimited', pricePKR: 3000 },
      { name: 'CyberFiber 50', speed: 50, upload: 50, dataLimit: 'Unlimited', pricePKR: 4500 },
    ],
  },
  {
    name: 'Connect Communications', slug: 'connect', type: ['fiber'], website: 'connectfiber.pk', helpline: '042-111-266-632',
    cities: ['Lahore'],
    packages: [
      { name: 'Connect 25', speed: 25, upload: 25, dataLimit: 'Unlimited', pricePKR: 2800 },
      { name: 'Connect 50', speed: 50, upload: 50, dataLimit: 'Unlimited', pricePKR: 4200 },
      { name: 'Connect 100', speed: 100, upload: 100, dataLimit: 'Unlimited', pricePKR: 6500 },
    ],
  },
  {
    name: 'Optix (Redtone)', slug: 'optix', type: ['fiber'], website: 'optix.pk', helpline: '021-111-111-443',
    cities: ['Karachi'],
    packages: [
      { name: 'Optix 15', speed: 15, upload: 15, dataLimit: 'Unlimited', pricePKR: 2200 },
      { name: 'Optix 30', speed: 30, upload: 30, dataLimit: 'Unlimited', pricePKR: 3200 },
      { name: 'Optix 50', speed: 50, upload: 50, dataLimit: 'Unlimited', pricePKR: 4500 },
    ],
  },
  {
    name: 'Wi-tribe', slug: 'witribe', type: ['wireless'], website: 'witribe.com', helpline: '111-111-348',
    cities: ['Islamabad', 'Rawalpindi', 'Karachi', 'Lahore'],
    packages: [
      { name: 'Freedom 4', speed: 4, upload: 1, dataLimit: '150 GB', pricePKR: 1500 },
      { name: 'Freedom 8', speed: 8, upload: 2, dataLimit: '300 GB', pricePKR: 2200 },
      { name: 'Freedom 15', speed: 15, upload: 3, dataLimit: 'Unlimited', pricePKR: 3000 },
    ],
  },
  {
    name: 'Jazz Home (4G)', slug: 'jazz-home', type: ['wireless'], website: 'jazz.com.pk', helpline: '111-300-300',
    cities: ['Nationwide (4G coverage areas)'],
    packages: [
      { name: 'Jazz Home 50GB', speed: 20, upload: 5, dataLimit: '50 GB', pricePKR: 1200 },
      { name: 'Jazz Home 100GB', speed: 20, upload: 5, dataLimit: '100 GB', pricePKR: 2000 },
      { name: 'Jazz Home Unlimited', speed: 20, upload: 5, dataLimit: 'Unlimited (FUP)', pricePKR: 3000, extras: 'Fair usage policy applies' },
    ],
  },
  {
    name: 'Zong 4G', slug: 'zong-4g', type: ['wireless'], website: 'zong.com.pk', helpline: '310',
    cities: ['Nationwide (4G coverage areas)'],
    packages: [
      { name: 'Zong MBB 60GB', speed: 20, upload: 5, dataLimit: '60 GB', pricePKR: 1500 },
      { name: 'Zong MBB 120GB', speed: 20, upload: 5, dataLimit: '120 GB', pricePKR: 2500 },
      { name: 'Zong MBB Unlimited', speed: 20, upload: 5, dataLimit: 'Unlimited (FUP)', pricePKR: 3500, extras: 'Fair usage policy applies' },
    ],
  },
  {
    name: 'Telenor 4G', slug: 'telenor-4g', type: ['wireless'], website: 'telenor.com.pk', helpline: '345',
    cities: ['Nationwide (4G coverage areas)'],
    packages: [
      { name: 'Telenor MiFi 50GB', speed: 20, upload: 5, dataLimit: '50 GB', pricePKR: 1200 },
      { name: 'Telenor MiFi 100GB', speed: 20, upload: 5, dataLimit: '100 GB', pricePKR: 2000 },
    ],
  },
  {
    name: 'Ufone 4G', slug: 'ufone-4g', type: ['wireless'], website: 'ufone.com', helpline: '333',
    cities: ['Nationwide (4G coverage areas)'],
    packages: [
      { name: 'Ufone Blaze 50GB', speed: 20, upload: 5, dataLimit: '50 GB', pricePKR: 1100 },
      { name: 'Ufone Blaze 100GB', speed: 20, upload: 5, dataLimit: '100 GB', pricePKR: 1900 },
    ],
  },
  {
    name: 'Starlink', slug: 'starlink', type: ['satellite'], website: 'starlink.com', helpline: 'N/A',
    cities: [],
    packages: [],
    note: 'Not yet available in Pakistan as of 2024. Pre-orders may be accepted but service date is unknown.',
  },
  {
    name: 'Qubee (Discontinued)', slug: 'qubee', type: ['wireless'], website: 'N/A', helpline: 'N/A',
    cities: [],
    packages: [],
    note: 'Discontinued WiMAX service. Was available in Islamabad, Rawalpindi, Karachi, Lahore.',
  },
];

function parseArgs(args) {
  const flags = {};
  let cmd = args[0];
  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      flags[key] = args[i + 1] || true;
      i++;
    }
  }
  return { cmd, flags };
}

function searchISP(flags) {
  const q = (flags.query || '').toLowerCase();
  if (!q) return { error: 'Provide --query <isp name>' };
  const matches = ISPS.filter(i =>
    i.name.toLowerCase().includes(q) || i.slug.includes(q)
  );
  return { query: flags.query, results: matches, count: matches.length };
}

function listISPs(flags) {
  if (flags.type) {
    const t = flags.type.toLowerCase();
    const matches = ISPS.filter(i => i.type.includes(t));
    return { type: t, isps: matches.map(i => ({ name: i.name, slug: i.slug, type: i.type, cities: i.cities, helpline: i.helpline, note: i.note })), count: matches.length };
  }
  return { isps: ISPS.map(i => ({ name: i.name, slug: i.slug, type: i.type, cities: i.cities, helpline: i.helpline, note: i.note })), count: ISPS.length };
}

function packages(flags) {
  const slug = (flags.isp || '').toLowerCase();
  if (!slug) return { error: `Provide --isp <slug>. Options: ${ISPS.filter(i => i.packages.length).map(i => i.slug).join(', ')}` };
  const isp = ISPS.find(i => i.slug === slug);
  if (!isp) return { error: `ISP not found: ${slug}` };
  if (!isp.packages.length) return { isp: isp.name, packages: [], note: isp.note || 'No packages available' };
  return { isp: isp.name, website: isp.website, helpline: isp.helpline, packages: isp.packages };
}

function coverage(flags) {
  const city = (flags.city || '').toLowerCase();
  if (!city) return { error: 'Provide --city <name>' };
  const matches = ISPS.filter(i =>
    i.cities.some(c => c.toLowerCase().includes(city) || c.toLowerCase().includes('nationwide'))
  );
  return {
    city: flags.city,
    isps: matches.map(i => ({ name: i.name, slug: i.slug, type: i.type, helpline: i.helpline })),
    count: matches.length,
  };
}

function compare(flags) {
  const speed = parseInt(flags.speed, 10);
  if (!speed) return { error: 'Provide --speed <mbps>' };
  const results = [];
  for (const isp of ISPS) {
    for (const pkg of isp.packages) {
      if (pkg.speed >= speed * 0.8 && pkg.speed <= speed * 1.5) {
        results.push({ isp: isp.name, package: pkg.name, speedMbps: pkg.speed, uploadMbps: pkg.upload, dataLimit: pkg.dataLimit, pricePKR: pkg.pricePKR });
      }
    }
  }
  results.sort((a, b) => a.pricePKR - b.pricePKR);
  return { targetSpeedMbps: speed, packages: results, count: results.length };
}

const { cmd, flags } = parseArgs(process.argv.slice(2));

switch (cmd) {
  case 'search':
    console.log(JSON.stringify(searchISP(flags), null, 2));
    break;
  case 'list':
    console.log(JSON.stringify(listISPs(flags), null, 2));
    break;
  case 'packages':
    console.log(JSON.stringify(packages(flags), null, 2));
    break;
  case 'coverage':
    console.log(JSON.stringify(coverage(flags), null, 2));
    break;
  case 'compare':
    console.log(JSON.stringify(compare(flags), null, 2));
    break;
  default:
    console.error('Usage: isps.mjs <search|list|packages|coverage|compare> [--flags]');
    process.exit(1);
}

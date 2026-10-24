#!/usr/bin/env node

const CITIES = [
  // Punjab
  { city: 'Lahore', code: '042', province: 'Punjab' },
  { city: 'Faisalabad', code: '041', province: 'Punjab' },
  { city: 'Rawalpindi', code: '051', province: 'Punjab' },
  { city: 'Multan', code: '061', province: 'Punjab' },
  { city: 'Gujranwala', code: '055', province: 'Punjab' },
  { city: 'Sialkot', code: '052', province: 'Punjab' },
  { city: 'Bahawalpur', code: '062', province: 'Punjab' },
  { city: 'Sargodha', code: '048', province: 'Punjab' },
  { city: 'Sahiwal', code: '040', province: 'Punjab' },
  { city: 'Gujrat', code: '053', province: 'Punjab' },
  { city: 'Jhelum', code: '0544', province: 'Punjab' },
  { city: 'Sheikhupura', code: '056', province: 'Punjab' },
  { city: 'Rahim Yar Khan', code: '068', province: 'Punjab' },
  { city: 'Jhang', code: '047', province: 'Punjab' },
  { city: 'Dera Ghazi Khan', code: '064', province: 'Punjab' },
  { city: 'Kasur', code: '049', province: 'Punjab' },
  { city: 'Okara', code: '044', province: 'Punjab' },
  { city: 'Vehari', code: '067', province: 'Punjab' },
  { city: 'Mianwali', code: '0459', province: 'Punjab' },
  { city: 'Chiniot', code: '047', province: 'Punjab' },
  { city: 'Khanewal', code: '065', province: 'Punjab' },
  { city: 'Muzaffargarh', code: '066', province: 'Punjab' },
  { city: 'Attock', code: '057', province: 'Punjab' },
  { city: 'Chakwal', code: '0543', province: 'Punjab' },
  { city: 'Toba Tek Singh', code: '046', province: 'Punjab' },
  { city: 'Layyah', code: '0606', province: 'Punjab' },
  { city: 'Bhakkar', code: '0453', province: 'Punjab' },
  { city: 'Lodhran', code: '0608', province: 'Punjab' },
  { city: 'Narowal', code: '0542', province: 'Punjab' },
  { city: 'Hafizabad', code: '0547', province: 'Punjab' },
  { city: 'Mandi Bahauddin', code: '0546', province: 'Punjab' },
  { city: 'Khushab', code: '0454', province: 'Punjab' },
  { city: 'Pakpattan', code: '0457', province: 'Punjab' },
  { city: 'Rajanpur', code: '0604', province: 'Punjab' },
  { city: 'Nankana Sahib', code: '0567', province: 'Punjab' },
  // Sindh
  { city: 'Karachi', code: '021', province: 'Sindh' },
  { city: 'Hyderabad', code: '022', province: 'Sindh' },
  { city: 'Sukkur', code: '071', province: 'Sindh' },
  { city: 'Larkana', code: '074', province: 'Sindh' },
  { city: 'Nawabshah', code: '0244', province: 'Sindh' },
  { city: 'Mirpur Khas', code: '0233', province: 'Sindh' },
  { city: 'Jacobabad', code: '0722', province: 'Sindh' },
  { city: 'Shikarpur', code: '0726', province: 'Sindh' },
  { city: 'Dadu', code: '025', province: 'Sindh' },
  { city: 'Thatta', code: '0298', province: 'Sindh' },
  { city: 'Badin', code: '0297', province: 'Sindh' },
  { city: 'Khairpur', code: '0243', province: 'Sindh' },
  { city: 'Sanghar', code: '0235', province: 'Sindh' },
  { city: 'Umerkot', code: '0238', province: 'Sindh' },
  { city: 'Ghotki', code: '0723', province: 'Sindh' },
  { city: 'Tharparkar (Mithi)', code: '0232', province: 'Sindh' },
  // KPK
  { city: 'Peshawar', code: '091', province: 'KPK' },
  { city: 'Mardan', code: '0937', province: 'KPK' },
  { city: 'Abbottabad', code: '0992', province: 'KPK' },
  { city: 'Swat (Mingora)', code: '0946', province: 'KPK' },
  { city: 'Kohat', code: '0922', province: 'KPK' },
  { city: 'Dera Ismail Khan', code: '0966', province: 'KPK' },
  { city: 'Bannu', code: '0928', province: 'KPK' },
  { city: 'Mansehra', code: '0997', province: 'KPK' },
  { city: 'Nowshera', code: '0923', province: 'KPK' },
  { city: 'Charsadda', code: '091', province: 'KPK' },
  { city: 'Swabi', code: '0938', province: 'KPK' },
  { city: 'Haripur', code: '0995', province: 'KPK' },
  { city: 'Dir (Upper)', code: '0944', province: 'KPK' },
  { city: 'Dir (Lower)', code: '0945', province: 'KPK' },
  { city: 'Chitral', code: '0943', province: 'KPK' },
  { city: 'Batagram', code: '0996', province: 'KPK' },
  { city: 'Lakki Marwat', code: '0969', province: 'KPK' },
  { city: 'Tank', code: '0963', province: 'KPK' },
  { city: 'Hangu', code: '0925', province: 'KPK' },
  { city: 'Karak', code: '0927', province: 'KPK' },
  { city: 'Shangla', code: '0996', province: 'KPK' },
  { city: 'Buner', code: '0939', province: 'KPK' },
  // Balochistan
  { city: 'Quetta', code: '081', province: 'Balochistan' },
  { city: 'Turbat', code: '0852', province: 'Balochistan' },
  { city: 'Khuzdar', code: '0848', province: 'Balochistan' },
  { city: 'Gwadar', code: '0864', province: 'Balochistan' },
  { city: 'Zhob', code: '0822', province: 'Balochistan' },
  { city: 'Chaman', code: '0826', province: 'Balochistan' },
  { city: 'Sibi', code: '0838', province: 'Balochistan' },
  { city: 'Hub', code: '0853', province: 'Balochistan' },
  { city: 'Loralai', code: '0824', province: 'Balochistan' },
  { city: 'Pishin', code: '0826', province: 'Balochistan' },
  { city: 'Kalat', code: '0844', province: 'Balochistan' },
  { city: 'Mastung', code: '0843', province: 'Balochistan' },
  { city: 'Nushki', code: '0841', province: 'Balochistan' },
  { city: 'Panjgur', code: '0855', province: 'Balochistan' },
  // Islamabad
  { city: 'Islamabad', code: '051', province: 'Islamabad' },
  // AJK
  { city: 'Muzaffarabad', code: '05822', province: 'AJK' },
  { city: 'Mirpur (AJK)', code: '05827', province: 'AJK' },
  { city: 'Rawalakot', code: '05824', province: 'AJK' },
  { city: 'Kotli', code: '05826', province: 'AJK' },
  { city: 'Bagh', code: '05823', province: 'AJK' },
  { city: 'Bhimber', code: '05828', province: 'AJK' },
  // Gilgit-Baltistan
  { city: 'Gilgit', code: '05811', province: 'Gilgit-Baltistan' },
  { city: 'Skardu', code: '05815', province: 'Gilgit-Baltistan' },
  { city: 'Hunza', code: '05813', province: 'Gilgit-Baltistan' },
  { city: 'Chilas', code: '05812', province: 'Gilgit-Baltistan' },
  { city: 'Astore', code: '05814', province: 'Gilgit-Baltistan' },
];

const MOBILE_OPERATORS = [
  {
    operator: 'Jazz', altNames: ['Mobilink', 'Warid'], network: '4G/LTE',
    prefixes: ['0300','0301','0302','0303','0304','0305','0306','0307','0308','0309','0320','0321','0322','0323','0324','0325'],
    helpline: '111-300-300', note: 'Largest operator. Jazz + Warid merged.',
  },
  {
    operator: 'Telenor', altNames: [], network: '4G/LTE',
    prefixes: ['0340','0341','0342','0343','0344','0345','0346','0347','0348','0349'],
    helpline: '345',
  },
  {
    operator: 'Zong', altNames: ['CMPak'], network: '4G/LTE',
    prefixes: ['0310','0311','0312','0313','0314','0315','0316','0317','0318','0319'],
    helpline: '310', note: 'China Mobile subsidiary.',
  },
  {
    operator: 'Ufone', altNames: ['PTML'], network: '4G/LTE',
    prefixes: ['0330','0331','0332','0333','0334','0335','0336','0337','0338','0339'],
    helpline: '333', note: 'PTCL subsidiary.',
  },
  {
    operator: 'SCOM', altNames: ['SCO', 'Special Communications Organization'], network: '4G/LTE',
    prefixes: ['0355','0356','0357'],
    helpline: 'N/A', note: 'Operates in AJK and Gilgit-Baltistan only.',
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

function search(flags) {
  const q = (flags.query || '').toLowerCase();
  if (!q) return { error: 'Provide --query <city name>' };
  const matches = CITIES.filter(c => c.city.toLowerCase().includes(q));
  return { query: flags.query, results: matches, count: matches.length };
}

function lookup(flags) {
  const code = (flags.code || '').replace(/^0?/, '0');
  if (!code) return { error: 'Provide --code <area code>' };
  const matches = CITIES.filter(c => c.code === code);
  return { code, results: matches, count: matches.length };
}

function mobile(flags) {
  if (flags.operator) {
    const q = flags.operator.toLowerCase();
    const op = MOBILE_OPERATORS.find(o =>
      o.operator.toLowerCase() === q || o.altNames.some(a => a.toLowerCase() === q)
    );
    if (!op) return { error: `Unknown operator: ${flags.operator}. Options: ${MOBILE_OPERATORS.map(o => o.operator).join(', ')}` };
    return op;
  }
  return { operators: MOBILE_OPERATORS };
}

function list(flags) {
  if (flags.province) {
    const p = flags.province.toLowerCase();
    const provinceMap = { punjab: 'Punjab', sindh: 'Sindh', kpk: 'KPK', balochistan: 'Balochistan', islamabad: 'Islamabad', ajk: 'AJK', 'gilgit-baltistan': 'Gilgit-Baltistan' };
    const prov = provinceMap[p];
    if (!prov) return { error: `Unknown province: ${flags.province}. Options: ${Object.keys(provinceMap).join(', ')}` };
    const matches = CITIES.filter(c => c.province === prov);
    return { province: prov, cities: matches, count: matches.length };
  }
  return { cities: CITIES, count: CITIES.length };
}

const { cmd, flags } = parseArgs(process.argv.slice(2));

switch (cmd) {
  case 'search':
    console.log(JSON.stringify(search(flags), null, 2));
    break;
  case 'lookup':
    console.log(JSON.stringify(lookup(flags), null, 2));
    break;
  case 'mobile':
    console.log(JSON.stringify(mobile(flags), null, 2));
    break;
  case 'list':
    console.log(JSON.stringify(list(flags), null, 2));
    break;
  default:
    console.error('Usage: phonecodes.mjs <search|lookup|mobile|list> [--flags]');
    process.exit(1);
}

#!/usr/bin/env node

const NUMBERS = [
  // Police
  { name: 'Police Emergency', number: '15', category: 'police', description: 'National police emergency line', cities: ['all'], available24x7: true },
  { name: 'Motorway Police', number: '130', category: 'police', description: 'National Highway & Motorway Police helpline', cities: ['all'], available24x7: true },
  { name: 'Anti-Terrorism Helpline', number: '1717', category: 'police', description: 'Report suspicious activities / terrorism', cities: ['all'], available24x7: true },

  // Fire
  { name: 'Fire Brigade', number: '16', category: 'fire', description: 'National fire emergency', cities: ['all'], available24x7: true },

  // Medical / Ambulance
  { name: 'Edhi Ambulance', number: '115', category: 'medical', description: 'Edhi Foundation ambulance service — nationwide', cities: ['all'], available24x7: true },
  { name: 'Rescue 1122', number: '1122', category: 'rescue', description: 'Punjab Emergency Service (ambulance, rescue, fire)', cities: ['Lahore', 'Rawalpindi', 'Faisalabad', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'all Punjab'], available24x7: true },
  { name: 'Aman Foundation Ambulance', number: '1021', category: 'medical', description: 'Aman Foundation ambulance service — Karachi', cities: ['Karachi'], available24x7: true },
  { name: 'Chippa Foundation', number: '1020', category: 'medical', description: 'Chippa Foundation ambulance & welfare — Karachi/Sindh', cities: ['Karachi', 'Hyderabad', 'Sindh'], available24x7: true },
  { name: 'Rescue 1166', number: '1166', category: 'rescue', description: 'KPK Emergency Rescue Service', cities: ['Peshawar', 'KPK'], available24x7: true },
  { name: 'Balochistan Rescue', number: '1199', category: 'rescue', description: 'Balochistan Emergency Service', cities: ['Quetta', 'Balochistan'], available24x7: true },

  // Helplines
  { name: 'Pakistan Citizens Portal', number: '8090', category: 'helpline', description: 'PM Citizen Portal — complaints and grievances', cities: ['all'], available24x7: false },
  { name: 'Child Protection Helpline', number: '1121', category: 'helpline', description: 'Report child abuse / exploitation', cities: ['all'], available24x7: true },
  { name: 'Women Helpline', number: '1043', category: 'helpline', description: 'Women in distress helpline', cities: ['all'], available24x7: true },
  { name: 'Cyber Crime (FIA)', number: '9911', category: 'helpline', description: 'FIA Cyber Crime Wing — report online fraud, harassment', cities: ['all'], available24x7: false },
  { name: 'Anti-Corruption Helpline', number: '1055', category: 'helpline', description: 'Report corruption — NAB helpline', cities: ['all'], available24x7: false },
  { name: 'Drug Abuse Helpline', number: '0800-98786', category: 'helpline', description: 'Anti-Narcotics Force helpline', cities: ['all'], available24x7: false },
  { name: 'Missing Persons (COIP)', number: '051-9208491', category: 'helpline', description: 'Commission of Inquiry on Enforced Disappearances', cities: ['all'], available24x7: false },
  { name: 'Human Rights Helpline', number: '1099', category: 'helpline', description: 'National Commission for Human Rights', cities: ['all'], available24x7: false },

  // Utility
  { name: 'WAPDA / Electricity Complaints', number: '118', category: 'utility', description: 'Electricity complaints — all DISCOs (LESCO, FESCO, IESCO, etc.)', cities: ['all'], available24x7: true },
  { name: 'K-Electric Helpline', number: '118', category: 'utility', description: 'K-Electric complaints and outage reporting — Karachi', cities: ['Karachi'], available24x7: true },
  { name: 'Sui Gas (SNGPL)', number: '1199', category: 'utility', description: 'Sui Northern Gas Pipelines — gas complaints, leaks', cities: ['Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Faisalabad', 'Multan', 'Northern Pakistan'], available24x7: true },
  { name: 'Sui Gas (SSGC)', number: '1199', category: 'utility', description: 'Sui Southern Gas Company — gas complaints, leaks', cities: ['Karachi', 'Hyderabad', 'Quetta', 'Southern Pakistan'], available24x7: true },
  { name: 'Water & Sanitation (WASA)', number: '1334', category: 'utility', description: 'WASA complaints — Lahore', cities: ['Lahore'], available24x7: true },

  // Telecom
  { name: 'PTCL Helpline', number: '1218', category: 'telecom', description: 'PTCL landline and internet complaints', cities: ['all'], available24x7: true },
  { name: 'PTA Complaint', number: '0800-55055', category: 'telecom', description: 'Pakistan Telecommunication Authority — telecom complaints', cities: ['all'], available24x7: false },
  { name: 'Jazz Helpline', number: '111', category: 'telecom', description: 'Jazz/Warid mobile helpline', cities: ['all'], available24x7: true },
  { name: 'Telenor Helpline', number: '345', category: 'telecom', description: 'Telenor mobile helpline', cities: ['all'], available24x7: true },
  { name: 'Zong Helpline', number: '310', category: 'telecom', description: 'Zong mobile helpline', cities: ['all'], available24x7: true },
  { name: 'Ufone Helpline', number: '333', category: 'telecom', description: 'Ufone mobile helpline', cities: ['all'], available24x7: true },

  // Airlines
  { name: 'PIA Helpline', number: '111-786-786', category: 'helpline', description: 'Pakistan International Airlines customer service', cities: ['all'], available24x7: true },

  // Disaster
  { name: 'NDMA Helpline', number: '051-9205037', category: 'rescue', description: 'National Disaster Management Authority', cities: ['all'], available24x7: true },
  { name: 'PDMA Punjab', number: '042-99203862', category: 'rescue', description: 'Provincial Disaster Management Authority — Punjab', cities: ['Punjab'], available24x7: true },
];

const CATEGORIES = [...new Set(NUMBERS.map(n => n.category))].sort();

function parseArgs(args) {
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--') && i + 1 < args.length) {
      flags[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return flags;
}

function listAll() {
  console.log(JSON.stringify({
    count: NUMBERS.length,
    categories: CATEGORIES,
    numbers: NUMBERS,
  }, null, 2));
}

function search(flags) {
  const query = (flags.query || '').toLowerCase();
  if (!query) { console.error('Provide --query <text>'); process.exit(1); }
  const matches = NUMBERS.filter(n =>
    n.name.toLowerCase().includes(query) ||
    n.description.toLowerCase().includes(query) ||
    n.category.toLowerCase().includes(query)
  );
  console.log(JSON.stringify({ query: flags.query, count: matches.length, results: matches }, null, 2));
}

function cityNumbers(flags) {
  const city = (flags.name || '').toLowerCase();
  if (!city) { console.error('Provide --name <city>'); process.exit(1); }
  const matches = NUMBERS.filter(n =>
    n.cities.some(c => c.toLowerCase() === 'all' || c.toLowerCase().includes(city))
  );
  console.log(JSON.stringify({ city: flags.name, count: matches.length, numbers: matches }, null, 2));
}

function categoryFilter(flags) {
  const type = (flags.type || '').toLowerCase();
  if (!type) {
    console.error(`Provide --type <category>. Available: ${CATEGORIES.join(', ')}`);
    process.exit(1);
  }
  const matches = NUMBERS.filter(n => n.category === type);
  if (!matches.length) {
    console.error(`No numbers for category "${type}". Available: ${CATEGORIES.join(', ')}`);
    process.exit(1);
  }
  console.log(JSON.stringify({ category: type, count: matches.length, numbers: matches }, null, 2));
}

function usage() {
  console.error(`Usage: node scripts/emergency.mjs <command> [options]

Commands:
  list       List all emergency numbers
  search     Search by service (--query "ambulance")
  city       City-specific numbers (--name Karachi)
  category   Filter by type (--type medical|police|fire|rescue|utility|helpline|telecom)`);
  process.exit(1);
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);

switch (cmd) {
  case 'list':     listAll(); break;
  case 'search':   search(flags); break;
  case 'city':     cityNumbers(flags); break;
  case 'category': categoryFilter(flags); break;
  default:         usage();
}

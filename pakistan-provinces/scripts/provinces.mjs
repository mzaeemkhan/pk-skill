#!/usr/bin/env node

const PROVINCES = [
  {
    name: 'Punjab',
    capital: 'Lahore',
    population: 127688922,
    area_sqkm: 205344,
    districts: [
      { name: 'Lahore', population: 13979000 },
      { name: 'Faisalabad', population: 7873000 },
      { name: 'Rawalpindi', population: 5781000 },
      { name: 'Multan', population: 4745000 },
      { name: 'Gujranwala', population: 5014000 },
      { name: 'Sargodha', population: 3654000 },
      { name: 'Sialkot', population: 3893000 },
      { name: 'Bahawalpur', population: 3668000 },
      { name: 'Sahiwal', population: 2517000 },
      { name: 'Sheikhupura', population: 3461000 },
      { name: 'Rahim Yar Khan', population: 4814000 },
      { name: 'Dera Ghazi Khan', population: 3439000 },
      { name: 'Gujrat', population: 2756000 },
      { name: 'Jhang', population: 2834000 },
      { name: 'Kasur', population: 3455000 },
      { name: 'Okara', population: 3040000 },
      { name: 'Vehari', population: 3090000 },
      { name: 'Muzaffargarh', population: 4201000 },
      { name: 'Mianwali', population: 1546000 },
      { name: 'Khanewal', population: 2922000 },
      { name: 'Hafizabad', population: 1097000 },
      { name: 'Jhelum', population: 1222000 },
      { name: 'Toba Tek Singh', population: 2082000 },
      { name: 'Bahawalnagar', population: 2982000 },
      { name: 'Pakpattan', population: 1824000 },
      { name: 'Khushab', population: 1280000 },
      { name: 'Bhakkar', population: 1650000 },
      { name: 'Attock', population: 1883000 },
      { name: 'Chakwal', population: 1495000 },
      { name: 'Nankana Sahib', population: 1356000 },
      { name: 'Narowal', population: 1710000 },
      { name: 'Lodhran', population: 1701000 },
      { name: 'Layyah', population: 1822000 },
      { name: 'Chiniot', population: 1370000 },
      { name: 'Rajanpur', population: 1996000 },
      { name: 'Mandi Bahauddin', population: 1593000 },
    ],
  },
  {
    name: 'Sindh',
    capital: 'Karachi',
    population: 55696464,
    area_sqkm: 140914,
    districts: [
      { name: 'Karachi Central', population: 3550000 },
      { name: 'Karachi East', population: 2910000 },
      { name: 'Karachi South', population: 1791000 },
      { name: 'Karachi West', population: 3914000 },
      { name: 'Korangi', population: 2457000 },
      { name: 'Malir', population: 2008000 },
      { name: 'Kemari', population: 1829000 },
      { name: 'Hyderabad', population: 2199000 },
      { name: 'Sukkur', population: 1488000 },
      { name: 'Larkana', population: 1524000 },
      { name: 'Nawabshah (Shaheed Benazirabad)', population: 1612000 },
      { name: 'Mirpurkhas', population: 1307000 },
      { name: 'Khairpur', population: 2405000 },
      { name: 'Dadu', population: 1550000 },
      { name: 'Thatta', population: 979000 },
      { name: 'Badin', population: 1804000 },
      { name: 'Jacobabad', population: 1006000 },
      { name: 'Shikarpur', population: 1230000 },
      { name: 'Sanghar', population: 2057000 },
      { name: 'Ghotki', population: 1647000 },
      { name: 'Naushahro Feroze', population: 1608000 },
      { name: 'Tharparkar', population: 1649000 },
      { name: 'Umerkot', population: 1073000 },
      { name: 'Jamshoro', population: 994000 },
      { name: 'Kashmore', population: 1089000 },
      { name: 'Matiari', population: 769000 },
      { name: 'Tando Allahyar', population: 837000 },
      { name: 'Tando Muhammad Khan', population: 677000 },
      { name: 'Sujawal', population: 781000 },
    ],
  },
  {
    name: 'Khyber Pakhtunkhwa',
    capital: 'Peshawar',
    population: 40856097,
    area_sqkm: 101741,
    districts: [
      { name: 'Peshawar', population: 4269000 },
      { name: 'Mardan', population: 2374000 },
      { name: 'Swat', population: 2310000 },
      { name: 'Abbottabad', population: 1332000 },
      { name: 'Mansehra', population: 1556000 },
      { name: 'Dera Ismail Khan', population: 1627000 },
      { name: 'Kohat', population: 993000 },
      { name: 'Bannu', population: 1167000 },
      { name: 'Charsadda', population: 1616000 },
      { name: 'Nowshera', population: 1518000 },
      { name: 'Haripur', population: 1003000 },
      { name: 'Swabi', population: 1624000 },
      { name: 'Dir Lower', population: 1435000 },
      { name: 'Dir Upper', population: 946000 },
      { name: 'Buner', population: 897000 },
      { name: 'Malakand', population: 720000 },
      { name: 'Shangla', population: 757000 },
      { name: 'Battagram', population: 476000 },
      { name: 'Chitral Lower', population: 448000 },
      { name: 'Chitral Upper', population: 240000 },
      { name: 'Karak', population: 705000 },
      { name: 'Lakki Marwat', population: 876000 },
      { name: 'Tank', population: 390000 },
      { name: 'Hangu', population: 518000 },
      { name: 'Tor Ghar', population: 600000 },
      { name: 'Kohistan Upper', population: 384000 },
      { name: 'Kohistan Lower', population: 268000 },
      { name: 'Kolai-Palas', population: 238000 },
      // Merged tribal districts
      { name: 'North Waziristan', population: 543000 },
      { name: 'South Waziristan Upper', population: 347000 },
      { name: 'South Waziristan Lower', population: 356000 },
      { name: 'Bajaur', population: 1093000 },
      { name: 'Mohmand', population: 466000 },
      { name: 'Khyber', population: 986000 },
      { name: 'Orakzai', population: 254000 },
      { name: 'Kurram', population: 619000 },
    ],
  },
  {
    name: 'Balochistan',
    capital: 'Quetta',
    population: 14894456,
    area_sqkm: 347190,
    districts: [
      { name: 'Quetta', population: 2275000 },
      { name: 'Kech (Turbat)', population: 908000 },
      { name: 'Gwadar', population: 263000 },
      { name: 'Lasbela', population: 574000 },
      { name: 'Khuzdar', population: 802000 },
      { name: 'Zhob', population: 310000 },
      { name: 'Pishin', population: 736000 },
      { name: 'Loralai', population: 397000 },
      { name: 'Chagai', population: 226000 },
      { name: 'Kalat', population: 412000 },
      { name: 'Mastung', population: 266000 },
      { name: 'Sibi', population: 135000 },
      { name: 'Bolan (Kachhi)', population: 358000 },
      { name: 'Jhal Magsi', population: 149000 },
      { name: 'Nasirabad', population: 490000 },
      { name: 'Jafarabad', population: 514000 },
      { name: 'Dera Bugti', population: 313000 },
      { name: 'Kohlu', population: 214000 },
      { name: 'Ziarat', population: 160000 },
      { name: 'Kharan', population: 156000 },
      { name: 'Washuk', population: 176000 },
      { name: 'Awaran', population: 122000 },
      { name: 'Panjgur', population: 316000 },
      { name: 'Nushki', population: 178000 },
      { name: 'Musakhel', population: 167000 },
      { name: 'Sherani', population: 153000 },
      { name: 'Harnai', population: 97000 },
      { name: 'Sohbatpur', population: 280000 },
      { name: 'Lehri', population: 110000 },
      { name: 'Duki', population: 208000 },
      { name: 'Surab', population: 46000 },
      { name: 'Barkhan', population: 171000 },
    ],
  },
  {
    name: 'Islamabad Capital Territory',
    capital: 'Islamabad',
    population: 2363880,
    area_sqkm: 906,
    districts: [
      { name: 'Islamabad', population: 2363880 },
    ],
  },
  {
    name: 'Gilgit-Baltistan',
    capital: 'Gilgit',
    population: 1492924,
    area_sqkm: 72971,
    districts: [
      { name: 'Gilgit', population: 330000 },
      { name: 'Skardu', population: 335000 },
      { name: 'Diamer', population: 252000 },
      { name: 'Ghanche', population: 180000 },
      { name: 'Ghizer', population: 180000 },
      { name: 'Hunza', population: 68000 },
      { name: 'Nagar', population: 56000 },
      { name: 'Astore', population: 92000 },
      { name: 'Shigar', population: 79000 },
      { name: 'Kharmang', population: 68000 },
    ],
  },
  {
    name: 'Azad Jammu and Kashmir',
    capital: 'Muzaffarabad',
    population: 4045366,
    area_sqkm: 13297,
    districts: [
      { name: 'Muzaffarabad', population: 650000 },
      { name: 'Mirpur', population: 456000 },
      { name: 'Kotli', population: 774000 },
      { name: 'Bhimber', population: 420000 },
      { name: 'Bagh', population: 371000 },
      { name: 'Poonch (Rawalakot)', population: 411000 },
      { name: 'Sudhanoti', population: 296000 },
      { name: 'Neelum', population: 191000 },
      { name: 'Hattian Bala', population: 219000 },
      { name: 'Haveli', population: 168000 },
    ],
  },
];

function parseArgs(args) {
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) { result[key] = next; i++; }
      else result[key] = true;
    } else {
      result._.push(args[i]);
    }
  }
  return result;
}

const args = parseArgs(process.argv.slice(2));
const cmd = args._[0];

if (!cmd) {
  console.log(JSON.stringify({ error: 'Usage: provinces.mjs <list|province|search|district|compare|stats> [--flags]' }));
  process.exit(1);
}

if (cmd === 'list') {
  const summary = PROVINCES.map(p => ({
    name: p.name,
    capital: p.capital,
    population: p.population,
    area_sqkm: p.area_sqkm,
    districts: p.districts.length,
  }));
  console.log(JSON.stringify({ provinces: summary, total: summary.length }));
} else if (cmd === 'province') {
  const name = (args.name || '').toLowerCase();
  if (!name) { console.log(JSON.stringify({ error: 'Usage: provinces.mjs province --name <province>' })); process.exit(1); }
  const prov = PROVINCES.find(p => p.name.toLowerCase().includes(name));
  if (!prov) { console.log(JSON.stringify({ error: `Province not found: ${name}` })); process.exit(1); }
  console.log(JSON.stringify(prov));
} else if (cmd === 'search') {
  const q = (args.query || '').toLowerCase();
  if (!q) { console.log(JSON.stringify({ error: 'Usage: provinces.mjs search --query <keyword>' })); process.exit(1); }
  const results = [];
  for (const p of PROVINCES) {
    for (const d of p.districts) {
      if (d.name.toLowerCase().includes(q)) {
        results.push({ ...d, province: p.name });
      }
    }
  }
  console.log(JSON.stringify({ query: q, results, total: results.length }));
} else if (cmd === 'district') {
  const name = (args.name || '').toLowerCase();
  if (!name) { console.log(JSON.stringify({ error: 'Usage: provinces.mjs district --name <district>' })); process.exit(1); }
  for (const p of PROVINCES) {
    const d = p.districts.find(d => d.name.toLowerCase().includes(name));
    if (d) {
      console.log(JSON.stringify({ ...d, province: p.name, provinceCapital: p.capital }));
      process.exit(0);
    }
  }
  console.log(JSON.stringify({ error: `District not found: ${name}` }));
  process.exit(1);
} else if (cmd === 'compare') {
  const comparison = PROVINCES.map(p => ({
    name: p.name,
    population: p.population,
    area_sqkm: p.area_sqkm,
    density: Math.round(p.population / p.area_sqkm),
    districts: p.districts.length,
  })).sort((a, b) => b.population - a.population);
  const totalPop = comparison.reduce((s, p) => s + p.population, 0);
  console.log(JSON.stringify({ comparison, totalPopulation: totalPop }));
} else if (cmd === 'stats') {
  const totalPop = PROVINCES.reduce((s, p) => s + p.population, 0);
  const totalArea = PROVINCES.reduce((s, p) => s + p.area_sqkm, 0);
  const totalDistricts = PROVINCES.reduce((s, p) => s + p.districts.length, 0);
  const largest = [...PROVINCES].sort((a, b) => b.population - a.population)[0];
  const smallest = [...PROVINCES].sort((a, b) => a.population - b.population)[0];
  console.log(JSON.stringify({
    totalPopulation: totalPop,
    totalArea_sqkm: totalArea,
    totalDistricts,
    provinces: PROVINCES.length,
    densestOverall: Math.round(totalPop / totalArea),
    largestByPopulation: { name: largest.name, population: largest.population },
    smallestByPopulation: { name: smallest.name, population: smallest.population },
  }));
} else {
  console.log(JSON.stringify({ error: `Unknown command: ${cmd}. Use: list, province, search, district, compare, stats` }));
  process.exit(1);
}

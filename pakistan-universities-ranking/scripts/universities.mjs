#!/usr/bin/env node

const UNIVERSITIES = [
  { name: 'Quaid-i-Azam University', city: 'Islamabad', sector: 'public', hec: 'W4', qs: 401, established: 1967 },
  { name: 'Pakistan Institute of Engineering and Applied Sciences (PIEAS)', city: 'Islamabad', sector: 'public', hec: 'W4', qs: 501, established: 1967 },
  { name: 'National University of Sciences and Technology (NUST)', city: 'Islamabad', sector: 'public', hec: 'W4', qs: 347, established: 1991 },
  { name: 'Lahore University of Management Sciences (LUMS)', city: 'Lahore', sector: 'private', hec: 'W4', qs: 651, established: 1985 },
  { name: 'COMSATS University Islamabad', city: 'Islamabad', sector: 'public', hec: 'W4', qs: 801, established: 1998 },
  { name: 'University of the Punjab', city: 'Lahore', sector: 'public', hec: 'W4', qs: 801, established: 1882 },
  { name: 'Aga Khan University', city: 'Karachi', sector: 'private', hec: 'W4', qs: 251, established: 1983 },
  { name: 'University of Karachi', city: 'Karachi', sector: 'public', hec: 'W4', qs: 1001, established: 1951 },
  { name: 'University of Agriculture Faisalabad', city: 'Faisalabad', sector: 'public', hec: 'W4', qs: 801, established: 1961 },
  { name: 'University of Peshawar', city: 'Peshawar', sector: 'public', hec: 'W4', qs: 1001, established: 1950 },
  { name: 'Bahauddin Zakariya University', city: 'Multan', sector: 'public', hec: 'W3', qs: 1201, established: 1975 },
  { name: 'Government College University Lahore', city: 'Lahore', sector: 'public', hec: 'W4', qs: 1001, established: 1864 },
  { name: 'Government College University Faisalabad', city: 'Faisalabad', sector: 'public', hec: 'W3', qs: 1201, established: 2002 },
  { name: 'University of Engineering and Technology Lahore', city: 'Lahore', sector: 'public', hec: 'W4', qs: 801, established: 1921 },
  { name: 'NED University of Engineering and Technology', city: 'Karachi', sector: 'public', hec: 'W4', qs: 801, established: 1922 },
  { name: 'Mehran University of Engineering and Technology', city: 'Jamshoro', sector: 'public', hec: 'W3', qs: 1201, established: 1963 },
  { name: 'University of Engineering and Technology Taxila', city: 'Taxila', sector: 'public', hec: 'W3', qs: null, established: 1975 },
  { name: 'International Islamic University', city: 'Islamabad', sector: 'public', hec: 'W3', qs: 1001, established: 1980 },
  { name: 'Institute of Space Technology', city: 'Islamabad', sector: 'public', hec: 'W3', qs: null, established: 2002 },
  { name: 'Air University', city: 'Islamabad', sector: 'public', hec: 'W3', qs: null, established: 2002 },
  { name: 'Bahria University', city: 'Islamabad', sector: 'private', hec: 'W3', qs: null, established: 2000 },
  { name: 'FAST National University', city: 'Islamabad', sector: 'private', hec: 'W4', qs: 801, established: 2000 },
  { name: 'Ghulam Ishaq Khan Institute (GIKI)', city: 'Topi', sector: 'private', hec: 'W4', qs: null, established: 1993 },
  { name: 'Habib University', city: 'Karachi', sector: 'private', hec: 'W3', qs: null, established: 2014 },
  { name: 'Institute of Business Administration (IBA)', city: 'Karachi', sector: 'public', hec: 'W4', qs: null, established: 1955 },
  { name: 'Karachi Institute of Economics and Technology', city: 'Karachi', sector: 'private', hec: 'W2', qs: null, established: 1997 },
  { name: 'Kinnaird College for Women University', city: 'Lahore', sector: 'private', hec: 'W2', qs: null, established: 1913 },
  { name: 'Lahore College for Women University', city: 'Lahore', sector: 'public', hec: 'W3', qs: null, established: 1922 },
  { name: 'National Defence University', city: 'Islamabad', sector: 'public', hec: 'W2', qs: null, established: 1970 },
  { name: 'National Textile University', city: 'Faisalabad', sector: 'public', hec: 'W3', qs: null, established: 2002 },
  { name: 'Pakistan Institute of Fashion and Design', city: 'Lahore', sector: 'public', hec: 'W1', qs: null, established: 1994 },
  { name: 'Riphah International University', city: 'Islamabad', sector: 'private', hec: 'W3', qs: null, established: 2002 },
  { name: 'Shaheed Zulfikar Ali Bhutto Institute (SZABIST)', city: 'Karachi', sector: 'private', hec: 'W3', qs: null, established: 1995 },
  { name: 'University of Central Punjab', city: 'Lahore', sector: 'private', hec: 'W3', qs: null, established: 2002 },
  { name: 'University of Lahore', city: 'Lahore', sector: 'private', hec: 'W3', qs: null, established: 1999 },
  { name: 'University of Management and Technology', city: 'Lahore', sector: 'private', hec: 'W3', qs: null, established: 1990 },
  { name: 'Virtual University of Pakistan', city: 'Lahore', sector: 'public', hec: 'W3', qs: null, established: 2002 },
  { name: 'Sindh Agriculture University', city: 'Tandojam', sector: 'public', hec: 'W3', qs: null, established: 1977 },
  { name: 'Shah Abdul Latif University', city: 'Khairpur', sector: 'public', hec: 'W2', qs: null, established: 1987 },
  { name: 'University of Sindh', city: 'Jamshoro', sector: 'public', hec: 'W3', qs: null, established: 1947 },
  { name: 'University of Balochistan', city: 'Quetta', sector: 'public', hec: 'W2', qs: null, established: 1970 },
  { name: 'Balochistan University of Information Technology (BUITEMS)', city: 'Quetta', sector: 'public', hec: 'W3', qs: null, established: 2002 },
  { name: 'Lasbela University', city: 'Uthal', sector: 'public', hec: 'W1', qs: null, established: 2005 },
  { name: 'Sardar Bahadur Khan Women University', city: 'Quetta', sector: 'public', hec: 'W2', qs: null, established: 2004 },
  { name: 'Islamia University of Bahawalpur', city: 'Bahawalpur', sector: 'public', hec: 'W3', qs: null, established: 1975 },
  { name: 'Khwaja Fareed University', city: 'Rahim Yar Khan', sector: 'public', hec: 'W2', qs: null, established: 2014 },
  { name: 'University of Sargodha', city: 'Sargodha', sector: 'public', hec: 'W3', qs: null, established: 2002 },
  { name: 'University of Gujrat', city: 'Gujrat', sector: 'public', hec: 'W3', qs: null, established: 2004 },
  { name: 'Fatima Jinnah Women University', city: 'Rawalpindi', sector: 'public', hec: 'W3', qs: null, established: 1998 },
  { name: 'Pir Mehr Ali Shah Arid Agriculture University', city: 'Rawalpindi', sector: 'public', hec: 'W3', qs: null, established: 1970 },
  { name: 'University of Swat', city: 'Swat', sector: 'public', hec: 'W2', qs: null, established: 2010 },
  { name: 'Abdul Wali Khan University Mardan', city: 'Mardan', sector: 'public', hec: 'W3', qs: null, established: 2009 },
  { name: 'Kohat University of Science and Technology', city: 'Kohat', sector: 'public', hec: 'W3', qs: null, established: 2001 },
  { name: 'Gomal University', city: 'Dera Ismail Khan', sector: 'public', hec: 'W2', qs: null, established: 1974 },
  { name: 'University of Haripur', city: 'Haripur', sector: 'public', hec: 'W2', qs: null, established: 2012 },
  { name: 'Hazara University', city: 'Mansehra', sector: 'public', hec: 'W3', qs: null, established: 2002 },
  { name: 'University of Azad Jammu and Kashmir', city: 'Muzaffarabad', sector: 'public', hec: 'W3', qs: null, established: 1980 },
  { name: 'Mirpur University of Science and Technology', city: 'Mirpur', sector: 'public', hec: 'W2', qs: null, established: 1980 },
  { name: 'Karakoram International University', city: 'Gilgit', sector: 'public', hec: 'W2', qs: null, established: 2002 },
  { name: 'University of Veterinary and Animal Sciences', city: 'Lahore', sector: 'public', hec: 'W4', qs: null, established: 1882 },
  { name: 'Dow University of Health Sciences', city: 'Karachi', sector: 'public', hec: 'W4', qs: null, established: 1945 },
  { name: 'King Edward Medical University', city: 'Lahore', sector: 'public', hec: 'W4', qs: null, established: 1860 },
  { name: 'Allama Iqbal Medical College', city: 'Lahore', sector: 'public', hec: 'W3', qs: null, established: 1975 },
  { name: 'Army Medical College', city: 'Rawalpindi', sector: 'public', hec: 'W3', qs: null, established: 1977 },
  { name: 'Shifa Tameer-e-Millat University', city: 'Islamabad', sector: 'private', hec: 'W3', qs: null, established: 2011 },
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
  console.log(JSON.stringify({ error: 'Usage: universities.mjs <top|search|category|city|sector|stats> [--flags]' }));
  process.exit(1);
}

if (cmd === 'top') {
  const limit = parseInt(args.limit) || 20;
  const sorted = [...UNIVERSITIES]
    .sort((a, b) => {
      if (a.qs && b.qs) return a.qs - b.qs;
      if (a.qs) return -1;
      if (b.qs) return 1;
      const hecOrder = { W4: 0, W3: 1, W2: 2, W1: 3, X: 4, Y: 5 };
      return (hecOrder[a.hec] || 9) - (hecOrder[b.hec] || 9);
    })
    .slice(0, limit);
  console.log(JSON.stringify({ top: sorted, total: sorted.length }));
} else if (cmd === 'search') {
  const q = (args.query || '').toLowerCase();
  if (!q) { console.log(JSON.stringify({ error: 'Usage: universities.mjs search --query <keyword>' })); process.exit(1); }
  const results = UNIVERSITIES.filter(u =>
    u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)
  );
  console.log(JSON.stringify({ query: q, results, total: results.length }));
} else if (cmd === 'category') {
  const cat = (args.name || '').toUpperCase();
  if (!cat) { console.log(JSON.stringify({ error: 'Usage: universities.mjs category --name <W4|W3|W2|W1|X|Y>' })); process.exit(1); }
  const results = UNIVERSITIES.filter(u => u.hec === cat);
  console.log(JSON.stringify({ category: cat, results, total: results.length }));
} else if (cmd === 'city') {
  const city = (args.name || '').toLowerCase();
  if (!city) { console.log(JSON.stringify({ error: 'Usage: universities.mjs city --name <city>' })); process.exit(1); }
  const results = UNIVERSITIES.filter(u => u.city.toLowerCase().includes(city));
  console.log(JSON.stringify({ city, results, total: results.length }));
} else if (cmd === 'sector') {
  const sec = (args.name || '').toLowerCase();
  if (!sec) { console.log(JSON.stringify({ error: 'Usage: universities.mjs sector --name <public|private>' })); process.exit(1); }
  const results = UNIVERSITIES.filter(u => u.sector === sec);
  console.log(JSON.stringify({ sector: sec, results, total: results.length }));
} else if (cmd === 'stats') {
  const pub = UNIVERSITIES.filter(u => u.sector === 'public').length;
  const priv = UNIVERSITIES.filter(u => u.sector === 'private').length;
  const hecCounts = {};
  UNIVERSITIES.forEach(u => { hecCounts[u.hec] = (hecCounts[u.hec] || 0) + 1; });
  const qsRanked = UNIVERSITIES.filter(u => u.qs).length;
  const cities = [...new Set(UNIVERSITIES.map(u => u.city))];
  console.log(JSON.stringify({
    total: UNIVERSITIES.length,
    public: pub,
    private: priv,
    hecCategories: hecCounts,
    qsRanked,
    cities: cities.length,
    cityList: cities.sort(),
  }));
} else {
  console.log(JSON.stringify({ error: `Unknown command: ${cmd}. Use: top, search, category, city, sector, stats` }));
  process.exit(1);
}

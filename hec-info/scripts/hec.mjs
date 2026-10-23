#!/usr/bin/env node

// ponytail: static DB from hec.gov.pk recognized list. Refresh by re-scraping if stale.
const UNIVERSITIES = [
  { name: "Abasyn University", province: "KPK", sector: "Private", discipline: "General" },
  { name: "Abbottabad University of Science and Technology (AUST)", province: "KPK", sector: "Public", discipline: "General" },
  { name: "Abdul Wali Khan University", province: "KPK", sector: "Public", discipline: "General" },
  { name: "Aga Khan University", province: "Sindh", sector: "Private", discipline: "Medical" },
  { name: "Air University", province: "ICT", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Allama Iqbal Open University", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Bahauddin Zakariya University", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "Bahria University", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Balochistan University of Engineering & Technology", province: "Balochistan", sector: "Public", discipline: "Engineering & Technology" },
  { name: "BUITEMS", province: "Balochistan", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Baqai Medical University", province: "Sindh", sector: "Private", discipline: "Medical" },
  { name: "Beaconhouse National University", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Capital University of Science & Technology", province: "ICT", sector: "Private", discipline: "General" },
  { name: "CECOS University", province: "KPK", sector: "Private", discipline: "Engineering & Technology" },
  { name: "COMSATS University, Islamabad", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Dawood University of Engineering & Technology", province: "Sindh", sector: "Public", discipline: "Engineering & Technology" },
  { name: "DHA Suffa University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "DOW University of Health Sciences", province: "Sindh", sector: "Public", discipline: "Medical" },
  { name: "Fatima Jinnah Medical University, Lahore", province: "Punjab", sector: "Public", discipline: "Medical" },
  { name: "Fatima Jinnah Women University, Rawalpindi", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "Federal Urdu University of Arts, Sciences & Technology", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Forman Christian College", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Foundation University", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Gandhara University", province: "KPK", sector: "Private", discipline: "Medical" },
  { name: "GIK Institute of Engineering Sciences & Technology", province: "KPK", sector: "Private", discipline: "Engineering & Technology" },
  { name: "GIFT University", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Gomal University", province: "KPK", sector: "Public", discipline: "General" },
  { name: "Government College University, Faisalabad", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "Government College University, Lahore", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "Greenwich University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Habib University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Hajvery University", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Hamdard University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Hazara University", province: "KPK", sector: "Public", discipline: "General" },
  { name: "Health Services Academy (HSA), Islamabad", province: "ICT", sector: "Public", discipline: "Medical" },
  { name: "HITEC University", province: "Punjab", sector: "Private", discipline: "Engineering & Technology" },
  { name: "IBA Karachi", province: "Sindh", sector: "Public", discipline: "General" },
  { name: "IBA Sukkur", province: "Sindh", sector: "Public", discipline: "General" },
  { name: "ILMA University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Indus University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Indus Valley School of Art & Architecture", province: "Sindh", sector: "Private", discipline: "Arts & Design" },
  { name: "Information Technology University of the Punjab", province: "Punjab", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Institute of Space Technology", province: "ICT", sector: "Public", discipline: "Engineering & Technology" },
  { name: "International Islamic University", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Iqra University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Islamia College Peshawar", province: "KPK", sector: "Public", discipline: "General" },
  { name: "Islamia University, Bahawalpur", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "Isra University", province: "Sindh", sector: "Private", discipline: "Medical" },
  { name: "Jinnah Sindh Medical University", province: "Sindh", sector: "Public", discipline: "Medical" },
  { name: "Jinnah University for Women", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Karachi Institute of Economics & Technology", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Karakurum International University", province: "GB", sector: "Public", discipline: "General" },
  { name: "Khyber Medical University", province: "KPK", sector: "Public", discipline: "Medical" },
  { name: "King Edward Medical University", province: "Punjab", sector: "Public", discipline: "Medical" },
  { name: "Kinnaird College for Women", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Kohat University of Science and Technology", province: "KPK", sector: "Public", discipline: "General" },
  { name: "Lahore College for Women University", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "Lahore Garrison University", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Lahore School of Economics", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Lahore University of Management Sciences", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Liaquat University of Medical & Health Sciences", province: "Sindh", sector: "Public", discipline: "Medical" },
  { name: "Mehran University of Engineering & Technology", province: "Sindh", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Minhaj University", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "Mirpur University of Science & Technology", province: "AJK", sector: "Public", discipline: "General" },
  { name: "Mohi-ud-Din Islamic University", province: "AJK", sector: "Private", discipline: "General" },
  { name: "Muhammad Ali Jinnah University", province: "Sindh", sector: "Private", discipline: "General" },
  { name: "Muhammad Nawaz Shareef University of Agriculture", province: "Punjab", sector: "Public", discipline: "Agriculture & Veterinary" },
  { name: "Namal University", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "National College of Arts", province: "Punjab", sector: "Public", discipline: "Arts & Design" },
  { name: "National Defense University", province: "ICT", sector: "Public", discipline: "General" },
  { name: "National Skills University, Islamabad", province: "ICT", sector: "Public", discipline: "General" },
  { name: "National Textile University", province: "Punjab", sector: "Public", discipline: "Engineering & Technology" },
  { name: "National University of Computer & Emerging Sciences (FAST)", province: "ICT", sector: "Private", discipline: "Engineering & Technology" },
  { name: "National University of Medical Sciences", province: "Punjab", sector: "Public", discipline: "Medical" },
  { name: "National University of Modern Languages", province: "ICT", sector: "Public", discipline: "General" },
  { name: "National University of Sciences & Technology (NUST)", province: "ICT", sector: "Public", discipline: "Engineering & Technology" },
  { name: "NED University of Engineering & Technology", province: "Sindh", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Nishtar Medical University, Multan", province: "Punjab", sector: "Public", discipline: "Medical" },
  { name: "Pak-Austria Fachhochschule, Haripur", province: "KPK", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Pakistan Institute of Development Economics", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Pakistan Institute of Engineering & Applied Sciences", province: "ICT", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Pakistan Institute of Fashion & Design", province: "Punjab", sector: "Public", discipline: "Arts & Design" },
  { name: "Pir Mehr Ali Shah Arid Agriculture University", province: "Punjab", sector: "Public", discipline: "Agriculture & Veterinary" },
  { name: "Quaid-e-Awam University of Engineering, Sciences & Technology", province: "Sindh", sector: "Public", discipline: "Engineering & Technology" },
  { name: "Quaid-i-Azam University", province: "ICT", sector: "Public", discipline: "General" },
  { name: "Rawalpindi Medical University", province: "Punjab", sector: "Public", discipline: "Medical" },
  { name: "Riphah International University", province: "ICT", sector: "Private", discipline: "General" },
  { name: "Shaheed Benazir Bhutto University, Shaheed Benazirabad", province: "Sindh", sector: "Public", discipline: "General" },
  { name: "Shaheed Benazir Bhutto Women University, Peshawar", province: "KPK", sector: "Public", discipline: "General" },
  { name: "Shaheed Zulfikar Ali Bhutto Medical University (SZABMU)", province: "ICT", sector: "Public", discipline: "Medical" },
  { name: "Sir Syed University of Engineering & Technology", province: "Sindh", sector: "Private", discipline: "Engineering & Technology" },
  { name: "Sukkur IBA University", province: "Sindh", sector: "Public", discipline: "General" },
  { name: "Superior University", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "University of Agriculture, Faisalabad", province: "Punjab", sector: "Public", discipline: "Agriculture & Veterinary" },
  { name: "University of Balochistan", province: "Balochistan", sector: "Public", discipline: "General" },
  { name: "University of Central Punjab", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "University of Education, Lahore", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "University of Engineering & Technology, Lahore", province: "Punjab", sector: "Public", discipline: "Engineering & Technology" },
  { name: "University of Engineering & Technology, Peshawar", province: "KPK", sector: "Public", discipline: "Engineering & Technology" },
  { name: "University of Engineering & Technology, Taxila", province: "Punjab", sector: "Public", discipline: "Engineering & Technology" },
  { name: "University of Gujrat", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "University of Health Sciences, Lahore", province: "Punjab", sector: "Public", discipline: "Medical" },
  { name: "University of Karachi", province: "Sindh", sector: "Public", discipline: "General" },
  { name: "University of Lahore", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "University of Management & Technology", province: "Punjab", sector: "Private", discipline: "General" },
  { name: "University of Okara", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "University of Peshawar", province: "KPK", sector: "Public", discipline: "General" },
  { name: "University of Punjab", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "University of Sargodha", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "University of Sindh", province: "Sindh", sector: "Public", discipline: "General" },
  { name: "University of Swat", province: "KPK", sector: "Public", discipline: "General" },
  { name: "University of Turbat", province: "Balochistan", sector: "Public", discipline: "General" },
  { name: "University of Veterinary & Animal Sciences, Lahore", province: "Punjab", sector: "Public", discipline: "Agriculture & Veterinary" },
  { name: "University of Wah", province: "Punjab", sector: "Private", discipline: "Engineering & Technology" },
  { name: "Virtual University of Pakistan", province: "Punjab", sector: "Public", discipline: "General" },
  { name: "Ziauddin University", province: "Sindh", sector: "Private", discipline: "Medical" },
];

const PROVINCES = ["Punjab", "Sindh", "KPK", "Balochistan", "ICT", "AJK", "GB"];
const SECTORS = ["Public", "Private"];
const DISCIPLINES = ["General", "Engineering & Technology", "Medical", "Agriculture & Veterinary", "Arts & Design"];

function search(query) {
  const q = query.toLowerCase();
  return UNIVERSITIES.filter(u => u.name.toLowerCase().includes(q));
}

function filter(opts) {
  return UNIVERSITIES.filter(u => {
    if (opts.province && u.province.toLowerCase() !== opts.province.toLowerCase()) return false;
    if (opts.sector && u.sector.toLowerCase() !== opts.sector.toLowerCase()) return false;
    if (opts.discipline && !u.discipline.toLowerCase().includes(opts.discipline.toLowerCase())) return false;
    return true;
  });
}

function stats() {
  const byProvince = {};
  const bySector = {};
  const byDiscipline = {};
  for (const u of UNIVERSITIES) {
    byProvince[u.province] = (byProvince[u.province] || 0) + 1;
    bySector[u.sector] = (bySector[u.sector] || 0) + 1;
    byDiscipline[u.discipline] = (byDiscipline[u.discipline] || 0) + 1;
  }
  return { total: UNIVERSITIES.length, byProvince, bySector, byDiscipline };
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "search") {
  const query = getFlag("query") || args[1];
  if (!query) { console.error("Usage: hec.mjs search --query <name>"); process.exit(1); }
  const results = search(query);
  console.log(JSON.stringify({ query, count: results.length, universities: results }, null, 2));
} else if (cmd === "list") {
  const opts = { province: getFlag("province"), sector: getFlag("sector"), discipline: getFlag("discipline") };
  const results = filter(opts);
  console.log(JSON.stringify({ filters: opts, count: results.length, universities: results }, null, 2));
} else if (cmd === "stats") {
  console.log(JSON.stringify(stats(), null, 2));
} else if (cmd === "provinces") {
  console.log(JSON.stringify({ provinces: PROVINCES }, null, 2));
} else if (cmd === "disciplines") {
  console.log(JSON.stringify({ disciplines: DISCIPLINES }, null, 2));
} else {
  console.error("Commands: search, list, stats, provinces, disciplines");
  console.error("  search --query <name>");
  console.error("  list [--province Punjab] [--sector Public] [--discipline Medical]");
  console.error("  stats");
  process.exit(1);
}

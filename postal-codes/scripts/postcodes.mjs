#!/usr/bin/env node

const POSTAL_CODES = [
  // Punjab — Lahore
  { code: "54000", area: "GPO / Anarkali", city: "Lahore", province: "Punjab" },
  { code: "54500", area: "Cantt", city: "Lahore", province: "Punjab" },
  { code: "54550", area: "Walton", city: "Lahore", province: "Punjab" },
  { code: "54570", area: "Garden Town", city: "Lahore", province: "Punjab" },
  { code: "54590", area: "Faisal Town", city: "Lahore", province: "Punjab" },
  { code: "54600", area: "Model Town", city: "Lahore", province: "Punjab" },
  { code: "54660", area: "DHA / Defence", city: "Lahore", province: "Punjab" },
  { code: "54700", area: "Gulberg", city: "Lahore", province: "Punjab" },
  { code: "54750", area: "Muslim Town", city: "Lahore", province: "Punjab" },
  { code: "54770", area: "Johar Town", city: "Lahore", province: "Punjab" },
  { code: "54780", area: "Wapda Town", city: "Lahore", province: "Punjab" },
  { code: "54782", area: "Bahria Town", city: "Lahore", province: "Punjab" },
  { code: "54790", area: "Township", city: "Lahore", province: "Punjab" },
  { code: "54800", area: "Samanabad", city: "Lahore", province: "Punjab" },
  { code: "54810", area: "Iqbal Town", city: "Lahore", province: "Punjab" },
  { code: "54840", area: "Shalimar", city: "Lahore", province: "Punjab" },
  { code: "54900", area: "Shahdara", city: "Lahore", province: "Punjab" },
  { code: "54920", area: "Raiwind", city: "Lahore", province: "Punjab" },

  // Sindh — Karachi
  { code: "74000", area: "GPO / Saddar", city: "Karachi", province: "Sindh" },
  { code: "74200", area: "Clifton", city: "Karachi", province: "Sindh" },
  { code: "74400", area: "Saddar Bazaar", city: "Karachi", province: "Sindh" },
  { code: "74500", area: "PECHS", city: "Karachi", province: "Sindh" },
  { code: "74600", area: "North Nazimabad", city: "Karachi", province: "Sindh" },
  { code: "74700", area: "Nazimabad", city: "Karachi", province: "Sindh" },
  { code: "74800", area: "Gulshan-e-Iqbal", city: "Karachi", province: "Sindh" },
  { code: "74900", area: "Gulistan-e-Jauhar", city: "Karachi", province: "Sindh" },
  { code: "75100", area: "Federal B Area", city: "Karachi", province: "Sindh" },
  { code: "75300", area: "Korangi", city: "Karachi", province: "Sindh" },
  { code: "75350", area: "Landhi", city: "Karachi", province: "Sindh" },
  { code: "75500", area: "Malir", city: "Karachi", province: "Sindh" },
  { code: "75600", area: "DHA / Defence", city: "Karachi", province: "Sindh" },
  { code: "75660", area: "Bahria Town", city: "Karachi", province: "Sindh" },
  { code: "75850", area: "Surjani Town", city: "Karachi", province: "Sindh" },
  { code: "75950", area: "Orangi Town", city: "Karachi", province: "Sindh" },
  { code: "75080", area: "North Karachi", city: "Karachi", province: "Sindh" },

  // ICT — Islamabad
  { code: "44000", area: "GPO", city: "Islamabad", province: "ICT" },
  { code: "44010", area: "Blue Area", city: "Islamabad", province: "ICT" },
  { code: "44020", area: "F-5", city: "Islamabad", province: "ICT" },
  { code: "44040", area: "F-6 / Super Market", city: "Islamabad", province: "ICT" },
  { code: "44050", area: "F-7 / Jinnah Super", city: "Islamabad", province: "ICT" },
  { code: "44060", area: "F-8", city: "Islamabad", province: "ICT" },
  { code: "44070", area: "F-10", city: "Islamabad", province: "ICT" },
  { code: "44080", area: "F-11", city: "Islamabad", province: "ICT" },
  { code: "44090", area: "G-6", city: "Islamabad", province: "ICT" },
  { code: "44100", area: "G-7", city: "Islamabad", province: "ICT" },
  { code: "44110", area: "G-8", city: "Islamabad", province: "ICT" },
  { code: "44200", area: "G-9", city: "Islamabad", province: "ICT" },
  { code: "44210", area: "G-10", city: "Islamabad", province: "ICT" },
  { code: "44220", area: "G-11", city: "Islamabad", province: "ICT" },
  { code: "44230", area: "I-8", city: "Islamabad", province: "ICT" },
  { code: "44240", area: "I-9", city: "Islamabad", province: "ICT" },
  { code: "44250", area: "I-10", city: "Islamabad", province: "ICT" },
  { code: "44310", area: "Bahria Town", city: "Islamabad", province: "ICT" },
  { code: "44320", area: "DHA", city: "Islamabad", province: "ICT" },
  { code: "44350", area: "E-11", city: "Islamabad", province: "ICT" },
  { code: "44790", area: "Tarnol", city: "Islamabad", province: "ICT" },

  // Punjab — Rawalpindi
  { code: "46000", area: "GPO", city: "Rawalpindi", province: "Punjab" },
  { code: "46200", area: "Cantt", city: "Rawalpindi", province: "Punjab" },
  { code: "46300", area: "Satellite Town", city: "Rawalpindi", province: "Punjab" },
  { code: "46310", area: "Chaklala", city: "Rawalpindi", province: "Punjab" },
  { code: "46320", area: "Westridge", city: "Rawalpindi", province: "Punjab" },
  { code: "46600", area: "Wah Cantt", city: "Rawalpindi", province: "Punjab" },

  // Punjab — Multan
  { code: "60000", area: "GPO", city: "Multan", province: "Punjab" },
  { code: "60300", area: "Shah Rukn-e-Alam", city: "Multan", province: "Punjab" },
  { code: "60500", area: "Mumtazabad", city: "Multan", province: "Punjab" },
  { code: "60600", area: "Cantt", city: "Multan", province: "Punjab" },
  { code: "60650", area: "DHA", city: "Multan", province: "Punjab" },
  { code: "60700", area: "Bosan Road", city: "Multan", province: "Punjab" },

  // Punjab — Faisalabad
  { code: "38000", area: "GPO", city: "Faisalabad", province: "Punjab" },
  { code: "38040", area: "Peoples Colony", city: "Faisalabad", province: "Punjab" },
  { code: "38060", area: "Madina Town", city: "Faisalabad", province: "Punjab" },
  { code: "38090", area: "Ghulam Muhammad Abad", city: "Faisalabad", province: "Punjab" },
  { code: "38850", area: "Jaranwala", city: "Faisalabad", province: "Punjab" },

  // KPK — Peshawar
  { code: "25000", area: "GPO", city: "Peshawar", province: "KPK" },
  { code: "25100", area: "Cantt", city: "Peshawar", province: "KPK" },
  { code: "25120", area: "University Town", city: "Peshawar", province: "KPK" },
  { code: "25130", area: "Hayatabad", city: "Peshawar", province: "KPK" },
  { code: "25140", area: "Dalazak Road", city: "Peshawar", province: "KPK" },

  // Balochistan — Quetta
  { code: "87000", area: "GPO", city: "Quetta", province: "Balochistan" },
  { code: "87100", area: "Cantt", city: "Quetta", province: "Balochistan" },
  { code: "87300", area: "Satellite Town", city: "Quetta", province: "Balochistan" },

  // Punjab — other cities
  { code: "51000", area: "GPO", city: "Gujranwala", province: "Punjab" },
  { code: "52000", area: "GPO", city: "Sialkot", province: "Punjab" },
  { code: "53000", area: "GPO", city: "Gujrat", province: "Punjab" },
  { code: "55000", area: "GPO", city: "Sargodha", province: "Punjab" },
  { code: "56000", area: "GPO", city: "Mianwali", province: "Punjab" },
  { code: "57000", area: "GPO", city: "Jhang", province: "Punjab" },
  { code: "58000", area: "GPO", city: "Sahiwal", province: "Punjab" },
  { code: "59000", area: "GPO", city: "Vehari", province: "Punjab" },
  { code: "61000", area: "GPO", city: "Bahawalpur", province: "Punjab" },
  { code: "62000", area: "GPO", city: "Rahim Yar Khan", province: "Punjab" },
  { code: "63000", area: "GPO", city: "Dera Ghazi Khan", province: "Punjab" },
  { code: "64000", area: "GPO", city: "Khanewal", province: "Punjab" },
  { code: "35000", area: "GPO", city: "Jhelum", province: "Punjab" },
  { code: "47000", area: "GPO", city: "Attock", province: "Punjab" },
  { code: "48000", area: "GPO", city: "Chakwal", province: "Punjab" },
  { code: "50000", area: "GPO", city: "Mandi Bahauddin", province: "Punjab" },

  // Sindh — other cities
  { code: "67000", area: "GPO", city: "Hyderabad", province: "Sindh" },
  { code: "68000", area: "GPO", city: "Sukkur", province: "Sindh" },
  { code: "69000", area: "GPO", city: "Larkana", province: "Sindh" },
  { code: "70000", area: "GPO", city: "Nawabshah", province: "Sindh" },
  { code: "71000", area: "GPO", city: "Mirpur Khas", province: "Sindh" },
  { code: "76000", area: "GPO", city: "Thatta", province: "Sindh" },

  // KPK — other cities
  { code: "21000", area: "GPO", city: "Mardan", province: "KPK" },
  { code: "22000", area: "GPO", city: "Nowshera", province: "KPK" },
  { code: "23000", area: "GPO", city: "Mingora / Swat", province: "KPK" },
  { code: "26000", area: "GPO", city: "Kohat", province: "KPK" },
  { code: "27000", area: "GPO", city: "Bannu", province: "KPK" },
  { code: "28000", area: "GPO", city: "Dera Ismail Khan", province: "KPK" },
  { code: "29000", area: "GPO", city: "Abbottabad", province: "KPK" },
  { code: "24000", area: "GPO", city: "Charsadda", province: "KPK" },

  // Balochistan — other cities
  { code: "80000", area: "GPO", city: "Turbat", province: "Balochistan" },
  { code: "82000", area: "GPO", city: "Gwadar", province: "Balochistan" },
  { code: "83000", area: "GPO", city: "Khuzdar", province: "Balochistan" },
  { code: "84000", area: "GPO", city: "Zhob", province: "Balochistan" },
  { code: "86000", area: "GPO", city: "Sibi", province: "Balochistan" },

  // AJK
  { code: "13100", area: "GPO", city: "Muzaffarabad", province: "AJK" },
  { code: "10250", area: "GPO", city: "Mirpur AJK", province: "AJK" },
  { code: "12000", area: "GPO", city: "Rawalakot", province: "AJK" },

  // Gilgit-Baltistan
  { code: "15100", area: "GPO", city: "Gilgit", province: "GB" },
  { code: "15200", area: "GPO", city: "Skardu", province: "GB" },
  { code: "15300", area: "GPO", city: "Hunza", province: "GB" },
];

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "search") {
  const query = (getFlag("query") || args.slice(1).join(" ")).toLowerCase();
  if (!query) { console.error("Usage: postcodes.mjs search --query <area>"); process.exit(1); }
  const words = query.split(/\s+/).filter(Boolean);
  const results = POSTAL_CODES.filter(p => {
    const haystack = `${p.area} ${p.city} ${p.province} ${p.code}`.toLowerCase();
    return words.every(w => haystack.includes(w));
  });
  console.log(JSON.stringify({ query, count: results.length, results }, null, 2));

} else if (cmd === "lookup") {
  const code = getFlag("code") || args[1];
  if (!code) { console.error("Usage: postcodes.mjs lookup --code <number>"); process.exit(1); }
  const results = POSTAL_CODES.filter(p => p.code === code);
  console.log(JSON.stringify({ code, count: results.length, results }, null, 2));

} else if (cmd === "city") {
  const name = (getFlag("name") || args[1] || "").toLowerCase();
  if (!name) { console.error("Usage: postcodes.mjs city --name <city>"); process.exit(1); }
  const results = POSTAL_CODES.filter(p => p.city.toLowerCase() === name);
  console.log(JSON.stringify({ city: name, count: results.length, codes: results }, null, 2));

} else if (cmd === "cities") {
  const cities = [...new Set(POSTAL_CODES.map(p => p.city))].sort();
  const byProvince = {};
  for (const p of POSTAL_CODES) {
    if (!byProvince[p.province]) byProvince[p.province] = new Set();
    byProvince[p.province].add(p.city);
  }
  const provinces = {};
  for (const [prov, set] of Object.entries(byProvince)) {
    provinces[prov] = [...set].sort();
  }
  console.log(JSON.stringify({ totalCities: cities.length, totalCodes: POSTAL_CODES.length, provinces }, null, 2));

} else {
  console.error("Commands: search, lookup, city, cities");
  console.error("  search --query <area name>");
  console.error("  lookup --code <postal code>");
  console.error("  city --name <city>");
  console.error("  cities");
  process.exit(1);
}

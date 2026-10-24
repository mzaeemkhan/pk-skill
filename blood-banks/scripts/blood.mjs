#!/usr/bin/env node

const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const UA = "pk-skill/1.0 (blood-banks)";

const PK_CITIES = {
  karachi: { lat: 24.8607, lon: 67.0011 },
  lahore: { lat: 31.5204, lon: 74.3587 },
  islamabad: { lat: 33.6844, lon: 73.0479 },
  rawalpindi: { lat: 33.5651, lon: 73.0169 },
  faisalabad: { lat: 31.4504, lon: 73.1350 },
  multan: { lat: 30.1575, lon: 71.5249 },
  peshawar: { lat: 34.0151, lon: 71.5249 },
  quetta: { lat: 30.1798, lon: 66.9750 },
  hyderabad: { lat: 25.3960, lon: 68.3578 },
  sialkot: { lat: 32.4945, lon: 74.5229 },
  gujranwala: { lat: 32.1877, lon: 74.1945 },
  bahawalpur: { lat: 29.3956, lon: 71.6836 },
  sargodha: { lat: 32.0740, lon: 72.6861 },
  sukkur: { lat: 27.7052, lon: 68.8574 },
  larkana: { lat: 27.5570, lon: 68.2120 },
  mardan: { lat: 34.1986, lon: 72.0404 },
  abbottabad: { lat: 34.1688, lon: 73.2215 },
  mirpur: { lat: 33.1476, lon: 73.7510 },
  muzaffarabad: { lat: 34.3700, lon: 73.4700 },
  gilgit: { lat: 35.9208, lon: 74.3144 },
  sahiwal: { lat: 30.6682, lon: 73.1114 },
  rahim_yar_khan: { lat: 28.4202, lon: 70.2952 },
  dera_ghazi_khan: { lat: 30.0489, lon: 70.6455 },
  gujrat: { lat: 32.5739, lon: 74.0789 },
  jhelum: { lat: 32.9425, lon: 73.7257 },
  jhang: { lat: 31.2681, lon: 72.3181 },
  nawabshah: { lat: 26.2442, lon: 68.4100 },
  kohat: { lat: 33.5869, lon: 71.4414 },
};

const MAJOR_ORGS = [
  { name: "Fatimid Foundation", cities: ["Karachi", "Lahore", "Islamabad", "Multan", "Hyderabad"], phone: "0800-11786", services: "Blood bank, thalassemia treatment, platelet donation", website: "fatimid.org" },
  { name: "Sundas Foundation", cities: ["Lahore", "Islamabad", "Faisalabad", "Rawalpindi", "Multan"], phone: "042-35761999", services: "Blood bank, thalassemia care, bone marrow transplant support", website: "sundasfoundation.com" },
  { name: "Indus Hospital Blood Center", cities: ["Karachi"], phone: "021-35112709", services: "Blood bank, component separation, free blood for patients", website: "indushospital.org.pk" },
  { name: "AFIP Blood Bank", cities: ["Rawalpindi"], phone: "051-9270692", services: "Armed Forces Institute of Pathology blood bank", website: "" },
  { name: "Husaini Blood Bank", cities: ["Karachi"], phone: "021-34130232", services: "Blood collection, storage, transfusion services", website: "" },
  { name: "Pakistan Red Crescent Society", cities: ["Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta"], phone: "051-9250404", services: "Blood donation drives, disaster relief blood supply", website: "prcs.org.pk" },
  { name: "Thalassemia Federation of Pakistan", cities: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Peshawar"], phone: "021-34559865", services: "Thalassemia blood transfusion centers", website: "" },
  { name: "SIUT Blood Bank", cities: ["Karachi"], phone: "021-99215752", services: "Sindh Institute of Urology & Transplantation blood bank", website: "siut.org" },
  { name: "Aga Khan University Hospital Blood Bank", cities: ["Karachi"], phone: "021-111-911-911", services: "Hospital blood bank, component therapy", website: "aku.edu" },
  { name: "Shaukat Khanum Blood Bank", cities: ["Lahore", "Peshawar", "Karachi"], phone: "042-35905000", services: "Cancer hospital blood bank, platelet apheresis", website: "shaukatkhanum.org.pk" },
];

async function searchBloodBanks(city, limit) {
  const query = `blood bank in ${city} Pakistan`;
  const url = `${NOMINATIM}?q=${encodeURIComponent(query)}&format=json&limit=${limit}&countrycodes=pk&addressdetails=1`;

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
  const data = await res.json();

  const osmResults = data.map(r => ({
    name: r.name || "Unnamed Blood Bank",
    source: "openstreetmap",
    lat: parseFloat(r.lat),
    lon: parseFloat(r.lon),
    address: r.display_name,
    city: r.address?.city || r.address?.town || r.address?.county || city,
    province: r.address?.state || "",
  }));

  const cityLower = city.toLowerCase();
  const majorMatches = MAJOR_ORGS
    .filter(org => org.cities.some(c => c.toLowerCase() === cityLower))
    .map(org => ({
      name: org.name,
      source: "curated",
      phone: org.phone,
      services: org.services,
      website: org.website || null,
      city,
    }));

  return { osmResults, majorOrganizations: majorMatches };
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "search") {
  const city = getFlag("city") || args[1];
  const limit = parseInt(getFlag("limit") || "10", 10);
  if (!city) { console.error("Usage: blood.mjs search --city <city> [--limit 10]"); process.exit(1); }
  searchBloodBanks(city, limit)
    .then(r => {
      const total = r.osmResults.length + r.majorOrganizations.length;
      console.log(JSON.stringify({ city, totalResults: total, ...r }, null, 2));
    })
    .catch(e => { console.error(e.message); process.exit(1); });

} else if (cmd === "major") {
  console.log(JSON.stringify({ totalOrganizations: MAJOR_ORGS.length, organizations: MAJOR_ORGS }, null, 2));

} else if (cmd === "cities") {
  const cities = Object.keys(PK_CITIES).map(c => c.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()));
  console.log(JSON.stringify({ count: cities.length, cities: cities.sort() }, null, 2));

} else {
  console.error("Commands: search, major, cities");
  console.error("  search --city <city> [--limit 10]");
  console.error("  major");
  console.error("  cities");
  process.exit(1);
}

#!/usr/bin/env node

// Pakistan electricity load shedding — DISCO reference data

const DISCOS = [
  {
    name: "LESCO",
    fullName: "Lahore Electric Supply Company",
    website: "https://www.lesco.gov.pk",
    scheduleUrl: "https://www.lesco.gov.pk/LoadSheddingShutdownSchedule",
    helpline: "118",
    complaintHelpline: "0800-66666",
    smsCode: "Send feeder code to 8118",
    region: "Central Punjab",
    hq: "Lahore",
    coverageAreas: ["Lahore", "Sheikhupura", "Kasur", "Okara", "Nankana Sahib"],
    circles: ["City", "Northern", "Southern", "Eastern", "Sheikhupura", "Kasur", "Okara"],
  },
  {
    name: "FESCO",
    fullName: "Faisalabad Electric Supply Company",
    website: "https://fesco.gov.pk",
    scheduleUrl: "https://fesco.gov.pk/loadshedding",
    helpline: "118",
    complaintHelpline: "0800-66555",
    smsCode: "Send feeder code to 8118",
    region: "Central Punjab",
    hq: "Faisalabad",
    coverageAreas: ["Faisalabad", "Sargodha", "Jhang", "Toba Tek Singh", "Mianwali", "Khushab", "Bhakkar", "Chiniot"],
    circles: ["Faisalabad-I", "Faisalabad-II", "Sargodha", "Jhang", "Mianwali"],
  },
  {
    name: "IESCO",
    fullName: "Islamabad Electric Supply Company",
    website: "https://iesco.com.pk",
    scheduleUrl: "https://iesco.com.pk/index.php/customer-services/load-management-schedule",
    helpline: "118",
    complaintHelpline: "051-9252933",
    smsCode: "Send feeder code to 8118",
    region: "Northern Punjab / Islamabad",
    hq: "Islamabad",
    coverageAreas: ["Islamabad", "Rawalpindi", "Attock", "Jhelum", "Chakwal"],
    circles: ["Islamabad", "Rawalpindi City", "Rawalpindi Cantt", "Attock", "Jhelum", "Chakwal"],
  },
  {
    name: "MEPCO",
    fullName: "Multan Electric Power Company",
    website: "https://mepco.com.pk",
    scheduleUrl: "https://mepco.com.pk/loadshedding",
    helpline: "118",
    complaintHelpline: "0800-63726",
    smsCode: "Send feeder code to 8118",
    region: "Southern Punjab",
    hq: "Multan",
    coverageAreas: ["Multan", "Bahawalpur", "D.G. Khan", "Sahiwal", "Vehari", "Khanewal", "Muzaffargarh", "Rajanpur", "Lodhran", "Layyah", "Bahawalnagar", "Rahim Yar Khan", "Pakpattan"],
    circles: ["Multan", "Bahawalpur", "D.G. Khan", "Sahiwal", "Vehari", "Muzaffargarh", "Rahim Yar Khan"],
  },
  {
    name: "GEPCO",
    fullName: "Gujranwala Electric Power Company",
    website: "https://gepco.com.pk",
    scheduleUrl: "https://gepco.com.pk/ls.aspx",
    helpline: "118",
    complaintHelpline: "0800-43726",
    smsCode: "Send feeder code to 8118",
    region: "Northern Punjab",
    hq: "Gujranwala",
    coverageAreas: ["Gujranwala", "Gujrat", "Sialkot", "Narowal", "Hafizabad", "Mandi Bahauddin"],
    circles: ["Gujranwala", "Gujrat", "Sialkot", "Narowal"],
  },
  {
    name: "PESCO",
    fullName: "Peshawar Electric Supply Company",
    website: "https://pesco.gov.pk",
    scheduleUrl: "https://pesco.gov.pk/load-shedding-schedule/",
    helpline: "118",
    complaintHelpline: "0800-73726",
    smsCode: "Send feeder code to 8118",
    region: "Khyber Pakhtunkhwa",
    hq: "Peshawar",
    coverageAreas: ["Peshawar", "Mardan", "Swat", "Abbottabad", "Mansehra", "Kohat", "Bannu", "D.I. Khan", "Swabi", "Haripur"],
    circles: ["Peshawar", "Mardan", "Swat", "Abbottabad", "Kohat", "Bannu", "D.I. Khan"],
  },
  {
    name: "HESCO",
    fullName: "Hyderabad Electric Supply Company",
    website: "https://hesco.gov.pk",
    scheduleUrl: "https://hesco.gov.pk",
    helpline: "118",
    complaintHelpline: "0800-43726",
    smsCode: "Send feeder code to 8118",
    region: "Sindh (except Karachi & Sukkur)",
    hq: "Hyderabad",
    coverageAreas: ["Hyderabad", "Mirpurkhas", "Nawabshah", "Badin", "Thatta", "Tando Allahyar", "Tando Muhammad Khan"],
    circles: ["Hyderabad", "Mirpurkhas", "Nawabshah"],
  },
  {
    name: "SEPCO",
    fullName: "Sukkur Electric Power Company",
    website: "https://sepco.com.pk",
    scheduleUrl: "https://sepco.com.pk",
    helpline: "118",
    complaintHelpline: "0800-73726",
    smsCode: "Send feeder code to 8118",
    region: "Upper Sindh",
    hq: "Sukkur",
    coverageAreas: ["Sukkur", "Larkana", "Jacobabad", "Shikarpur", "Khairpur", "Ghotki", "Naushahro Feroze"],
    circles: ["Sukkur", "Larkana", "Jacobabad"],
  },
  {
    name: "QESCO",
    fullName: "Quetta Electric Supply Company",
    website: "https://qesco.com.pk",
    scheduleUrl: "https://qesco.com.pk",
    helpline: "118",
    complaintHelpline: "0800-78726",
    smsCode: "Send feeder code to 8118",
    region: "Balochistan",
    hq: "Quetta",
    coverageAreas: ["Quetta", "Zhob", "Sibi", "Khuzdar", "Turbat", "Gwadar", "Loralai", "Chaman"],
    circles: ["Quetta", "Zhob", "Sibi", "Khuzdar", "Makran"],
  },
  {
    name: "TESCO",
    fullName: "Tribal Areas Electric Supply Company",
    website: "https://tesco.gov.pk",
    scheduleUrl: "https://tesco.gov.pk",
    helpline: "118",
    complaintHelpline: "091-9219498",
    smsCode: "Send feeder code to 8118",
    region: "Merged Tribal Areas (KP)",
    hq: "Peshawar",
    coverageAreas: ["Bajaur", "Mohmand", "Khyber", "Orakzai", "Kurram", "North Waziristan", "South Waziristan"],
    circles: ["Bajaur", "Mohmand", "Khyber", "South"],
  },
  {
    name: "HAZECO",
    fullName: "Hazara Electric Supply Company",
    website: "https://hazeco.gov.pk",
    scheduleUrl: "https://hazeco.gov.pk",
    helpline: "118",
    complaintHelpline: "0992-383600",
    smsCode: "Send feeder code to 8118",
    region: "Hazara Division (KP)",
    hq: "Abbottabad",
    coverageAreas: ["Abbottabad", "Haripur", "Mansehra", "Battagram", "Kohistan", "Shangla", "Tor Ghar"],
    circles: ["Abbottabad", "Mansehra", "Haripur"],
  },
  {
    name: "K-Electric",
    fullName: "K-Electric Limited (formerly KESC)",
    website: "https://www.ke.com.pk",
    scheduleUrl: "https://www.ke.com.pk/load-management-schedule/",
    helpline: "118",
    complaintHelpline: "0800-66300",
    smsCode: "SMS 'LS' to 8119 with your account number",
    region: "Karachi & parts of Sindh/Balochistan",
    hq: "Karachi",
    coverageAreas: ["Karachi", "Dhabeji", "Gharo", "Hub (Balochistan)", "Uthal (Balochistan)"],
    circles: ["North", "South", "Central", "SITE", "Korangi", "Bin Qasim", "Hub"],
    note: "K-Electric is a private utility — different from WAPDA DISCOs",
  },
];

// City-to-DISCO mapping
const CITY_DISCO = {};
for (const d of DISCOS) {
  for (const city of d.coverageAreas) {
    CITY_DISCO[city.toLowerCase()] = d.name;
  }
}

function listDiscos() {
  return {
    count: DISCOS.length,
    discos: DISCOS.map(d => ({
      name: d.name,
      fullName: d.fullName,
      region: d.region,
      hq: d.hq,
      helpline: d.helpline,
      complaintHelpline: d.complaintHelpline,
      smsCode: d.smsCode,
      website: d.website,
      coverageAreas: d.coverageAreas,
    })),
  };
}

function getDisco(name) {
  const disco = DISCOS.find(d => d.name.toLowerCase() === name.toLowerCase());
  if (!disco) {
    const available = DISCOS.map(d => d.name).join(", ");
    console.error(`Unknown DISCO: ${name}. Available: ${available}`);
    process.exit(1);
  }
  return disco;
}

function scheduleGuide(discoName) {
  const disco = getDisco(discoName);
  return {
    disco: disco.name,
    fullName: disco.fullName,
    region: disco.region,
    howToCheck: [
      `1. Visit ${disco.scheduleUrl}`,
      `2. ${disco.smsCode}`,
      `3. Call helpline: ${disco.helpline} or ${disco.complaintHelpline}`,
      "4. Check your electricity bill — feeder code is printed on it",
      `5. Download the official ${disco.name} app (if available) from Play Store`,
    ],
    scheduleUrl: disco.scheduleUrl,
    smsCode: disco.smsCode,
    helpline: disco.complaintHelpline,
    loadSheddingCategories: {
      urban: "Category A/B areas: 0-4 hours daily (low-loss feeders)",
      suburban: "Category C areas: 4-6 hours daily (medium-loss feeders)",
      rural: "Category D/E areas: 6-12 hours daily (high-loss feeders)",
      exempt: "Hospitals, water supply, military: typically exempt",
    },
    note: "Load shedding varies by feeder, loss category, and season. Check your specific feeder schedule using the methods above.",
    feederCodeNote: "Your feeder code is on your electricity bill (usually a 5-6 digit code). You need this code to look up your specific schedule.",
  };
}

function searchByCity(city) {
  const lc = city.toLowerCase();
  const exact = CITY_DISCO[lc];
  if (exact) {
    const disco = getDisco(exact);
    return { city, disco: disco.name, fullName: disco.fullName, region: disco.region, helpline: disco.complaintHelpline, smsCode: disco.smsCode, scheduleUrl: disco.scheduleUrl };
  }
  // Fuzzy match
  const matches = DISCOS.filter(d => d.coverageAreas.some(a => a.toLowerCase().includes(lc)) || d.region.toLowerCase().includes(lc));
  if (matches.length === 0) {
    return { city, error: "No DISCO found for this city. Try a major city name or check the full DISCO list with 'discos' command." };
  }
  return {
    city,
    matches: matches.map(d => ({ name: d.name, fullName: d.fullName, region: d.region, helpline: d.complaintHelpline, smsCode: d.smsCode, scheduleUrl: d.scheduleUrl })),
  };
}

function generalInfo() {
  return {
    title: "Pakistan Load Shedding Guide",
    description: "Electricity load shedding (load management) is scheduled power outages by distribution companies to manage supply-demand gaps.",
    keyFacts: [
      "Pakistan has 11 WAPDA DISCOs + K-Electric (Karachi)",
      "Load shedding varies by area, feeder, and loss category",
      "Urban/low-loss areas: 0-4 hours; rural/high-loss: 6-12+ hours",
      "Schedules change seasonally — summer peak has more shedding",
      "Industrial feeders have separate schedules",
    ],
    howToFind: [
      "1. Find your feeder code on your electricity bill",
      "2. Visit your DISCO website's load shedding page",
      "3. SMS your feeder code to 8118 (WAPDA DISCOs) or 8119 (K-Electric)",
      "4. Call 118 (universal DISCO helpline)",
    ],
    lossCategories: {
      A: "0-10% line losses — minimal load shedding (0-2 hrs)",
      B: "10-20% line losses — light load shedding (2-4 hrs)",
      C: "20-30% line losses — moderate load shedding (4-6 hrs)",
      D: "30-40% line losses — heavy load shedding (6-8 hrs)",
      E: "40%+ line losses — severe load shedding (8-12+ hrs)",
    },
    universalHelpline: "118",
    smsService: "8118 (WAPDA) / 8119 (K-Electric)",
  };
}

// CLI
const args = process.argv.slice(2);
const cmd = args[0];
function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "discos") {
  console.log(JSON.stringify(listDiscos(), null, 2));
} else if (cmd === "disco") {
  const name = getFlag("name") || args[1];
  if (!name) { console.error("Usage: loadshedding.mjs disco --name LESCO"); process.exit(1); }
  console.log(JSON.stringify(getDisco(name), null, 2));
} else if (cmd === "schedule") {
  const disco = getFlag("disco") || args[1];
  if (!disco) { console.error("Usage: loadshedding.mjs schedule --disco LESCO"); process.exit(1); }
  console.log(JSON.stringify(scheduleGuide(disco), null, 2));
} else if (cmd === "search") {
  const city = getFlag("city") || args[1];
  if (!city) { console.error("Usage: loadshedding.mjs search --city Multan"); process.exit(1); }
  console.log(JSON.stringify(searchByCity(city), null, 2));
} else if (cmd === "info") {
  console.log(JSON.stringify(generalInfo(), null, 2));
} else {
  console.error("Commands: discos, disco, schedule, search, info");
  console.error("  discos                   — list all DISCOs");
  console.error("  disco --name LESCO       — info for one DISCO");
  console.error("  schedule --disco LESCO   — how to find your schedule");
  console.error("  search --city Multan     — find DISCO by city");
  console.error("  info                     — general load shedding guide");
  process.exit(1);
}

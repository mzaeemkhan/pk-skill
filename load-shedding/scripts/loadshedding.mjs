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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://mepco.com.pk/load-shedding-schedule-for-consumer/",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://ccms.pitc.com.pk/FeederDetails",
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
    scheduleUrl: "https://www.ke.com.pk",
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

// Live feeder status from PITC's load-management portal (all 11 WAPDA DISCOs).
// Only 6-digit feeder codes are accepted: the same endpoint returns the account
// holder's name, CNIC and phone for a 14-digit bill reference.
const PITC_FEEDER = "https://ccms.pitc.com.pk/FeederDetails";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

function cellsOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, "")
    .split(/<[^>]+>/)
    .map((c) => c.replace(/&nbsp;|&#\d+;|&amp;/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

const after = (cells, label) => { const i = cells.indexOf(label); return i >= 0 ? cells[i + 1] : null; };
const isHour = (c) => /^\d{2}:00$/.test(c);
const minutesOf = (v) => (/^\d+$/.test(v) ? Number(v) : null);

function parseFeeder(html) {
  const all = cellsOf(html);
  const cut = all.indexOf("Title");
  const cells = cut >= 0 ? all.slice(0, cut) : all; // drop the consumer-info table
  const feeder = after(cells, "Feeder:");
  if (!feeder) return null;
  const statusIdx = cells.indexOf("Feeder Status:");
  const hours = {};
  // Grid: per hour → [tomorrowSchedule, todaySchedule, todayActual, yesterdayActual]
  for (let i = 0; i < cells.length; i++) {
    if (isHour(cells[i]) && i + 4 < cells.length && !isHour(cells[i + 1])) {
      hours[cells[i]] = cells.slice(i + 1, i + 5);
    }
  }
  const pick = (col) => Object.entries(hours)
    .map(([h, v]) => ({ hour: h, value: v[col] }))
    .sort((a, b) => a.hour.localeCompare(b.hour));
  const outages = (col) => pick(col).filter((x) => minutesOf(x.value) !== null).map((x) => ({ hour: x.hour, minutesOff: minutesOf(x.value) }));
  const scheduledOff = (col) => pick(col).filter((x) => x.value && x.value !== "ON" && x.value !== "-").map((x) => ({ hour: x.hour, schedule: x.value }));
  const sum = (list) => list.reduce((t, x) => t + x.minutesOff, 0);
  const today = outages(2), yesterday = outages(3);
  return {
    feeder,
    grid: after(cells, "Grid:"),
    subDivision: after(cells, "Sub Division:"),
    statusNow: statusIdx >= 0 ? cells[statusIdx + 1] : null,
    lossCategory: after(cells, "Category:"),
    lineLoss: after(cells, "Line Loss:"),
    scheduledCuts: { today: scheduledOff(1), tomorrow: scheduledOff(0) },
    unplannedOutages: {
      today: { totalMinutes: sum(today), byHour: today },
      yesterday: { totalMinutes: sum(yesterday), byHour: yesterday },
    },
  };
}

// PITC drops some connections outright; one retry after a pause clears most of them.
async function fetchRetry(url, opts) {
  try { return await fetch(url, { ...opts, signal: AbortSignal.timeout(45000) }); }
  catch (e) {
    if (e.name === "TimeoutError") throw e;
    await new Promise((r) => setTimeout(r, 2000));
    return fetch(url, { ...opts, signal: AbortSignal.timeout(45000) });
  }
}

async function feederStatus(code) {
  if (!/^\d{6}$/.test(code || "")) {
    console.error("Feeder code must be exactly 6 digits (printed on the electricity bill as 'Feeder Code'). Bill reference numbers are not accepted: that lookup exposes the account holder's personal details.");
    process.exit(1);
  }
  const page = await fetchRetry(PITC_FEEDER, { headers: { "User-Agent": UA } });
  if (!page.ok) throw new Error(`PITC feeder page HTTP ${page.status}`);
  const html = await page.text();
  const token = html.match(/_token:\s*"([^"]+)"/)?.[1];
  if (!token) throw new Error("PITC feeder page changed: no request token found");
  const cookie = (page.headers.getSetCookie?.() || []).map((c) => c.split(";")[0]).join("; ");
  const res = await fetchRetry(`${PITC_FEEDER}/info`, {
    method: "POST",
    headers: {
      "User-Agent": UA, "Cookie": cookie, "Referer": PITC_FEEDER, "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ _token: token, reference: code }).toString(),
  });
  if (!res.ok) throw new Error(`PITC feeder lookup HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success || !data.html) throw new Error(data.message || "No records found for this feeder code");
  const parsed = parseFeeder(data.html);
  if (!parsed) throw new Error("No feeder data in PITC's response (page format may have changed)");
  return {
    ...parsed,
    legend: "Schedule 'ON' = no planned cut. Outage minutes are actual supply interruptions in that hour.",
    asOf: new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi" }) + " PKT",
    source: PITC_FEEDER,
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
} else if (cmd === "feeder") {
  feederStatus(getFlag("code") || args[1])
    .then((r) => console.log(JSON.stringify(r, null, 2)))
    .catch((e) => { console.error(`Error: ${e.message}${e.cause ? ` (${e.cause.code || e.cause.message})` : ""}`); process.exit(1); });
} else {
  console.error("Commands: discos, disco, schedule, search, info, feeder");
  console.error("  feeder --code 006513     — live status of one feeder (WAPDA DISCOs)");
  console.error("  discos                   — list all DISCOs");
  console.error("  disco --name LESCO       — info for one DISCO");
  console.error("  schedule --disco LESCO   — how to find your schedule");
  console.error("  search --city Multan     — find DISCO by city");
  console.error("  info                     — general load shedding guide");
  process.exit(1);
}

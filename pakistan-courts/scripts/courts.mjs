#!/usr/bin/env node

const COURTS = [
  {
    name: "Supreme Court of Pakistan",
    level: "apex",
    city: "Islamabad",
    jurisdiction: "Final appellate jurisdiction over all courts in Pakistan",
    website: "supremecourt.gov.pk",
    benches: ["Islamabad (Principal Seat)", "Lahore Registry", "Karachi Registry", "Peshawar Registry", "Quetta Registry"],
    established: 1956,
    note: "Chief Justice heads the judiciary. Hears constitutional petitions, appeals from High Courts.",
  },
  {
    name: "Federal Shariat Court",
    level: "federal",
    city: "Islamabad",
    jurisdiction: "Examines laws to ensure conformity with Islamic injunctions",
    website: "federalshariatcourt.gov.pk",
    benches: ["Islamabad"],
    established: 1980,
    note: "Can strike down any law repugnant to Islam. Appeals go to Shariat Appellate Bench of Supreme Court.",
  },
  {
    name: "Lahore High Court",
    level: "high",
    city: "Lahore",
    jurisdiction: "Punjab province",
    website: "lhc.gov.pk",
    benches: ["Lahore (Principal Seat)", "Rawalpindi Bench", "Multan Bench", "Bahawalpur Bench"],
    established: 1919,
    note: "Largest high court by number of judges. Writ jurisdiction over Punjab.",
  },
  {
    name: "Sindh High Court",
    level: "high",
    city: "Karachi",
    jurisdiction: "Sindh province",
    website: "sindhhighcourt.gov.pk",
    benches: ["Karachi (Principal Seat)", "Hyderabad Circuit Bench", "Sukkur Circuit Bench", "Larkana Circuit Bench"],
    established: 1906,
    note: "Oldest high court in Pakistan (originally Bombay High Court Sindh Bench).",
  },
  {
    name: "Islamabad High Court",
    level: "high",
    city: "Islamabad",
    jurisdiction: "Islamabad Capital Territory",
    website: "ihc.gov.pk",
    benches: ["Islamabad"],
    established: 2010,
    note: "Newest high court. Created by 18th Amendment.",
  },
  {
    name: "Peshawar High Court",
    level: "high",
    city: "Peshawar",
    jurisdiction: "Khyber Pakhtunkhwa province",
    website: "peshawarhighcourt.gov.pk",
    benches: ["Peshawar (Principal Seat)", "Abbottabad Bench", "Mingora Bench", "Dera Ismail Khan Bench"],
    established: 1947,
    note: "Jurisdiction extended to merged tribal areas after 25th Amendment.",
  },
  {
    name: "Balochistan High Court",
    level: "high",
    city: "Quetta",
    jurisdiction: "Balochistan province",
    website: "bhc.gov.pk",
    benches: ["Quetta (Principal Seat)", "Turbat Bench", "Sibi Bench"],
    established: 1947,
    note: "Covers largest province by area.",
  },
  {
    name: "Supreme Appellate Court of Gilgit-Baltistan",
    level: "appellate",
    city: "Gilgit",
    jurisdiction: "Gilgit-Baltistan",
    website: "sacgb.gov.pk",
    benches: ["Gilgit"],
    established: 2009,
    note: "Established under GB Empowerment and Self-Governance Order.",
  },
  {
    name: "Azad Jammu & Kashmir Supreme Court",
    level: "appellate",
    city: "Muzaffarabad",
    jurisdiction: "Azad Jammu & Kashmir",
    website: "ajksc.gov.pk",
    benches: ["Muzaffarabad"],
    established: 1974,
    note: "Apex court for AJK. Separate from Pakistan Supreme Court.",
  },
];

const SPECIAL = [
  { name: "Anti-Terrorism Courts", jurisdiction: "Terrorism-related offenses under ATA 1997", locations: "All provinces" },
  { name: "Accountability Courts (NAB)", jurisdiction: "Corruption and white-collar crimes", locations: "Islamabad, Lahore, Karachi, Peshawar, Quetta, Rawalpindi, Multan, Sukkur" },
  { name: "Banking Courts", jurisdiction: "Banking and financial disputes", locations: "Major cities" },
  { name: "Drug Courts", jurisdiction: "Narcotics offenses under CNSA 1997", locations: "All provinces" },
  { name: "Environmental Tribunals", jurisdiction: "Environmental protection cases", locations: "Islamabad, Lahore, Karachi" },
  { name: "Labour Courts", jurisdiction: "Industrial and labour disputes", locations: "All provinces" },
  { name: "Consumer Courts", jurisdiction: "Consumer protection complaints", locations: "District level" },
  { name: "Family Courts", jurisdiction: "Marriage, divorce, custody, maintenance", locations: "District level" },
  { name: "Election Tribunals", jurisdiction: "Election disputes and petitions", locations: "As notified per election" },
  { name: "Military Courts", jurisdiction: "Military personnel under Army Act", locations: "Cantonment areas" },
  { name: "Revenue Courts", jurisdiction: "Land revenue disputes", locations: "Tehsil level" },
  { name: "Tax Appellate Tribunal", jurisdiction: "Income tax and customs appeals", locations: "Islamabad, Lahore, Karachi" },
  { name: "Competition Commission Appellate Bench", jurisdiction: "Anti-trust and competition appeals", locations: "Islamabad" },
];

const BARS = [
  { name: "Pakistan Bar Council", city: "Islamabad", role: "Apex regulatory body for legal profession", website: "pakistanbarcouncil.org" },
  { name: "Punjab Bar Council", city: "Lahore", role: "Regulates advocates in Punjab", website: "punjabbarcouncil.com" },
  { name: "Sindh Bar Council", city: "Karachi", role: "Regulates advocates in Sindh", website: "sindhbarcouncil.org.pk" },
  { name: "KPK Bar Council", city: "Peshawar", role: "Regulates advocates in Khyber Pakhtunkhwa", website: "kpkbarcouncil.org.pk" },
  { name: "Balochistan Bar Council", city: "Quetta", role: "Regulates advocates in Balochistan", website: "balochistanbarcouncil.org.pk" },
  { name: "Islamabad Bar Council", city: "Islamabad", role: "Regulates advocates in ICT", website: "islamabadbarcouncil.org.pk" },
  { name: "Supreme Court Bar Association", city: "Islamabad", role: "Association of Supreme Court advocates", website: "scba.org.pk" },
  { name: "Lahore High Court Bar Association", city: "Lahore", role: "Largest high court bar association", website: "lhcba.org.pk" },
];

const HIERARCHY = [
  { level: 1, name: "Supreme Court of Pakistan", description: "Final court of appeal" },
  { level: 2, name: "Federal Shariat Court", description: "Islamic law conformity" },
  { level: 2, name: "High Courts (5)", description: "Lahore, Sindh, Islamabad, Peshawar, Balochistan" },
  { level: 3, name: "District & Sessions Courts", description: "Civil and criminal jurisdiction at district level" },
  { level: 4, name: "Civil Courts / Magistrate Courts", description: "Lower civil and criminal courts" },
  { level: 4, name: "Special Courts & Tribunals", description: "Anti-terrorism, accountability, family, banking, etc." },
];

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "hierarchy") {
  console.log(JSON.stringify({ hierarchy: HIERARCHY, note: "Pakistan judiciary follows a four-tier system" }, null, 2));

} else if (cmd === "search") {
  const query = (getFlag("query") || args.slice(1).join(" ")).toLowerCase();
  if (!query) { console.error("Usage: courts.mjs search --query <term>"); process.exit(1); }
  const courts = COURTS.filter(c => {
    const hay = `${c.name} ${c.city} ${c.jurisdiction} ${c.benches.join(" ")}`.toLowerCase();
    return hay.includes(query);
  });
  const special = SPECIAL.filter(s => {
    const hay = `${s.name} ${s.jurisdiction} ${s.locations}`.toLowerCase();
    return hay.includes(query);
  });
  console.log(JSON.stringify({ query, courts, specialCourts: special }, null, 2));

} else if (cmd === "court") {
  const name = (getFlag("name") || args.slice(1).join(" ")).toLowerCase();
  if (!name) { console.error("Usage: courts.mjs court --name <court name>"); process.exit(1); }
  const court = COURTS.find(c => c.name.toLowerCase().includes(name));
  if (!court) { console.error(`Court not found: ${name}`); process.exit(1); }
  console.log(JSON.stringify(court, null, 2));

} else if (cmd === "special") {
  console.log(JSON.stringify({ count: SPECIAL.length, courts: SPECIAL }, null, 2));

} else if (cmd === "bars") {
  console.log(JSON.stringify({ count: BARS.length, barCouncils: BARS }, null, 2));

} else {
  console.error("Commands: hierarchy, search, court, special, bars");
  console.error("  hierarchy                   — court system hierarchy");
  console.error("  search --query <term>       — search by name/city");
  console.error("  court --name <court name>   — court details");
  console.error("  special                     — special courts list");
  console.error("  bars                        — bar councils");
  process.exit(1);
}

#!/usr/bin/env node

const COMPANY_TYPES = [
  {
    type: "Private Limited Company",
    code: "Pvt. Ltd.",
    minDirectors: 2,
    minMembers: 2,
    maxMembers: 50,
    description: "Most common for small-medium businesses. Cannot offer shares to the public.",
  },
  {
    type: "Single Member Company",
    code: "SMC (Pvt.) Ltd.",
    minDirectors: 1,
    minMembers: 1,
    maxMembers: 1,
    description: "One-person company with limited liability. Ideal for sole entrepreneurs.",
  },
  {
    type: "Public Limited Company",
    code: "Ltd.",
    minDirectors: 3,
    minMembers: 7,
    maxMembers: null,
    description: "Can offer shares to public. Required for listing on PSX.",
  },
  {
    type: "Limited Liability Partnership",
    code: "LLP",
    minDirectors: null,
    minMembers: 2,
    maxMembers: null,
    description: "Partners have limited liability. Registered under LLP Act 2017.",
  },
  {
    type: "Not-for-Profit Association",
    code: "Association",
    minDirectors: 3,
    minMembers: 3,
    maxMembers: null,
    description: "Section 42 license. For charitable, scientific, or social objectives.",
  },
  {
    type: "Trade Organization",
    code: "Trade Org",
    minDirectors: null,
    minMembers: null,
    maxMembers: null,
    description: "Chambers of Commerce, trade associations. Registered under Trade Organizations Act.",
  },
];

const FEES = [
  { capitalRange: "Up to Rs. 100,000", fee: "Rs. 1,000" },
  { capitalRange: "Rs. 100,001 – 500,000", fee: "Rs. 2,000" },
  { capitalRange: "Rs. 500,001 – 1,000,000", fee: "Rs. 4,000" },
  { capitalRange: "Rs. 1,000,001 – 5,000,000", fee: "Rs. 6,000" },
  { capitalRange: "Rs. 5,000,001 – 10,000,000", fee: "Rs. 8,000" },
  { capitalRange: "Rs. 10,000,001 – 50,000,000", fee: "Rs. 15,000" },
  { capitalRange: "Rs. 50,000,001 – 100,000,000", fee: "Rs. 25,000" },
  { capitalRange: "Above Rs. 100,000,000", fee: "Rs. 50,000" },
];

const ADDITIONAL_FEES = {
  nameReservation: "Rs. 500",
  nameReservationOnline: "Rs. 200",
  digitalCertificate: "Rs. 500",
  certifiedCopy: "Rs. 500 per document",
  smc: "50% of Pvt. Ltd. fees",
  llp: "Rs. 5,000 – 25,000 based on capital",
};

const DOCUMENTS = {
  "Private Limited / Single Member": [
    "CNIC copies of all directors/members",
    "Passport-size photographs",
    "Memorandum of Association (Form I)",
    "Articles of Association",
    "Form 1 — Declaration of compliance",
    "Form 21 — Notice of registered office",
    "Form 29 — Consent to act as director",
    "Proof of registered office (utility bill or rent agreement)",
    "NTN of company (obtained post-incorporation)",
    "Digital signature certificate (for e-filing)",
  ],
  "Public Limited": [
    "All documents required for Pvt. Ltd.",
    "Form A — Prospectus or Statement in lieu",
    "Statutory declaration by director/secretary",
    "Minimum 7 subscribers to memorandum",
    "Company secretary appointment letter",
  ],
  LLP: [
    "CNIC copies of all partners",
    "LLP Agreement",
    "Form I — Application for incorporation",
    "Form III — Consent of designated partner",
    "Proof of registered office",
  ],
  "Section 42 (Not-for-Profit)": [
    "All documents required for Ltd/Pvt. Ltd.",
    "Section 42 license application",
    "Objects clause (charitable/scientific/social)",
    "Three years projected income/expenditure",
    "Undertaking that profits will not be distributed",
  ],
};

const KEY_FORMS = [
  { form: "Form I", purpose: "Memorandum of Association" },
  { form: "Form 1", purpose: "Declaration of compliance on application for registration" },
  { form: "Form A", purpose: "Application for availability of name" },
  { form: "Form 21", purpose: "Notice of situation of registered office" },
  { form: "Form 29", purpose: "Consent to act as director / CEO" },
  { form: "Form 3", purpose: "Return of allotment of shares" },
  { form: "Form 26", purpose: "Particulars of directors, CEO, secretary" },
  { form: "Form 45", purpose: "Annual return" },
  { form: "Form A (S.42)", purpose: "Application for Section 42 license" },
  { form: "Form VII (LLP)", purpose: "LLP annual statement of accounts" },
];

const OFFICES = [
  { city: "Islamabad", name: "SECP Head Office", address: "NIC Building, 63-Jinnah Avenue, Blue Area, Islamabad", phone: "051-9207091-4", type: "Head Office" },
  { city: "Islamabad", name: "Company Registration Office", address: "State Life Building No. 7, Blue Area, Islamabad", phone: "051-9208740", type: "CRO" },
  { city: "Lahore", name: "Company Registration Office", address: "Associated House, 7-Egerton Road, Lahore", phone: "042-99204962", type: "CRO" },
  { city: "Karachi", name: "Company Registration Office", address: "State Life Building No. 1, I.I. Chundrigar Road, Karachi", phone: "021-99213272", type: "CRO" },
  { city: "Peshawar", name: "Company Registration Office", address: "State Life Building, The Mall, Peshawar", phone: "091-9213675", type: "CRO" },
  { city: "Quetta", name: "Company Registration Office", address: "Zarghoon Road, Quetta", phone: "081-2826895", type: "CRO" },
  { city: "Multan", name: "Company Registration Office", address: "State Life Building, Kutchery Road, Multan", phone: "061-9201346", type: "CRO" },
  { city: "Faisalabad", name: "Company Registration Office", address: "State Life Building, Faisalabad", phone: "041-9201547", type: "CRO" },
  { city: "Sukkur", name: "Company Registration Office", address: "Military Road, Sukkur", phone: "071-9310177", type: "CRO" },
  { city: "Gilgit", name: "Company Registration Office", address: "Gilgit-Baltistan", phone: "05811-920134", type: "CRO" },
];

const TIMELINE = {
  nameReservation: "1-2 working days",
  incorporation: "3-7 working days (online via eServices)",
  ntniRegistration: "1-2 weeks post-incorporation",
  bankAccount: "After NTN and incorporation certificate",
  totalEstimate: "2-4 weeks end-to-end",
  onlineFiling: "https://efiling.secp.gov.pk/eServices/",
};

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "info") {
  console.log(JSON.stringify({
    companyTypes: COMPANY_TYPES,
    timeline: TIMELINE,
    note: "Company search requires login at efiling.secp.gov.pk. This is reference data only.",
  }, null, 2));
} else if (cmd === "fees") {
  console.log(JSON.stringify({
    registrationFees: FEES,
    additionalFees: ADDITIONAL_FEES,
    note: "Fees based on authorized capital. Verify current rates at secp.gov.pk.",
  }, null, 2));
} else if (cmd === "offices") {
  const city = getFlag("city");
  const filtered = city
    ? OFFICES.filter(o => o.city.toLowerCase().includes(city.toLowerCase()))
    : OFFICES;
  console.log(JSON.stringify({ count: filtered.length, offices: filtered }, null, 2));
} else if (cmd === "documents") {
  const type = getFlag("type");
  if (type) {
    const key = Object.keys(DOCUMENTS).find(k => k.toLowerCase().includes(type.toLowerCase()));
    if (key) {
      console.log(JSON.stringify({ type: key, documents: DOCUMENTS[key] }, null, 2));
    } else {
      console.log(JSON.stringify({ types: Object.keys(DOCUMENTS), error: `Unknown type: ${type}` }, null, 2));
    }
  } else {
    console.log(JSON.stringify(DOCUMENTS, null, 2));
  }
} else if (cmd === "forms") {
  console.log(JSON.stringify({ forms: KEY_FORMS }, null, 2));
} else if (cmd === "search") {
  console.error("SECP company search requires login at https://efiling.secp.gov.pk/eServices/");
  console.error("Name availability check: https://efiling.secp.gov.pk/eServices/ → Name Reservation");
  console.error("No public API available.");
  process.exit(1);
} else {
  console.error("Commands: info, fees, offices, documents, forms");
  console.error("  info                           — company types and registration overview");
  console.error("  fees                           — registration fee schedule");
  console.error("  offices [--city <city>]         — SECP regional offices");
  console.error("  documents [--type <type>]       — required documents checklist");
  console.error("  forms                          — key SECP forms reference");
  process.exit(1);
}

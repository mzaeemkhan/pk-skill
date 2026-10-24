#!/usr/bin/env node

const OFFICES = [
  { city: "Islamabad", name: "Regional Passport Office", address: "Aabpara, Islamabad", phone: "051-9261649", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Islamabad", name: "Passport & Immigration HQ (DGIP)", address: "Shaheed-e-Millat Secretariat, Islamabad", phone: "051-9208670", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Rawalpindi", name: "Regional Passport Office", address: "Liaquat Bagh, Rawalpindi", phone: "051-9270272", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Lahore", name: "Regional Passport Office", address: "8-Egerton Road, Lahore", phone: "042-99200925", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Lahore", name: "Passport Office Iqbal Town", address: "Near Thokar Niaz Baig, Lahore", phone: "042-35402262", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Karachi", name: "Regional Passport Office (Saddar)", address: "Passport Office, Saddar, Karachi", phone: "021-99213074", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Karachi", name: "Passport Office (Gulshan)", address: "Gulshan-e-Iqbal, Karachi", phone: "021-99244281", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Karachi", name: "Passport Office (Nazimabad)", address: "Nazimabad, Karachi", phone: "021-99264511", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Multan", name: "Regional Passport Office", address: "Kutchery Road, Multan", phone: "061-9201213", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Faisalabad", name: "Regional Passport Office", address: "Civil Lines, Faisalabad", phone: "041-9200640", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Peshawar", name: "Regional Passport Office", address: "The Mall, Peshawar", phone: "091-9212043", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Quetta", name: "Regional Passport Office", address: "Joint Road, Quetta", phone: "081-9202264", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Hyderabad", name: "Regional Passport Office", address: "Saddar, Hyderabad", phone: "022-9200530", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Sialkot", name: "Regional Passport Office", address: "Sialkot", phone: "052-9250282", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Gujranwala", name: "Regional Passport Office", address: "Gujranwala", phone: "055-9200505", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Bahawalpur", name: "Regional Passport Office", address: "Bahawalpur", phone: "062-9255090", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Sukkur", name: "Regional Passport Office", address: "Sukkur", phone: "071-9310048", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Abbottabad", name: "Regional Passport Office", address: "Abbottabad", phone: "0992-9310125", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Sargodha", name: "Regional Passport Office", address: "Sargodha", phone: "048-9230350", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Muzaffarabad", name: "Passport Office AJK", address: "Muzaffarabad, AJK", phone: "05822-920334", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
  { city: "Gilgit", name: "Passport Office GB", address: "Gilgit, Gilgit-Baltistan", phone: "05811-920156", timings: "Mon-Thu 8:00-15:00, Fri 8:00-12:30" },
];

const FEES = {
  normal: {
    processingTime: "4-6 weeks",
    pages36: "Rs. 3,000",
    pages72: "Rs. 5,400",
    pages100: "Rs. 6,750",
  },
  urgent: {
    processingTime: "7 working days",
    pages36: "Rs. 5,000",
    pages72: "Rs. 9,000",
    pages100: "Rs. 12,000",
  },
  fastTrack: {
    processingTime: "3 working days",
    pages36: "Rs. 9,000",
    pages72: "Rs. 12,000",
    pages100: "Rs. 15,000",
  },
  validity: {
    adults: "10 years",
    minors: "5 years (under 18)",
  },
  payment: "Bank challan (HBL, NBP, UBL branches) or online via 1Link",
};

const REQUIREMENTS = {
  newPassport: [
    "Original CNIC (for adults 18+)",
    "B-Form / CNIC for minors",
    "4 passport-size photographs (white background, no glasses)",
    "Passport application form (available at office or dgip.gov.pk)",
    "Bank challan with fee payment",
    "Parent/guardian CNIC (for minors)",
  ],
  renewal: [
    "All documents required for new passport",
    "Old/expired passport (original)",
    "If lost: FIR from police station + affidavit",
  ],
  urgent: [
    "All standard documents",
    "Justification letter (medical emergency, business travel, etc.)",
    "Supporting documents (airline tickets, hospital letter, etc.)",
    "Urgent fee payment challan",
  ],
  process: [
    "1. Obtain bank challan and pay fee at designated bank",
    "2. Fill application form (online at dgip.gov.pk or at passport office)",
    "3. Visit passport office with documents",
    "4. Biometric verification (fingerprints + photo at office)",
    "5. Collect passport after processing (or by courier for additional fee)",
  ],
  onlineApplication: "https://onlinepassport.dgip.gov.pk/",
  trackingWebsite: "https://dgip.gov.pk/",
  trackingSMS: "Send CNIC number to 8500",
};

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "offices") {
  const city = getFlag("city");
  const filtered = city
    ? OFFICES.filter(o => o.city.toLowerCase().includes(city.toLowerCase()))
    : OFFICES;
  console.log(JSON.stringify({ count: filtered.length, offices: filtered }, null, 2));
} else if (cmd === "fees") {
  console.log(JSON.stringify(FEES, null, 2));
} else if (cmd === "info") {
  console.log(JSON.stringify(REQUIREMENTS, null, 2));
} else if (cmd === "track") {
  const token = getFlag("token");
  if (!token) {
    console.error("Usage: passport.mjs track --token <tracking-number>");
    process.exit(1);
  }
  console.log(JSON.stringify({
    error: "Live tracking not available via API",
    token,
    trackOnline: "https://dgip.gov.pk/ → Track Passport",
    trackSMS: "Send your CNIC number to 8500",
    trackCall: "Call DGIP helpline: 051-9208670",
    note: "DGIP website requires session authentication — no public API.",
  }, null, 2));
} else {
  console.error("Commands: offices, fees, info, track");
  console.error("  offices [--city <city>]         — list passport offices");
  console.error("  fees                           — passport fee schedule");
  console.error("  info                           — requirements and process");
  console.error("  track --token <tracking-number> — tracking instructions");
  process.exit(1);
}

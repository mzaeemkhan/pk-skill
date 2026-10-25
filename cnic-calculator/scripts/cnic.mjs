#!/usr/bin/env node

const REGIONS = {
  "10": { name: "Chitral", province: "Khyber Pakhtunkhwa" },
  "11": { name: "Lower Dir", province: "Khyber Pakhtunkhwa" },
  "12": { name: "Upper Dir", province: "Khyber Pakhtunkhwa" },
  "13": { name: "Swat", province: "Khyber Pakhtunkhwa" },
  "14": { name: "Shangla", province: "Khyber Pakhtunkhwa" },
  "15": { name: "Buner", province: "Khyber Pakhtunkhwa" },
  "16": { name: "Malakand", province: "Khyber Pakhtunkhwa" },
  "17": { name: "Battagram", province: "Khyber Pakhtunkhwa" },
  "18": { name: "Mansehra", province: "Khyber Pakhtunkhwa" },
  "19": { name: "Abbottabad", province: "Khyber Pakhtunkhwa" },
  "110": { name: "Haripur", province: "Khyber Pakhtunkhwa" },
  "111": { name: "Kohistan", province: "Khyber Pakhtunkhwa" },
  "112": { name: "Tor Ghar", province: "Khyber Pakhtunkhwa" },
  "120": { name: "Peshawar", province: "Khyber Pakhtunkhwa" },
  "121": { name: "Nowshera", province: "Khyber Pakhtunkhwa" },
  "122": { name: "Charsadda", province: "Khyber Pakhtunkhwa" },
  "123": { name: "Mardan", province: "Khyber Pakhtunkhwa" },
  "124": { name: "Swabi", province: "Khyber Pakhtunkhwa" },
  "130": { name: "Kohat", province: "Khyber Pakhtunkhwa" },
  "131": { name: "Karak", province: "Khyber Pakhtunkhwa" },
  "132": { name: "Hangu", province: "Khyber Pakhtunkhwa" },
  "140": { name: "Bannu", province: "Khyber Pakhtunkhwa" },
  "141": { name: "Lakki Marwat", province: "Khyber Pakhtunkhwa" },
  "142": { name: "North Waziristan", province: "Khyber Pakhtunkhwa" },
  "143": { name: "South Waziristan", province: "Khyber Pakhtunkhwa" },
  "150": { name: "D.I. Khan", province: "Khyber Pakhtunkhwa" },
  "151": { name: "Tank", province: "Khyber Pakhtunkhwa" },
  "21": { name: "Bajaur", province: "Khyber Pakhtunkhwa" },
  "22": { name: "Mohmand", province: "Khyber Pakhtunkhwa" },
  "23": { name: "Khyber", province: "Khyber Pakhtunkhwa" },
  "24": { name: "Orakzai", province: "Khyber Pakhtunkhwa" },
  "25": { name: "Kurram", province: "Khyber Pakhtunkhwa" },
  "31": { name: "Rawalpindi", province: "Punjab" },
  "32": { name: "Jhelum", province: "Punjab" },
  "33": { name: "Chakwal", province: "Punjab" },
  "34": { name: "Attock", province: "Punjab" },
  "35": { name: "Lahore", province: "Punjab" },
  "352": { name: "Lahore Cantt", province: "Punjab" },
  "36": { name: "Gujranwala", province: "Punjab" },
  "361": { name: "Hafizabad", province: "Punjab" },
  "362": { name: "Mandi Bahauddin", province: "Punjab" },
  "363": { name: "Narowal", province: "Punjab" },
  "364": { name: "Sialkot", province: "Punjab" },
  "365": { name: "Gujrat", province: "Punjab" },
  "37": { name: "Faisalabad", province: "Punjab" },
  "371": { name: "Toba Tek Singh", province: "Punjab" },
  "372": { name: "Jhang", province: "Punjab" },
  "373": { name: "Chiniot", province: "Punjab" },
  "38": { name: "Sargodha", province: "Punjab" },
  "381": { name: "Khushab", province: "Punjab" },
  "382": { name: "Mianwali", province: "Punjab" },
  "383": { name: "Bhakkar", province: "Punjab" },
  "34201": { name: "Multan", province: "Punjab" },
  "342": { name: "Multan", province: "Punjab" },
  "343": { name: "Khanewal", province: "Punjab" },
  "344": { name: "Vehari", province: "Punjab" },
  "345": { name: "Sahiwal", province: "Punjab" },
  "346": { name: "Okara", province: "Punjab" },
  "347": { name: "Pakpattan", province: "Punjab" },
  "348": { name: "Lodhran", province: "Punjab" },
  "36101": { name: "D.G. Khan", province: "Punjab" },
  "361": { name: "D.G. Khan", province: "Punjab" },
  "362": { name: "Rajanpur", province: "Punjab" },
  "363": { name: "Muzaffargarh", province: "Punjab" },
  "364": { name: "Layyah", province: "Punjab" },
  "38201": { name: "Bahawalpur", province: "Punjab" },
  "382": { name: "Bahawalpur", province: "Punjab" },
  "383": { name: "Bahawalnagar", province: "Punjab" },
  "384": { name: "Rahim Yar Khan", province: "Punjab" },
  "41": { name: "Karachi South", province: "Sindh" },
  "42": { name: "Karachi East / Central", province: "Sindh" },
  "421": { name: "Malir", province: "Sindh" },
  "422": { name: "Karachi West", province: "Sindh" },
  "43": { name: "Hyderabad", province: "Sindh" },
  "431": { name: "Badin", province: "Sindh" },
  "432": { name: "Thatta", province: "Sindh" },
  "433": { name: "Tando Allahyar", province: "Sindh" },
  "434": { name: "Tando Muhammad Khan", province: "Sindh" },
  "44": { name: "Sukkur", province: "Sindh" },
  "441": { name: "Khairpur", province: "Sindh" },
  "442": { name: "Ghotki", province: "Sindh" },
  "45": { name: "Larkana", province: "Sindh" },
  "451": { name: "Shikarpur", province: "Sindh" },
  "452": { name: "Jacobabad", province: "Sindh" },
  "453": { name: "Kashmore", province: "Sindh" },
  "454": { name: "Kambar Shahdadkot", province: "Sindh" },
  "46": { name: "Nawabshah / Shaheed Benazirabad", province: "Sindh" },
  "461": { name: "Sanghar", province: "Sindh" },
  "462": { name: "Mirpurkhas", province: "Sindh" },
  "463": { name: "Umerkot", province: "Sindh" },
  "464": { name: "Tharparkar", province: "Sindh" },
  "47": { name: "Dadu", province: "Sindh" },
  "471": { name: "Jamshoro", province: "Sindh" },
  "472": { name: "Naushahro Feroze", province: "Sindh" },
  "51": { name: "Quetta", province: "Balochistan" },
  "52": { name: "Pishin", province: "Balochistan" },
  "53": { name: "Zhob", province: "Balochistan" },
  "54": { name: "Sibi", province: "Balochistan" },
  "55": { name: "Nasirabad / Tamboo", province: "Balochistan" },
  "56": { name: "Kalat", province: "Balochistan" },
  "57": { name: "Makran / Gwadar", province: "Balochistan" },
  "58": { name: "Khuzdar", province: "Balochistan" },
  "59": { name: "Lasbela", province: "Balochistan" },
  "61": { name: "Islamabad", province: "Islamabad Capital Territory" },
  "71": { name: "Gilgit", province: "Gilgit-Baltistan" },
  "72": { name: "Skardu / Baltistan", province: "Gilgit-Baltistan" },
  "73": { name: "Diamer", province: "Gilgit-Baltistan" },
  "74": { name: "Ghanche", province: "Gilgit-Baltistan" },
  "75": { name: "Ghizer", province: "Gilgit-Baltistan" },
  "76": { name: "Hunza-Nagar", province: "Gilgit-Baltistan" },
  "77": { name: "Astore", province: "Gilgit-Baltistan" },
  "81": { name: "Mirpur", province: "Azad Jammu & Kashmir" },
  "82": { name: "Bhimber", province: "Azad Jammu & Kashmir" },
  "83": { name: "Kotli", province: "Azad Jammu & Kashmir" },
  "84": { name: "Muzaffarabad", province: "Azad Jammu & Kashmir" },
  "85": { name: "Poonch / Rawalakot", province: "Azad Jammu & Kashmir" },
  "86": { name: "Bagh", province: "Azad Jammu & Kashmir" },
  "87": { name: "Neelum", province: "Azad Jammu & Kashmir" },
  "88": { name: "Sudhnoti", province: "Azad Jammu & Kashmir" },
  "89": { name: "Hattian Bala", province: "Azad Jammu & Kashmir" },
  "90": { name: "Haveli", province: "Azad Jammu & Kashmir" },
};

function normalize(cnic) {
  return cnic.replace(/[-\s]/g, "");
}

function validate(raw) {
  const digits = normalize(raw);
  if (!/^\d{13}$/.test(digits)) {
    return { valid: false, error: "CNIC must be exactly 13 digits" };
  }
  return { valid: true, digits };
}

function findRegion(digits) {
  for (let len = 5; len >= 2; len--) {
    const code = digits.substring(0, len);
    if (REGIONS[code]) return { code, ...REGIONS[code] };
  }
  const firstDigit = digits[0];
  const provinceMap = {
    "1": "Khyber Pakhtunkhwa",
    "2": "Khyber Pakhtunkhwa (Merged Tribal Areas)",
    "3": "Punjab",
    "4": "Sindh",
    "5": "Balochistan",
    "6": "Islamabad Capital Territory",
    "7": "Gilgit-Baltistan",
    "8": "Azad Jammu & Kashmir",
    "9": "Azad Jammu & Kashmir",
  };
  return {
    code: digits.substring(0, 5),
    name: "Unknown region",
    province: provinceMap[firstDigit] || "Unknown",
  };
}

function parse(raw) {
  const v = validate(raw);
  if (!v.valid) return { success: false, error: v.error };
  const { digits } = v;
  const region = findRegion(digits);
  const lastDigit = parseInt(digits[12]);
  const gender = lastDigit % 2 === 1 ? "Male" : "Female";
  const formatted = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits[12]}`;

  return {
    success: true,
    cnic: formatted,
    region_code: region.code,
    region_name: region.name,
    province: region.province,
    gender,
    last_digit: lastDigit,
  };
}

function listRegions() {
  const entries = Object.entries(REGIONS)
    .map(([code, r]) => ({ code, name: r.name, province: r.province }))
    .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  return { success: true, count: entries.length, regions: entries };
}

function searchRegion(query) {
  const q = query.toLowerCase();
  const matches = Object.entries(REGIONS)
    .filter(([, r]) => r.name.toLowerCase().includes(q) || r.province.toLowerCase().includes(q))
    .map(([code, r]) => ({ code, name: r.name, province: r.province }));
  return { success: true, query, count: matches.length, matches };
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "--help") {
    console.log(JSON.stringify({
      usage: "node cnic.mjs <command> [options]",
      commands: {
        parse: "--cnic <number> — Extract region, province, gender",
        validate: "--cnic <number> — Check format validity",
        regions: "List all region codes",
        search: "--region <query> — Search regions by name",
        age: "--dob <YYYY-MM-DD> — Age and CNIC eligibility (18+). CNIC itself does not encode DOB",
      },
    }, null, 2));
    return;
  }

  const flagIndex = (flag) => args.indexOf(flag);

  if (cmd === "parse") {
    const i = flagIndex("--cnic");
    if (i === -1 || !args[i + 1]) {
      console.error(JSON.stringify({ error: "Missing --cnic <number>" }));
      process.exit(1);
    }
    console.log(JSON.stringify(parse(args[i + 1]), null, 2));
  } else if (cmd === "validate") {
    const i = flagIndex("--cnic");
    if (i === -1 || !args[i + 1]) {
      console.error(JSON.stringify({ error: "Missing --cnic <number>" }));
      process.exit(1);
    }
    const result = validate(args[i + 1]);
    console.log(JSON.stringify({ valid: result.valid, error: result.error || undefined }, null, 2));
  } else if (cmd === "regions") {
    console.log(JSON.stringify(listRegions(), null, 2));
  } else if (cmd === "search") {
    const i = flagIndex("--region");
    if (i === -1 || !args[i + 1]) {
      console.error(JSON.stringify({ error: "Missing --region <query>" }));
      process.exit(1);
    }
    console.log(JSON.stringify(searchRegion(args[i + 1]), null, 2));
  } else if (cmd === "age") {
    const i = flagIndex("--dob");
    const m = i === -1 ? null : /^(\d{4})-(\d{2})-(\d{2})$/.exec(args[i + 1] || "");
    const dob = m && new Date(+m[1], +m[2] - 1, +m[3]);
    if (!dob || dob.getMonth() !== +m[2] - 1 || dob > new Date()) {
      console.error(JSON.stringify({ error: "Missing or invalid --dob <YYYY-MM-DD>" }));
      process.exit(1);
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let age = today.getFullYear() - dob.getFullYear();
    if (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())) age--;
    const next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (next <= today) next.setFullYear(next.getFullYear() + 1);
    console.log(JSON.stringify({
      dateOfBirth: args[i + 1],
      ageYears: age,
      daysUntilBirthday: Math.round((next - today) / 86400000),
      cnicEligible: age >= 18,
      cnicEligibleFrom: `${dob.getFullYear() + 18}-${m[2]}-${m[3]}`,
      note: age >= 18 ? "Eligible for adult CNIC (18+)" : "Not yet eligible. Under-18s use B-Form/Juvenile card.",
    }, null, 2));
  } else {
    console.error(JSON.stringify({ error: `Unknown command: ${cmd}` }));
    process.exit(1);
  }
}

main();

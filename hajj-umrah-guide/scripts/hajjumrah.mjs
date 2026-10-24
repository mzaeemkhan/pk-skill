#!/usr/bin/env node

const HAJJ_STEPS = [
  { day:"8 Dhul Hijjah (Yawm al-Tarwiyah)", step:1, title:"Enter Ihram", detail:"Put on Ihram from your accommodation in Makkah. Make niyyah for Hajj. Recite Talbiyah: 'Labbayk Allahumma labbayk, labbayka la sharika laka labbayk. Innal hamda wan-ni'mata laka wal-mulk, la sharika lak.' Proceed to Mina." },
  { day:"8 Dhul Hijjah", step:2, title:"Stay in Mina", detail:"Arrive in Mina before Dhuhr. Pray Dhuhr, Asr, Maghrib, Isha (shortened but not combined) and Fajr of 9th. Spend the night in Mina." },
  { day:"9 Dhul Hijjah (Yawm al-Arafah)", step:3, title:"Wuquf at Arafat", detail:"After Fajr in Mina, proceed to Arafat. This is the MOST IMPORTANT pillar of Hajj. Stand in supplication from after Dhuhr until sunset. Pray Dhuhr and Asr combined and shortened. Make abundant dua. The Prophet (PBUH) said: 'Hajj is Arafat.'" },
  { day:"9 Dhul Hijjah (night)", step:4, title:"Night at Muzdalifah", detail:"After sunset at Arafat, proceed to Muzdalifah. Pray Maghrib and Isha combined (delayed). Collect 49-70 pebbles for Jamarat. Sleep under the open sky. Pray Fajr early." },
  { day:"10 Dhul Hijjah (Yawm al-Nahr)", step:5, title:"Rami — Stone Jamarat al-Aqabah", detail:"After Fajr, proceed to Mina. Stone Jamarat al-Aqabah (the large pillar only) with 7 pebbles, saying 'Bismillahi Allahu Akbar' with each throw." },
  { day:"10 Dhul Hijjah", step:6, title:"Qurbani (Sacrifice)", detail:"Offer animal sacrifice (hady). This can be arranged through authorized agents in Mina. One sheep/goat per person, or 1/7 share of a cow/camel." },
  { day:"10 Dhul Hijjah", step:7, title:"Halq/Taqsir", detail:"Men: shave head (halq, preferred) or trim hair (taqsir). Women: cut a fingertip length of hair. This is the first tahallul — most Ihram restrictions are lifted." },
  { day:"10 Dhul Hijjah", step:8, title:"Tawaf al-Ifadah", detail:"Go to Masjid al-Haram. Perform Tawaf al-Ifadah (7 circuits). This is a pillar of Hajj. Then pray 2 rakaat behind Maqam Ibrahim. Then perform Sa'i between Safa and Marwah (7 laps). This completes the second tahallul — all restrictions lifted." },
  { day:"11-12-13 Dhul Hijjah (Ayyam al-Tashreeq)", step:9, title:"Days in Mina — Rami", detail:"Return to Mina. Each day, after Dhuhr, stone all three Jamarat in order: Sughra (7), Wusta (7), Aqabah (7). Make dua after the first two, not the third. You may leave on 12th after stoning if done before sunset (taking the concession)." },
  { day:"Final", step:10, title:"Tawaf al-Wida (Farewell Tawaf)", detail:"Before leaving Makkah, perform Tawaf al-Wida (7 circuits). This is the last thing you do in Makkah. Exempted for menstruating women. Pray 2 rakaat. Your Hajj is complete." }
];

const UMRAH_STEPS = [
  { step:1, title:"Enter Ihram", detail:"Put on Ihram at the designated Miqat. For flights from Pakistan, the Miqat is typically Yalamlam (or you can enter Ihram at Jeddah airport area). Make niyyah: 'Labbayk Allahumma Umrah.' Begin reciting Talbiyah." },
  { step:2, title:"Tawaf", detail:"Enter Masjid al-Haram. Perform Tawaf — 7 anti-clockwise circuits around the Kaaba starting from Hajar al-Aswad (Black Stone) corner. Men do Idtiba (bare right shoulder) and Raml (brisk walking) in first 3 circuits. Point toward the Black Stone and say 'Bismillahi Allahu Akbar' at the start of each circuit." },
  { step:3, title:"Prayer at Maqam Ibrahim", detail:"After Tawaf, pray 2 rakaat behind Maqam Ibrahim (or anywhere in the mosque if crowded). Recite Surah Al-Kafirun in the first and Surah Al-Ikhlas in the second." },
  { step:4, title:"Drink Zamzam", detail:"Drink Zamzam water. Face the Kaaba, say Bismillah, drink in 3 sips. Make dua — the Prophet (PBUH) said dua while drinking Zamzam is accepted." },
  { step:5, title:"Sa'i between Safa and Marwah", detail:"Proceed to Safa. Walk 7 laps between Safa and Marwah (Safa to Marwah = 1, Marwah to Safa = 2, etc., ending at Marwah). Men jog between the green lights. Make dua at each hill." },
  { step:6, title:"Halq or Taqsir", detail:"Men: shave head completely (halq, more rewarded) or trim hair (taqsir). Women: cut a fingertip length of hair. Ihram restrictions are now lifted. Your Umrah is complete." }
];

const CHECKLIST = {
  documents: [
    "Valid passport (6+ months validity)",
    "Saudi visa (Hajj/Umrah visa)",
    "CNIC copy",
    "Passport-size photos (6+)",
    "Vaccination card (meningitis ACWY, COVID)",
    "Hotel booking confirmations",
    "Flight tickets (printed)",
    "Emergency contact card",
    "Travel insurance documents",
    "Ministry of Religious Affairs registration (Hajj)"
  ],
  clothing_men: [
    "2 sets of Ihram (white unstitched sheets)",
    "Ihram belt with pockets",
    "Sandals/slippers (no stitching on top)",
    "Regular clothes for Madinah (before/after Ihram)",
    "Comfortable walking shoes",
    "Sunglasses and hat (non-Ihram times)"
  ],
  clothing_women: [
    "Loose abaya/jilbab (multiple)",
    "Hijab/scarves (multiple)",
    "Comfortable closed shoes",
    "Prayer outfit",
    "Socks (multiple pairs)"
  ],
  essentials: [
    "Unscented soap and shampoo",
    "Toothbrush and unscented toothpaste",
    "Sunscreen (unscented during Ihram)",
    "Small Quran or Quran app on phone",
    "Dua book",
    "Tasbeeh/counter",
    "Waist pouch for valuables",
    "Phone charger and power bank",
    "Universal adapter (Saudi uses Type G)",
    "Small scissors (for Taqsir)",
    "Umbrella (essential for outdoor rituals)",
    "Sleeping bag/mat (for Muzdalifah — Hajj only)",
    "Pebble collection bag (Hajj only)",
    "Water bottle (refillable)",
    "Basic medicines (paracetamol, ORS, throat lozenges, band-aids)",
    "Face masks (crowds protection)"
  ],
  money: [
    "Saudi Riyals (exchange in Pakistan before departure)",
    "Debit/credit card (Visa/Mastercard work widely)",
    "Keep PKR for airport expenses",
    "Budget: SAR 500-1000 for personal expenses (Umrah), more for Hajj"
  ]
};

const COSTS = {
  economy: { label:"Economy / Government Scheme", hajj:"PKR 1,100,000 - 1,400,000", umrah:"PKR 150,000 - 250,000", notes:"Government Hajj scheme (balloting). Basic 4-star shared accommodation. Group transport. Includes visa, flight, accommodation, food, transport, Qurbani." },
  standard: { label:"Standard Private", hajj:"PKR 1,500,000 - 2,500,000", umrah:"PKR 250,000 - 450,000", notes:"Private tour operators. 4-5 star hotel, closer to Haram. Semi-private transport. Better food arrangements. More flexibility." },
  premium: { label:"Premium / VIP", hajj:"PKR 3,000,000 - 7,000,000+", umrah:"PKR 500,000 - 1,200,000+", notes:"5-star hotels adjacent to Haram (Hilton, Fairmont, Clock Tower). Private transport. Premium tents in Mina. Personalized service. Some packages include Madinah luxury stay." }
};

const AIRLINES = [
  { name:"Pakistan International Airlines (PIA)", routes:["Karachi-Jeddah","Lahore-Jeddah","Islamabad-Jeddah","Karachi-Madinah","Lahore-Madinah","Islamabad-Madinah","Peshawar-Jeddah","Multan-Jeddah","Quetta-Jeddah"], notes:"National carrier. Dedicated Hajj flights. Most routes." },
  { name:"Saudi Arabian Airlines (Saudia)", routes:["Karachi-Jeddah","Lahore-Jeddah","Islamabad-Jeddah","Karachi-Madinah","Islamabad-Madinah"], notes:"Saudi flag carrier. Direct flights. Good service." },
  { name:"Air Arabia", routes:["Karachi-Jeddah (via Sharjah)","Lahore-Jeddah (via Sharjah)","Islamabad-Jeddah (via Sharjah)"], notes:"Budget carrier. Stopover in Sharjah." },
  { name:"flynas", routes:["Lahore-Jeddah","Islamabad-Jeddah","Karachi-Jeddah"], notes:"Saudi low-cost carrier. Direct flights on some routes." },
  { name:"Serene Air", routes:["Islamabad-Jeddah (seasonal)","Lahore-Jeddah (seasonal)"], notes:"Pakistani private carrier. Hajj season charters." },
  { name:"Emirates", routes:["Karachi-Jeddah (via Dubai)","Lahore-Jeddah (via Dubai)","Islamabad-Jeddah (via Dubai)"], notes:"Premium option with Dubai stopover." },
  { name:"Qatar Airways", routes:["Karachi-Jeddah (via Doha)","Lahore-Jeddah (via Doha)","Islamabad-Jeddah (via Doha)"], notes:"Premium option with Doha stopover." },
  { name:"Flydubai", routes:["Multiple Pakistan cities to Jeddah via Dubai"], notes:"Budget carrier with Dubai connection." }
];

const OFFICES = [
  { name:"Royal Embassy of Saudi Arabia", city:"Islamabad", address:"House 24, Street 12, F-7/2, Islamabad", phone:"+92-51-2608000", services:"Hajj visa processing, diplomatic services, attestation" },
  { name:"Saudi Consulate General", city:"Karachi", address:"Block 9, Clifton, Karachi", phone:"+92-21-35874744", services:"Umrah/visit visa, commercial visa, attestation" },
  { name:"Ministry of Religious Affairs (MORA)", city:"Islamabad", address:"G-5, Islamabad (Hajj Directorate)", phone:"+92-51-9214813", services:"Government Hajj scheme registration, Hajj policy, Hajj operator licensing" },
  { name:"Saudi Visa Application Center (SVAC)", city:"Multiple cities", address:"Karachi, Lahore, Islamabad, Peshawar, Multan, Faisalabad", phone:"Check saudivac.com.pk", services:"Biometric enrollment, visa application processing" }
];

const DUAS = {
  ihram: [
    { arabic:"Labbayk Allahumma labbayk, labbayka la sharika laka labbayk. Innal hamda wan-ni'mata laka wal-mulk, la sharika lak.", meaning:"Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace, and sovereignty belong to You. You have no partner.", when:"Upon entering Ihram and throughout the journey" }
  ],
  tawaf: [
    { arabic:"Bismillahi Allahu Akbar", meaning:"In the name of Allah, Allah is the Greatest", when:"At the start of each circuit, pointing at the Black Stone" },
    { arabic:"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar", meaning:"Our Lord, give us good in this world and good in the Hereafter, and save us from the torment of the Fire", when:"Between the Yemeni Corner and the Black Stone (each circuit)" },
    { arabic:"Subhan-Allahi wal-hamdu lillahi wa la ilaha ill-Allahu wallahu Akbar", meaning:"Glory be to Allah, praise be to Allah, there is no god but Allah, Allah is the Greatest", when:"During Tawaf — general dhikr" }
  ],
  sai: [
    { arabic:"Inna as-Safa wal-Marwata min sha'a'irillah", meaning:"Indeed, Safa and Marwah are among the symbols of Allah", when:"Upon reaching Safa for the first time" },
    { arabic:"La ilaha ill-Allahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir", meaning:"There is no god but Allah alone, with no partner. His is the sovereignty and His is the praise, and He is over all things capable", when:"At the top of Safa and Marwah" }
  ],
  arafat: [
    { arabic:"La ilaha ill-Allahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir", meaning:"There is no god but Allah alone, with no partner. His is the sovereignty and His is the praise, and He is over all things capable", when:"The BEST dua on the Day of Arafah" },
    { arabic:"Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni", meaning:"O Allah, You are the One who pardons, and You love to pardon, so pardon me", when:"Throughout the standing at Arafat" }
  ],
  mina: [
    { arabic:"Bismillahi Allahu Akbar", meaning:"In the name of Allah, Allah is the Greatest", when:"With each pebble thrown at the Jamarat" }
  ],
  muzdalifah: [
    { arabic:"Allahumma inna nas'aluka ridaka wal-jannah, wa na'udhu bika min sakhatika wan-nar", meaning:"O Allah, we ask You for Your pleasure and Paradise, and we seek refuge in You from Your anger and the Fire", when:"During the night at Muzdalifah" }
  ],
  general: [
    { arabic:"Allahumma taqabbal minni", meaning:"O Allah, accept from me", when:"General — at any point during Hajj/Umrah" },
    { arabic:"Rabbighfir warham wa anta khairur-rahimin", meaning:"My Lord, forgive and have mercy, for You are the best of those who show mercy", when:"General supplication" },
    { arabic:"Rabbi zidni 'ilma", meaning:"My Lord, increase me in knowledge", when:"General supplication" }
  ]
};

const FAQ = [
  { q:"When is Hajj season?", a:"Hajj is performed during 8-12 Dhul Hijjah (Islamic calendar). Dates shift ~11 days earlier each Gregorian year. Government announces dates annually." },
  { q:"How to apply for Government Hajj Scheme?", a:"Apply through Ministry of Religious Affairs (MORA) when applications open (usually 3-4 months before Hajj). Requires valid passport, CNIC, bank deposit. Selection is by balloting." },
  { q:"What vaccinations are required?", a:"Mandatory: Meningococcal ACWY vaccine (within 3 years). Recommended: COVID-19, seasonal flu, polio (for Pakistan travelers). Yellow fever if from an endemic area." },
  { q:"Can I perform Umrah during Hajj season?", a:"Yes, but only with a Hajj visa during Hajj season. Umrah-only visits are available year-round except during Hajj season dates (typically restricted 1-2 months around Hajj)." },
  { q:"What is the Hajj age limit?", a:"Saudi Arabia occasionally sets age limits (e.g., 65+). Check current year's policy from MORA or your Hajj operator." },
  { q:"How many times can I perform Umrah?", a:"No limit. You can perform multiple Umrahs in one trip by going to Masjid Aisha (Tan'eem) to re-enter Ihram." },
  { q:"What if I miss Wuquf at Arafat?", a:"Wuquf at Arafat is THE essential pillar. Missing it means Hajj is not valid. You must attend even briefly between Dhuhr on 9th and Fajr on 10th Dhul Hijjah." },
  { q:"Estimated travel time Makkah to Madinah?", a:"By bus: 5-6 hours (430km). By Haramain High-Speed Rail: ~2.5 hours (with stops). Most Hajj/Umrah packages include Madinah visit." },
  { q:"Do I need a mahram (male guardian)?", a:"Women under 45: Yes, a mahram is required. Women 45+: Can travel in a group without a mahram (with written no-objection from mahram). Rules may vary — check current Saudi regulations." },
  { q:"What currency is used?", a:"Saudi Riyal (SAR). 1 SAR ≈ PKR 74-78 (varies). Exchange in Pakistan before departure for better rates. ATMs and cards work widely in Saudi Arabia." }
];

function parseArgs(args) {
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      flags[key] = (i + 1 < args.length && !args[i + 1].startsWith('--')) ? args[++i] : true;
    }
  }
  return flags;
}

function hajj() { console.log(JSON.stringify({ title:"Hajj Step-by-Step Guide", totalSteps:HAJJ_STEPS.length, steps:HAJJ_STEPS }, null, 2)); }
function umrah() { console.log(JSON.stringify({ title:"Umrah Step-by-Step Guide", totalSteps:UMRAH_STEPS.length, steps:UMRAH_STEPS }, null, 2)); }

function checklist(flags) {
  const type = flags.type || 'both';
  const result = { type, sections:[] };
  result.sections.push({ name:"Documents", items:CHECKLIST.documents });
  result.sections.push({ name:"Clothing (Men)", items:CHECKLIST.clothing_men });
  result.sections.push({ name:"Clothing (Women)", items:CHECKLIST.clothing_women });
  const essentials = CHECKLIST.essentials.filter(item => {
    if (type === 'umrah') return !item.includes('Hajj only');
    return true;
  });
  result.sections.push({ name:"Essentials", items:essentials });
  result.sections.push({ name:"Money", items:CHECKLIST.money });
  console.log(JSON.stringify(result, null, 2));
}

function costs(flags) {
  const type = flags.type;
  if (type && COSTS[type]) {
    console.log(JSON.stringify(COSTS[type], null, 2));
  } else {
    console.log(JSON.stringify({ packages:Object.values(COSTS) }, null, 2));
  }
}

function airlines() { console.log(JSON.stringify({ count:AIRLINES.length, airlines:AIRLINES }, null, 2)); }
function offices() { console.log(JSON.stringify({ count:OFFICES.length, offices:OFFICES }, null, 2)); }

function duas(flags) {
  const ritual = flags.ritual;
  if (ritual && DUAS[ritual]) {
    console.log(JSON.stringify({ ritual, duas:DUAS[ritual] }, null, 2));
  } else if (ritual) {
    console.error(`Unknown ritual: ${ritual}. Available: ${Object.keys(DUAS).join(', ')}`);
    process.exit(1);
  } else {
    console.log(JSON.stringify({ rituals:Object.entries(DUAS).map(([name, list]) => ({ name, count:list.length, duas:list })) }, null, 2));
  }
}

function faq() { console.log(JSON.stringify({ count:FAQ.length, faq:FAQ }, null, 2)); }

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);
const cmds = { hajj, umrah, checklist, costs, airlines, offices, duas, faq };
if (!cmds[cmd]) {
  console.error('Usage: hajjumrah.mjs <hajj|umrah|checklist|costs|airlines|offices|duas|faq> [options]');
  process.exit(1);
}
cmds[cmd](flags);

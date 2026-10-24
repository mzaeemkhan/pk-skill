#!/usr/bin/env node

const FLAG = {
  name: "Flag of Pakistan",
  adopted: "1947-08-11",
  ratio: "3:2 (width:height)",
  colors: {
    green: { hex: "#01411C", meaning: "Muslim majority" },
    white: { hex: "#FFFFFF", meaning: "Religious minorities" }
  },
  design: "Dark green field with white vertical band at hoist side (1/4 of flag width). White crescent moon and five-pointed star centered on green field.",
  crescent: "Represents progress and development",
  star: "Represents light and knowledge — five points symbolize the Five Pillars of Islam",
  whiteBand: "1/4 of total width, represents religious minorities",
  designer: "Amiruddin Kidwai",
  basedOn: "Flag of the All-India Muslim League with added white stripe"
};

const ANTHEM = {
  name: "Qaumi Taranah",
  nameUrdu: "قومی ترانہ",
  nameEnglish: "The National Anthem",
  lyricist: "Hafeez Jalandhari (Abu al-Asar Hafeez Jalandhari)",
  composer: "Ahmed Ghulamali Chagla",
  adopted: "1954-08-13",
  duration: "80 seconds (full), 20 seconds (short)",
  stanzas: [
    {
      urdu: "پاک سرزمین شاد باد\nکشورِ حسین شاد باد",
      romanized: "Pak sarzamin shad bad\nKishwar-e-haseen shad bad",
      english: "Blessed be the sacred land\nHappy be the bounteous realm"
    },
    {
      urdu: "تو نشانِ عزمِ عالی شان\nارضِ پاکستان\nمرکزِ یقین شاد باد",
      romanized: "Tu nishan-e-azm-e-ali shan\nArz-e-Pakistan\nMarkaz-e-yaqeen shad bad",
      english: "Symbol of high resolve\nLand of Pakistan\nBlessed be the citadel of faith"
    },
    {
      urdu: "پاک سرزمین کا نظام\nقوتِ اخوتِ عوام\nقوم، ملک، سلطنت\nپائندہ تابندہ باد\nشاد باد منزلِ مراد",
      romanized: "Pak sarzamin ka nizam\nQuwwat-e-akhuwwat-e-awam\nQaum, mulk, sultanat\nPainda tabinda bad\nShad bad manzil-e-murad",
      english: "The order of this sacred land\nIs the might of the brotherhood of the people\nMay the nation, the country, and the state\nShine in glory everlasting\nBlessed be the goal of our ambition"
    },
    {
      urdu: "پرچمِ ستارہ و ہلال\nرہبرِ ترقی و کمال\nترجمانِ ماضی شانِ حال\nجانِ استقبال\nسایۂ خدائے ذوالجلال",
      romanized: "Parcham-e-sitara-o-hilal\nRahbar-e-taraqqi-o-kamal\nTarjuman-e-mazi shan-e-hal\nJan-e-istiqbal\nSaya-e-Khuda-e-Zuljalal",
      english: "The flag of the crescent and star\nLeads the way to progress and perfection\nInterpreter of our past, glory of our present\nInspiration of our future\nShadow of God, the Lord of Majesty"
    }
  ]
};

const EMBLEM = {
  name: "State Emblem of Pakistan",
  adopted: "1954",
  elements: {
    crescentAndStar: "At the top — same as the flag, representing Islam",
    shield: "Central shield divided into four quadrants representing key crops: cotton (upper-left), wheat (upper-right), tea (lower-left), jute (lower-right)",
    wreath: "Jasmine wreath surrounding the shield — national flower",
    scroll: "Ribbon scroll at bottom bearing the national motto in Urdu"
  },
  motto: {
    urdu: "ایمان، اتحاد، نظم",
    romanized: "Iman, Ittihad, Nazm",
    english: "Faith, Unity, Discipline"
  },
  note: "The four crops in the shield represent the major agricultural products of Pakistan at the time of independence"
};

const SYMBOLS = [
  { category: "animal", name: "Markhor", nameUrdu: "مارخور", scientific: "Capra falconeri", description: "National animal. Spiral-horned wild goat found in northern mountains of Pakistan (Chitral, Gilgit-Baltistan). Name means 'snake eater' in Persian. IUCN status: Near Threatened. Pakistan's conservation efforts increased population from ~2,500 (2015) to ~5,700+.", significance: "Symbolizes the rugged terrain and resilience of Pakistan" },
  { category: "bird", name: "Chukar Partridge", nameUrdu: "چکور", scientific: "Alectoris chukar", description: "National bird. Also called 'chakor'. Found across Pakistan's hilly terrain. Known for its distinctive red beak and legs, black-and-white barred flanks.", significance: "Featured in Urdu/Persian poetry as a symbol of love — the chukar is said to be in love with the moon" },
  { category: "flower", name: "Jasmine", nameUrdu: "چمبیلی", scientific: "Jasminum officinale", description: "National flower. Called 'Chambeli' in Urdu. White, fragrant flower blooming in summer. Widely cultivated across Pakistan for its scent and beauty.", significance: "Symbolizes purity, modesty, and attachment to the motherland. Used in the state emblem wreath." },
  { category: "tree", name: "Deodar Cedar", nameUrdu: "دیودار", scientific: "Cedrus deodara", description: "National tree. Name from Sanskrit 'devadaru' meaning 'wood of the gods'. Native to the western Himalayas, found in northern Pakistan (Murree, Swat, Dir, Chitral). Evergreen conifer growing up to 60m tall.", significance: "Symbolizes strength and endurance. Widely used in construction in northern areas." },
  { category: "fruit", name: "Mango", nameUrdu: "آم", scientific: "Mangifera indica", description: "National fruit. Pakistan is 4th largest mango producer globally. Famous varieties: Sindhri, Chaunsa, Anwar Ratol, Langra, Dusehri, Fajri. Season: May-September. Major growing regions: Sindh (Sindhri) and Punjab (Chaunsa, Multan).", significance: "Called 'King of Fruits'. Pakistan exports mangoes to 40+ countries. Mango diplomacy — gifting mangoes to foreign leaders." },
  { category: "sport", name: "Field Hockey", nameUrdu: "ہاکی", description: "National sport (official). Pakistan hockey achievements: 4 Hockey World Cup titles (1971, 1978, 1982, 1994), 3 Olympic gold medals (1960, 1968, 1984), 3 Champions Trophy titles. Though cricket is more popular, hockey remains the official national sport.", significance: "Pakistan was once the dominant force in world hockey" },
  { category: "game", name: "Cricket", nameUrdu: "کرکٹ", description: "De facto national game (most popular sport). Pakistan cricket achievements: 1992 Cricket World Cup (captain Imran Khan), 2009 T20 World Cup, 2017 Champions Trophy. ICC Test, ODI, and T20I member.", significance: "Cricket is by far the most followed sport in Pakistan" },
  { category: "poet", name: "Allama Muhammad Iqbal", nameUrdu: "علامہ محمد اقبال", description: "National poet. Known as 'Shair-e-Mashriq' (Poet of the East). Born 1877, Sialkot. Died 1938, Lahore. Philosopher-poet who conceptualized the idea of a separate Muslim state in the subcontinent. Major works: Bang-e-Dra, Bal-e-Jibril, Zarb-e-Kalim (Urdu); Asrar-e-Khudi, Rumuz-e-Bekhudi, Javid Nama (Persian).", significance: "His Allahabad Address (1930) is considered the intellectual foundation of Pakistan. Iqbal Day: 9 November." },
  { category: "father", name: "Quaid-e-Azam Muhammad Ali Jinnah", nameUrdu: "قائدِ اعظم محمد علی جناح", description: "Father of the Nation (Baba-e-Qaum). Born 25 December 1876, Karachi. Died 11 September 1948, Karachi. Founder of Pakistan. Led the Pakistan Movement and served as first Governor-General. Barrister, politician, leader of All-India Muslim League.", significance: "Quaid-e-Azam Day: 25 December. Mazar-e-Quaid in Karachi is his mausoleum." },
  { category: "language", name: "Urdu", nameUrdu: "اردو", description: "National language. Written in modified Perso-Arabic script (Nastaliq). Lingua franca of Pakistan. One of the scheduled languages of India. Vocabulary drawn from Arabic, Persian, Turkish, Sanskrit. Spoken by ~70 million as first language, 100+ million as second language in Pakistan.", significance: "Unifying national language across Pakistan's diverse linguistic landscape" },
  { category: "mosque", name: "Faisal Mosque", nameUrdu: "فیصل مسجد", description: "National mosque. Located in Islamabad at the foot of Margalla Hills. Designed by Turkish architect Vedat Dalokay. Funded by King Faisal of Saudi Arabia. Completed 1986. Capacity: 100,000 (74,000 in grounds, 10,000 in main hall). Design inspired by a Bedouin tent — no traditional dome.", significance: "Largest mosque in Pakistan. Was the largest in the world from 1986 to 1993." },
  { category: "heritage", name: "Mohenjo-daro", nameUrdu: "موئن جو دڑو", description: "National heritage site. UNESCO World Heritage Site (1980). Ancient Indus Valley Civilization city (c. 2500 BCE) in Sindh province. One of the earliest major cities in the world. Features include the Great Bath, granary, and grid-planned streets.", significance: "Represents Pakistan's ancient civilizational heritage dating back 4,500+ years" },
  { category: "mausoleum", name: "Mazar-e-Quaid", nameUrdu: "مزارِ قائد", description: "National mausoleum. Final resting place of Quaid-e-Azam Muhammad Ali Jinnah in Karachi. Built 1960s, designed by Yahya Merchant. White marble structure with Moorish and modernist architecture. Also houses tombs of Liaquat Ali Khan and Fatima Jinnah.", significance: "Most visited monument in Pakistan. Changing of the guard ceremony." },
  { category: "days", name: "National Days", description: "Pakistan Day: 23 March (Lahore Resolution 1940). Independence Day: 14 August 1947. Iqbal Day: 9 November. Quaid-e-Azam Day: 25 December.", significance: "23 March and 14 August are celebrated with military parades and national ceremonies." },
  { category: "motto", name: "National Motto", nameUrdu: "ایمان، اتحاد، نظم", romanized: "Iman, Ittihad, Nazm", english: "Faith, Unity, Discipline", description: "Attributed to Quaid-e-Azam Muhammad Ali Jinnah. Inscribed on the state emblem scroll. Represents the three guiding principles for the nation.", significance: "Core values emphasized by the founder for nation-building" }
];

function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === 'help') {
    console.log(JSON.stringify({ commands: ['flag', 'anthem', 'symbols', 'symbol --name <name>', 'emblem', 'motto'] }));
    return;
  }

  if (cmd === 'flag') {
    console.log(JSON.stringify(FLAG, null, 2));
    return;
  }

  if (cmd === 'anthem') {
    console.log(JSON.stringify(ANTHEM, null, 2));
    return;
  }

  if (cmd === 'emblem') {
    console.log(JSON.stringify(EMBLEM, null, 2));
    return;
  }

  if (cmd === 'motto') {
    const motto = SYMBOLS.find(s => s.category === 'motto');
    console.log(JSON.stringify({
      urdu: motto.nameUrdu,
      romanized: motto.romanized,
      english: motto.english,
      description: motto.description,
      significance: motto.significance
    }, null, 2));
    return;
  }

  if (cmd === 'symbols') {
    const summary = SYMBOLS.map(s => ({
      category: s.category,
      name: s.name,
      nameUrdu: s.nameUrdu || null,
      brief: s.description.split('.')[0]
    }));
    console.log(JSON.stringify({ count: summary.length, symbols: summary }, null, 2));
    return;
  }

  if (cmd === 'symbol') {
    const nameIdx = args.indexOf('--name');
    if (nameIdx === -1 || !args[nameIdx + 1]) {
      process.stderr.write('Usage: symbol --name <name>\n');
      process.exit(1);
    }
    const query = args[nameIdx + 1].toLowerCase();
    const match = SYMBOLS.find(s =>
      s.name.toLowerCase().includes(query) ||
      (s.category && s.category.toLowerCase().includes(query))
    );
    if (!match) {
      console.log(JSON.stringify({ error: 'Symbol not found', query, available: SYMBOLS.map(s => s.name) }));
      return;
    }
    console.log(JSON.stringify(match, null, 2));
    return;
  }

  process.stderr.write(`Unknown command: ${cmd}\n`);
  process.exit(1);
}

run();

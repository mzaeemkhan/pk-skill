#!/usr/bin/env node

const WORDS = [
  // Greetings
  { urdu: "السلام علیکم", roman: "Assalam o Alaikum", english: "Peace be upon you (hello)", category: "greetings" },
  { urdu: "وعلیکم السلام", roman: "Walaikum Assalam", english: "And upon you peace (reply)", category: "greetings" },
  { urdu: "شکریہ", roman: "Shukriya", english: "Thank you", category: "greetings" },
  { urdu: "خوش آمدید", roman: "Khush Amdeed", english: "Welcome", category: "greetings" },
  { urdu: "الوداع", roman: "Alvida", english: "Goodbye", category: "greetings" },
  { urdu: "خدا حافظ", roman: "Khuda Hafiz", english: "God protect you (goodbye)", category: "greetings" },
  { urdu: "معاف کیجیے", roman: "Maaf Kijiye", english: "Excuse me / Sorry", category: "greetings" },
  { urdu: "جی ہاں", roman: "Ji Haan", english: "Yes (polite)", category: "greetings" },
  { urdu: "جی نہیں", roman: "Ji Nahi", english: "No (polite)", category: "greetings" },
  { urdu: "براہ کرم", roman: "Barah-e-Karam", english: "Please", category: "greetings" },
  { urdu: "آپ کیسے ہیں", roman: "Aap Kaise Hain", english: "How are you?", category: "greetings" },
  { urdu: "میں ٹھیک ہوں", roman: "Main Theek Hoon", english: "I am fine", category: "greetings" },
  { urdu: "ماشاءاللہ", roman: "MashAllah", english: "God has willed it (praise)", category: "greetings" },
  { urdu: "انشاءاللہ", roman: "InshAllah", english: "God willing", category: "greetings" },
  { urdu: "جزاک اللہ", roman: "JazakAllah", english: "May God reward you", category: "greetings" },

  // Numbers
  { urdu: "ایک", roman: "Aik", english: "One (1)", category: "numbers" },
  { urdu: "دو", roman: "Do", english: "Two (2)", category: "numbers" },
  { urdu: "تین", roman: "Teen", english: "Three (3)", category: "numbers" },
  { urdu: "چار", roman: "Char", english: "Four (4)", category: "numbers" },
  { urdu: "پانچ", roman: "Paanch", english: "Five (5)", category: "numbers" },
  { urdu: "چھ", roman: "Chhe", english: "Six (6)", category: "numbers" },
  { urdu: "سات", roman: "Saat", english: "Seven (7)", category: "numbers" },
  { urdu: "آٹھ", roman: "Aath", english: "Eight (8)", category: "numbers" },
  { urdu: "نو", roman: "Nau", english: "Nine (9)", category: "numbers" },
  { urdu: "دس", roman: "Das", english: "Ten (10)", category: "numbers" },
  { urdu: "بیس", roman: "Bees", english: "Twenty (20)", category: "numbers" },
  { urdu: "تیس", roman: "Tees", english: "Thirty (30)", category: "numbers" },
  { urdu: "چالیس", roman: "Chalees", english: "Forty (40)", category: "numbers" },
  { urdu: "پچاس", roman: "Pachaas", english: "Fifty (50)", category: "numbers" },
  { urdu: "سو", roman: "Sau", english: "Hundred (100)", category: "numbers" },
  { urdu: "ہزار", roman: "Hazaar", english: "Thousand (1000)", category: "numbers" },
  { urdu: "لاکھ", roman: "Lakh", english: "Hundred thousand (100,000)", category: "numbers" },
  { urdu: "کروڑ", roman: "Crore", english: "Ten million (10,000,000)", category: "numbers" },

  // Colors
  { urdu: "سرخ", roman: "Surkh", english: "Red", category: "colors" },
  { urdu: "نیلا", roman: "Neela", english: "Blue", category: "colors" },
  { urdu: "سبز", roman: "Sabz", english: "Green", category: "colors" },
  { urdu: "پیلا", roman: "Peela", english: "Yellow", category: "colors" },
  { urdu: "سفید", roman: "Safed", english: "White", category: "colors" },
  { urdu: "کالا", roman: "Kala", english: "Black", category: "colors" },
  { urdu: "نارنجی", roman: "Naranji", english: "Orange", category: "colors" },
  { urdu: "گلابی", roman: "Gulabi", english: "Pink", category: "colors" },
  { urdu: "بھورا", roman: "Bhoora", english: "Brown", category: "colors" },
  { urdu: "جامنی", roman: "Jamni", english: "Purple", category: "colors" },
  { urdu: "سلیٹی", roman: "Sleti", english: "Gray", category: "colors" },
  { urdu: "سنہرا", roman: "Sunehra", english: "Golden", category: "colors" },

  // Family
  { urdu: "ابو / والد", roman: "Abu / Walid", english: "Father", category: "family" },
  { urdu: "امی / والدہ", roman: "Ami / Walida", english: "Mother", category: "family" },
  { urdu: "بھائی", roman: "Bhai", english: "Brother", category: "family" },
  { urdu: "بہن", roman: "Behan", english: "Sister", category: "family" },
  { urdu: "بیٹا", roman: "Beta", english: "Son", category: "family" },
  { urdu: "بیٹی", roman: "Beti", english: "Daughter", category: "family" },
  { urdu: "شوہر", roman: "Shohar", english: "Husband", category: "family" },
  { urdu: "بیوی", roman: "Biwi", english: "Wife", category: "family" },
  { urdu: "دادا", roman: "Dada", english: "Paternal grandfather", category: "family" },
  { urdu: "دادی", roman: "Dadi", english: "Paternal grandmother", category: "family" },
  { urdu: "نانا", roman: "Nana", english: "Maternal grandfather", category: "family" },
  { urdu: "نانی", roman: "Nani", english: "Maternal grandmother", category: "family" },
  { urdu: "چاچا", roman: "Chacha", english: "Paternal uncle", category: "family" },
  { urdu: "پھوپھی", roman: "Phuphi", english: "Paternal aunt", category: "family" },
  { urdu: "ماموں", roman: "Mamoon", english: "Maternal uncle", category: "family" },
  { urdu: "خالہ", roman: "Khala", english: "Maternal aunt", category: "family" },
  { urdu: "بچہ", roman: "Bacha", english: "Child", category: "family" },
  { urdu: "خاندان", roman: "Khandaan", english: "Family", category: "family" },

  // Food
  { urdu: "روٹی", roman: "Roti", english: "Bread / Flatbread", category: "food" },
  { urdu: "چاول", roman: "Chawal", english: "Rice", category: "food" },
  { urdu: "دال", roman: "Daal", english: "Lentils", category: "food" },
  { urdu: "گوشت", roman: "Gosht", english: "Meat", category: "food" },
  { urdu: "مرغی", roman: "Murghi", english: "Chicken", category: "food" },
  { urdu: "مچھلی", roman: "Machhli", english: "Fish", category: "food" },
  { urdu: "سبزی", roman: "Sabzi", english: "Vegetables", category: "food" },
  { urdu: "پھل", roman: "Phal", english: "Fruit", category: "food" },
  { urdu: "دودھ", roman: "Doodh", english: "Milk", category: "food" },
  { urdu: "چائے", roman: "Chai", english: "Tea", category: "food" },
  { urdu: "پانی", roman: "Pani", english: "Water", category: "food" },
  { urdu: "نمک", roman: "Namak", english: "Salt", category: "food" },
  { urdu: "مرچ", roman: "Mirch", english: "Chili / Pepper", category: "food" },
  { urdu: "ہلدی", roman: "Haldi", english: "Turmeric", category: "food" },
  { urdu: "پیاز", roman: "Pyaz", english: "Onion", category: "food" },
  { urdu: "ٹماٹر", roman: "Tamatar", english: "Tomato", category: "food" },
  { urdu: "آلو", roman: "Aloo", english: "Potato", category: "food" },
  { urdu: "چینی", roman: "Cheeni", english: "Sugar", category: "food" },
  { urdu: "گھی", roman: "Ghee", english: "Clarified butter", category: "food" },
  { urdu: "آم", roman: "Aam", english: "Mango", category: "food" },
  { urdu: "سیب", roman: "Seb", english: "Apple", category: "food" },
  { urdu: "کیلا", roman: "Kela", english: "Banana", category: "food" },
  { urdu: "انڈا", roman: "Anda", english: "Egg", category: "food" },
  { urdu: "بریانی", roman: "Biryani", english: "Biryani (spiced rice dish)", category: "food" },
  { urdu: "نان", roman: "Naan", english: "Naan bread", category: "food" },
  { urdu: "سموسہ", roman: "Samosa", english: "Samosa (fried pastry)", category: "food" },
  { urdu: "لسی", roman: "Lassi", english: "Yogurt drink", category: "food" },
  { urdu: "کباب", roman: "Kabab", english: "Kebab", category: "food" },
  { urdu: "حلوہ پوری", roman: "Halwa Puri", english: "Sweet halwa with fried bread", category: "food" },
  { urdu: "نہاری", roman: "Nihari", english: "Slow-cooked meat stew", category: "food" },

  // Time
  { urdu: "آج", roman: "Aaj", english: "Today", category: "time" },
  { urdu: "کل", roman: "Kal", english: "Tomorrow / Yesterday", category: "time" },
  { urdu: "صبح", roman: "Subah", english: "Morning", category: "time" },
  { urdu: "دوپہر", roman: "Dopahar", english: "Afternoon", category: "time" },
  { urdu: "شام", roman: "Shaam", english: "Evening", category: "time" },
  { urdu: "رات", roman: "Raat", english: "Night", category: "time" },
  { urdu: "گھنٹا", roman: "Ghanta", english: "Hour", category: "time" },
  { urdu: "منٹ", roman: "Minute", english: "Minute", category: "time" },
  { urdu: "ہفتہ", roman: "Hafta", english: "Week", category: "time" },
  { urdu: "مہینہ", roman: "Maheena", english: "Month", category: "time" },
  { urdu: "سال", roman: "Saal", english: "Year", category: "time" },
  { urdu: "پیر", roman: "Peer", english: "Monday", category: "time" },
  { urdu: "منگل", roman: "Mangal", english: "Tuesday", category: "time" },
  { urdu: "بدھ", roman: "Budh", english: "Wednesday", category: "time" },
  { urdu: "جمعرات", roman: "Jumerat", english: "Thursday", category: "time" },
  { urdu: "جمعہ", roman: "Juma", english: "Friday", category: "time" },
  { urdu: "ہفتہ", roman: "Hafta", english: "Saturday", category: "time" },
  { urdu: "اتوار", roman: "Itwar", english: "Sunday", category: "time" },

  // Body
  { urdu: "سر", roman: "Sar", english: "Head", category: "body" },
  { urdu: "آنکھ", roman: "Aankh", english: "Eye", category: "body" },
  { urdu: "کان", roman: "Kaan", english: "Ear", category: "body" },
  { urdu: "ناک", roman: "Naak", english: "Nose", category: "body" },
  { urdu: "منہ", roman: "Munh", english: "Mouth", category: "body" },
  { urdu: "ہاتھ", roman: "Haath", english: "Hand", category: "body" },
  { urdu: "پاؤں", roman: "Paon", english: "Foot", category: "body" },
  { urdu: "دل", roman: "Dil", english: "Heart", category: "body" },
  { urdu: "پیٹ", roman: "Pait", english: "Stomach", category: "body" },
  { urdu: "پیٹھ", roman: "Peeth", english: "Back", category: "body" },
  { urdu: "دانت", roman: "Daant", english: "Tooth / Teeth", category: "body" },
  { urdu: "بال", roman: "Baal", english: "Hair", category: "body" },

  // Animals
  { urdu: "کتا", roman: "Kutta", english: "Dog", category: "animals" },
  { urdu: "بلی", roman: "Billi", english: "Cat", category: "animals" },
  { urdu: "گائے", roman: "Gaaye", english: "Cow", category: "animals" },
  { urdu: "بھینس", roman: "Bhains", english: "Buffalo", category: "animals" },
  { urdu: "بکری", roman: "Bakri", english: "Goat", category: "animals" },
  { urdu: "گھوڑا", roman: "Ghora", english: "Horse", category: "animals" },
  { urdu: "اونٹ", roman: "Oont", english: "Camel", category: "animals" },
  { urdu: "مرغ", roman: "Murgh", english: "Rooster", category: "animals" },
  { urdu: "چڑیا", roman: "Chirya", english: "Sparrow / Bird", category: "animals" },
  { urdu: "مچھلی", roman: "Machhli", english: "Fish", category: "animals" },
  { urdu: "شیر", roman: "Sher", english: "Lion", category: "animals" },
  { urdu: "ہاتھی", roman: "Haathi", english: "Elephant", category: "animals" },

  // Household
  { urdu: "گھر", roman: "Ghar", english: "House / Home", category: "household" },
  { urdu: "کمرہ", roman: "Kamra", english: "Room", category: "household" },
  { urdu: "دروازہ", roman: "Darwaza", english: "Door", category: "household" },
  { urdu: "کھڑکی", roman: "Khirki", english: "Window", category: "household" },
  { urdu: "کرسی", roman: "Kursi", english: "Chair", category: "household" },
  { urdu: "میز", roman: "Mez", english: "Table", category: "household" },
  { urdu: "بستر", roman: "Bistar", english: "Bed", category: "household" },
  { urdu: "باورچی خانہ", roman: "Bawarchi Khana", english: "Kitchen", category: "household" },
  { urdu: "غسل خانہ", roman: "Ghusl Khana", english: "Bathroom", category: "household" },
  { urdu: "چھت", roman: "Chhat", english: "Roof", category: "household" },
  { urdu: "فرش", roman: "Farsh", english: "Floor", category: "household" },
  { urdu: "سیڑھیاں", roman: "Seerhiyan", english: "Stairs", category: "household" },

  // Verbs
  { urdu: "کھانا", roman: "Khana", english: "To eat", category: "verbs" },
  { urdu: "پینا", roman: "Peena", english: "To drink", category: "verbs" },
  { urdu: "سونا", roman: "Sona", english: "To sleep", category: "verbs" },
  { urdu: "جانا", roman: "Jana", english: "To go", category: "verbs" },
  { urdu: "آنا", roman: "Aana", english: "To come", category: "verbs" },
  { urdu: "دیکھنا", roman: "Dekhna", english: "To see / look", category: "verbs" },
  { urdu: "سننا", roman: "Sunna", english: "To listen / hear", category: "verbs" },
  { urdu: "بولنا", roman: "Bolna", english: "To speak", category: "verbs" },
  { urdu: "لکھنا", roman: "Likhna", english: "To write", category: "verbs" },
  { urdu: "پڑھنا", roman: "Parhna", english: "To read / study", category: "verbs" },
  { urdu: "کرنا", roman: "Karna", english: "To do", category: "verbs" },
  { urdu: "دینا", roman: "Dena", english: "To give", category: "verbs" },
  { urdu: "لینا", roman: "Lena", english: "To take", category: "verbs" },
  { urdu: "چلنا", roman: "Chalna", english: "To walk", category: "verbs" },
  { urdu: "بیٹھنا", roman: "Baithna", english: "To sit", category: "verbs" },
  { urdu: "کھڑا ہونا", roman: "Khara Hona", english: "To stand", category: "verbs" },
  { urdu: "سمجھنا", roman: "Samajhna", english: "To understand", category: "verbs" },
  { urdu: "بنانا", roman: "Banana", english: "To make / cook", category: "verbs" },

  // Common Phrases
  { urdu: "کتنے کا ہے؟", roman: "Kitne Ka Hai?", english: "How much does it cost?", category: "phrases" },
  { urdu: "میرا نام ہے", roman: "Mera Naam Hai", english: "My name is...", category: "phrases" },
  { urdu: "آپ کا نام کیا ہے؟", roman: "Aap Ka Naam Kya Hai?", english: "What is your name?", category: "phrases" },
  { urdu: "مجھے اردو نہیں آتی", roman: "Mujhe Urdu Nahi Aati", english: "I don't know Urdu", category: "phrases" },
  { urdu: "یہ کہاں ہے؟", roman: "Yeh Kahan Hai?", english: "Where is this?", category: "phrases" },
  { urdu: "مدد کیجیے", roman: "Madad Kijiye", english: "Please help", category: "phrases" },
  { urdu: "ٹھیک ہے", roman: "Theek Hai", english: "It's okay / Alright", category: "phrases" },
  { urdu: "کوئی بات نہیں", roman: "Koi Baat Nahi", english: "No problem / It's nothing", category: "phrases" },
  { urdu: "میں سمجھ گیا", roman: "Main Samajh Gaya", english: "I understand", category: "phrases" },
  { urdu: "آہستہ بولیں", roman: "Ahista Bolein", english: "Please speak slowly", category: "phrases" },
  { urdu: "اللہ حافظ", roman: "Allah Hafiz", english: "God be your protector (goodbye)", category: "phrases" },
  { urdu: "جلدی کرو", roman: "Jaldi Karo", english: "Hurry up", category: "phrases" },

  // Weather
  { urdu: "موسم", roman: "Mausam", english: "Weather / Season", category: "weather" },
  { urdu: "دھوپ", roman: "Dhoop", english: "Sunshine", category: "weather" },
  { urdu: "بارش", roman: "Barish", english: "Rain", category: "weather" },
  { urdu: "برف", roman: "Barf", english: "Snow / Ice", category: "weather" },
  { urdu: "گرمی", roman: "Garmi", english: "Heat / Summer", category: "weather" },
  { urdu: "سردی", roman: "Sardi", english: "Cold / Winter", category: "weather" },
  { urdu: "ہوا", roman: "Hawa", english: "Wind / Air", category: "weather" },
  { urdu: "بادل", roman: "Badal", english: "Cloud", category: "weather" },
  { urdu: "طوفان", roman: "Toofan", english: "Storm", category: "weather" },
  { urdu: "دھند", roman: "Dhund", english: "Fog", category: "weather" },
];

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "search") {
  const query = (getFlag("query") || args.slice(1).join(" ")).toLowerCase();
  if (!query) { console.error("Usage: dictionary.mjs search --query <word>"); process.exit(1); }
  const results = WORDS.filter(w => {
    const hay = `${w.urdu} ${w.roman} ${w.english}`.toLowerCase();
    return hay.includes(query);
  });
  console.log(JSON.stringify({ query, count: results.length, results }, null, 2));

} else if (cmd === "category") {
  const name = (getFlag("name") || args[1] || "").toLowerCase();
  if (!name) { console.error("Usage: dictionary.mjs category --name <category>"); process.exit(1); }
  const results = WORDS.filter(w => w.category === name);
  if (results.length === 0) { console.error(`Unknown category: ${name}. Use 'categories' to list.`); process.exit(1); }
  console.log(JSON.stringify({ category: name, count: results.length, words: results }, null, 2));

} else if (cmd === "categories") {
  const cats = {};
  for (const w of WORDS) {
    cats[w.category] = (cats[w.category] || 0) + 1;
  }
  console.log(JSON.stringify({ totalWords: WORDS.length, categories: cats }, null, 2));

} else if (cmd === "random") {
  const count = Math.min(parseInt(getFlag("count") || args[1] || "5", 10), 50);
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5).slice(0, count);
  console.log(JSON.stringify({ count: shuffled.length, words: shuffled }, null, 2));

} else {
  console.error("Commands: search, category, categories, random");
  console.error("  search --query <word>       — search across all fields");
  console.error("  category --name <name>      — browse a category");
  console.error("  categories                  — list all categories");
  console.error("  random --count <N>          — random words");
  process.exit(1);
}

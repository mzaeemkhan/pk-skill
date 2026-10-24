#!/usr/bin/env node

const STATIONS = [
  { name: "FM 101", frequency: "101.0", city: "Islamabad", network: "Radio Pakistan", category: "news" },
  { name: "FM 101", frequency: "101.0", city: "Lahore", network: "Radio Pakistan", category: "news" },
  { name: "FM 101", frequency: "101.0", city: "Karachi", network: "Radio Pakistan", category: "news" },
  { name: "FM 101", frequency: "101.0", city: "Peshawar", network: "Radio Pakistan", category: "news" },
  { name: "FM 101", frequency: "101.0", city: "Quetta", network: "Radio Pakistan", category: "news" },
  { name: "FM 101", frequency: "101.0", city: "Faisalabad", network: "Radio Pakistan", category: "news" },
  { name: "FM 101", frequency: "101.0", city: "Multan", network: "Radio Pakistan", category: "news" },
  { name: "FM 100", frequency: "100.0", city: "Islamabad", network: "FM 100", category: "music" },
  { name: "FM 100", frequency: "100.0", city: "Lahore", network: "FM 100", category: "music" },
  { name: "FM 100", frequency: "100.0", city: "Karachi", network: "FM 100", category: "music" },
  { name: "FM 89", frequency: "89.0", city: "Islamabad", network: "FM 89", category: "music" },
  { name: "FM 89", frequency: "89.4", city: "Lahore", network: "FM 89", category: "music" },
  { name: "FM 89", frequency: "89.0", city: "Karachi", network: "FM 89", category: "music" },
  { name: "City FM 89", frequency: "89.0", city: "Multan", network: "FM 89", category: "music" },
  { name: "FM 96", frequency: "96.0", city: "Islamabad", network: "Samaa FM", category: "news" },
  { name: "FM 96", frequency: "96.0", city: "Lahore", network: "Samaa FM", category: "news" },
  { name: "FM 96", frequency: "96.0", city: "Karachi", network: "Samaa FM", category: "news" },
  { name: "FM 93", frequency: "93.0", city: "Islamabad", network: "Radio Pakistan", category: "entertainment" },
  { name: "FM 93", frequency: "93.0", city: "Lahore", network: "Radio Pakistan", category: "entertainment" },
  { name: "FM 93", frequency: "93.0", city: "Karachi", network: "Radio Pakistan", category: "entertainment" },
  { name: "FM 93", frequency: "93.0", city: "Peshawar", network: "Radio Pakistan", category: "entertainment" },
  { name: "FM 93", frequency: "93.0", city: "Quetta", network: "Radio Pakistan", category: "entertainment" },
  { name: "Power 99", frequency: "99.0", city: "Islamabad", network: "Power 99", category: "music" },
  { name: "Power 99", frequency: "99.0", city: "Lahore", network: "Power 99", category: "music" },
  { name: "Power 99", frequency: "99.0", city: "Karachi", network: "Power 99", category: "music" },
  { name: "Hot FM 105", frequency: "105.0", city: "Islamabad", network: "Hot FM", category: "music" },
  { name: "Hot FM 105", frequency: "105.0", city: "Lahore", network: "Hot FM", category: "music" },
  { name: "Hot FM 105", frequency: "105.0", city: "Karachi", network: "Hot FM", category: "music" },
  { name: "Josh FM 91", frequency: "91.0", city: "Islamabad", network: "Josh FM", category: "music" },
  { name: "Josh FM 91", frequency: "91.0", city: "Lahore", network: "Josh FM", category: "music" },
  { name: "Hum FM 106.2", frequency: "106.2", city: "Islamabad", network: "Hum Network", category: "entertainment" },
  { name: "Hum FM 106.2", frequency: "106.2", city: "Lahore", network: "Hum Network", category: "entertainment" },
  { name: "Hum FM 106.2", frequency: "106.2", city: "Karachi", network: "Hum Network", category: "entertainment" },
  { name: "Mast FM 103", frequency: "103.0", city: "Islamabad", network: "Mast FM", category: "music" },
  { name: "Mast FM 103", frequency: "103.0", city: "Lahore", network: "Mast FM", category: "music" },
  { name: "Mast FM 103", frequency: "103.0", city: "Karachi", network: "Mast FM", category: "music" },
  { name: "Mast FM 103", frequency: "103.0", city: "Multan", network: "Mast FM", category: "music" },
  { name: "Mast FM 103", frequency: "103.0", city: "Faisalabad", network: "Mast FM", category: "music" },
  { name: "Apna Karachi 107", frequency: "107.0", city: "Karachi", network: "Apna FM", category: "entertainment" },
  { name: "FM 94", frequency: "94.0", city: "Islamabad", network: "Suno FM", category: "talk" },
  { name: "FM 94", frequency: "94.0", city: "Lahore", network: "Suno FM", category: "talk" },
  { name: "FM 94", frequency: "94.0", city: "Karachi", network: "Suno FM", category: "talk" },
  { name: "Radio Awaz 104.2", frequency: "104.2", city: "Lahore", network: "Radio Awaz", category: "talk" },
  { name: "Radio Awaz 104", frequency: "104.0", city: "Karachi", network: "Radio Awaz", category: "talk" },
  { name: "Buraq FM 104", frequency: "104.0", city: "Islamabad", network: "Buraq FM", category: "religious" },
  { name: "Buraq FM 104", frequency: "104.0", city: "Lahore", network: "Buraq FM", category: "religious" },
  { name: "Sunehri FM 95", frequency: "95.0", city: "Islamabad", network: "Sunehri FM", category: "religious" },
  { name: "Sunehri FM 95", frequency: "95.0", city: "Lahore", network: "Sunehri FM", category: "religious" },
  { name: "Al-Quran FM 98.6", frequency: "98.6", city: "Islamabad", network: "Al-Quran Radio", category: "religious" },
  { name: "DM Digital Radio", frequency: "107.4", city: "Lahore", network: "DM Digital", category: "entertainment" },
  { name: "Dhoom FM 95.4", frequency: "95.4", city: "Faisalabad", network: "Dhoom FM", category: "music" },
  { name: "Awaz FM 99.4", frequency: "99.4", city: "Peshawar", network: "FM Awaz", category: "entertainment" },
  { name: "Pakhtunkhwa Radio 92", frequency: "92.0", city: "Peshawar", network: "PK Radio", category: "entertainment" },
  { name: "Mashaal Radio 98.8", frequency: "98.8", city: "Peshawar", network: "RFE/RL", category: "news" },
  { name: "FM 98", frequency: "98.0", city: "Islamabad", network: "Radio Pakistan", category: "entertainment" },
  { name: "Waseeb FM 106.6", frequency: "106.6", city: "Multan", network: "Waseeb FM", category: "entertainment" },
  { name: "Capital FM 98.8", frequency: "98.8", city: "Islamabad", network: "Capital FM", category: "music" },
  { name: "Vibe FM 105.6", frequency: "105.6", city: "Karachi", network: "Vibe FM", category: "music" },
  { name: "Bolan FM 88", frequency: "88.0", city: "Quetta", network: "Radio Pakistan", category: "entertainment" },
  { name: "FM 88 Gwadar", frequency: "88.0", city: "Gwadar", network: "Radio Pakistan", category: "news" },
  { name: "FM 88 Turbat", frequency: "88.6", city: "Turbat", network: "Radio Pakistan", category: "news" },
  { name: "Gilgit FM 96", frequency: "96.0", city: "Gilgit", network: "Radio Pakistan", category: "entertainment" },
  { name: "Skardu FM 94.4", frequency: "94.4", city: "Skardu", network: "Radio Pakistan", category: "entertainment" },
  { name: "Muzaffarabad FM 97", frequency: "97.0", city: "Muzaffarabad", network: "AJK Radio", category: "entertainment" },
];

function listAll() {
  return {
    success: true,
    count: STATIONS.length,
    stations: STATIONS,
  };
}

function byCity(cityName) {
  const q = cityName.toLowerCase();
  const matches = STATIONS.filter((s) => s.city.toLowerCase().includes(q));
  return {
    success: true,
    city: cityName,
    count: matches.length,
    stations: matches,
  };
}

function search(query) {
  const q = query.toLowerCase();
  const matches = STATIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.network.toLowerCase().includes(q) ||
      s.frequency.includes(q)
  );
  return {
    success: true,
    query,
    count: matches.length,
    stations: matches,
  };
}

function byCategory(cat) {
  const q = cat.toLowerCase();
  const matches = STATIONS.filter((s) => s.category === q);
  const categories = [...new Set(STATIONS.map((s) => s.category))];
  if (matches.length === 0) {
    return { success: false, error: `No stations for category '${cat}'. Available: ${categories.join(", ")}` };
  }
  return {
    success: true,
    category: cat,
    count: matches.length,
    stations: matches,
    available_categories: categories,
  };
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "--help") {
    console.log(JSON.stringify({
      usage: "node radio.mjs <command> [options]",
      commands: {
        list: "List all stations",
        city: "--name <city> — Stations in a city",
        search: "--query <text> — Search by name/frequency",
        category: "--type <news|music|religious|talk|entertainment>",
      },
    }, null, 2));
    return;
  }

  const getFlag = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  if (cmd === "list") {
    console.log(JSON.stringify(listAll(), null, 2));
  } else if (cmd === "city") {
    const name = getFlag("--name");
    if (!name) {
      console.error(JSON.stringify({ error: "Required: --name <city>" }));
      process.exit(1);
    }
    console.log(JSON.stringify(byCity(name), null, 2));
  } else if (cmd === "search") {
    const query = getFlag("--query");
    if (!query) {
      console.error(JSON.stringify({ error: "Required: --query <text>" }));
      process.exit(1);
    }
    console.log(JSON.stringify(search(query), null, 2));
  } else if (cmd === "category") {
    const type = getFlag("--type");
    if (!type) {
      console.error(JSON.stringify({ error: "Required: --type <category>" }));
      process.exit(1);
    }
    console.log(JSON.stringify(byCategory(type), null, 2));
  } else {
    console.error(JSON.stringify({ error: `Unknown command: ${cmd}` }));
    process.exit(1);
  }
}

main();

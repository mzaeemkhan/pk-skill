#!/usr/bin/env node

const API = "https://api.alquran.cloud/v1";

const EDITIONS = {
  arabic: "quran-uthmani",
  english: "en.sahih",
  urdu: "ur.jalandhry",
};

async function fetchJson(path) {
  const res = await fetch(`${API}${path}`, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`API HTTP ${res.status}`);
  const data = await res.json();
  if (data.code !== 200) throw new Error(data.data || "API error");
  return data.data;
}

async function ayah(ref, lang = "all") {
  const editions = lang === "all"
    ? Object.values(EDITIONS).join(",")
    : EDITIONS[lang] || lang;
  const data = await fetchJson(`/ayah/${ref}/editions/${editions}`);
  const result = Array.isArray(data) ? data.map(d => ({
    surah: d.surah?.englishName,
    surahArabic: d.surah?.name,
    number: d.numberInSurah,
    edition: d.edition?.identifier,
    language: d.edition?.language,
    text: d.text,
  })) : [{
    surah: data.surah?.englishName,
    number: data.numberInSurah,
    text: data.text,
  }];
  console.log(JSON.stringify({ reference: ref, verses: result }, null, 2));
}

async function searchQuran(keyword, lang = "english", limit = 20) {
  const edition = EDITIONS[lang] || lang;
  const data = await fetchJson(`/search/${encodeURIComponent(keyword)}/all/${edition}`);
  const matches = (data.matches || []).slice(0, limit).map(m => ({
    surah: m.surah?.englishName,
    surahNumber: m.surah?.number,
    ayah: m.numberInSurah,
    reference: `${m.surah?.number}:${m.numberInSurah}`,
    text: m.text,
    edition: m.edition?.identifier,
  }));
  console.log(JSON.stringify({
    keyword,
    totalMatches: data.count || 0,
    showing: matches.length,
    matches,
  }, null, 2));
}

async function surahList() {
  const data = await fetchJson("/surah");
  const surahs = data.map(s => ({
    number: s.number,
    name: s.name,
    englishName: s.englishName,
    translation: s.englishNameTranslation,
    ayahs: s.numberOfAyahs,
    type: s.revelationType,
  }));
  console.log(JSON.stringify({ count: surahs.length, surahs }, null, 2));
}

async function surahFull(num, lang = "all") {
  const editions = lang === "all"
    ? Object.values(EDITIONS).join(",")
    : EDITIONS[lang] || lang;
  const data = await fetchJson(`/surah/${num}/editions/${editions}`);
  const result = Array.isArray(data) ? data.map(d => ({
    edition: d.edition?.identifier,
    language: d.edition?.language,
    name: d.englishName,
    ayahs: d.ayahs?.map(a => ({ number: a.numberInSurah, text: a.text })),
  })) : {
    name: data.englishName,
    ayahs: data.ayahs?.map(a => ({ number: a.numberInSurah, text: a.text })),
  };
  console.log(JSON.stringify({ surah: num, editions: result }, null, 2));
}

async function editions() {
  const data = await fetchJson("/edition?language=ur&type=translation");
  const eds = data.map(e => ({ identifier: e.identifier, name: e.name, language: e.language, type: e.type }));
  console.log(JSON.stringify({ urduEditions: eds }, null, 2));
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
}

if (cmd === "ayah") {
  const ref = getFlag("ref", args[1]);
  if (!ref) { console.error("Usage: quran.mjs ayah --ref 2:255 [--lang arabic|english|urdu|all]"); process.exit(1); }
  ayah(ref, getFlag("lang", "all")).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "search") {
  const kw = getFlag("keyword", args[1]);
  if (!kw) { console.error("Usage: quran.mjs search --keyword mercy [--lang english|urdu]"); process.exit(1); }
  searchQuran(kw, getFlag("lang", "english"), parseInt(getFlag("limit", "20"))).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "surah") {
  const num = getFlag("number", args[1]);
  if (!num) { console.error("Usage: quran.mjs surah --number 1 [--lang arabic|english|urdu|all]"); process.exit(1); }
  surahFull(num, getFlag("lang", "all")).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "surahs") {
  surahList().catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "editions") {
  editions().catch(e => { console.error(e.message); process.exit(1); });
} else {
  console.error("Commands: ayah, search, surah, surahs, editions");
  console.error("  ayah --ref 2:255 [--lang all]");
  console.error("  search --keyword mercy [--lang english]");
  console.error("  surah --number 1 [--lang all]");
  console.error("  surahs");
  console.error("  editions");
  process.exit(1);
}

#!/usr/bin/env node

const API = 'https://api.sunnah.com/v1';
const KEY = 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk';
const HEADERS = { 'X-API-Key': KEY, 'Accept': 'application/json' };

async function api(path) {
  const r = await fetch(`${API}${path}`, { headers: HEADERS });
  if (!r.ok) throw new Error(`API ${r.status}: ${r.statusText}`);
  return r.json();
}

function formatHadith(h) {
  const out = {};
  if (h.collection) out.collection = h.collection;
  if (h.bookNumber) out.book = h.bookNumber;
  if (h.hadithNumber) out.hadithNumber = h.hadithNumber;
  const ar = (h.hadith || []).find(t => t.lang === 'ar');
  const en = (h.hadith || []).find(t => t.lang === 'en');
  if (ar) {
    out.arabic = ar.body;
    if (ar.grades && ar.grades.length) out.grades = ar.grades.map(g => `${g.grade} (${g.graded_by})`);
  }
  if (en) {
    out.english = en.body;
    if (en.chapterTitle) out.chapter = en.chapterTitle;
    if (en.grades && en.grades.length && !out.grades) out.grades = en.grades.map(g => `${g.grade} (${g.graded_by})`);
  }
  return out;
}

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

async function search(flags) {
  const q = flags.query;
  if (!q) { console.error('Usage: hadith.mjs search --query "<text>" [--page N]'); process.exit(1); }
  const page = flags.page || 1;
  const data = await api(`/hadiths?q=${encodeURIComponent(q)}&limit=10&page=${page}`);
  const results = (data.data || []).map(formatHadith);
  console.log(JSON.stringify({ query: q, page: Number(page), total: data.total || results.length, results }, null, 2));
}

async function random() {
  const data = await api('/hadiths/random');
  console.log(JSON.stringify(formatHadith(data), null, 2));
}

async function collections() {
  const data = await api('/collections');
  const list = (data.data || data || []).map(c => ({
    name: c.name,
    title: c.collection && c.collection[0] ? c.collection[0].title : c.name,
    totalHadith: c.totalHadith || c.hadithsCount
  }));
  console.log(JSON.stringify({ collections: list }, null, 2));
}

async function hadith(flags) {
  const col = flags.collection;
  const num = flags.number;
  if (!col || !num) { console.error('Usage: hadith.mjs hadith --collection <name> --number <N>'); process.exit(1); }
  const data = await api(`/collections/${encodeURIComponent(col)}/hadiths/${encodeURIComponent(num)}`);
  console.log(JSON.stringify(formatHadith(data), null, 2));
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);

const cmds = { search, random, collections, hadith };
if (!cmds[cmd]) {
  console.error('Usage: hadith.mjs <search|random|collections|hadith> [options]');
  console.error('  search    --query "<text>" [--page N]');
  console.error('  random');
  console.error('  collections');
  console.error('  hadith    --collection <name> --number <N>');
  process.exit(1);
}

cmds[cmd](flags).catch(e => { console.error(e.message); process.exit(1); });

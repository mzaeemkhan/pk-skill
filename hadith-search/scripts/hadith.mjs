#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';
const CACHE_DIR = join(tmpdir(), 'pk-skill-hadith');
const SIX = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah'];
const LANGS = { en: 'eng', ar: 'ara', ur: 'urd' };

async function getJson(path) {
  const r = await fetch(`${BASE}${path}`);
  if (!r.ok) throw new Error(`Fetch ${path} failed: HTTP ${r.status}`);
  return r.json();
}

// Full editions are ~1MB each; cache on disk so search/random don't re-download.
async function edition(name) {
  const file = join(CACHE_DIR, `${name}.json`);
  try { return JSON.parse(await readFile(file, 'utf8')); } catch {}
  const data = await getJson(`/editions/${name}.min.json`);
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(file, JSON.stringify(data));
  return data;
}

function checkCollection(col) {
  if (!SIX.includes(col)) {
    console.error(`Unknown collection "${col}". Use one of: ${SIX.join(', ')}`);
    process.exit(1);
  }
}

function fmt(col, title, h, arabic) {
  return {
    collection: col,
    collectionName: title,
    hadithNumber: h.hadithnumber,
    reference: h.reference ? `Book ${h.reference.book}, Hadith ${h.reference.hadith}` : undefined,
    text: h.text,
    ...(arabic ? { arabic } : {}),
    grades: (h.grades || []).map(g => `${g.grade} (${g.name})`),
    url: `https://sunnah.com/${col}:${h.hadithnumber}`
  };
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

async function collections() {
  const eds = await getJson('/editions.json');
  const list = SIX.map(c => ({
    name: c,
    title: eds[c].name,
    languages: eds[c].collection.map(e => e.language).filter((v, i, a) => a.indexOf(v) === i)
  }));
  console.log(JSON.stringify({ collections: list, source: BASE }, null, 2));
}

async function hadith(flags) {
  const col = flags.collection;
  const num = flags.number;
  if (!col || !num) { console.error('Usage: hadith.mjs hadith --collection <name> --number <N> [--lang en|ur]'); process.exit(1); }
  checkCollection(col);
  const lang = LANGS[flags.lang] || 'eng';
  const [tr, ar] = await Promise.all([
    getJson(`/editions/${lang}-${col}/${encodeURIComponent(num)}.json`),
    getJson(`/editions/ara-${col}/${encodeURIComponent(num)}.json`).catch(() => null)
  ]);
  const h = tr.hadiths && tr.hadiths[0];
  if (!h) { console.error(`Hadith ${col} ${num} not found`); process.exit(1); }
  const out = fmt(col, tr.metadata.name, h, ar && ar.hadiths[0] && ar.hadiths[0].text);
  const section = Object.values(tr.metadata.section || {})[0];
  if (section) out.book = section;
  console.log(JSON.stringify(out, null, 2));
}

async function search(flags) {
  const q = typeof flags.query === 'string' ? flags.query.toLowerCase() : '';
  if (!q) { console.error('Usage: hadith.mjs search --query "<text>" [--collection <name>|all] [--limit N]'); process.exit(1); }
  const cols = !flags.collection || flags.collection === 'all' ? SIX : [flags.collection];
  cols.forEach(checkCollection);
  const limit = Number(flags.limit) || 10;
  const terms = q.split(/\s+/).filter(Boolean);
  const results = [];
  let total = 0;
  for (const col of cols) {
    const ed = await edition(`eng-${col}`);
    for (const h of ed.hadiths) {
      const text = (h.text || '').toLowerCase();
      if (terms.every(t => text.includes(t))) {
        total++;
        if (results.length < limit) results.push(fmt(col, ed.metadata.name, h));
      }
    }
  }
  console.log(JSON.stringify({ query: flags.query, collections: cols, total, shown: results.length, results }, null, 2));
}

async function random(flags) {
  const col = typeof flags.collection === 'string' ? flags.collection : SIX[Math.floor(Math.random() * SIX.length)];
  checkCollection(col);
  const ed = await edition(`eng-${col}`);
  const pool = ed.hadiths.filter(h => h.text && h.text.trim());
  const h = pool[Math.floor(Math.random() * pool.length)];
  console.log(JSON.stringify(fmt(col, ed.metadata.name, h), null, 2));
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);
const cmds = { search, random, collections, hadith };
if (!cmds[cmd]) {
  console.error('Usage: hadith.mjs <search|random|collections|hadith> [options]');
  console.error('  search      --query "<text>" [--collection <name>|all] [--limit N]');
  console.error('  random      [--collection <name>]');
  console.error('  collections');
  console.error('  hadith      --collection <name> --number <N> [--lang en|ur]');
  process.exit(1);
}
cmds[cmd](flags).catch(e => { console.error(e.message); process.exit(1); });

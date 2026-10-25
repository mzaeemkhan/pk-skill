#!/usr/bin/env node

const API = "https://api.aladhan.com/v1";
const NOTE =
  "Calculated dates (Aladhan). Pakistan follows the Ruet-e-Hilal Committee moon sighting, so actual dates can differ by ±1 day.";

const EVENTS = [
  { name: "Islamic New Year (1 Muharram)", month: 1, day: 1 },
  { name: "Ashura (10 Muharram)", month: 1, day: 10 },
  { name: "Eid Milad-un-Nabi (12 Rabi ul Awal)", month: 3, day: 12 },
  { name: "Shab-e-Miraj (27 Rajab)", month: 7, day: 27 },
  { name: "Shab-e-Barat (15 Shaban)", month: 8, day: 15 },
  { name: "Ramadan begins (1 Ramadan)", month: 9, day: 1 },
  { name: "Laylat al-Qadr (27 Ramadan)", month: 9, day: 27 },
  { name: "Eid ul Fitr (1 Shawwal)", month: 10, day: 1 },
  { name: "Day of Arafah (9 Dhul Hijjah)", month: 12, day: 9 },
  { name: "Eid ul Adha (10 Dhul Hijjah)", month: 12, day: 10 },
];

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) args[argv[i].slice(2)] = argv[i + 1]?.startsWith("--") ? true : argv[++i] ?? true;
    else args._.push(argv[i]);
  }
  return args;
}

async function get(path) {
  const res = await fetch(`${API}${path}`, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`Aladhan HTTP ${res.status} for ${path}`);
  const json = await res.json();
  if (json.code !== 200) throw new Error(`Aladhan error: ${JSON.stringify(json.data)}`);
  return json.data;
}

const pad = (n) => String(n).padStart(2, "0");
const dmyToIso = (dmy) => dmy.split("-").reverse().join("-");

function isoToDmy(iso, label) {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(iso || "");
  if (!m) throw new Error(`${label} must be YYYY-MM-DD, got: ${iso}`);
  return `${pad(m[3])}-${pad(m[2])}-${m[1]}`;
}

function karachiToday() {
  const [d, m, y] = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi" }).format(new Date()).split("/");
  return `${d}-${m}-${y}`;
}

function shape({ hijri, gregorian }) {
  return {
    gregorian: dmyToIso(gregorian.date),
    weekday: gregorian.weekday.en,
    hijri: `${Number(hijri.day)} ${hijri.month.en} ${hijri.year} AH`,
    hijriDate: dmyToIso(hijri.date),
    hijriMonth: { number: hijri.month.number, en: hijri.month.en, ar: hijri.month.ar, days: hijri.month.days },
  };
}

async function upcoming() {
  const today = (await get(`/gToH/${karachiToday()}`)).hijri;
  const year = Number(today.year);
  const tm = today.month.number, td = Number(today.day);
  const todayIso = dmyToIso(karachiToday());
  const events = await Promise.all(
    EVENTS.map(async (e) => {
      const passed = e.month < tm || (e.month === tm && e.day < td);
      const hy = passed ? year + 1 : year;
      const g = (await get(`/hToG/${pad(e.day)}-${pad(e.month)}-${hy}`)).gregorian;
      const iso = dmyToIso(g.date);
      return {
        event: e.name,
        gregorian: iso,
        weekday: g.weekday.en,
        hijri: `${e.day}-${e.month}-${hy}`,
        daysAway: Math.round((Date.parse(iso) - Date.parse(todayIso)) / 86400000),
      };
    })
  );
  return { today: `${td} ${today.month.en} ${year} AH`, events: events.sort((a, b) => a.daysAway - b.daysAway), note: NOTE };
}

const USAGE = `Usage:
  node scripts/hijri.mjs today
  node scripts/hijri.mjs to-hijri --date 2026-10-25
  node scripts/hijri.mjs to-gregorian --date 1448-05-01
  node scripts/hijri.mjs month [--month 10 --year 2026]
  node scripts/hijri.mjs upcoming`;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];
  let out;
  if (cmd === "today") out = { ...shape(await get(`/gToH/${karachiToday()}`)), note: NOTE };
  else if (cmd === "to-hijri") out = { ...shape(await get(`/gToH/${isoToDmy(args.date, "--date")}`)), note: NOTE };
  else if (cmd === "to-gregorian") out = { ...shape(await get(`/hToG/${isoToDmy(args.date, "--date (Hijri)")}`)), note: NOTE };
  else if (cmd === "month") {
    const [, m, y] = karachiToday().split("-");
    const month = Number(args.month || m), year = Number(args.year || y);
    if (!(month >= 1 && month <= 12) || !(year > 0)) throw new Error("--month must be 1-12 and --year a valid year");
    const days = await get(`/gToHCalendar/${month}/${year}`);
    out = { month, year, days: days.map(shape), note: NOTE };
  } else if (cmd === "upcoming") out = await upcoming();
  else {
    console.error(USAGE);
    process.exit(1);
  }
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});

#!/usr/bin/env node

// Pakistan public holidays 2024-2027
// Islamic dates are approximate — actual dates depend on moon sighting
const HOLIDAYS = {
  2024: [
    { name: 'Kashmir Day', nameUrdu: 'یوم کشمیر', date: '2024-02-05', type: 'gazetted', islamic: false },
    { name: 'Shab-e-Meraj', nameUrdu: 'شب معراج', date: '2024-02-08', type: 'gazetted', islamic: true },
    { name: 'Pakistan Day', nameUrdu: 'یوم پاکستان', date: '2024-03-23', type: 'gazetted', islamic: false },
    { name: 'Shab-e-Barat', nameUrdu: 'شب برات', date: '2024-02-25', type: 'optional', islamic: true },
    { name: 'Ramadan Start', nameUrdu: 'رمضان المبارک', date: '2024-03-12', type: 'optional', islamic: true },
    { name: 'Eid ul-Fitr (Day 1)', nameUrdu: 'عید الفطر', date: '2024-04-11', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 2)', nameUrdu: 'عید الفطر', date: '2024-04-12', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 3)', nameUrdu: 'عید الفطر', date: '2024-04-13', type: 'gazetted', islamic: true },
    { name: 'Labour Day', nameUrdu: 'یوم مزدور', date: '2024-05-01', type: 'gazetted', islamic: false },
    { name: 'Eid ul-Adha (Day 1)', nameUrdu: 'عید الاضحیٰ', date: '2024-06-17', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 2)', nameUrdu: 'عید الاضحیٰ', date: '2024-06-18', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 3)', nameUrdu: 'عید الاضحیٰ', date: '2024-06-19', type: 'gazetted', islamic: true },
    { name: '1st Muharram', nameUrdu: 'یکم محرم', date: '2024-07-08', type: 'gazetted', islamic: true },
    { name: '9th Muharram', nameUrdu: 'تاسوعا', date: '2024-07-16', type: 'gazetted', islamic: true },
    { name: '10th Muharram (Ashura)', nameUrdu: 'یوم عاشورہ', date: '2024-07-17', type: 'gazetted', islamic: true },
    { name: 'Independence Day', nameUrdu: 'یوم آزادی', date: '2024-08-14', type: 'gazetted', islamic: false },
    { name: '12 Rabi ul-Awal (Eid Milad-un-Nabi)', nameUrdu: 'عید میلاد النبیﷺ', date: '2024-09-17', type: 'gazetted', islamic: true },
    { name: 'Iqbal Day', nameUrdu: 'یوم اقبال', date: '2024-11-09', type: 'gazetted', islamic: false },
    { name: 'Quaid-e-Azam Day', nameUrdu: 'یوم قائداعظم', date: '2024-12-25', type: 'gazetted', islamic: false },
  ],
  2025: [
    { name: 'Kashmir Day', nameUrdu: 'یوم کشمیر', date: '2025-02-05', type: 'gazetted', islamic: false },
    { name: 'Shab-e-Meraj', nameUrdu: 'شب معراج', date: '2025-01-28', type: 'gazetted', islamic: true },
    { name: 'Shab-e-Barat', nameUrdu: 'شب برات', date: '2025-02-14', type: 'optional', islamic: true },
    { name: 'Ramadan Start', nameUrdu: 'رمضان المبارک', date: '2025-03-02', type: 'optional', islamic: true },
    { name: 'Pakistan Day', nameUrdu: 'یوم پاکستان', date: '2025-03-23', type: 'gazetted', islamic: false },
    { name: 'Eid ul-Fitr (Day 1)', nameUrdu: 'عید الفطر', date: '2025-03-31', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 2)', nameUrdu: 'عید الفطر', date: '2025-04-01', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 3)', nameUrdu: 'عید الفطر', date: '2025-04-02', type: 'gazetted', islamic: true },
    { name: 'Labour Day', nameUrdu: 'یوم مزدور', date: '2025-05-01', type: 'gazetted', islamic: false },
    { name: 'Eid ul-Adha (Day 1)', nameUrdu: 'عید الاضحیٰ', date: '2025-06-07', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 2)', nameUrdu: 'عید الاضحیٰ', date: '2025-06-08', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 3)', nameUrdu: 'عید الاضحیٰ', date: '2025-06-09', type: 'gazetted', islamic: true },
    { name: '1st Muharram', nameUrdu: 'یکم محرم', date: '2025-06-27', type: 'gazetted', islamic: true },
    { name: '9th Muharram', nameUrdu: 'تاسوعا', date: '2025-07-05', type: 'gazetted', islamic: true },
    { name: '10th Muharram (Ashura)', nameUrdu: 'یوم عاشورہ', date: '2025-07-06', type: 'gazetted', islamic: true },
    { name: 'Independence Day', nameUrdu: 'یوم آزادی', date: '2025-08-14', type: 'gazetted', islamic: false },
    { name: '12 Rabi ul-Awal (Eid Milad-un-Nabi)', nameUrdu: 'عید میلاد النبیﷺ', date: '2025-09-06', type: 'gazetted', islamic: true },
    { name: 'Iqbal Day', nameUrdu: 'یوم اقبال', date: '2025-11-09', type: 'gazetted', islamic: false },
    { name: 'Quaid-e-Azam Day', nameUrdu: 'یوم قائداعظم', date: '2025-12-25', type: 'gazetted', islamic: false },
  ],
  2026: [
    { name: 'Shab-e-Meraj', nameUrdu: 'شب معراج', date: '2026-01-17', type: 'gazetted', islamic: true },
    { name: 'Shab-e-Barat', nameUrdu: 'شب برات', date: '2026-02-03', type: 'optional', islamic: true },
    { name: 'Kashmir Day', nameUrdu: 'یوم کشمیر', date: '2026-02-05', type: 'gazetted', islamic: false },
    { name: 'Ramadan Start', nameUrdu: 'رمضان المبارک', date: '2026-02-18', type: 'optional', islamic: true },
    { name: 'Eid ul-Fitr (Day 1)', nameUrdu: 'عید الفطر', date: '2026-03-20', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 2)', nameUrdu: 'عید الفطر', date: '2026-03-21', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 3)', nameUrdu: 'عید الفطر', date: '2026-03-22', type: 'gazetted', islamic: true },
    { name: 'Pakistan Day', nameUrdu: 'یوم پاکستان', date: '2026-03-23', type: 'gazetted', islamic: false },
    { name: 'Labour Day', nameUrdu: 'یوم مزدور', date: '2026-05-01', type: 'gazetted', islamic: false },
    { name: 'Eid ul-Adha (Day 1)', nameUrdu: 'عید الاضحیٰ', date: '2026-05-27', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 2)', nameUrdu: 'عید الاضحیٰ', date: '2026-05-28', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 3)', nameUrdu: 'عید الاضحیٰ', date: '2026-05-29', type: 'gazetted', islamic: true },
    { name: '1st Muharram', nameUrdu: 'یکم محرم', date: '2026-06-17', type: 'gazetted', islamic: true },
    { name: '9th Muharram', nameUrdu: 'تاسوعا', date: '2026-06-25', type: 'gazetted', islamic: true },
    { name: '10th Muharram (Ashura)', nameUrdu: 'یوم عاشورہ', date: '2026-06-26', type: 'gazetted', islamic: true },
    { name: 'Independence Day', nameUrdu: 'یوم آزادی', date: '2026-08-14', type: 'gazetted', islamic: false },
    { name: '12 Rabi ul-Awal (Eid Milad-un-Nabi)', nameUrdu: 'عید میلاد النبیﷺ', date: '2026-08-26', type: 'gazetted', islamic: true },
    { name: 'Iqbal Day', nameUrdu: 'یوم اقبال', date: '2026-11-09', type: 'gazetted', islamic: false },
    { name: 'Quaid-e-Azam Day', nameUrdu: 'یوم قائداعظم', date: '2026-12-25', type: 'gazetted', islamic: false },
  ],
  2027: [
    { name: 'Shab-e-Meraj', nameUrdu: 'شب معراج', date: '2027-01-07', type: 'gazetted', islamic: true },
    { name: 'Shab-e-Barat', nameUrdu: 'شب برات', date: '2027-01-24', type: 'optional', islamic: true },
    { name: 'Kashmir Day', nameUrdu: 'یوم کشمیر', date: '2027-02-05', type: 'gazetted', islamic: false },
    { name: 'Ramadan Start', nameUrdu: 'رمضان المبارک', date: '2027-02-08', type: 'optional', islamic: true },
    { name: 'Eid ul-Fitr (Day 1)', nameUrdu: 'عید الفطر', date: '2027-03-10', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 2)', nameUrdu: 'عید الفطر', date: '2027-03-11', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Fitr (Day 3)', nameUrdu: 'عید الفطر', date: '2027-03-12', type: 'gazetted', islamic: true },
    { name: 'Pakistan Day', nameUrdu: 'یوم پاکستان', date: '2027-03-23', type: 'gazetted', islamic: false },
    { name: 'Labour Day', nameUrdu: 'یوم مزدور', date: '2027-05-01', type: 'gazetted', islamic: false },
    { name: 'Eid ul-Adha (Day 1)', nameUrdu: 'عید الاضحیٰ', date: '2027-05-17', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 2)', nameUrdu: 'عید الاضحیٰ', date: '2027-05-18', type: 'gazetted', islamic: true },
    { name: 'Eid ul-Adha (Day 3)', nameUrdu: 'عید الاضحیٰ', date: '2027-05-19', type: 'gazetted', islamic: true },
    { name: '1st Muharram', nameUrdu: 'یکم محرم', date: '2027-06-07', type: 'gazetted', islamic: true },
    { name: '9th Muharram', nameUrdu: 'تاسوعا', date: '2027-06-15', type: 'gazetted', islamic: true },
    { name: '10th Muharram (Ashura)', nameUrdu: 'یوم عاشورہ', date: '2027-06-16', type: 'gazetted', islamic: true },
    { name: 'Independence Day', nameUrdu: 'یوم آزادی', date: '2027-08-14', type: 'gazetted', islamic: false },
    { name: '12 Rabi ul-Awal (Eid Milad-un-Nabi)', nameUrdu: 'عید میلاد النبیﷺ', date: '2027-08-16', type: 'gazetted', islamic: true },
    { name: 'Iqbal Day', nameUrdu: 'یوم اقبال', date: '2027-11-09', type: 'gazetted', islamic: false },
    { name: 'Quaid-e-Azam Day', nameUrdu: 'یوم قائداعظم', date: '2027-12-25', type: 'gazetted', islamic: false },
  ],
};

function parseArgs(args) {
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--') && i + 1 < args.length) {
      flags[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return flags;
}

function listHolidays(flags) {
  const year = parseInt(flags.year) || new Date().getFullYear();
  const data = HOLIDAYS[year];
  if (!data) {
    console.error(`No data for ${year}. Available: ${Object.keys(HOLIDAYS).join(', ')}`);
    process.exit(1);
  }
  console.log(JSON.stringify({ year, count: data.length, holidays: data }, null, 2));
}

function nextHoliday() {
  const today = new Date().toISOString().slice(0, 10);
  const allHolidays = Object.values(HOLIDAYS).flat().sort((a, b) => a.date.localeCompare(b.date));
  const next = allHolidays.find(h => h.date >= today);
  if (!next) {
    console.log(JSON.stringify({ message: 'No upcoming holidays in database. Data covers 2024-2027.' }));
    return;
  }
  const daysUntil = Math.ceil((new Date(next.date) - new Date(today)) / 86400000);
  console.log(JSON.stringify({ ...next, daysUntil, today }, null, 2));
}

function monthHolidays(flags) {
  const year = parseInt(flags.year) || new Date().getFullYear();
  const month = parseInt(flags.month);
  if (!month || month < 1 || month > 12) {
    console.error('Provide --month 1-12');
    process.exit(1);
  }
  const data = HOLIDAYS[year];
  if (!data) {
    console.error(`No data for ${year}. Available: ${Object.keys(HOLIDAYS).join(', ')}`);
    process.exit(1);
  }
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const filtered = data.filter(h => h.date.startsWith(prefix));
  console.log(JSON.stringify({ year, month, count: filtered.length, holidays: filtered }, null, 2));
}

function searchHolidays(flags) {
  const query = (flags.query || '').toLowerCase();
  if (!query) {
    console.error('Provide --query <text>');
    process.exit(1);
  }
  const all = Object.values(HOLIDAYS).flat();
  const matches = all.filter(h =>
    h.name.toLowerCase().includes(query) || h.nameUrdu.includes(query)
  );
  console.log(JSON.stringify({ query: flags.query, count: matches.length, results: matches }, null, 2));
}

function usage() {
  console.error(`Usage: node scripts/holidays.mjs <command> [options]

Commands:
  list     List holidays for a year (--year 2026)
  next     Next upcoming holiday
  month    Holidays in a month (--month 3 --year 2026)
  search   Search by name (--query "eid")`);
  process.exit(1);
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);

switch (cmd) {
  case 'list':   listHolidays(flags); break;
  case 'next':   nextHoliday(); break;
  case 'month':  monthHolidays(flags); break;
  case 'search': searchHolidays(flags); break;
  default:       usage();
}

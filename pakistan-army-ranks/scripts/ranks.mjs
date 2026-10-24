#!/usr/bin/env node

const RANKS = [
  // Enlisted — Army
  { branch: 'army', category: 'enlisted', nato: 'OR-1', rank: 'Sepoy', equivalent_navy: 'Sailor', equivalent_af: 'Airman', insignia: 'No insignia' },
  { branch: 'army', category: 'enlisted', nato: 'OR-2', rank: 'Lance Naik', equivalent_navy: 'Able Sailor', equivalent_af: 'Leading Aircraftman', insignia: 'One chevron' },
  { branch: 'army', category: 'enlisted', nato: 'OR-3', rank: 'Naik', equivalent_navy: 'Leading Sailor', equivalent_af: 'Corporal', insignia: 'Two chevrons' },
  { branch: 'army', category: 'enlisted', nato: 'OR-4', rank: 'Havildar', equivalent_navy: 'Petty Officer', equivalent_af: 'Sergeant', insignia: 'Three chevrons' },
  { branch: 'army', category: 'enlisted', nato: 'OR-6', rank: 'Naib Subedar', equivalent_navy: 'Chief Petty Officer', equivalent_af: 'Junior Warrant Officer', insignia: 'Three chevrons with a star' },
  { branch: 'army', category: 'enlisted', nato: 'OR-7', rank: 'Subedar', equivalent_navy: 'Master Chief Petty Officer', equivalent_af: 'Warrant Officer', insignia: 'Crescent and star in wreath' },
  { branch: 'army', category: 'enlisted', nato: 'OR-8', rank: 'Subedar Major', equivalent_navy: 'Fleet Chief Petty Officer', equivalent_af: 'Master Warrant Officer', insignia: 'National emblem in wreath' },

  // Officers — Army
  { branch: 'army', category: 'officer', nato: 'OF-1', rank: 'Second Lieutenant', equivalent_navy: 'Sub Lieutenant', equivalent_af: 'Pilot Officer', insignia: 'One pip (star)' },
  { branch: 'army', category: 'officer', nato: 'OF-1', rank: 'Lieutenant', equivalent_navy: 'Lieutenant', equivalent_af: 'Flying Officer', insignia: 'Two pips' },
  { branch: 'army', category: 'officer', nato: 'OF-2', rank: 'Captain', equivalent_navy: 'Lieutenant Commander', equivalent_af: 'Flight Lieutenant', insignia: 'Three pips' },
  { branch: 'army', category: 'officer', nato: 'OF-3', rank: 'Major', equivalent_navy: 'Commander', equivalent_af: 'Squadron Leader', insignia: 'Crown' },
  { branch: 'army', category: 'officer', nato: 'OF-4', rank: 'Lieutenant Colonel', equivalent_navy: 'Captain', equivalent_af: 'Wing Commander', insignia: 'Crown and one pip' },
  { branch: 'army', category: 'officer', nato: 'OF-5', rank: 'Colonel', equivalent_navy: 'Commodore', equivalent_af: 'Group Captain', insignia: 'Crown and two pips' },
  { branch: 'army', category: 'officer', nato: 'OF-6', rank: 'Brigadier', equivalent_navy: 'Commodore', equivalent_af: 'Air Commodore', insignia: 'Three pips and crown' },
  { branch: 'army', category: 'officer', nato: 'OF-7', rank: 'Major General', equivalent_navy: 'Rear Admiral', equivalent_af: 'Air Vice-Marshal', insignia: 'Crossed sword and baton, one star' },
  { branch: 'army', category: 'officer', nato: 'OF-8', rank: 'Lieutenant General', equivalent_navy: 'Vice Admiral', equivalent_af: 'Air Marshal', insignia: 'Crossed sword and baton, crescent' },
  { branch: 'army', category: 'officer', nato: 'OF-9', rank: 'General', equivalent_navy: 'Admiral', equivalent_af: 'Air Chief Marshal', insignia: 'Crossed sword and baton, crescent and star' },
  { branch: 'army', category: 'officer', nato: 'OF-10', rank: 'Field Marshal', equivalent_navy: 'Admiral of the Fleet', equivalent_af: 'Marshal of the Air Force', insignia: 'National emblem with crossed batons in wreath. Highest rank — awarded only once (Ayub Khan, 1965)' },

  // Navy
  { branch: 'navy', category: 'enlisted', nato: 'OR-1', rank: 'Sailor', insignia: 'No insignia' },
  { branch: 'navy', category: 'enlisted', nato: 'OR-2', rank: 'Able Sailor', insignia: 'One chevron' },
  { branch: 'navy', category: 'enlisted', nato: 'OR-3', rank: 'Leading Sailor', insignia: 'Anchor with one chevron' },
  { branch: 'navy', category: 'enlisted', nato: 'OR-4', rank: 'Petty Officer', insignia: 'Anchor with two chevrons' },
  { branch: 'navy', category: 'enlisted', nato: 'OR-6', rank: 'Chief Petty Officer', insignia: 'Anchor with three chevrons' },
  { branch: 'navy', category: 'enlisted', nato: 'OR-7', rank: 'Master Chief Petty Officer', insignia: 'Anchor with crown' },
  { branch: 'navy', category: 'enlisted', nato: 'OR-8', rank: 'Fleet Chief Petty Officer', insignia: 'Anchor with crown and star' },
  { branch: 'navy', category: 'officer', nato: 'OF-1', rank: 'Sub Lieutenant', insignia: 'One medium gold stripe' },
  { branch: 'navy', category: 'officer', nato: 'OF-1', rank: 'Lieutenant', insignia: 'Two medium gold stripes' },
  { branch: 'navy', category: 'officer', nato: 'OF-2', rank: 'Lieutenant Commander', insignia: 'Two medium and one thin gold stripe' },
  { branch: 'navy', category: 'officer', nato: 'OF-3', rank: 'Commander', insignia: 'Three medium gold stripes' },
  { branch: 'navy', category: 'officer', nato: 'OF-4', rank: 'Captain', insignia: 'Four medium gold stripes' },
  { branch: 'navy', category: 'officer', nato: 'OF-5', rank: 'Commodore', insignia: 'One broad gold stripe' },
  { branch: 'navy', category: 'officer', nato: 'OF-6', rank: 'Rear Admiral', insignia: 'One broad and one medium gold stripe' },
  { branch: 'navy', category: 'officer', nato: 'OF-7', rank: 'Vice Admiral', insignia: 'One broad and two medium gold stripes' },
  { branch: 'navy', category: 'officer', nato: 'OF-8', rank: 'Admiral', insignia: 'One broad and three medium gold stripes' },
  { branch: 'navy', category: 'officer', nato: 'OF-9', rank: 'Admiral of the Fleet', insignia: 'Highest naval rank — never awarded in Pakistan' },

  // Air Force
  { branch: 'airforce', category: 'enlisted', nato: 'OR-1', rank: 'Airman', insignia: 'No insignia' },
  { branch: 'airforce', category: 'enlisted', nato: 'OR-2', rank: 'Leading Aircraftman', insignia: 'One propeller blade' },
  { branch: 'airforce', category: 'enlisted', nato: 'OR-3', rank: 'Corporal', insignia: 'Two chevrons' },
  { branch: 'airforce', category: 'enlisted', nato: 'OR-4', rank: 'Sergeant', insignia: 'Three chevrons' },
  { branch: 'airforce', category: 'enlisted', nato: 'OR-6', rank: 'Junior Warrant Officer', insignia: 'Crown' },
  { branch: 'airforce', category: 'enlisted', nato: 'OR-7', rank: 'Warrant Officer', insignia: 'Crown with wreath' },
  { branch: 'airforce', category: 'enlisted', nato: 'OR-8', rank: 'Master Warrant Officer', insignia: 'National emblem' },
  { branch: 'airforce', category: 'officer', nato: 'OF-1', rank: 'Pilot Officer', insignia: 'One thin blue band' },
  { branch: 'airforce', category: 'officer', nato: 'OF-1', rank: 'Flying Officer', insignia: 'One medium blue band' },
  { branch: 'airforce', category: 'officer', nato: 'OF-2', rank: 'Flight Lieutenant', insignia: 'Two thin blue bands' },
  { branch: 'airforce', category: 'officer', nato: 'OF-3', rank: 'Squadron Leader', insignia: 'Two thin and one medium blue band' },
  { branch: 'airforce', category: 'officer', nato: 'OF-4', rank: 'Wing Commander', insignia: 'Three thin blue bands' },
  { branch: 'airforce', category: 'officer', nato: 'OF-5', rank: 'Group Captain', insignia: 'Four thin blue bands' },
  { branch: 'airforce', category: 'officer', nato: 'OF-6', rank: 'Air Commodore', insignia: 'One broad blue band' },
  { branch: 'airforce', category: 'officer', nato: 'OF-7', rank: 'Air Vice-Marshal', insignia: 'Crossed sword and baton, one star' },
  { branch: 'airforce', category: 'officer', nato: 'OF-8', rank: 'Air Marshal', insignia: 'Crossed sword and baton, crescent' },
  { branch: 'airforce', category: 'officer', nato: 'OF-9', rank: 'Air Chief Marshal', insignia: 'Crossed sword and baton, crescent and star' },
  { branch: 'airforce', category: 'officer', nato: 'OF-10', rank: 'Marshal of the Air Force', insignia: 'Highest air force rank — never awarded in Pakistan' },
];

function parseArgs(args) {
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) { result[key] = next; i++; }
      else result[key] = true;
    } else {
      result._.push(args[i]);
    }
  }
  return result;
}

const args = parseArgs(process.argv.slice(2));
const cmd = args._[0];

if (!cmd) {
  console.log(JSON.stringify({ error: 'Usage: ranks.mjs <branch|rank|search|branches|compare> [--flags]' }));
  process.exit(1);
}

if (cmd === 'branches') {
  console.log(JSON.stringify({ branches: ['army', 'navy', 'airforce'] }));
} else if (cmd === 'branch') {
  const name = (args.name || '').toLowerCase();
  if (!name) { console.log(JSON.stringify({ error: 'Usage: ranks.mjs branch --name <army|navy|airforce>' })); process.exit(1); }
  const ranks = RANKS.filter(r => r.branch === name);
  if (!ranks.length) { console.log(JSON.stringify({ error: `Unknown branch: ${name}. Use: army, navy, airforce` })); process.exit(1); }
  console.log(JSON.stringify({ branch: name, ranks, total: ranks.length }));
} else if (cmd === 'rank') {
  const name = (args.name || '').toLowerCase();
  if (!name) { console.log(JSON.stringify({ error: 'Usage: ranks.mjs rank --name <rank title>' })); process.exit(1); }
  const matches = RANKS.filter(r => r.rank.toLowerCase().includes(name));
  console.log(JSON.stringify({ query: name, results: matches, total: matches.length }));
} else if (cmd === 'search') {
  const q = (args.query || '').toLowerCase();
  if (!q) { console.log(JSON.stringify({ error: 'Usage: ranks.mjs search --query <keyword>' })); process.exit(1); }
  const results = RANKS.filter(r =>
    r.rank.toLowerCase().includes(q) ||
    r.nato.toLowerCase().includes(q) ||
    r.branch.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q) ||
    (r.insignia || '').toLowerCase().includes(q)
  );
  console.log(JSON.stringify({ query: q, results, total: results.length }));
} else if (cmd === 'compare') {
  const nato = (args.nato || '').toUpperCase();
  if (!nato) { console.log(JSON.stringify({ error: 'Usage: ranks.mjs compare --nato <OF-5|OR-4|etc>' })); process.exit(1); }
  const matches = RANKS.filter(r => r.nato === nato);
  console.log(JSON.stringify({ nato, equivalents: matches, total: matches.length }));
} else {
  console.log(JSON.stringify({ error: `Unknown command: ${cmd}. Use: branch, rank, search, branches, compare` }));
  process.exit(1);
}

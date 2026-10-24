#!/usr/bin/env node

const ANIMALS = [
  { name: 'goat', shares: 1, minAge: '1 year', meatYield: 0.45, description: 'Bakra/Bakri — 1 share per animal' },
  { name: 'sheep', shares: 1, minAge: '6 months (if well-grown)', meatYield: 0.45, description: 'Dumba — 1 share per animal' },
  { name: 'cow', shares: 7, minAge: '2 years', meatYield: 0.42, description: 'Gaye — up to 7 shares' },
  { name: 'buffalo', shares: 7, minAge: '2 years', meatYield: 0.40, description: 'Bhains — up to 7 shares' },
  { name: 'camel', shares: 7, minAge: '5 years', meatYield: 0.38, description: 'Oont — up to 7 shares' },
];

const PRICES = {
  Karachi:    { goat: [40000, 120000], sheep: [35000, 100000], cow: [150000, 500000], buffalo: [180000, 550000], camel: [200000, 600000] },
  Lahore:     { goat: [35000, 110000], sheep: [30000, 90000],  cow: [140000, 480000], buffalo: [170000, 520000], camel: [190000, 580000] },
  Islamabad:  { goat: [40000, 130000], sheep: [35000, 110000], cow: [160000, 520000], buffalo: [190000, 560000], camel: [210000, 620000] },
  Peshawar:   { goat: [30000, 100000], sheep: [25000, 85000],  cow: [130000, 450000], buffalo: [160000, 500000], camel: [180000, 550000] },
  Quetta:     { goat: [35000, 105000], sheep: [30000, 90000],  cow: [140000, 470000], buffalo: [170000, 510000], camel: [185000, 560000] },
  Multan:     { goat: [30000, 95000],  sheep: [25000, 80000],  cow: [120000, 420000], buffalo: [150000, 470000], camel: [170000, 530000] },
  Faisalabad: { goat: [32000, 100000], sheep: [28000, 85000],  cow: [130000, 440000], buffalo: [155000, 490000], camel: [175000, 540000] },
  Rawalpindi: { goat: [38000, 125000], sheep: [33000, 105000], cow: [155000, 510000], buffalo: [185000, 550000], camel: [205000, 610000] },
};

const RULES = [
  'Qurbani is Wajib (obligatory) on every sane adult Muslim who possesses wealth equal to or above the Nisab threshold on the days of Eid-ul-Adha (10th, 11th, 12th Dhul Hijjah).',
  'The animal must meet minimum age requirements: goat 1 year, sheep 6 months (if well-grown), cow/buffalo 2 years, camel 5 years.',
  'The animal must be healthy, free from defects — not blind, lame, very thin/sick, or with broken horns reaching the root.',
  'A goat or sheep counts as 1 share (for 1 person). A cow, buffalo, or camel can have up to 7 shares.',
  'All shareholders in a shared animal must have the intention of Qurbani or Aqiqah — not merely for meat.',
  'Slaughter must be done after the Eid prayer on 10th Dhul Hijjah, and before sunset on 12th Dhul Hijjah.',
  'Bismillah and Allahu Akbar must be recited at the time of slaughter.',
  'The knife must be sharp and the slaughter swift to minimize suffering.',
  'It is Mustahabb (recommended) for the person to slaughter their own animal if able.',
  'The meat should be distributed in three parts: 1/3 for self/family, 1/3 for relatives/friends, 1/3 for the poor and needy.',
  'Selling the meat, skin, or any part of the Qurbani animal is not permissible. The skin may be given to the poor or donated to a madrassa/charity.',
  'The butcher should not be paid from the meat or skin — pay separately.',
];

const DISTRIBUTION = {
  selfFamily: { fraction: '1/3', description: 'For yourself and your household' },
  relativesFriends: { fraction: '1/3', description: 'For relatives, friends, and neighbors' },
  poorNeedy: { fraction: '1/3', description: 'For the poor and needy (Sadaqah)' },
  note: 'This is the recommended Sunnah distribution. It is permissible to give all to the poor, but not to keep all for yourself.',
};

const CHECKLIST = [
  { item: 'Verify Qurbani is Wajib on you (possess Nisab-level wealth)', priority: 'required' },
  { item: 'Make intention (Niyyah) for Qurbani', priority: 'required' },
  { item: 'Select a healthy animal meeting age requirements', priority: 'required' },
  { item: 'If sharing (cow/buffalo/camel), ensure all shareholders have valid intention', priority: 'required' },
  { item: 'Arrange a sharp knife for slaughter', priority: 'required' },
  { item: 'Pray Eid Salah first — slaughter only after Eid prayer', priority: 'required' },
  { item: 'Recite Bismillah Allahu Akbar at time of slaughter', priority: 'required' },
  { item: 'Care for the animal before slaughter — feed, water, do not show knife', priority: 'sunnah' },
  { item: 'If possible, slaughter the animal yourself', priority: 'sunnah' },
  { item: 'Distribute meat in 3 parts: family, relatives, poor', priority: 'sunnah' },
  { item: 'Donate the skin to charity or madrassa (do not sell)', priority: 'recommended' },
  { item: 'Pay the butcher separately — not from the meat', priority: 'required' },
  { item: 'Arrange storage (freezer space) for your portion', priority: 'practical' },
  { item: 'Prepare plastic bags/containers for distribution', priority: 'practical' },
  { item: 'Coordinate with family for Eid day logistics', priority: 'practical' },
];

function parseArgs(args) {
  const flags = {};
  let cmd = args[0];
  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      flags[key] = args[i + 1] || true;
      i++;
    }
  }
  return { cmd, flags };
}

function calculate(flags) {
  const animalName = (flags.animal || 'goat').toLowerCase();
  const animal = ANIMALS.find(a => a.name === animalName);
  if (!animal) return { error: `Unknown animal: ${animalName}. Options: ${ANIMALS.map(a => a.name).join(', ')}` };

  const shares = parseInt(flags.shares || animal.shares, 10);
  if (shares < 1 || shares > animal.shares) {
    return { error: `${animal.name} supports 1-${animal.shares} shares, got ${shares}` };
  }

  const liveWeight = parseFloat(flags.weight || (animalName === 'goat' || animalName === 'sheep' ? 40 : 300));
  const totalMeat = Math.round(liveWeight * animal.meatYield);
  const perShare = Math.round(totalMeat / shares);

  const third = Math.round(perShare / 3);
  return {
    animal: animal.name,
    liveWeightKg: liveWeight,
    meatYieldPercent: `${(animal.meatYield * 100).toFixed(0)}%`,
    totalMeatKg: totalMeat,
    shares,
    perShareKg: perShare,
    distribution: {
      selfFamilyKg: third,
      relativesFriendsKg: third,
      poorNeedyKg: perShare - 2 * third,
    },
  };
}

function prices(flags) {
  const city = flags.city || 'all';
  if (city.toLowerCase() === 'all') {
    return { cities: Object.entries(PRICES).map(([name, animals]) => ({
      city: name,
      prices: Object.entries(animals).map(([animal, [min, max]]) => ({
        animal, minPKR: min, maxPKR: max,
      })),
    }))};
  }
  const match = Object.entries(PRICES).find(([k]) => k.toLowerCase() === city.toLowerCase());
  if (!match) return { error: `City not found: ${city}. Available: ${Object.keys(PRICES).join(', ')}` };
  return {
    city: match[0],
    prices: Object.entries(match[1]).map(([animal, [min, max]]) => ({
      animal, minPKR: min, maxPKR: max,
    })),
    note: 'Prices are approximate 2024 estimates. Actual prices vary by season, quality, and market conditions.',
  };
}

const { cmd, flags } = parseArgs(process.argv.slice(2));

switch (cmd) {
  case 'calculate':
    console.log(JSON.stringify(calculate(flags), null, 2));
    break;
  case 'animals':
    console.log(JSON.stringify({ animals: ANIMALS }, null, 2));
    break;
  case 'rules':
    console.log(JSON.stringify({ fiqh: 'Hanafi', rules: RULES }, null, 2));
    break;
  case 'prices':
    console.log(JSON.stringify(prices(flags), null, 2));
    break;
  case 'distribution':
    console.log(JSON.stringify(DISTRIBUTION, null, 2));
    break;
  case 'checklist':
    console.log(JSON.stringify({ checklist: CHECKLIST }, null, 2));
    break;
  default:
    console.error('Usage: qurbani.mjs <calculate|animals|rules|prices|distribution|checklist> [--flags]');
    process.exit(1);
}

#!/usr/bin/env node

const COUNTRIES = [
  // Visa-free
  { country: 'Qatar', region: 'middle-east', visaType: 'visa-free', maxStay: 30, notes: 'Visa-free for 30 days' },
  { country: 'Dominica', region: 'caribbean', visaType: 'visa-free', maxStay: 21, notes: '21 days' },
  { country: 'Haiti', region: 'caribbean', visaType: 'visa-free', maxStay: 90, notes: '3 months' },
  { country: 'Micronesia', region: 'oceania', visaType: 'visa-free', maxStay: 30, notes: '30 days' },
  { country: 'Vanuatu', region: 'oceania', visaType: 'visa-free', maxStay: 30, notes: '30 days' },
  { country: 'Trinidad and Tobago', region: 'caribbean', visaType: 'visa-free', maxStay: 90, notes: '90 days' },
  { country: 'Saint Vincent and the Grenadines', region: 'caribbean', visaType: 'visa-free', maxStay: 30, notes: '30 days' },
  { country: 'Cook Islands', region: 'oceania', visaType: 'visa-free', maxStay: 31, notes: '31 days' },
  { country: 'Niue', region: 'oceania', visaType: 'visa-free', maxStay: 30, notes: '30 days' },

  // Visa on arrival
  { country: 'Cambodia', region: 'southeast-asia', visaType: 'visa-on-arrival', maxStay: 30, cost: '$30', notes: 'Tourist visa on arrival' },
  { country: 'Comoros', region: 'africa', visaType: 'visa-on-arrival', maxStay: 45, notes: 'Visa on arrival at airport' },
  { country: 'Guinea-Bissau', region: 'africa', visaType: 'visa-on-arrival', maxStay: 90, notes: 'Visa on arrival' },
  { country: 'Laos', region: 'southeast-asia', visaType: 'visa-on-arrival', maxStay: 30, cost: '$20-42', notes: 'Visa on arrival at airports and some land borders' },
  { country: 'Madagascar', region: 'africa', visaType: 'visa-on-arrival', maxStay: 90, notes: 'Visa on arrival' },
  { country: 'Maldives', region: 'south-asia', visaType: 'visa-on-arrival', maxStay: 30, notes: 'Free visa on arrival for 30 days' },
  { country: 'Mauritania', region: 'africa', visaType: 'visa-on-arrival', maxStay: 30, notes: 'Visa on arrival at Nouakchott airport' },
  { country: 'Mozambique', region: 'africa', visaType: 'visa-on-arrival', maxStay: 30, cost: '$50', notes: 'Visa on arrival at main entry points' },
  { country: 'Nepal', region: 'south-asia', visaType: 'visa-on-arrival', maxStay: 90, cost: '$25-100', notes: 'Visa on arrival at Kathmandu airport' },
  { country: 'Palau', region: 'oceania', visaType: 'visa-on-arrival', maxStay: 30, notes: 'Visa on arrival' },
  { country: 'Rwanda', region: 'africa', visaType: 'visa-on-arrival', maxStay: 30, cost: '$30', notes: 'Visa on arrival at Kigali airport' },
  { country: 'Samoa', region: 'oceania', visaType: 'visa-on-arrival', maxStay: 60, notes: 'Entry permit on arrival' },
  { country: 'Seychelles', region: 'africa', visaType: 'visa-on-arrival', maxStay: 30, notes: 'Visitor permit on arrival' },
  { country: 'Somalia', region: 'africa', visaType: 'visa-on-arrival', maxStay: 30, cost: '$60', notes: 'Visa on arrival at Mogadishu airport' },
  { country: 'Timor-Leste', region: 'southeast-asia', visaType: 'visa-on-arrival', maxStay: 30, cost: '$30', notes: 'Visa on arrival' },
  { country: 'Togo', region: 'africa', visaType: 'visa-on-arrival', maxStay: 7, notes: 'Visa on arrival for 7 days' },
  { country: 'Tuvalu', region: 'oceania', visaType: 'visa-on-arrival', maxStay: 30, notes: 'Visa on arrival' },
  { country: 'Bolivia', region: 'south-america', visaType: 'visa-on-arrival', maxStay: 90, notes: 'Visa on arrival' },
  { country: 'Cape Verde', region: 'africa', visaType: 'visa-on-arrival', maxStay: 30, notes: 'Visa on arrival' },
  { country: 'Sierra Leone', region: 'africa', visaType: 'visa-on-arrival', maxStay: 30, notes: 'Visa on arrival' },
  { country: 'Tanzania', region: 'africa', visaType: 'visa-on-arrival', maxStay: 90, cost: '$50', notes: 'Visa on arrival or e-visa' },

  // E-visa
  { country: 'Turkey', region: 'middle-east', visaType: 'e-visa', maxStay: 30, cost: '$50+', processingTime: '1-3 days', notes: 'e-Visa via evisa.gov.tr' },
  { country: 'Malaysia', region: 'southeast-asia', visaType: 'e-visa', maxStay: 30, cost: '$25', processingTime: '2-5 days', notes: 'eNTRI or eVisa via windowmalaysia.my' },
  { country: 'Azerbaijan', region: 'central-asia', visaType: 'e-visa', maxStay: 30, cost: '$26', processingTime: '3 days', notes: 'ASAN e-Visa' },
  { country: 'Ethiopia', region: 'africa', visaType: 'e-visa', maxStay: 90, cost: '$82', processingTime: '1-3 days', notes: 'e-Visa via evisa.gov.et' },
  { country: 'Kenya', region: 'africa', visaType: 'e-visa', maxStay: 90, cost: '$51', processingTime: '2-7 days', notes: 'eTA via etakenya.go.ke' },
  { country: 'Sri Lanka', region: 'south-asia', visaType: 'e-visa', maxStay: 30, cost: '$50', processingTime: '1-3 days', notes: 'ETA via eta.gov.lk' },
  { country: 'Myanmar', region: 'southeast-asia', visaType: 'e-visa', maxStay: 28, cost: '$50', processingTime: '3-5 days', notes: 'e-Visa for tourism' },
  { country: 'Tajikistan', region: 'central-asia', visaType: 'e-visa', maxStay: 45, cost: '$50', processingTime: '2-5 days', notes: 'e-Visa' },
  { country: 'Uzbekistan', region: 'central-asia', visaType: 'e-visa', maxStay: 30, cost: '$20', processingTime: '2-3 days', notes: 'e-Visa via e-visa.gov.uz' },
  { country: 'Georgia', region: 'europe', visaType: 'e-visa', maxStay: 90, cost: '$20', processingTime: '5 days', notes: 'e-Visa via evisa.gov.ge' },
  { country: 'Iran', region: 'middle-east', visaType: 'e-visa', maxStay: 30, cost: '$40-80', processingTime: '7 days', notes: 'e-Visa via e_visa.mfa.ir' },
  { country: 'Oman', region: 'middle-east', visaType: 'e-visa', maxStay: 30, cost: '$20', processingTime: '1-3 days', notes: 'e-Visa via evisa.rop.gov.om' },
  { country: 'India', region: 'south-asia', visaType: 'e-visa', maxStay: 30, cost: '$25-80', processingTime: '3-5 days', notes: 'e-Visa for tourism (limited to specific airports)' },
  { country: 'Bahrain', region: 'middle-east', visaType: 'e-visa', maxStay: 14, cost: '$29', processingTime: '1-3 days', notes: 'e-Visa via evisa.gov.bh' },
  { country: 'Ivory Coast', region: 'africa', visaType: 'e-visa', maxStay: 90, cost: '$73', processingTime: '3-5 days', notes: 'e-Visa' },
  { country: 'Djibouti', region: 'africa', visaType: 'e-visa', maxStay: 31, cost: '$23', processingTime: '3 days', notes: 'e-Visa' },
  { country: 'Gabon', region: 'africa', visaType: 'e-visa', maxStay: 90, cost: '$82', processingTime: '5 days', notes: 'e-Visa' },
  { country: 'Indonesia', region: 'southeast-asia', visaType: 'e-visa', maxStay: 30, cost: '$35', processingTime: '1-3 days', notes: 'e-Visa on arrival or e-VOA via molina.imigrasi.go.id' },
  { country: 'Kyrgyzstan', region: 'central-asia', visaType: 'e-visa', maxStay: 30, cost: '$60-90', processingTime: '3-5 days', notes: 'e-Visa via evisa.e-gov.kg' },

  // Visa required — major destinations
  { country: 'United States', region: 'north-america', visaType: 'visa-required', notes: 'B1/B2 visa, interview required at US Embassy' },
  { country: 'United Kingdom', region: 'europe', visaType: 'visa-required', notes: 'Standard visitor visa, online application' },
  { country: 'Canada', region: 'north-america', visaType: 'visa-required', notes: 'Visitor visa, online or VAC application' },
  { country: 'Australia', region: 'oceania', visaType: 'visa-required', notes: 'Visitor visa (subclass 600)' },
  { country: 'Germany', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via German Embassy/VFS' },
  { country: 'France', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via French Embassy/VFS' },
  { country: 'Italy', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Italian Embassy/VFS' },
  { country: 'Spain', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Spanish Embassy/BLS' },
  { country: 'Netherlands', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Dutch Embassy/VFS' },
  { country: 'China', region: 'east-asia', visaType: 'visa-required', notes: 'Tourist visa via Chinese Embassy' },
  { country: 'Japan', region: 'east-asia', visaType: 'visa-required', notes: 'Tourist visa via Japanese Embassy' },
  { country: 'South Korea', region: 'east-asia', visaType: 'visa-required', notes: 'Tourist visa via Korean Embassy' },
  { country: 'Saudi Arabia', region: 'middle-east', visaType: 'visa-required', notes: 'Tourist visa or Umrah/Hajj visa. Tourist e-visa available for some nationalities.' },
  { country: 'UAE', region: 'middle-east', visaType: 'visa-required', notes: 'Visit visa — sponsor or hotel booking required, or transit visa' },
  { country: 'Kuwait', region: 'middle-east', visaType: 'visa-required', notes: 'Work/visit visa, sponsor required' },
  { country: 'Thailand', region: 'southeast-asia', visaType: 'visa-required', notes: 'Tourist visa via Thai Embassy' },
  { country: 'Singapore', region: 'southeast-asia', visaType: 'visa-required', notes: 'Tourist visa via Singapore Embassy/VFS' },
  { country: 'Russia', region: 'europe', visaType: 'visa-required', notes: 'Tourist visa via Russian Embassy' },
  { country: 'South Africa', region: 'africa', visaType: 'visa-required', notes: 'Tourist visa via SA Embassy/VFS' },
  { country: 'Egypt', region: 'africa', visaType: 'visa-required', notes: 'Tourist visa via Egyptian Embassy (may change to e-visa)' },
  { country: 'Brazil', region: 'south-america', visaType: 'visa-required', notes: 'Tourist visa via Brazilian Embassy' },
  { country: 'Nigeria', region: 'africa', visaType: 'visa-required', notes: 'Visa via Nigerian Embassy' },
  { country: 'New Zealand', region: 'oceania', visaType: 'visa-required', notes: 'Visitor visa via online application' },
  { country: 'Switzerland', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Swiss Embassy/VFS' },
  { country: 'Sweden', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Swedish Embassy/VFS' },
  { country: 'Norway', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Norwegian Embassy/VFS' },
  { country: 'Belgium', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Belgian Embassy/VFS' },
  { country: 'Greece', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Greek Embassy/VFS' },
  { country: 'Portugal', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Portuguese Embassy/VFS' },
  { country: 'Poland', region: 'europe', visaType: 'visa-required', notes: 'Schengen visa via Polish Embassy/VFS' },
  { country: 'Iraq', region: 'middle-east', visaType: 'visa-required', notes: 'Visa via Iraqi Embassy. Ziyarat visa for religious tourism.' },
  { country: 'Libya', region: 'africa', visaType: 'visa-required', notes: 'Visa required, limited tourism' },
  { country: 'Afghanistan', region: 'south-asia', visaType: 'visa-required', notes: 'Visa via Afghan Embassy (limited consular services)' },
  { country: 'Bangladesh', region: 'south-asia', visaType: 'visa-required', notes: 'Visa via Bangladesh Embassy' },
  { country: 'Jordan', region: 'middle-east', visaType: 'visa-required', notes: 'Visa on arrival was suspended — check current status with embassy' },
  { country: 'Lebanon', region: 'middle-east', visaType: 'visa-required', notes: 'Visa via Lebanese Embassy' },
  { country: 'Morocco', region: 'africa', visaType: 'visa-required', notes: 'Visa via Moroccan Embassy' },
  { country: 'Tunisia', region: 'africa', visaType: 'visa-required', notes: 'Visa via Tunisian Embassy' },
  { country: 'Mexico', region: 'north-america', visaType: 'visa-required', notes: 'Visa via Mexican Embassy' },
  { country: 'Argentina', region: 'south-america', visaType: 'visa-required', notes: 'Visa via Argentine Embassy' },
  { country: 'Vietnam', region: 'southeast-asia', visaType: 'visa-required', notes: 'e-Visa or visa via Vietnamese Embassy' },
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

function search(flags) {
  const q = (flags.country || '').toLowerCase();
  if (!q) return { error: 'Provide --country <name>' };
  const matches = COUNTRIES.filter(c => c.country.toLowerCase().includes(q));
  return { query: flags.country, results: matches, count: matches.length };
}

function list(flags) {
  const type = (flags.type || '').toLowerCase();
  const valid = ['visa-free', 'visa-on-arrival', 'e-visa', 'visa-required'];
  if (!type || !valid.includes(type)) {
    return { error: `Provide --type <${valid.join('|')}>` };
  }
  const matches = COUNTRIES.filter(c => c.visaType === type);
  return { type, countries: matches, count: matches.length };
}

function stats() {
  const types = {};
  for (const c of COUNTRIES) {
    types[c.visaType] = (types[c.visaType] || 0) + 1;
  }
  return { totalCountries: COUNTRIES.length, byType: types };
}

function region(flags) {
  const name = (flags.name || '').toLowerCase();
  const regions = [...new Set(COUNTRIES.map(c => c.region))].sort();
  if (!name) return { error: `Provide --name <region>. Available: ${regions.join(', ')}` };
  const matches = COUNTRIES.filter(c => c.region === name);
  if (!matches.length) return { error: `No countries found for region: ${name}. Available: ${regions.join(', ')}` };
  return { region: name, countries: matches, count: matches.length };
}

const { cmd, flags } = parseArgs(process.argv.slice(2));

switch (cmd) {
  case 'search':
    console.log(JSON.stringify(search(flags), null, 2));
    break;
  case 'list':
    console.log(JSON.stringify(list(flags), null, 2));
    break;
  case 'stats':
    console.log(JSON.stringify(stats(), null, 2));
    break;
  case 'region':
    console.log(JSON.stringify(region(flags), null, 2));
    break;
  default:
    console.error('Usage: visa.mjs <search|list|stats|region> [--flags]');
    process.exit(1);
}

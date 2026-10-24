#!/usr/bin/env node

// Reference rates per tola (PKR) — verify against current market before decisions
const GOLD_RATE_PER_TOLA = 245000; // ~PKR 245,000/tola (approximate mid-2026)
const SILVER_RATE_PER_TOLA = 3000;  // ~PKR 3,000/tola (approximate mid-2026)

const GOLD_NISAB_TOLA = 7.5;    // 87.48 grams
const SILVER_NISAB_TOLA = 52.5; // 612.36 grams
const ZAKAT_RATE = 0.025;       // 2.5%

const GRAMS_PER_TOLA = 11.664;

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

function calculate(flags) {
  const goldTola = parseFloat(flags.gold) || 0;
  const silverTola = parseFloat(flags.silver) || 0;
  const cash = parseFloat(flags.cash) || 0;
  const investments = parseFloat(flags.investments) || 0;
  const property = parseFloat(flags.property) || 0;
  const debts = parseFloat(flags.debts) || 0;

  const goldValue = goldTola * GOLD_RATE_PER_TOLA;
  const silverValue = silverTola * SILVER_RATE_PER_TOLA;

  const totalAssets = goldValue + silverValue + cash + investments + property;
  const netAssets = totalAssets - debts;

  const nisabGold = GOLD_NISAB_TOLA * GOLD_RATE_PER_TOLA;
  const nisabSilver = SILVER_NISAB_TOLA * SILVER_RATE_PER_TOLA;
  const nisabThreshold = Math.min(nisabGold, nisabSilver);

  const meetsNisab = netAssets >= nisabThreshold;
  const zakatDue = meetsNisab ? Math.round(netAssets * ZAKAT_RATE) : 0;

  console.log(JSON.stringify({
    breakdown: {
      gold: { tola: goldTola, valuePKR: goldValue },
      silver: { tola: silverTola, valuePKR: silverValue },
      cashPKR: cash,
      investmentsPKR: investments,
      propertyPKR: property,
      debtsPKR: debts,
    },
    totalAssetsPKR: totalAssets,
    totalDebtsPKR: debts,
    netAssetsPKR: netAssets,
    nisab: {
      goldThresholdPKR: nisabGold,
      silverThresholdPKR: nisabSilver,
      applicableThresholdPKR: nisabThreshold,
      method: 'silver (lower value, Hanafi)',
    },
    meetsNisab,
    zakatRate: '2.5%',
    zakatDuePKR: zakatDue,
    note: meetsNisab
      ? `Zakat of PKR ${zakatDue.toLocaleString()} is due on net assets of PKR ${netAssets.toLocaleString()}`
      : `Net assets (PKR ${netAssets.toLocaleString()}) are below nisab threshold (PKR ${nisabThreshold.toLocaleString()}). No zakat due.`,
    disclaimer: 'Reference rates used. Verify current gold/silver prices. Consult a scholar for complex cases.',
  }, null, 2));
}

function nisab() {
  const nisabGold = GOLD_NISAB_TOLA * GOLD_RATE_PER_TOLA;
  const nisabSilver = SILVER_NISAB_TOLA * SILVER_RATE_PER_TOLA;

  console.log(JSON.stringify({
    gold: {
      tola: GOLD_NISAB_TOLA,
      grams: +(GOLD_NISAB_TOLA * GRAMS_PER_TOLA).toFixed(2),
      valuePKR: nisabGold,
      ratePerTolaPKR: GOLD_RATE_PER_TOLA,
    },
    silver: {
      tola: SILVER_NISAB_TOLA,
      grams: +(SILVER_NISAB_TOLA * GRAMS_PER_TOLA).toFixed(2),
      valuePKR: nisabSilver,
      ratePerTolaPKR: SILVER_RATE_PER_TOLA,
    },
    applicableNisabPKR: Math.min(nisabGold, nisabSilver),
    method: 'The lower of gold or silver nisab is used (Hanafi fiqh, predominant in Pakistan)',
    disclaimer: 'Reference rates. Verify current market prices for accurate nisab.',
  }, null, 2));
}

function rates() {
  console.log(JSON.stringify({
    gold: {
      ratePerTolaPKR: GOLD_RATE_PER_TOLA,
      ratePerGramPKR: Math.round(GOLD_RATE_PER_TOLA / GRAMS_PER_TOLA),
      ratePerOuncePKR: Math.round(GOLD_RATE_PER_TOLA / GRAMS_PER_TOLA * 31.1035),
    },
    silver: {
      ratePerTolaPKR: SILVER_RATE_PER_TOLA,
      ratePerGramPKR: Math.round(SILVER_RATE_PER_TOLA / GRAMS_PER_TOLA),
      ratePerOuncePKR: Math.round(SILVER_RATE_PER_TOLA / GRAMS_PER_TOLA * 31.1035),
    },
    gramsPerTola: GRAMS_PER_TOLA,
    disclaimer: 'These are reference rates only. Always verify current market gold/silver prices for zakat calculations.',
  }, null, 2));
}

function usage() {
  console.error(`Usage: node scripts/zakat.mjs <command> [options]

Commands:
  calculate   Calculate zakat on your assets
  nisab       Show nisab thresholds
  rates       Show reference gold/silver rates

Calculate options:
  --gold <tola>          Gold in tola (default: 0)
  --silver <tola>        Silver in tola (default: 0)
  --cash <PKR>           Cash/savings in PKR (default: 0)
  --investments <PKR>    Investments in PKR (default: 0)
  --property <PKR>       Rental/investment property in PKR (default: 0)
  --debts <PKR>          Outstanding debts in PKR (default: 0)`);
  process.exit(1);
}

const [cmd, ...rest] = process.argv.slice(2);
const flags = parseArgs(rest);

switch (cmd) {
  case 'calculate': calculate(flags); break;
  case 'nisab':     nisab(); break;
  case 'rates':     rates(); break;
  default:          usage();
}

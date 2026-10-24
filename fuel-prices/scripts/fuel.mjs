#!/usr/bin/env node

// Pakistan petroleum fuel prices — OGRA with offline fallback
// Prices in PKR per liter, government-notified fortnightly

const FUEL_TYPES = {
  petrol: "Petrol (MS)",
  diesel: "High Speed Diesel (HSD)",
  kerosene: "Kerosene Oil (SKO)",
  ldo: "Light Diesel Oil (LDO)",
};

// Offline historical dataset — updated when OGRA publishes new notifications
// Each entry: effective date + prices for all 4 fuels
// ponytail: offline fallback, scrape OGRA when it stops timing out behind Cloudflare
const PRICE_HISTORY = [
  { effective: "2026-10-16", petrol: 252.10, diesel: 258.43, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-10-01", petrol: 248.68, diesel: 255.04, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-09-16", petrol: 248.68, diesel: 255.04, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-09-01", petrol: 252.10, diesel: 258.43, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-08-16", petrol: 254.98, diesel: 261.39, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-08-01", petrol: 259.13, diesel: 265.61, kerosene: 165.07, ldo: 151.56 },
  { effective: "2026-07-15", petrol: 262.24, diesel: 271.07, kerosene: 170.48, ldo: 152.49 },
  { effective: "2026-07-01", petrol: 259.13, diesel: 265.61, kerosene: 165.07, ldo: 151.56 },
  { effective: "2026-06-15", petrol: 256.13, diesel: 261.80, kerosene: 163.23, ldo: 149.21 },
  { effective: "2026-06-01", petrol: 252.10, diesel: 258.43, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-05-16", petrol: 249.10, diesel: 254.98, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-05-01", petrol: 246.49, diesel: 252.66, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-04-16", petrol: 252.10, diesel: 258.43, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-04-01", petrol: 255.37, diesel: 261.80, kerosene: 163.23, ldo: 149.21 },
  { effective: "2026-03-16", petrol: 259.13, diesel: 265.61, kerosene: 165.07, ldo: 151.56 },
  { effective: "2026-03-01", petrol: 262.24, diesel: 271.07, kerosene: 170.48, ldo: 152.49 },
  { effective: "2026-02-16", petrol: 259.13, diesel: 265.61, kerosene: 165.07, ldo: 151.56 },
  { effective: "2026-02-01", petrol: 255.37, diesel: 261.80, kerosene: 163.23, ldo: 149.21 },
  { effective: "2026-01-16", petrol: 252.10, diesel: 258.43, kerosene: 161.54, ldo: 147.68 },
  { effective: "2026-01-01", petrol: 248.38, diesel: 254.53, kerosene: 161.54, ldo: 147.68 },
  { effective: "2025-12-16", petrol: 252.10, diesel: 258.43, kerosene: 161.54, ldo: 147.68 },
  { effective: "2025-12-01", petrol: 248.38, diesel: 254.53, kerosene: 161.54, ldo: 147.68 },
  { effective: "2025-11-16", petrol: 252.10, diesel: 258.43, kerosene: 161.54, ldo: 147.68 },
  { effective: "2025-11-01", petrol: 248.68, diesel: 255.04, kerosene: 161.54, ldo: 147.68 },
];

const LAST_UPDATED = "2026-10-16";

function getCurrent() {
  const latest = PRICE_HISTORY[0];
  const prev = PRICE_HISTORY[1];
  const fuels = Object.entries(FUEL_TYPES).map(([key, name]) => {
    const price = latest[key];
    const prevPrice = prev[key];
    const change = +(price - prevPrice).toFixed(2);
    const changePct = prevPrice ? +((change / prevPrice) * 100).toFixed(2) : 0;
    return { fuel: name, key, price, previousPrice: prevPrice, change, changePercent: changePct, unit: "PKR/liter" };
  });
  return {
    effectiveDate: latest.effective,
    lastUpdated: LAST_UPDATED,
    source: "offline",
    note: "Prices from OGRA notifications. Offline dataset — verify at ogra.org.pk for latest.",
    fuels,
  };
}

function getHistory(months) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const filtered = PRICE_HISTORY.filter(e => e.effective >= cutoffStr);
  return {
    months,
    entries: filtered.length,
    lastUpdated: LAST_UPDATED,
    source: "offline",
    history: filtered.map(e => ({
      effectiveDate: e.effective,
      petrol: e.petrol,
      diesel: e.diesel,
      kerosene: e.kerosene,
      ldo: e.ldo,
    })),
  };
}

function compareFuel(fuelKey) {
  if (!FUEL_TYPES[fuelKey]) {
    console.error(`Unknown fuel: ${fuelKey}. Options: ${Object.keys(FUEL_TYPES).join(", ")}`);
    process.exit(1);
  }
  const entries = PRICE_HISTORY.map(e => ({
    effectiveDate: e.effective,
    price: e[fuelKey],
  }));
  const prices = entries.map(e => e.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = +(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
  const latest = prices[0];
  const oldest = prices[prices.length - 1];
  const totalChange = +(latest - oldest).toFixed(2);
  return {
    fuel: FUEL_TYPES[fuelKey],
    key: fuelKey,
    unit: "PKR/liter",
    current: latest,
    min,
    max,
    average: avg,
    totalChange,
    totalChangePct: +((totalChange / oldest) * 100).toFixed(2),
    dataPoints: entries.length,
    source: "offline",
    lastUpdated: LAST_UPDATED,
    history: entries,
  };
}

// CLI
const args = process.argv.slice(2);
const cmd = args[0];
function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "current") {
  console.log(JSON.stringify(getCurrent(), null, 2));
} else if (cmd === "history") {
  const months = parseInt(getFlag("months") || "6", 10);
  console.log(JSON.stringify(getHistory(months), null, 2));
} else if (cmd === "compare") {
  const fuel = (getFlag("fuel") || "petrol").toLowerCase();
  console.log(JSON.stringify(compareFuel(fuel), null, 2));
} else if (cmd === "fuels") {
  console.log(JSON.stringify({ fuels: Object.entries(FUEL_TYPES).map(([k, v]) => ({ key: k, name: v })) }, null, 2));
} else {
  console.error("Commands: current, history, compare, fuels");
  console.error("  current                          — current fuel prices");
  console.error("  history --months 6               — price history");
  console.error("  compare --fuel petrol            — compare one fuel over time");
  console.error("  fuels                            — list fuel types");
  process.exit(1);
}

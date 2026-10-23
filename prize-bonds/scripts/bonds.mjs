#!/usr/bin/env node

const BASE = "https://www.savings.gov.pk/latest";
const AJAX_URL = `${BASE}/ajaxData.php`;
const RESULTS_URL = `${BASE}/results.php`;

const DENOMS = {
  100:  { id: 1, name: "Rs. 100 Prize Bond", active: true },
  200:  { id: 2, name: "Rs. 200 Prize Bond", active: true },
  750:  { id: 3, name: "Rs. 750 Prize Bond", active: true },
  1500: { id: 4, name: "Rs. 1,500 Prize Bond", active: true },
  7500: { id: 5, name: "Rs. 7,500 Prize Bond", active: false },
  15000: { id: 6, name: "Rs. 15,000 Prize Bond", active: false },
  25000: { id: 7, name: "Rs. 25,000 Prize Bond", active: false },
  40000: { id: 8, name: "Rs. 40,000 Prize Bond", active: false },
  "40000p": { id: 9, name: "Rs. 40,000 Premium Prize Bond", active: true },
  "25000p": { id: 10, name: "Rs. 25,000 Premium Prize Bond", active: true },
};

function resolveDenom(input) {
  const key = String(input).toLowerCase().replace(/,/g, "").trim();
  if (DENOMS[key]) return { key, ...DENOMS[key] };
  for (const [k, v] of Object.entries(DENOMS)) {
    if (v.name.toLowerCase().includes(key)) return { key: k, ...v };
  }
  return null;
}

async function fetchDrawDates(denomId) {
  const res = await fetch(AJAX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id=${denomId}`,
  });
  if (!res.ok) throw new Error(`AJAX failed: HTTP ${res.status}`);
  const html = await res.text();
  const draws = [];
  const re = /<option\s+value="(\d+)">([^<]+)<\/option>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    draws.push({ id: m[1], date: m[2].trim() });
  }
  return draws;
}

function parseResults(html) {
  const focusMatch = html.match(/<div id="focus">([\s\S]*?)(?:<hr>|$)/);
  if (!focusMatch) return { found: false, message: "No results section in response" };

  const content = focusMatch[1];

  if (content.includes("OOPS") || content.includes("Try again")) {
    return { found: false, message: "No winning match found" };
  }

  const results = [];
  const rowRe = /<div class="divTableRow">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi;
  // ponytail: simpler cell extraction — divTableCell is always the same structure
  const cells = [...content.matchAll(/<div class="divTableCell">([\s\S]*?)<\/div>/gi)].map(
    m => m[1].replace(/<[^>]+>/g, "").trim()
  );

  if (cells.length < 6) return { found: false, message: "No winning match found" };

  // First 6 cells are headers, rest are data in groups of 6
  const headers = cells.slice(0, 6);
  for (let i = 6; i < cells.length; i += 6) {
    if (i + 5 >= cells.length) break;
    results.push({
      prize_category: cells[i],
      bond_number: cells[i + 1],
      prize_amount: cells[i + 2],
      draw_place: cells[i + 3],
      draw_number: cells[i + 4],
      draw_date: cells[i + 5],
    });
  }

  return { found: results.length > 0, results };
}

async function checkNumber(denomination, number, drawId = "all") {
  const denom = resolveDenom(denomination);
  if (!denom) throw new Error(`Unknown denomination: ${denomination}. Use 'denominations' command to list.`);

  const res = await fetch(RESULTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `country=${denom.id}&state=${drawId}&range_from=&range_to=&pb_number_list=${encodeURIComponent(number)}&btnsearch=Search`,
  });
  if (!res.ok) throw new Error(`Search failed: HTTP ${res.status}`);
  const html = await res.text();
  const parsed = parseResults(html);
  return {
    denomination: denom.name,
    bond_number: number,
    draw_scope: drawId === "all" ? "All draws" : `Draw #${drawId}`,
    ...parsed,
    source: "savings.gov.pk (Central Directorate of National Savings)",
  };
}

async function latestDraw(denomination) {
  const denom = resolveDenom(denomination);
  if (!denom) throw new Error(`Unknown denomination: ${denomination}`);

  const draws = await fetchDrawDates(denom.id);
  if (draws.length === 0) return { denomination: denom.name, message: "No draws found" };

  const latest = draws[0];
  // Fetch results for the latest draw — use range 000001 to 999999 won't work (too broad)
  // Instead, just return draw info. Users should use 'check' to look up specific numbers.
  return {
    denomination: denom.name,
    active: denom.active,
    latest_draw: { draw_id: latest.id, date: latest.date },
    total_draws_on_record: draws.length,
    recent_draws: draws.slice(0, 8),
    source: "savings.gov.pk",
  };
}

async function schedule() {
  const active = Object.entries(DENOMS).filter(([, v]) => v.active);
  const schedule = [];
  for (const [key, denom] of active) {
    const draws = await fetchDrawDates(denom.id);
    const latest = draws[0];
    schedule.push({
      denomination: denom.name,
      key,
      latest_draw_date: latest?.date || "Unknown",
      upcoming_draws: draws.slice(0, 4).map(d => d.date),
    });
  }
  return { schedule, source: "savings.gov.pk" };
}

function denominations() {
  const list = Object.entries(DENOMS).map(([key, v]) => ({
    key,
    name: v.name,
    active: v.active,
    api_id: v.id,
  }));
  return {
    active: list.filter(d => d.active),
    discontinued: list.filter(d => !d.active),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "help") {
    console.log(`Usage:
  bonds.mjs check --number <bond-number> --denomination <value> [--draw <draw-id>]
  bonds.mjs latest --denomination <value>
  bonds.mjs schedule
  bonds.mjs denominations`);
    return;
  }

  function getArg(flag) {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : null;
  }

  try {
    let result;
    switch (cmd) {
      case "check": {
        const number = getArg("--number");
        const denomination = getArg("--denomination");
        const draw = getArg("--draw") || "all";
        if (!number) throw new Error("--number required");
        if (!denomination) throw new Error("--denomination required");
        result = await checkNumber(denomination, number, draw);
        break;
      }
      case "latest": {
        const denomination = getArg("--denomination");
        if (!denomination) throw new Error("--denomination required");
        result = await latestDraw(denomination);
        break;
      }
      case "schedule":
        result = await schedule();
        break;
      case "denominations":
        result = denominations();
        break;
      default:
        console.error(`Unknown command: ${cmd}`);
        process.exit(1);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();

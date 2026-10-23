#!/usr/bin/env node

const BASE = "https://www.olx.com.pk";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

function extractListings(html) {
  const results = [];
  const seen = new Set();

  const re = /"externalID":"(\d+)","slug":"([^"]*)","title":"([^"]*)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const externalID = m[1];
    if (seen.has(externalID)) continue;
    seen.add(externalID);

    const after = html.slice(m.index, m.index + 3000);

    let price = null;
    const fvMatch = after.match(/"formattedExtraFields":\[\{"name":"Price"[^}]*"formattedValue":"([^"]+)"/);
    if (fvMatch) {
      price = `Rs. ${fvMatch[1]}`;
    } else {
      const priceMatch = after.match(/"price":(\d+)/);
      if (priceMatch && parseInt(priceMatch[1]) > 0) price = `Rs. ${parseInt(priceMatch[1]).toLocaleString()}`;
    }

    let city = null;
    const locMatch = after.match(/"location":\[.*?"level":2,"name":"([^"]+)"/);
    if (locMatch) city = locMatch[1];
    if (!city) {
      const loc2 = after.match(/"level":1,"name":"([^"]+)"/);
      if (loc2) city = loc2[1];
    }

    const slug = m[2];
    const url = `${BASE}/item/${slug}-ID${externalID}.html`;

    results.push({
      id: externalID,
      title: m[3],
      price,
      city,
      url,
    });
  }
  return results;
}

async function search(query, page = 1) {
  const slug = query.trim().replace(/\s+/g, "-");
  const url = `${BASE}/items/q-${slug}?page=${page}`;
  const r = await fetch(url, { headers: { "User-Agent": UA, "Accept": "text/html" } });
  if (!r.ok) throw new Error(`OLX HTTP ${r.status}`);
  const html = await r.text();
  const results = extractListings(html);
  return { query, page, count: results.length, results };
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const idx = args.indexOf(name);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : null;
}

if (cmd === "search") {
  const query = getFlag("--query") || getFlag("--q") || args.slice(1).filter(a => !a.startsWith("--")).join(" ");
  const page = parseInt(getFlag("--page") || "1", 10);
  if (!query) {
    console.error("Usage: olx.mjs search --query 'iphone 15' [--page 1]");
    process.exit(1);
  }
  search(query, page)
    .then(r => console.log(JSON.stringify(r, null, 2)))
    .catch(e => { console.error(e.message); process.exit(1); });
} else {
  console.error("Commands: search");
  console.error("  search --query 'iphone 15' [--page 1]   Search OLX Pakistan listings");
  process.exit(1);
}

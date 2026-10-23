#!/usr/bin/env node

const BASE = "https://www.pakwheels.com";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

async function search(query, page = 1) {
  const url = `${BASE}/used-cars/search/-/ct_${page}/?q=${encodeURIComponent(query)}`;
  const r = await fetch(url, { headers: { "User-Agent": UA, "Accept": "text/html" } });
  if (!r.ok) throw new Error(`PakWheels HTTP ${r.status}`);
  const html = await r.text();

  const results = [];
  const ldRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;

  function isType(t, name) {
    if (Array.isArray(t)) return t.includes(name);
    return t === name;
  }

  while ((match = ldRegex.exec(html)) !== null) {
    try {
      const ld = JSON.parse(match[1]);
      if (isType(ld["@type"], "Product") || isType(ld["@type"], "Car")) {
        const offers = ld.offers || {};
        results.push({
          name: ld.name,
          price: offers.price ? `PKR ${Number(offers.price).toLocaleString()}` : null,
          url: offers.url || null,
          brand: ld.brand?.name || ld.manufacturer || null,
          year: ld.modelDate || null,
          mileage: ld.mileageFromOdometer?.value ? `${ld.mileageFromOdometer.value} km` : null,
          fuelType: ld.fuelType || null,
          transmission: ld.vehicleTransmission || null,
          engine: ld.vehicleEngine?.engineDisplacement?.value || null,
          condition: ld.itemCondition?.replace("https://schema.org/", "").replace("http://schema.org/", "") || null,
          image: ld.image || null,
        });
      }
    } catch {}
  }

  if (results.length === 0) {
    const cardRegex = /<h3[^>]*class="[^"]*search-title[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
    const priceRegex = /class="[^"]*price-details[^"]*"[^>]*>([\s\S]*?)<\//;
    let cardMatch;
    while ((cardMatch = cardRegex.exec(html)) !== null) {
      const cardUrl = cardMatch[1];
      const cardName = cardMatch[2].replace(/<[^>]*>/g, "").trim();
      const priceMatch = html.slice(cardMatch.index, cardMatch.index + 2000).match(priceRegex);
      results.push({
        name: cardName,
        price: priceMatch ? priceMatch[1].replace(/<[^>]*>/g, "").trim() : null,
        url: cardUrl.startsWith("http") ? cardUrl : `${BASE}${cardUrl}`,
      });
    }
  }

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
    console.error("Usage: pakwheels.mjs search --query 'civic 2020' [--page 1]");
    process.exit(1);
  }
  search(query, page)
    .then(r => console.log(JSON.stringify(r, null, 2)))
    .catch(e => { console.error(e.message); process.exit(1); });
} else {
  console.error("Commands: search");
  console.error("  search --query 'civic 2020' [--page 1]   Search PakWheels used cars");
  process.exit(1);
}

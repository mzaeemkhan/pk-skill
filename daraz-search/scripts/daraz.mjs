#!/usr/bin/env node

const BASE = "https://www.daraz.pk/catalog/";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

async function search(query, page = 1) {
  const url = `${BASE}?ajax=true&isFirstRequest=true&page=${page}&q=${encodeURIComponent(query)}`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`Daraz HTTP ${r.status}`);
  const data = await r.json();
  const items = data.mods?.listItems || [];
  return {
    query,
    page,
    totalResults: data.mainInfo?.totalResults || items.length,
    results: items.map(i => ({
      name: i.name,
      price: i.price ? `Rs. ${i.price}` : null,
      originalPrice: i.originalPrice && i.originalPrice !== i.price ? `Rs. ${i.originalPrice}` : null,
      discount: i.discount || null,
      rating: i.ratingScore || null,
      reviews: i.review || null,
      seller: i.sellerName || null,
      location: i.location || null,
      url: i.itemUrl ? (i.itemUrl.startsWith("http") ? i.itemUrl : `https:${i.itemUrl}`) : null,
      image: i.image ? (i.image.startsWith("http") ? i.image : `https:${i.image}`) : null,
    })),
  };
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
    console.error("Usage: daraz.mjs search --query 'laptop' [--page 1]");
    process.exit(1);
  }
  search(query, page)
    .then(r => console.log(JSON.stringify(r, null, 2)))
    .catch(e => { console.error(e.message); process.exit(1); });
} else {
  console.error("Commands: search");
  console.error("  search --query 'iphone case' [--page 1]   Search Daraz.pk products");
  process.exit(1);
}

#!/usr/bin/env node

const CITIES = {
  lahore:      { slug: "Lahore",      id: 1 },
  karachi:     { slug: "Karachi",     id: 2 },
  islamabad:   { slug: "Islamabad",   id: 3 },
  multan:      { slug: "Multan",      id: 15 },
  faisalabad:  { slug: "Faisalabad",  id: 16 },
  peshawar:    { slug: "Peshawar",    id: 17 },
  quetta:      { slug: "Quetta",      id: 18 },
  bahawalpur:  { slug: "Bahawalpur",  id: 23 },
  hyderabad:   { slug: "Hyderabad",   id: 30 },
  rawalpindi:  { slug: "Rawalpindi",  id: 41 },
  gujranwala:  { slug: "Gujranwala",  id: 327 },
  abbottabad:  { slug: "Abbottabad",  id: 385 },
  mardan:      { slug: "Mardan",      id: 440 },
  sialkot:     { slug: "Sialkot",     id: 480 },
};

const PURPOSES = {
  buy:  "Homes",
  rent: "Rentals",
  plot: "Plots",
};

const BASE = "https://www.zameen.com";

function resolveCity(name) {
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  return CITIES[key] || null;
}

function buildUrl(city, purpose, page, filters) {
  const p = PURPOSES[purpose] || "Homes";
  let url = `${BASE}/${p}/${city.slug}-${city.id}-${page}.html`;
  const params = [];
  if (filters.priceMin) params.push(`price_min=${filters.priceMin}`);
  if (filters.priceMax) params.push(`price_max=${filters.priceMax}`);
  if (filters.bedrooms) params.push(`bedrooms=${filters.bedrooms}`);
  if (filters.areaMin) params.push(`area_min=${filters.areaMin}`);
  if (filters.areaMax) params.push(`area_max=${filters.areaMax}`);
  if (params.length) url += "?" + params.join("&");
  return url;
}

function getAdditionalProp(props, name) {
  if (!Array.isArray(props)) return null;
  const p = props.find(x => x.name === name);
  if (!p) return null;
  return typeof p.value === "object" ? p.value : p.value;
}

function parseListing(item) {
  const entity = item.mainEntity || {};
  const about = item.about || item.offers?.itemOffered || {};
  const offer = item.offers || {};
  const addr = entity.address || about.address || offer.availableAtOrFrom?.address || {};
  const floor = entity.floorSize || {};
  const addlProps = about.additionalProperty || entity.additionalProperty || [];

  const areaObj = getAdditionalProp(addlProps, "Area");
  const bedFromProps = getAdditionalProp(addlProps, "Bedrooms");
  const bathFromProps = getAdditionalProp(addlProps, "Bathrooms");

  const img = typeof item.image === "object" ? item.image.url : item.image;

  return {
    title: item.name || "",
    url: item.url || "",
    price: offer.price || null,
    currency: offer.priceCurrency || "PKR",
    type: entity.accommodationCategory || entity["@type"] || "",
    bedrooms: entity.numberOfBedrooms ?? bedFromProps ?? null,
    bathrooms: entity.numberOfBathroomsTotal ?? bathFromProps ?? null,
    area: floor.value ?? (areaObj?.value ?? null),
    areaUnit: floor.unitText || (areaObj?.unitText ?? ""),
    locality: addr.streetAddress || addr.addressLocality || "",
    city: addr.addressRegion || addr.addressLocality || "",
    seller: offer.seller?.name || "",
    image: img || "",
    description: (item.description || "").substring(0, 200),
  };
}

async function search(cityName, opts) {
  const city = resolveCity(cityName);
  if (!city) {
    console.log(JSON.stringify({ error: `Unknown city "${cityName}". Use 'cities' command for supported list.` }));
    process.exit(1);
  }

  const purpose = opts.purpose || "buy";
  const page = opts.page || 1;
  const url = buildUrl(city, purpose, page, opts);

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; pk-skill/1.0)" },
    redirect: "follow",
  });

  if (!res.ok) {
    console.log(JSON.stringify({ error: `Zameen.com returned ${res.status}`, url }));
    process.exit(1);
  }

  const html = await res.text();
  const re = /application\/ld\+json">(.*?)<\/script>/gs;
  const m = re.exec(html);
  if (!m) {
    console.log(JSON.stringify({ error: "No listing data found", url }));
    process.exit(1);
  }

  let data;
  try { data = JSON.parse(m[1]); } catch {
    console.log(JSON.stringify({ error: "Failed to parse listing data" }));
    process.exit(1);
  }

  const graph = data["@graph"]?.[0];
  const list = graph?.mainEntity;
  if (!list?.itemListElement) {
    console.log(JSON.stringify({ error: "No listings in response", url }));
    process.exit(1);
  }

  const listings = list.itemListElement
    .filter(e => e.item)
    .map(e => parseListing(e.item));

  console.log(JSON.stringify({
    city: city.slug,
    purpose,
    totalResults: list.numberOfItems || 0,
    page,
    resultsOnPage: listings.length,
    url,
    listings,
  }, null, 2));
}

function showCities() {
  console.log(JSON.stringify({
    cities: Object.entries(CITIES).map(([key, v]) => ({
      key,
      name: v.slug,
      id: v.id,
    })),
    note: "Major Pakistan cities. Sub-localities use the parent city.",
  }, null, 2));
}

function showHelp() {
  console.error("Commands:");
  console.error("  search --city <name> [--purpose buy|rent|plot] [--bedrooms N] [--price-min N] [--price-max N] [--page N]");
  console.error("  cities");
  process.exit(1);
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const idx = args.indexOf("--" + name);
  return idx > -1 && args[idx + 1] ? args[idx + 1] : null;
}

if (cmd === "cities") {
  showCities();
} else if (cmd === "search") {
  const cityName = getFlag("city");
  if (!cityName) { console.error("--city required"); process.exit(1); }
  search(cityName, {
    purpose: getFlag("purpose") || "buy",
    bedrooms: getFlag("bedrooms"),
    priceMin: getFlag("price-min"),
    priceMax: getFlag("price-max"),
    areaMin: getFlag("area-min"),
    areaMax: getFlag("area-max"),
    page: parseInt(getFlag("page") || "1"),
  }).catch(e => { console.error(e.message); process.exit(1); });
} else {
  showHelp();
}

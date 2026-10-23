#!/usr/bin/env node

const SOURCES = {
  dawn:    { name: "Dawn",              url: "https://www.dawn.com/feed" },
  geo:     { name: "Geo News",          url: "https://www.geo.tv/rss/1/0" },
  tribune: { name: "Express Tribune",   url: "https://tribune.com.pk/feed/home" },
  thenews: { name: "The News International", url: "https://www.thenews.com.pk/rss/1/1" },
  brecorder: { name: "Business Recorder", url: "https://www.brecorder.com/feeds/latest-news" },
};

function stripHtml(s) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ").trim();
}

function parseRss(xml) {
  const items = [];
  const itemRe = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const tag = (t) => {
      const r = block.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)<\\/${t}>`, "i"));
      return r ? stripHtml(r[1]) : "";
    };
    items.push({
      title: tag("title"),
      link: tag("link") || tag("guid"),
      pubDate: tag("pubDate"),
      description: tag("description").substring(0, 200),
    });
  }
  return items;
}

async function fetchSource(key) {
  const src = SOURCES[key];
  if (!src) throw new Error(`Unknown source: ${key}. Available: ${Object.keys(SOURCES).join(", ")}`);
  const res = await fetch(src.url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`${src.name} HTTP ${res.status}`);
  const xml = await res.text();
  return parseRss(xml).map(item => ({ ...item, source: src.name, sourceKey: key }));
}

async function headlines(limit = 20) {
  const results = await Promise.allSettled(
    Object.keys(SOURCES).map(k => fetchSource(k))
  );
  const all = [];
  const errors = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
    else errors.push(r.reason.message);
  }
  // ponytail: naive date sort, upgrade to proper date parsing if needed
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  console.log(JSON.stringify({ headlines: all.slice(0, limit), errors }, null, 2));
}

async function source(key, limit = 20) {
  const items = await fetchSource(key);
  console.log(JSON.stringify({ source: SOURCES[key].name, items: items.slice(0, limit) }, null, 2));
}

async function search(keyword, limit = 20) {
  const results = await Promise.allSettled(
    Object.keys(SOURCES).map(k => fetchSource(k))
  );
  const all = [];
  const kw = keyword.toLowerCase();
  for (const r of results) {
    if (r.status === "fulfilled") {
      all.push(...r.value.filter(item =>
        item.title.toLowerCase().includes(kw) ||
        item.description.toLowerCase().includes(kw)
      ));
    }
  }
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  console.log(JSON.stringify({ keyword, matches: all.length, results: all.slice(0, limit) }, null, 2));
}

function showSources() {
  console.log(JSON.stringify({
    sources: Object.entries(SOURCES).map(([k, v]) => ({ key: k, name: v.name, feed: v.url })),
  }, null, 2));
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
}

if (cmd === "headlines") {
  headlines(parseInt(getFlag("limit", "20"))).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "source") {
  const key = getFlag("name", args[1]);
  if (!key) { console.error("Usage: news.mjs source --name dawn"); process.exit(1); }
  source(key, parseInt(getFlag("limit", "20"))).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "search") {
  const kw = getFlag("keyword", args[1]);
  if (!kw) { console.error("Usage: news.mjs search --keyword politics"); process.exit(1); }
  search(kw, parseInt(getFlag("limit", "20"))).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "sources") {
  showSources();
} else {
  console.error("Commands: headlines, source, search, sources");
  process.exit(1);
}

#!/usr/bin/env node

const BASE = "https://www.ndma.gov.pk";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      args[key] = next && !next.startsWith("--") ? argv[++i] : true;
    }
  }
  return args;
}

async function html(path) {
  const res = await fetch(BASE + path, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`NDMA ${path} failed: HTTP ${res.status}`);
  return res.text();
}

const clean = (s) => s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#039;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").replace(/\bLatest\b\s*$/, "").trim();
const pdfUrl = (u) => u.replace(/([^:])\/\/+/g, "$1/");

// Advisory/sitrep listing pages render cards: <a href="...pdf" class="adv-card|sr-card"> ... __title ... __date ...
function cards(page, prefix, type) {
  const re = new RegExp(`<a href="([^"]+)"[^>]*class="${prefix}-card[^"]*">([\\s\\S]*?)</a>`, "g");
  return [...page.matchAll(re)].map(([, href, body]) => ({
    title: clean(body.match(new RegExp(`${prefix}-card__title">([\\s\\S]*?)</p>`))?.[1] ?? ""),
    date: clean(body.match(new RegExp(`${prefix}-card__date">([\\s\\S]*?)</p>`))?.[1] ?? "") || null,
    type,
    link: pdfUrl(href),
  }));
}

const SOURCES = {
  advisory: (p) => html(`/advisories?page=${p}`).then((h) => cards(h, "adv", "advisory")),
  sitrep: (p) => Promise.all([html(`/sitreps?page=${p}`), html(`/sitreps?cat_id=3&page=${p}`)])
    .then(([a, b]) => [...cards(a, "sr", "sitrep"), ...cards(b, "sr", "sitrep")]),
  alert: async () => {
    // Active alerts are embedded as JSON in the page; the list is empty when nothing is active.
    const raw = (await html("/alerts")).match(/var allAlerts\s*=\s*(\[[\s\S]*?\]);/)?.[1];
    if (raw === undefined) throw new Error("NDMA alerts data not found (page layout changed)");
    return JSON.parse(raw).map((a) => ({
      title: clean(a.title || a.name || ""),
      date: a.created_at || null,
      type: "alert",
      priority: a.priority || null,
      impact: a.impact || null,
      description: a.description ? clean(a.description) : null,
      link: a.href || a.image_url || `${BASE}/alerts`,
    }));
  },
};

async function collect(types, pages) {
  const jobs = types.flatMap((t) => (t === "alert" ? [SOURCES.alert()] : Array.from({ length: pages }, (_, i) => SOURCES[t](i + 1))));
  const items = (await Promise.all(jobs)).flat();
  const seen = new Set();
  return items
    .filter((x) => x.title && !seen.has(x.link) && seen.add(x.link))
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
}

const ALL = ["alert", "advisory", "sitrep"];

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = parseArgs(rest);
  const count = Number(a.count) || 10;
  let out;
  switch (cmd) {
    case "latest": {
      const items = await collect(ALL, 1);
      out = { count: Math.min(count, items.length), items: items.slice(0, count), activeAlerts: items.filter((x) => x.type === "alert").length };
      break;
    }
    case "search": {
      if (!a.query || a.query === true) throw new Error("--query required, e.g. --query flood");
      const q = String(a.query).toLowerCase();
      const pages = Number(a.pages) || 3;
      const items = (await collect(ALL, pages)).filter((x) => `${x.title} ${x.description ?? ""}`.toLowerCase().includes(q));
      out = { query: a.query, pagesScanned: pages, count: Math.min(count, items.length), items: items.slice(0, count) };
      break;
    }
    case "type": {
      const t = String(a.name ?? "").toLowerCase().replace(/s$/, "");
      if (!ALL.includes(t)) throw new Error("--name must be advisory, sitrep or alert");
      const items = await collect([t], Number(a.pages) || 1);
      out = { type: t, count: Math.min(count, items.length), items: items.slice(0, count) };
      if (!items.length && t === "alert") out.note = "No active NDMA alerts right now.";
      break;
    }
    default:
      console.error("Usage: ndma.mjs <latest|search|type> [--count 10] [--query flood] [--name advisory|sitrep|alert] [--pages N]");
      process.exit(1);
  }
  console.log(JSON.stringify({ ...out, source: "National Disaster Management Authority (ndma.gov.pk)" }, null, 2));
}

main().catch((e) => { console.error(e.message); process.exit(1); });

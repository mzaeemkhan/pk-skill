#!/usr/bin/env node

const PPSC_BASE = "https://ppsc.gop.pk";
const FPSC_API = "https://www.fpsc.gov.pk/api/results";

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

async function fetchPPSC(type) {
  const page = type === "final" ? "FinalResults.aspx" : "WrittenResults.aspx";
  const url = `${PPSC_BASE}/${page}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`PPSC HTTP ${res.status}`);
  const html = await res.text();

  const results = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const cells = [];
    const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let cm;
    while ((cm = tdRe.exec(m[1])) !== null) cells.push(stripHtml(cm[1]));
    if (cells.length >= 3 && cells[0].match(/\d{2}-\d{2}-\d{4}/)) {
      results.push({ date: cells[0], caseNo: cells[1], post: cells[2] });
    }
  }
  return results;
}

async function fetchFPSC() {
  const res = await fetch(FPSC_API, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`FPSC HTTP ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "FPSC API error");
  return data.data.map(r => ({
    id: r.id,
    category: r.category,
    title: stripHtml(r.title),
    date: r.uploadDate,
    expiry: r.expiryDate,
    isLatest: r.isLatestUpdate,
  }));
}

async function ppscResults(type) {
  const results = await fetchPPSC(type);
  console.log(JSON.stringify({
    source: "PPSC",
    type: type === "final" ? "Final Results" : "Written Results",
    count: results.length,
    results,
  }, null, 2));
}

async function fpscResults(category) {
  let results = await fetchFPSC();
  if (category) {
    const cat = category.toUpperCase().replace(/\s+/g, "_");
    results = results.filter(r => r.category.includes(cat));
  }
  const categories = [...new Set(results.map(r => r.category))];
  console.log(JSON.stringify({
    source: "FPSC",
    categories,
    count: results.length,
    results,
  }, null, 2));
}

async function searchResults(query) {
  const q = query.toLowerCase();
  const [ppscWritten, ppscFinal, fpsc] = await Promise.all([
    fetchPPSC("written").catch(() => []),
    fetchPPSC("final").catch(() => []),
    fetchFPSC().catch(() => []),
  ]);

  const ppscMatches = [...ppscWritten, ...ppscFinal]
    .filter(r => r.post.toLowerCase().includes(q) || r.caseNo.toLowerCase().includes(q));
  const fpscMatches = fpsc
    .filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));

  console.log(JSON.stringify({
    query,
    ppsc: { count: ppscMatches.length, results: ppscMatches },
    fpsc: { count: fpscMatches.length, results: fpscMatches },
  }, null, 2));
}

const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "ppsc") {
  const type = getFlag("type") || "written";
  ppscResults(type).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "fpsc") {
  const category = getFlag("category");
  fpscResults(category).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "search") {
  const query = getFlag("query") || args[1];
  if (!query) { console.error("Usage: results.mjs search --query <keyword>"); process.exit(1); }
  searchResults(query).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "services") {
  console.log(JSON.stringify({
    supported: [
      { key: "ppsc", name: "Punjab Public Service Commission", types: ["written", "final"], url: "ppsc.gop.pk" },
      { key: "fpsc", name: "Federal Public Service Commission", categories: ["GR_SHORT_LISTING", "GR_NOMINATIONS", "GR_MERIT_LIST"], url: "fpsc.gov.pk" },
    ],
    unsupported: [
      { name: "Board Exam Results (BISE)", reason: "Each board has separate portal, most require roll number + CAPTCHA" },
      { name: "NTS Results", reason: "Requires roll number login" },
    ],
  }, null, 2));
} else {
  console.error("Commands: ppsc, fpsc, search, services");
  console.error("  ppsc [--type written|final]");
  console.error("  fpsc [--category merit_list|short_listing|nominations]");
  console.error("  search --query <keyword>");
  console.error("  services");
  process.exit(1);
}

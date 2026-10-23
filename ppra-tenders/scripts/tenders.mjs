#!/usr/bin/env node

const BASE = "https://epms.ppra.gov.pk/public/tenders";

const CATEGORIES = ["Goods", "Works", "Consultancy Services", "Non-consultancy Services"];
const SECTORS = [
  "Ammunition", "Appliances", "Books/Journals/Manuals(Technical/Literature)",
  "Chemical Items", "Civil Goods", "Civil Works", "Clothing/Uniform",
  "Consumable Items", "Electrical Items", "Equipments", "Food Items",
  "Furniture/Fixture", "Health/Medicines", "Info and Comm Tech", "Leasing",
  "Petroleum, Oil & Lubricants", "Mechanical/Machinery", "Mining",
  "Miscellaneous", "Printing", "Repair/Maintenance", "Research & Development",
  "Services", "Stationery", "Vehicles", "Agricultural Products",
  "Petroleum Products", "Coal (Sub-Bituminous)", "LNG/LPG",
];
const TENDER_TYPES = ["Tender Notice", "Pre-qualification Notice (PQ)", "Request for Proposal (RFP)", "Expression of Interest (EOI)"];

function strip(s) {
  return s.replace(/<[^>]*>/g, "").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

function parseTenderRows(html) {
  const rows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
  const tenders = [];
  for (let i = 0; i < rows.length; i++) {
    const cells = (rows[i].match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || []).map(c => strip(c));
    if (cells.length >= 7 && /^\d+$/.test(cells[1])) {
      const linkMatch = rows[i].match(/href="\/public\/tenders\/tender-details\/([^"]+)"/i);
      const tenderNo = linkMatch ? linkMatch[1] : cells[2].split(/\s/)[0];
      let org = "", tenderType = "", category = "", sector = "", nature = "";
      if (i + 1 < rows.length) {
        const nextCells = (rows[i + 1].match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || []).map(c => strip(c));
        const info = nextCells.join(" ");
        const orgM = info.match(/Organization\s+([\s\S]*?)(?:Tender Type|$)/i);
        if (orgM) org = orgM[1].trim();
        const typeM = info.match(/Tender Type\s+([\s\S]*?)(?:Procurement Category|$)/i);
        if (typeM) tenderType = typeM[1].trim();
        const catM = info.match(/Procurement Category\s+([\s\S]*?)(?:Sector|$)/i);
        if (catM) category = catM[1].trim();
        const secM = info.match(/Sector\s+([\s\S]*?)(?:Tender Nature|$)/i);
        if (secM) sector = secM[1].trim();
        const natM = info.match(/Tender Nature\s+([\s\S]*?)(?:Advertised|$)/i);
        if (natM) nature = natM[1].trim();
      }
      tenders.push({
        sr: parseInt(cells[1]),
        tenderNo,
        details: cells[3].substring(0, 200),
        status: cells[4],
        advertised: cells[5],
        closing: cells[6],
        organization: org,
        tenderType,
        category,
        sector,
        nature,
      });
    }
  }
  return tenders;
}

function parsePagination(html) {
  const pages = html.match(/page=(\d+)/g) || [];
  const nums = [...new Set(pages.map(p => parseInt(p.replace("page=", ""))))];
  return { pages: nums.sort((a, b) => a - b), total: Math.max(...nums, 1) };
}

async function searchTenders(opts) {
  const params = new URLSearchParams();
  if (opts.keyword) params.set("keyword", opts.keyword);
  if (opts.category) params.set("procurement_category", opts.category);
  if (opts.sector) params.set("sector", opts.sector);
  if (opts.type) params.set("tender_type", opts.type);
  if (opts.nature) params.set("tender_nature", opts.nature);
  if (opts.city) params.set("city", opts.city);
  if (opts.page) params.set("page", opts.page);
  if (opts.closing) params.set("closing_date", opts.closing);

  const endpoint = opts.history ? "tenders-history" : "active-tenders";
  const qs = params.toString();
  const url = `${BASE}/${endpoint}${qs ? "?" + qs : ""}`;

  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`PPRA HTTP ${res.status}`);
  const html = await res.text();

  const tenders = parseTenderRows(html);
  const pagination = parsePagination(html);

  console.log(JSON.stringify({
    source: endpoint === "tenders-history" ? "history" : "active",
    filters: Object.fromEntries(params),
    count: tenders.length,
    pagination,
    tenders,
  }, null, 2));
}

async function tenderDetail(tenderNo) {
  const url = `${BASE}/tender-details/${encodeURIComponent(tenderNo)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`PPRA HTTP ${res.status}`);
  const html = await res.text();

  if (!html.includes("detail-card") && !html.includes("Tender Type")) {
    console.log(JSON.stringify({ error: "Tender not found", tenderNo }));
    return;
  }

  const re = /<(?:strong|b|label|span)[^>]*>\s*([\w\s\/&()]+?)\s*:?\s*<\/(?:strong|b|label|span)>\s*(?:<[^>]*>)*\s*([^<]+)/gi;
  const fields = {};
  let m;
  while ((m = re.exec(html)) !== null) {
    const label = strip(m[1]);
    const value = strip(m[2]);
    if (label && value && value.length > 1 && !fields[label]) {
      fields[label] = value;
    }
  }

  const detail = {
    tenderNo,
    organization: fields["Organization Name"] || "",
    office: fields["Office Name"] || "",
    address: fields["Office Address"] || "",
    city: fields["City"] || "",
    contactPerson: fields["Contact Person"] || "",
    contactEmail: fields["Contact Email"] || "",
    tenderType: fields["Tender Type"] || "",
    referenceNo: fields["Tender No / Reference No / Tender Inquiry No"] || "",
    category: fields["Procurement Category"] || "",
    procedure: fields["Procurement Procedure"] || "",
    sector: fields["Sector"] || "",
    nature: fields["Tender Nature"] || "",
    advertisedDate: fields["Advertisement Date"] || "",
    closingDate: fields["Closing Date & Time"] || fields["Closing Date"] || "",
    openingTime: fields["Opening Time"] || "",
    estimatedCost: fields["Estimated Cost"] || "",
    bidSecurity: fields["Bid Security"] || "",
    bidValidity: fields["Bid Validity"] || "",
    url,
  };

  for (const k of Object.keys(detail)) {
    if (!detail[k]) delete detail[k];
  }

  console.log(JSON.stringify(detail, null, 2));
}

function showFilters() {
  console.log(JSON.stringify({
    categories: CATEGORIES,
    sectors: SECTORS,
    tenderTypes: TENDER_TYPES,
    nature: ["Local", "International"],
    note: "Use these values with --category, --sector, --type, --nature flags",
  }, null, 2));
}

// CLI
const args = process.argv.slice(2);
const cmd = args[0];

function getFlag(name) {
  const i = args.indexOf("--" + name);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}

if (cmd === "search" || cmd === "active") {
  searchTenders({
    keyword: getFlag("keyword"),
    category: getFlag("category"),
    sector: getFlag("sector"),
    type: getFlag("type"),
    nature: getFlag("nature"),
    city: getFlag("city"),
    page: getFlag("page"),
    closing: getFlag("closing"),
    history: false,
  }).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "history") {
  searchTenders({
    keyword: getFlag("keyword"),
    category: getFlag("category"),
    sector: getFlag("sector"),
    type: getFlag("type"),
    nature: getFlag("nature"),
    city: getFlag("city"),
    page: getFlag("page"),
    closing: getFlag("closing"),
    history: true,
  }).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "detail") {
  const id = getFlag("id") || args[1];
  if (!id) {
    console.error("Usage: tenders.mjs detail --id <tender_number>");
    process.exit(1);
  }
  tenderDetail(id).catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "filters") {
  showFilters();
} else {
  console.error("Commands: search, history, detail, filters");
  console.error("  search --keyword <text> --category <cat> --sector <sec> --page <n>");
  console.error("  history --keyword <text> --category <cat>");
  console.error("  detail --id <tender_number>");
  console.error("  filters");
  process.exit(1);
}

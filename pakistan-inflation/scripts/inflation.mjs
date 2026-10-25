#!/usr/bin/env node

import { inflateRawSync } from "node:zlib";

const WP = "https://www.pbs.gov.pk/wp-json/wp/v2/posts";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

async function fetchOk(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res;
}

const strip = (html) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;|​/g, " ").replace(/&amp;/g, "&").replace(/&#8211;/g, "-").replace(/\s+/g, " ").trim();

const links = (html) => [...html.matchAll(/href="([^"]+\.(?:pdf|xlsx|docx))"[^>]*>([^<]*)</g)].map((m) => ({ label: m[2].trim(), url: m[1] }));

async function posts(search, titleMatch, count) {
  const url = `${WP}?search=${encodeURIComponent(search)}&per_page=${Math.max(count, 5)}&orderby=date&_fields=id,date,title,link,content`;
  const list = (await (await fetchOk(url)).json()).filter((p) => titleMatch.test(p.title.rendered));
  if (!list.length) throw new Error(`No PBS release found for "${search}"`);
  return list.slice(0, count);
}

// Minimal .docx reader: pull word/document.xml out of the zip via its central directory.
function docxText(buf) {
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) throw new Error("Not a zip/docx file");
  let off = buf.readUInt32LE(eocd + 16);
  for (let k = 0, n = buf.readUInt16LE(eocd + 10); k < n; k++) {
    const nl = buf.readUInt16LE(off + 28), el = buf.readUInt16LE(off + 30), cl = buf.readUInt16LE(off + 32);
    if (buf.toString("utf8", off + 46, off + 46 + nl) === "word/document.xml") {
      const method = buf.readUInt16LE(off + 10), size = buf.readUInt32LE(off + 20), lo = buf.readUInt32LE(off + 42);
      const start = lo + 30 + buf.readUInt16LE(lo + 26) + buf.readUInt16LE(lo + 28);
      const data = buf.subarray(start, start + size);
      const xml = (method === 8 ? inflateRawSync(data) : data).toString("utf8");
      return xml.replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/[ \t]+/g, " ");
    }
    off += 46 + nl + el + cl;
  }
  throw new Error("word/document.xml not found in docx");
}

// "increased by 10.3% ... as compared to an increase of 11.1% ... and 5.8% ..." -> signed numbers in order
function figures(paragraph) {
  const nums = [...paragraph.matchAll(/(increased|decreased|increase|decrease|of|and)\s+(?:by\s+|of\s+)?(?:an?\s+(increase|decrease)\s+of\s+)?(-?\d+(?:\.\d+)?)%/gi)].map((m) => {
    const verb = (m[2] || m[1]).toLowerCase();
    return verb.startsWith("decrease") ? -Number(m[3]) : Number(m[3]);
  });
  const [yoy, yoyPrevMonth, yoyYearAgo, mom, momPrevMonth, momYearAgo] = nums;
  return { yoy, mom, yoyPrevMonth, momPrevMonth, yoyYearAgo, momYearAgo };
}

function brief(text, prefix) {
  const line = text.split("\n").find((l) => l.trim().startsWith(prefix));
  return line ? figures(line) : null;
}

async function cpi() {
  const [post] = await posts("Monthly Inflation Report", /inflation report/i, 1);
  const html = post.content.rendered;
  const docs = links(html);
  const release = { title: strip(post.title.rendered), published: post.date.slice(0, 10), link: post.link, documents: docs };
  const docx = docs.find((d) => d.url.endsWith(".docx"));
  try {
    if (!docx) throw new Error("no .docx review attached to the release");
    const text = docxText(Buffer.from(await (await fetchOk(docx.url)).arrayBuffer()));
    const period = /year-on-year basis in ([A-Z][a-z]+ \d{4})/.exec(text)?.[1] ?? null;
    const general = brief(text, "CPI inflation General");
    if (!general?.yoy && general?.yoy !== 0) throw new Error("could not find 'Inflation in Brief' figures");
    return {
      period,
      unit: "% change",
      cpi: { national: general, urban: brief(text, "CPI inflation Urban"), rural: brief(text, "CPI inflation Rural") },
      spiMonthly: brief(text, "SPI inflation"),
      wpi: brief(text, "WPI inflation"),
      release,
    };
  } catch (e) {
    return { release, figures: null, note: `Figures not extracted (${e.message}); see the documents in the release.` };
  }
}

async function spi(weeks) {
  const list = await posts("Weekly Sensitive Price Indicator", /sensitive price indicator/i, weeks);
  const out = list.map((p) => {
    const text = strip(p.content.rendered);
    const m = /week ended on\s*([\d-]+)\s*is\s*([\d.]+)\s*with\s*(-?[\d.]+)\s*%/i.exec(text);
    return {
      weekEnded: m?.[1] ?? null,
      index: m ? Number(m[2]) : null,
      weeklyChangePct: m ? Number(m[3]) : null,
      base: "2015-16=100",
      published: p.date.slice(0, 10),
      link: p.link,
      documents: links(p.content.rendered),
      ...(m ? {} : { note: "Figures not found in release text; see documents." }),
    };
  });
  return weeks === 1 ? out[0] : { weeks: out };
}

const USAGE = `Usage:
  node scripts/inflation.mjs cpi
  node scripts/inflation.mjs spi [--weeks 4]
  node scripts/inflation.mjs latest`;

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const wi = rest.indexOf("--weeks");
  const weeks = wi >= 0 ? Number(rest[wi + 1]) : 1;
  if (!(weeks >= 1 && weeks <= 20)) throw new Error("--weeks must be 1-20");
  let out;
  if (cmd === "cpi") out = await cpi();
  else if (cmd === "spi") out = await spi(weeks);
  else if (cmd === "latest") {
    const [c, s] = await Promise.all([cpi(), spi(1)]);
    out = { cpi: c, spiWeekly: s };
  } else {
    console.error(USAGE);
    process.exit(1);
  }
  console.log(JSON.stringify({ source: "Pakistan Bureau of Statistics (pbs.gov.pk)", ...out }, null, 2));
}

main().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});

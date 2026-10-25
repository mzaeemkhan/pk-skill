#!/usr/bin/env node

const BASE = "https://njp.gov.pk";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const MAX_PAGES = 5;
const JOB_TYPE = /^(regular|contract|permanent|temporary|ad[- ]?hoc|daily wages?|deputation|internship|part[- ]time|full[- ]time|project|tenure|lump ?sum)/i;

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) args[argv[i].slice(2)] = argv[i + 1]?.startsWith("--") ? true : argv[++i] ?? true;
    else args._.push(argv[i]);
  }
  return args;
}

async function html(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`NJP HTTP ${res.status} for ${path}`);
  return res.text();
}

const text = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<head[\s\S]*?<\/head>|<nav[\s\S]*?<\/nav>|<footer[\s\S]*?<\/footer>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&#039;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function parseCards(page) {
  return page.split("<!-- Job Card -->").slice(1).map((card) => {
    const id = /\/jobs\/(\d+)"/.exec(card)?.[1];
    const title = text(/<h2[\s\S]*?<\/h2>/.exec(card)?.[0] ?? "");
    const employer = />\s*by\s+([^<]+)</.exec(card)?.[1];
    const badges = [...card.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)].map((m) => text(m[1])).filter(Boolean);
    const t = text(card);
    const vac = badges.find((b) => /vacanc/i.test(b));
    return {
      id: id ? Number(id) : null,
      title,
      department: employer ? text(employer) : null,
      // NJP badge order: [region/quota], job type, grade/scale, vacancies, ...
      ...(() => {
        const ti = badges.findIndex((b) => JOB_TYPE.test(b));
        const next = ti >= 0 ? badges[ti + 1] : null;
        return {
          jobType: ti >= 0 ? badges[ti] : null,
          grade: next && !/vacanc|experience|available|expire/i.test(next) ? next : null,
          quota: ti > 0 ? badges.slice(0, ti).join(", ") : null,
        };
      })(),
      vacancies: vac ? Number(/\d+/.exec(vac)?.[0]) : null,
      experience: /Experience:\s*(\d+\s*Years?\+?)/i.exec(t)?.[1] ?? null,
      lastDate: /(?:Expire[sd] On|Available till|Deadline:?|Last Date:?)\s*([A-Z][a-z]{2,8} \d{1,2}, \d{4}|\d{1,2} [A-Z][a-z]{2} \d{4})/i.exec(t)?.[1] ?? (/Last day to apply/i.test(t) ? "today" : null),
      link: id ? `${BASE}/jobs/${id}` : null,
    };
  }).filter((j) => j.id);
}

async function collect(pathFor, page, count) {
  const jobs = [];
  for (let p = page; p < page + MAX_PAGES && jobs.length < count; p++) {
    const found = parseCards(await html(pathFor(p)));
    jobs.push(...found);
    if (found.length < 20) break;
  }
  return jobs.slice(0, count);
}

async function detail(id) {
  if (!/^\d+$/.test(String(id))) throw new Error("--id must be a numeric NJP job id");
  const page = await html(`/jobs/${id}`);
  const t = text(page);
  const pick = (re) => re.exec(t)?.[1]?.trim() ?? null;
  const desc = pick(/Job Description (.+?)(?: Read More| Eligibility Criteria)/);
  return {
    id: Number(id),
    title: text(/<h1[\s\S]*?<\/h1>/.exec(page)?.[0] ?? "") || null,
    department: /About Employer<\/p>[\s\S]*?alt="([^"]+)"/.exec(page)?.[1]?.replace(/&amp;/g, "&") ?? null,
    grade: pick(/Grade (\S+) Job Type/),
    jobType: pick(/Job Type (\S+) Vacancies/),
    vacancies: Number(pick(/Vacancies:? (\d+)/)) || null,
    posted: pick(/Posted: (\d{1,2} [A-Z][a-z]{2} \d{4})/),
    lastDate: pick(/Deadline: (\d{1,2} [A-Z][a-z]{2} \d{4})/),
    experience: pick(/Experience: (\S+ years)/),
    ageLimit: pick(/Age Limit: (Max: \d+|Min: \d+(?: - Max: \d+)?)/),
    description: desc && desc.length > 2000 ? `${desc.slice(0, 2000)}…` : desc,
    link: `${BASE}/jobs/${id}`,
    howToApply: "Register/login on njp.gov.pk and apply from the job page.",
  };
}

const USAGE = `Usage:
  node scripts/jobs.mjs latest [--count 20] [--page 1]
  node scripts/jobs.mjs search --query "engineer" [--page 1] [--count 20]
  node scripts/jobs.mjs job --id 9821`;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];
  const count = Math.min(Number(args.count || 20), 100);
  const page = Math.max(Number(args.page || 1), 1);
  let out;
  if (cmd === "latest") {
    const jobs = await collect((p) => `/jobs/live?page=${p}`, page, count);
    out = { count: jobs.length, jobs };
  } else if (cmd === "search") {
    if (!args.query || args.query === true) throw new Error("search needs --query");
    const q = encodeURIComponent(args.query);
    const jobs = await collect((p) => `/jobs/search?q=${q}&page=${p}`, page, count);
    out = { query: args.query, count: jobs.length, jobs };
    if (args.city) out.note = "NJP listings have no location field, so --city is not supported. Check the job page for posting location.";
  } else if (cmd === "job") out = await detail(args.id);
  else {
    console.error(USAGE);
    process.exit(1);
  }
  console.log(JSON.stringify({ source: "National Job Portal (njp.gov.pk)", ...out }, null, 2));
}

main().catch((e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});

#!/usr/bin/env node

const SCOREBOARD_API = "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=cricket&lang=en&region=pk";
const LEAGUE_API = "https://site.web.api.espn.com/apis/site/v2/sports/cricket";

const PAK_KEYWORDS = ["pakistan", "pak ", "pak-", "psl", "pcb", "national t20", "quaid-e-azam"];

function isPakRelated(text) {
  const lower = (text || "").toLowerCase();
  return PAK_KEYWORDS.some(k => lower.includes(k));
}

function stripHtml(s) {
  return (s || "").replace(/<[^>]*>/g, "").trim();
}

async function fetchScoreboard() {
  const r = await fetch(SCOREBOARD_API, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) throw new Error(`ESPN API HTTP ${r.status}`);
  const d = await r.json();
  return d.sports?.[0]?.leagues || [];
}

function formatEvent(event, seriesName) {
  const teams = (event.competitors || []).map(c => ({
    name: stripHtml(c.name || c.abbreviation),
    abbreviation: c.abbreviation,
    score: c.score || "",
    winner: c.winner || false,
    logo: c.logo,
  }));

  return {
    id: event.id,
    name: event.name || event.shortName,
    series: seriesName,
    description: event.description || "",
    format: event.class?.generalClassCard || event.eventType || "",
    venue: event.location || "",
    date: event.date,
    status: event.fullStatus?.type?.state || event.status || "",
    statusDetail: event.fullStatus?.type?.description || event.summary || "",
    result: event.fullStatus?.longSummary || "",
    teams,
    link: event.link || "",
  };
}

async function live() {
  const leagues = await fetchScoreboard();
  const matches = [];
  for (const league of leagues) {
    for (const event of league.events || []) {
      const state = event.fullStatus?.type?.state || event.status;
      if (state === "in") {
        matches.push(formatEvent(event, league.name));
      }
    }
  }
  console.log(JSON.stringify({
    live: matches,
    count: matches.length,
    note: matches.length === 0 ? "No live cricket matches right now" : undefined,
  }, null, 2));
}

async function upcoming() {
  const leagues = await fetchScoreboard();
  const matches = [];
  for (const league of leagues) {
    for (const event of league.events || []) {
      const state = event.fullStatus?.type?.state || event.status;
      if (state === "pre") {
        matches.push(formatEvent(event, league.name));
      }
    }
  }
  matches.sort((a, b) => new Date(a.date) - new Date(b.date));
  console.log(JSON.stringify({
    upcoming: matches,
    count: matches.length,
  }, null, 2));
}

async function recent() {
  const leagues = await fetchScoreboard();
  const matches = [];
  for (const league of leagues) {
    for (const event of league.events || []) {
      const state = event.fullStatus?.type?.state || event.status;
      if (state === "post") {
        matches.push(formatEvent(event, league.name));
      }
    }
  }
  matches.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log(JSON.stringify({
    recent: matches,
    count: matches.length,
  }, null, 2));
}

async function pakistan() {
  const leagues = await fetchScoreboard();
  const matches = [];
  for (const league of leagues) {
    const seriesPak = isPakRelated(league.name);
    for (const event of league.events || []) {
      const teamNames = (event.competitors || []).map(c => c.name || c.abbreviation).join(" ");
      if (seriesPak || isPakRelated(teamNames) || isPakRelated(event.name || "")) {
        matches.push(formatEvent(event, league.name));
      }
    }
  }
  console.log(JSON.stringify({
    pakistan: matches,
    count: matches.length,
    note: matches.length === 0 ? "No current Pakistan matches in the ESPN schedule" : undefined,
  }, null, 2));
}

async function all() {
  const leagues = await fetchScoreboard();
  const series = leagues.map(league => ({
    id: league.id,
    name: league.name,
    shortName: league.shortAlternateName || league.abbreviation,
    matches: (league.events || []).map(e => formatEvent(e, league.name)),
  }));
  console.log(JSON.stringify({
    series,
    totalSeries: series.length,
    totalMatches: series.reduce((n, s) => n + s.matches.length, 0),
  }, null, 2));
}

async function series(leagueId) {
  if (!leagueId) {
    console.error("Usage: cricket.mjs series --id <league_id>");
    console.error("Get league IDs from the 'all' command");
    process.exit(1);
  }
  const r = await fetch(`${LEAGUE_API}/${leagueId}/scoreboard`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!r.ok) throw new Error(`ESPN API HTTP ${r.status}`);
  const d = await r.json();
  const leagueName = d.leagues?.[0]?.name || "Unknown";
  const events = (d.events || []).map(e => ({
    id: e.id,
    name: e.name || e.shortName,
    date: e.date,
    status: e.status?.type?.state || "",
    detail: e.status?.type?.description || "",
    venue: e.competitions?.[0]?.venue?.fullName || "",
    teams: (e.competitions?.[0]?.competitors || []).map(c => ({
      name: c.team?.name,
      score: c.score,
      winner: c.winner,
    })),
  }));
  console.log(JSON.stringify({ series: leagueName, leagueId, events }, null, 2));
}

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const PSL_LEAGUE = 8679;

async function getJson(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`HTTP ${r.status} from ${new URL(url).host}`);
  return r.json();
}

function tableRows(html, caption) {
  const i = html.indexOf(`<caption>${caption}`);
  if (i < 0) return [];
  const table = html.slice(i, html.indexOf("</table>", i));
  return [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(m =>
    [...m[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(c => stripHtml(c[1]).replace(/&nbsp;/g, " ").trim()));
}

const FORMAT_ROWS = { "Test matches": "Test", "One-Day Internationals": "ODI", "Twenty20 Internationals": "T20I" };
const COLUMN_NAMES = { batting: { 0: "ducks", 50: "fifties", 100: "hundreds" }, bowling: { 5: "fiveWickets", 10: "tenWickets" } };

async function careerSummary(id, type) {
  const url = `https://stats.cricinfo.com/ci/engine/player/${id}.html?class=11;template=results;type=${type}`;
  const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`Statsguru HTTP ${r.status}`);
  const [header, ...rows] = tableRows(await r.text(), "Career summary");
  if (!header) return {};
  const out = {};
  for (const row of rows) {
    const fmt = FORMAT_ROWS[row[0]];
    if (!fmt) continue;
    out[fmt] = Object.fromEntries(header.slice(1).map((h, k) => [COLUMN_NAMES[type][h] || h, row[k + 1]]).filter(([h, v]) => h && v !== "-"));
  }
  return out;
}

async function player(name) {
  if (!name) throw new Error('Usage: cricket.mjs player --name "Babar Azam"');
  const s = await getJson(`https://site.web.api.espn.com/apis/common/v3/search?query=${encodeURIComponent(name)}&type=player&sport=cricket&limit=5`);
  const hit = (s.items || []).find(i => i.type === "player");
  if (!hit) throw new Error(`No cricket player found for "${name}"`);
  const [profile, batting, bowling] = await Promise.all([
    getJson(`https://site.web.api.espn.com/apis/common/v3/sports/cricket/athletes/${hit.id}`).catch(() => null),
    careerSummary(hit.id, "batting"),
    careerSummary(hit.id, "bowling"),
  ]);
  const a = profile?.athlete || {};
  console.log(JSON.stringify({
    id: hit.id,
    name: a.fullName || hit.displayName,
    team: hit.teamRelationships?.[0]?.displayName || a.team?.displayName || "",
    role: a.position?.name || "",
    age: a.age,
    batStyle: a.batStyle?.[0]?.description || a.batStyle || undefined,
    bowlStyle: a.bowlStyle?.[0]?.description || a.bowlStyle || undefined,
    batting,
    bowling,
    note: "International career only (Test/ODI/T20I) from ESPNcricinfo Statsguru.",
    link: `https://stats.cricinfo.com/ci/engine/player/${hit.id}.html`,
  }, null, 2));
}

// Off-season the current year has no PSL data yet, so fall back to the previous season.
async function pslSeason(fetcher) {
  const year = new Date().getFullYear();
  for (const season of [year, year - 1]) {
    const data = await fetcher(season).catch(() => null);
    if (data && data.length) return { season, data };
  }
  throw new Error("No PSL data found for the current or previous season");
}

async function pslTable() {
  const { season, data } = await pslSeason(async season => {
    const d = await getJson(`https://site.web.api.espn.com/apis/v2/sports/cricket/${PSL_LEAGUE}/standings?season=${season}`);
    const st = d.children?.[0]?.standings;
    return st?.season === season ? st.entries : [];
  });
  const table = data.map(e => {
    const s = Object.fromEntries(e.stats.map(x => [x.name, x.displayValue]));
    return {
      rank: Number(s.rank), team: e.team.displayName, played: Number(s.matchesPlayed), won: Number(s.matchesWon),
      lost: Number(s.matchesLost), tied: Number(s.matchesTied), noResult: Number(s.noresult),
      points: Number(s.matchPoints), nrr: s.netrr, qualified: s.qualified === "Y",
    };
  }).sort((x, y) => x.rank - y.rank);
  console.log(JSON.stringify({ league: "Pakistan Super League", season, table }, null, 2));
}

async function pslMatches() {
  const { season, data } = await pslSeason(async season => {
    const d = await getJson(`${LEAGUE_API}/${PSL_LEAGUE}/scoreboard?season=${season}&limit=100`);
    return (d.events || []).filter(e => e.date?.startsWith(String(season)));
  });
  const matches = data.map(e => {
    const c = e.competitions?.[0] || {};
    return {
      id: e.id, name: e.name, stage: c.description || "", date: e.date,
      status: e.status?.type?.state || "", result: c.status?.summary || e.status?.type?.description || "",
      venue: c.venue?.fullName || "",
      teams: (c.competitors || []).map(t => ({ name: t.team?.displayName, score: t.score || "", winner: String(t.winner) === "true" })),
    };
  }).sort((x, y) => new Date(x.date) - new Date(y.date));
  console.log(JSON.stringify({ league: "Pakistan Super League", season, count: matches.length, matches }, null, 2));
}

const args = process.argv.slice(2);
const cmd = args[0];
const flag = name => { const i = args.indexOf(`--${name}`); return i > 0 ? args[i + 1] : undefined; };
const run = p => p.catch(e => { console.error(e.message); process.exit(1); });

if (cmd === "player") run(player(flag("name") || args.slice(1).join(" ")));
else if (cmd === "psl-table") run(pslTable());
else if (cmd === "psl-matches") run(pslMatches());
else

if (cmd === "live") {
  live().catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "upcoming") {
  upcoming().catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "recent") {
  recent().catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "pakistan") {
  pakistan().catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "all") {
  all().catch(e => { console.error(e.message); process.exit(1); });
} else if (cmd === "series") {
  let id = null;
  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--id" && args[i + 1]) { id = args[++i]; continue; }
    if (!id) id = args[i];
  }
  series(id).catch(e => { console.error(e.message); process.exit(1); });
} else {
  console.error("Commands: live, upcoming, recent, pakistan, all, series, player, psl-table, psl-matches");
  console.error('  player --name "Babar Azam" — international career stats by format');
  console.error("  psl-table               — PSL points table (latest season)");
  console.error("  psl-matches             — PSL fixtures/results (latest season)");
  console.error("  live                    — matches in progress");
  console.error("  upcoming                — scheduled matches");
  console.error("  recent                  — completed matches");
  console.error("  pakistan                 — Pakistan-related matches");
  console.error("  all                     — all current series and matches");
  console.error("  series --id <league_id> — matches in a specific series");
  process.exit(1);
}

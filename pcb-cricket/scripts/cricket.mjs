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

const args = process.argv.slice(2);
const cmd = args[0];

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
  console.error("Commands: live, upcoming, recent, pakistan, all, series");
  console.error("  live                    — matches in progress");
  console.error("  upcoming                — scheduled matches");
  console.error("  recent                  — completed matches");
  console.error("  pakistan                 — Pakistan-related matches");
  console.error("  all                     — all current series and matches");
  console.error("  series --id <league_id> — matches in a specific series");
  process.exit(1);
}

# PCB Cricket

## What this skill does

Provides live cricket scores, upcoming fixtures, recent results, and Pakistan-specific match filtering using ESPN's cricket scoreboard API. Covers all international and major domestic cricket worldwide.

## When to use

- "Is there a cricket match on right now?"
- "Pakistan cricket schedule"
- "What's the score in the Pakistan match?"
- "Upcoming cricket matches"
- "Recent cricket results"
- "PSL scores"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Live matches

```bash
node scripts/cricket.mjs live
```

Returns all matches currently in progress with teams, scores, and match status.

### 2. Pakistan matches

```bash
node scripts/cricket.mjs pakistan
```

Filters for Pakistan team matches, PSL, and Pakistan domestic tournaments. Includes live, upcoming, and recent.

### 3. Upcoming matches

```bash
node scripts/cricket.mjs upcoming
```

Scheduled matches sorted by date, nearest first.

### 4. Recent results

```bash
node scripts/cricket.mjs recent
```

Completed matches with results, most recent first.

### 5. All series

```bash
node scripts/cricket.mjs all
```

Lists all current series with their matches. Each series has an ID for drill-down.

### 6. Series detail

```bash
node scripts/cricket.mjs series --id <league_id>
```

Get league ID from the `all` command output.

## How it works internally

**ESPN scoreboard header API**: `site.web.api.espn.com/apis/v2/scoreboard/header?sport=cricket&lang=en&region=pk` — returns all current cricket series and matches globally in one call. Free, no auth, no rate limit for normal use.

For Pakistan filtering, matches team names and series names against keywords: pakistan, pak, psl, pcb, national t20, quaid-e-azam.

The `series` command uses ESPN's league-specific scoreboard: `site.web.api.espn.com/apis/site/v2/sports/cricket/<league_id>/scoreboard`.

## Sources and failure modes

- ESPN Cricinfo: comprehensive coverage of all ICC and domestic cricket. Data refreshes every few minutes during live matches.
- The header API returns matches from the current window (roughly ±7 days). Older matches and future fixtures beyond this window are not available.
- Pakistan filter uses keyword matching — may miss obscure club cricket not tagged with standard keywords.

## Hard boundaries

- No ball-by-ball commentary or wagon wheels
- No detailed scorecards (batting/bowling figures per player)
- No player statistics, rankings, or career records
- No historical match archive beyond current ESPN window
- Read-only — no ticket booking or fantasy cricket

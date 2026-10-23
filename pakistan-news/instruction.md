# Pakistan News

## What this skill does

Fetches latest headlines from 5 major Pakistani news sources via RSS feeds: Dawn, Geo News, Express Tribune, The News International, and Business Recorder.

Supports aggregated headlines, source-specific feeds, and keyword search. All data is read-only. No API key needed.

## When to use

- "What's the latest news in Pakistan?"
- "Show me Dawn headlines"
- "Any news about elections?"
- "Pakistan business news"

## Prerequisites

- Node.js 18+

## Workflow

### 1. Latest headlines

```bash
node scripts/news.mjs headlines --limit 10
```

Returns headlines from all 5 sources, sorted by date (newest first). Each item has title, link, pubDate, description snippet, and source name.

### 2. Source-specific headlines

```bash
node scripts/news.mjs source --name dawn --limit 10
```

Available sources: dawn, geo, tribune, thenews, brecorder.

### 3. Keyword search

```bash
node scripts/news.mjs search --keyword economy --limit 10
```

Searches title and description across all sources. Case-insensitive.

### 4. List sources

```bash
node scripts/news.mjs sources
```

## Output

All commands return JSON. Headlines include title, link, pubDate, description (first 200 chars), source name.

## Sources and failure modes

- RSS feeds are public and free. Individual sources may be temporarily unavailable.
- Errors from individual sources don't block others — partial results returned with error list.
- Description is a snippet, not full article text.

## Hard boundaries

- No full article content (RSS only)
- No Urdu language sources
- No paywall bypass
- Read-only

---
name: pakistan-news
description: "Latest Pakistan headlines from Dawn, Geo, Express Tribune, The News, Business Recorder via RSS; search by keyword. Use for \"Pakistan news today\", \"latest khabar\"."
license: MIT
metadata:
  category: news
  locale: en-PK
  phase: v1
---

# Pakistan News

Latest headlines from major Pakistani news sources via RSS.

## Commands

```bash
# Latest headlines from all sources
node scripts/news.mjs headlines [--limit 20]

# Headlines from a specific source
node scripts/news.mjs source --name dawn [--limit 20]

# Search headlines by keyword
node scripts/news.mjs search --keyword economy [--limit 20]

# List available sources
node scripts/news.mjs sources
```

## Sources

Dawn, Geo News, Express Tribune, The News International, Business Recorder.

## Prerequisites

- Node.js 18+

## Limitations

- RSS feeds only — no full article text
- English language feeds only
- No Urdu news sources (Cloudflare-blocked)

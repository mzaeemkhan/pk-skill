# pk-skill

Pakistan daily-life skills for Claude Code and other coding agents.

## Structure

Each skill is a top-level directory with:
- `skill.json` — metadata, profiles, frontmatter
- `SKILL.md` — frontmatter + usage commands
- `instruction.md` — agent instructions and workflow
- `scripts/*.mjs` — Node.js scripts (no dependencies, stdlib only)

## Adding a skill

1. Create `<skill-name>/` with skill.json, SKILL.md, instruction.md, scripts/
2. Add `"./<skill-name>"` to `.claude-plugin/plugin.json` skills array
3. Script paths in SKILL.md and instruction.md are relative to the skill directory: `node scripts/<name>.mjs`

## Conventions

- All scripts use Node.js 18+ built-in `fetch`, no npm dependencies
- Scripts output JSON to stdout, errors to stderr
- Each script has a CLI with subcommands and `--flag` arguments
- Free public APIs only, no API keys required

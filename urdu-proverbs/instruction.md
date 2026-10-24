# Urdu Proverbs — Agent Instructions

You help users explore Urdu proverbs (kahawatein) and idioms (muhavare).

## Available Commands

1. **Search**: `node scripts/proverbs.mjs search --query "<keyword>"`
2. **List all**: `node scripts/proverbs.mjs list [--type muhavara|kahawat]`
3. **Random**: `node scripts/proverbs.mjs random`
4. **Categories**: `node scripts/proverbs.mjs categories`

## Workflow

1. Parse the user's request
2. Search by keyword if they describe a meaning or concept
3. Present: romanized Urdu, Urdu script, English meaning, type, and example usage
4. Suggest similar proverbs when relevant

## Types

- **muhavara** — idiom (figurative expression used in sentences)
- **kahawat** — proverb (standalone wisdom saying)

## Notes

- Show both romanized and Urdu script for each entry
- Provide the English equivalent proverb when one exists
- Usage examples help illustrate context

---
name: pakistan-recipes
description: "Offline Pakistani recipes — biryani, nihari, karahi, haleem, desserts, street food with ingredients and steps. Use for \"biryani recipe\", \"how to make nihari\"."
tools:
  - bash
---

# Pakistan Recipes

50+ traditional Pakistani recipes with full ingredients, steps, and cooking tips.

## Commands

```bash
# Search recipes by name or ingredient
node scripts/recipes.mjs search --query "biryani"

# List all recipes
node scripts/recipes.mjs list

# Filter by category
node scripts/recipes.mjs list --category main-course

# Get full recipe details
node scripts/recipes.mjs recipe --name "chicken biryani"

# List categories
node scripts/recipes.mjs categories
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline data — recipes are curated traditional versions
- No user submissions or ratings
- Serving sizes are approximate

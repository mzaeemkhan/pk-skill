---
name: hajj-umrah-guide
description: "Offline Hajj and Umrah guide — rituals step by step, checklists, cost estimates, airlines, offices, duas, FAQ. Use for \"Umrah steps\", \"Hajj packing list\", \"Umrah cost\"."
tools:
  - bash
---

# Hajj & Umrah Guide

Comprehensive guide for Pakistani pilgrims — step-by-step rituals, packing checklists, estimated costs, airline routes, Saudi embassy/consulate offices, and essential duas.

## Commands

```bash
# Hajj step-by-step ritual guide
node scripts/hajjumrah.mjs hajj

# Umrah step-by-step ritual guide
node scripts/hajjumrah.mjs umrah

# Packing and preparation checklist
node scripts/hajjumrah.mjs checklist [--type hajj|umrah|both]

# Estimated costs breakdown
node scripts/hajjumrah.mjs costs [--type economy|standard|premium]

# Airlines with direct Pakistan-Saudi routes
node scripts/hajjumrah.mjs airlines

# Saudi embassy/consulate offices in Pakistan
node scripts/hajjumrah.mjs offices

# Essential duas for each ritual
node scripts/hajjumrah.mjs duas [--ritual tawaf|sai|arafat|mina|muzdalifah|ihram]

# Frequently asked questions
node scripts/hajjumrah.mjs faq
```

## Prerequisites

- Node.js 18+

## Limitations

- Offline curated reference — costs are estimates and change yearly
- Consult a qualified scholar for fiqh rulings specific to your situation

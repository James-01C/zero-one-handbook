---
name: content-formatting
description: 'Apply visual formatting patterns to handbook content files. Use when creating or editing markdown content files in the /content directory, when the user mentions formatting, callouts, visual components, or content type recipes.'
---

# Content Formatting

When working on content files in `/content/`, follow the formatting playbook.

## Quick Reference

See @CONTENT-FORMATTING-PLAYBOOK.md for full rules. Key points:

### Content Type Recipes

- **Guide** — TL;DR at top (3-5 bullets), Callouts for critical rules (max 3 per H2 section), DefList for 3+ named items, Flow for sequential processes, Dividers between major topics
- **SOP** — Callouts for warnings BEFORE the step they relate to, Dividers between procedures, Flow overview for multi-step procedures, no TL;DR on single-procedure pages
- **Reference** — Tables primary, minimal prose, one callout max, get to the data immediately
- **Policy** — TL;DR essential (the rules in shortest form), multiple Callouts appropriate (the page IS rules), Dividers between policy areas

### Visual Component Syntax

- Callout: `> [!RULE]`, `> [!TIP]`, `> [!INFO]`, `> [!TLDR]`
- Flow: `<Flow><Step color="blue">text</Step><Arrow label="action" /><Step color="green">text</Step></Flow>`
- DefList: `<DefList><Def term="name" color="red" example="example text">Description</Def></DefList>`
- CardGrid: `<CardGrid><Card title="..." href="..." icon="...">Description</Card></CardGrid>`

### Anti-Patterns

- No more than 3 callouts per H2 section
- No unbroken prose over ~300 words without a visual break
- Don't use DefList for fewer than 3 items
- Don't use Flow for fewer than 3 steps

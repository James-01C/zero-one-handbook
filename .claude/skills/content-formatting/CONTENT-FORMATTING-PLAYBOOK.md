# CONTENT-FORMATTING-PLAYBOOK.md

## What This Is

Rules for how each content type in the handbook uses visual components. Every page should feel intentionally designed for its job — not just "content with some callouts sprinkled in."

This playbook governs both **new content creation** and **rewrites of existing content**. It should eventually be added to CLAUDE.md so Claude Code follows these patterns automatically.

---

## The Six Visual Components (Reference)

| Component | Syntax | Purpose |
|-----------|--------|---------|
| **Callout** | `> [!RULE]` `> [!TIP]` `> [!INFO]` | Highlight rules, tips, context. Max 2-3 per visible section. |
| **TL;DR** | `> [!TLDR]` | 30-second summary. 3-5 bullet points. Top of page. |
| **Flow** | `<Flow>` `<Step>` `<Arrow>` | Process visualisation. Replaces ASCII arrows. |
| **DefList** | `<DefList>` `<Def>` | Colour-coded key-value definitions. Replaces walls of identical-weight text. |
| **Divider** | `---` (enhanced) | Breathing room between major sections. |
| **CardGrid** | `<CardGrid>` `<Card>` | Navigation cards. For hub pages linking to sub-pages. |

---

## Content Type Recipes

### 1. Guide

**The reader's question:** "How does this thing work here, and what do I need to know?"

**The job:** Teach a concept or system. The reader might skim first, then come back to read sections they need. They won't read top-to-bottom in one sitting.

**Required components:**
- **TL;DR** at the very top — 3-5 key takeaways that answer "what if I only read this box and nothing else?" These should be standalone facts, not teasers.
- **Callouts** for any rule that causes real problems if ignored (`> [!RULE]`). Limit: max 3 per major section. If everything is important, nothing is.
- **Dividers** between major topic shifts — guides often cover different sub-topics (e.g. branching model vs commit format). Dividers create visual chapters.

**Strongly recommended:**
- **DefList** whenever describing 3+ named things that differ from each other (branch types, status types, component types). If you find yourself writing `**term** — description` three or more times in a row, use DefList.
- **Flow** for any process with 3+ sequential steps. If you catch yourself writing `A → B → C` in a code block or prose, replace it.

**Optional:**
- **CardGrid** — only if the guide is a hub page linking to sub-pages.

**Anti-patterns:**
- ❌ Callout on something merely informational. Reserve for genuine gotchas and critical rules.
- ❌ TL;DR longer than 5 bullets. If you can't summarise in 5, the page might need splitting.
- ❌ Long unbroken prose (>300 words without a heading, callout, table, code block, or component).
- ❌ Multiple consecutive tables with no prose or visual relief between them.

**Page structure pattern:**
```
TL;DR box (3-5 bullets)
---
## Section 1 heading
Prose introduction (2-3 sentences)
DefList / Flow / table (the structured content)
> [!RULE] if there's a critical rule in this section
---
## Section 2 heading
... repeat pattern ...
---
## Connection points / Related pages
```

---

### 2. SOP (Standard Operating Procedure)

**The reader's question:** "I need to do X right now. What are the exact steps?"

**The job:** Give precise, ordered instructions the reader follows while doing the task. They're reading and doing simultaneously — probably with a terminal open.

**Required components:**
- **Callouts** for warnings and prerequisites. Place `> [!RULE]` BEFORE the step it relates to, not after. The reader needs to see the warning before they act.
- **Dividers** between each procedure if the page contains multiple SOPs.

**Strongly recommended:**
- **TL;DR** only if the page contains multiple procedures — summarise which procedure to use when. Single-procedure pages skip TL;DR (the reader already knows what they're doing).
- **Flow** at the top of multi-step procedures as a visual overview before detailed steps.

**Optional:**
- **DefList** — rarely needed. If you're defining terms, link to the relevant Guide instead.
- **CardGrid** — almost never.

**Anti-patterns:**
- ❌ Explanatory prose inside steps. Steps = commands + expected outcomes. Explanations go in `> [!INFO]` callouts.
- ❌ Steps that contain decisions. If a step requires a choice, use a brief note or link to a flowchart.
- ❌ Mixing procedures without clear separation. Each procedure gets its own heading and divider.
- ❌ More than ~10 steps in a single procedure. Split into sub-procedures or phases.

**Page structure pattern:**
```
## Procedure Name
> [!INFO] When to use this procedure (one sentence)
> [!RULE] Prerequisites or warnings (if any)

<Flow> (optional visual overview)

### Steps
1. Step with `code command`
2. Step with expected outcome
3. ...

> [!TIP] Common variation or shortcut (if any)
---
## Next Procedure
... repeat ...
```

---

### 3. Reference

**The reader's question:** "What's the exact value / format / syntax for X?"

**The job:** Lookup. The reader knows what they're looking for. Speed is everything — answer in under 10 seconds.

**Required components:**
- None mandatory beyond the content itself. Reference pages are table-heavy and prose-light by design.

**Strongly recommended:**
- **DefList** when listing items with name + description + optional example (branch naming patterns, commit prefixes, tag formats).

**Optional:**
- **TL;DR** — only if covering multiple topics. Tells the reader what sections exist.
- **Callouts** — one max. Reference pages are data, not commentary.
- **Flow** — only if a process is embedded in the reference.

**Anti-patterns:**
- ❌ Prose explanations of things that should be in a table.
- ❌ Multiple callouts. The reader is here to look something up, not to be taught.
- ❌ Long introductory paragraphs. Get to the data immediately.
- ❌ Tables with more than 5 columns. Split into multiple focused tables.

**Page structure pattern:**
```
Brief intro (1-2 sentences max)

## Topic 1
Table or DefList

## Topic 2
Table or DefList
```

---

### 4. Policy

**The reader's question:** "What are the rules, and why do they exist?"

**The job:** State rules clearly and explain reasoning. The reader needs to understand both what to do AND why, because policies require judgment.

**Required components:**
- **TL;DR** at the top — rules in their shortest form. If someone reads nothing else, they should know the rules.
- **Callouts** — `> [!RULE]` for each concrete rule. Policies are the ONE content type where multiple callouts per section are appropriate, because the page IS rules.

**Strongly recommended:**
- **Dividers** between major policy areas.
- **DefList** if the policy defines categories or levels (e.g. communication channels and their response times).

**Optional:**
- **Flow** — if the policy involves a process (e.g. escalation path).
- **CardGrid** — almost never.

**Anti-patterns:**
- ❌ Rules buried in prose. Every rule should be in the TL;DR, a callout, or a clearly formatted list.
- ❌ Rules without reasoning. Each rule should have a brief "why."
- ❌ Overly legalistic tone. State rules plainly.

**Page structure pattern:**
```
> [!TLDR]
> - Rule 1
> - Rule 2
> - Rule 3
---
## Area 1
Context paragraph (why this area needs rules)
> [!RULE] The specific rule
Explanation of edge cases or judgment needed
---
## Area 2
... repeat ...
```

---

## Cross-Cutting Rules

These apply to ALL content types:

**Spacing & structure:**
- No prose section should exceed ~300 words without a visual break (heading, callout, table, code block, divider, or component).
- Every page over 1500 words should be evaluated for splitting into hub + sub-pages.
- H2 = major sections. H3 = sub-sections. Don't use H4+ — if you need that depth, the section should be its own page.

**Callout discipline:**
- Max 3 callouts per H2 section.
- `> [!RULE]` = "this will cause problems if you get it wrong" (red)
- `> [!TIP]` = "this will save you time" (amber)
- `> [!INFO]` = "here's why this works this way" (blue)
- If you're using callouts for everything, you're using them for nothing.

**Tables vs DefList:**
- **Tables** when data has consistent columns (status → description → transition rules).
- **DefList** when items have a name + variable-length description + optional attributes.
- Neither for fewer than 3 items — just use prose.

**Flow diagrams:**
- Only for 3+ sequential steps.
- Max 6 steps per Flow. More than that needs a different approach.
- Always include arrow labels if the transition type matters (squash, merge, deploy, etc.).

**Progressive disclosure:**
- Lead with the rule/summary, detail follows.
- If a section is >500 words of reference material, consider: should this be a sub-page?
- Hub page pattern: summary + CardGrid linking to detail pages.

---

## Page Audit Queue

Pages to apply this playbook to, in priority order:

| Page | Type | Status | Key Changes Expected |
|------|------|--------|---------------------|
| How We Use GitHub | Guide | 🔨 Spec written | TL;DR, DefList for branches, Flow for branch flow, Callouts, Dividers |
| How We Use Jira | Guide | 📋 Queued | TL;DR, DefList for statuses/components, Flow for ticket lifecycle, Callouts. Possibly hub + sub-pages (longest page). |
| Git Procedures | SOP | 📋 Queued | Flow overview per procedure, Callouts for warnings, Dividers between procedures |
| Git Quick Reference | Reference | 📋 Queued | Likely minimal — already table-heavy. Maybe DefList for branch naming. |
| How We Work | Guide | 📋 Queued | TL;DR, audit for callout/divider opportunities |
| How We Use Slack | Guide | 🆕 Write from scratch using Guide recipe |
| Communication Norms | Policy | 🆕 Write from scratch using Policy recipe |
| Release Checklist | Reference | 🆕 Write from scratch using Reference recipe |
| How Ideas Become Features | Guide | 🆕 Write from scratch — Flow diagrams central |

---

## Applying This Playbook

### For new content
1. Set the content type in frontmatter
2. Follow the recipe for that type
3. Check against anti-patterns before committing

### For rewriting existing content
1. Read the current page
2. Map each section to the recipe — what components should it use?
3. Write a page-specific rewrite spec
4. Execute the rewrite via Claude Code

### For CLAUDE.md integration
Add a condensed version under a "Content Formatting" section in CLAUDE.md. Key rules only — reference this full playbook for detail.

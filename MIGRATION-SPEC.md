# Handbook App — Phase 3 Migration Spec

**Date:** 2026-03-02
**Goal:** Prepare the handbook app for first team presentation (2026-03-03). Replace all sample content with real dev-team-facing content. Add interactive system visuals. Add LLM chat for handbook Q&A. Confirm public Vercel access.

**Audience:** Development team (6-7 engineers) seeing the new GitHub, Jira, and Slack setup for the first time. Everything should be immediately useful for daily work.

---

## 1. Section Restructure

Remove all existing sample content. Replace with three focused sections plus a chat feature.

### New Section Structure

```
content/
  getting-started/
    _section.json          → "Getting Started" section config
    how-we-work.md         → Guide: overview of platforms, daily loop, where things live
  github/
    _section.json          → "GitHub" section config
    how-we-use-github.md   → Guide: full GitHub guide
    git-quick-reference.md → Reference: cheat sheet
    git-procedures.md      → SOP: five Git procedures
  jira/
    _section.json          → "Jira" section config
    how-we-use-jira.md     → Guide: full Jira guide
```

### Section Configs

**getting-started/_section.json:**
```json
{
  "title": "Getting Started",
  "description": "How our dev workflow fits together — the platforms, the daily loop, and where everything lives.",
  "icon": "Compass",
  "order": 1
}
```

**github/_section.json:**
```json
{
  "title": "GitHub",
  "description": "Branching model, merge strategies, version tagging, and the five Git procedures.",
  "icon": "GitBranch",
  "order": 2
}
```

**jira/_section.json:**
```json
{
  "title": "Jira",
  "description": "Board workflow, components, fix versions, epic types, and ticket conventions.",
  "icon": "LayoutDashboard",
  "order": 3
}
```

**IMPORTANT:** Delete all existing content directories and sample files. Only these three sections should exist.

### Icon Map Update

Check `lib/icons.ts` and ensure these icons are in the static map: `Compass`, `GitBranch`, `LayoutDashboard`. Add them if missing (all from lucide-react).

---

## 2. Content Files

### 2a. content/getting-started/how-we-work.md

```markdown
---
title: "How We Work"
type: "guide"
roles:
  - developer
  - all
summary: "The four platforms, how they connect, and your daily workflow loop."
version: "1.0"
lastUpdated: "2026-03-02"
---

## The Four Platforms

We use four platforms. Each one owns a specific part of the workflow.

| Platform | What It Owns | Core Principle |
|----------|-------------|----------------|
| **GitHub** | Code, version numbers (tags), developer-facing docs (READMEs, architecture, contribution guide) | Source of truth for code and versions |
| **Jira** | Work tracking (sprint board, backlog), bug tracking, product ideas (Product Discovery) | Where work is planned, tracked, and measured |
| **Slack** | Real-time communication, automated alerts, coordination | A river, not a lake — information flows through, but anything permanent lands in Jira, Notion, or GitHub |
| **Notion** | Knowledge base, company processes, decision records, this handbook | Where knowledge and decisions live |

### The Boundary Rule

When you're not sure where something goes:

- **Need it to write code?** → GitHub repo docs (README, architecture, setup)
- **Need it to track or plan work?** → Jira
- **Need to tell someone now?** → Slack
- **Need to know how the company works?** → This handbook

## How the Platforms Connect

The systems aren't isolated — they link through naming conventions and automations.

| Connection | What Flows | How |
|-----------|-----------|-----|
| **GitHub ↔ Jira** | Branch → ticket linking | Branch name contains `DEV-###`, Jira auto-detects |
| **GitHub ↔ Jira** | Version alignment | Fix Version `Plugin 1.2.0` = Git tag `plugin/v1.2.0` = dev branch `dev/1.2.0` |
| **GitHub ↔ Jira** | Component alignment | Same four components in both systems |
| **GitHub → Slack** | Deployment notifications | GitHub Actions → Slack webhook |
| **Slack → Notion** | Daily progress updates | Automated via n8n |

## The Naming Thread

Consistent naming is what makes everything self-linking. Three anchors tie it all together:

### Anchor 1: Jira Ticket Key → connects Jira to GitHub

```
Jira ticket:        DEV-501
Branch name:        feature/DEV-501-add-rate-limiting
Commit message:     DEV-501: implement rate limiter middleware
PR title:           DEV-501: Add rate limiting to API
```

Result: Jira automatically shows the branch, commits, and PR on the ticket.

### Anchor 2: Component Name → connects Jira to GitHub to Slack

```
Jira Component:     Plugin
Jira Epic naming:   [Plugin] Scene export wizard
Jira Fix Version:   Plugin 1.2.0
GitHub tag:         plugin/v1.2.0
Slack notification: "Plugin v1.2.0 deployed to staging"
```

### Anchor 3: Version Number → connects planning to development to release

```
Jira Fix Version:   Plugin 1.2.0       (planning)
Git dev branch:     dev/1.2.0          (development)
Git tag:            plugin/v1.2.0      (release)
Jira version:       Released            (record)
Slack:              "Plugin 1.2.0 shipped"  (notification)
```

## Your Daily Loop

```
Morning: Check Jira board → pick up task → move to In Progress
    ↓
Start work: Create feature branch (feature/DEV-###-description)
    ↓
During day: Code in GitHub, commit with DEV-###, push
    ↓
When done: Open PR against dev/X.Y.Z → move ticket to In Review
    ↓
After review: Squash merge, delete branch → move ticket to Done → write Resolution Summary
    ↓
Pick up next task → repeat
```

### Tools by Activity

| Activity | Tool |
|----------|------|
| See what to work on | Jira board |
| Write and commit code | GitHub + terminal |
| Get code reviewed | GitHub PRs |
| Track task progress | Jira (move across board) |
| Report a bug | Slack → Jira |
| Coordinate staging | Slack #dev-staging-deploys |
| Ship a release | GitHub → tag → Jira mark released → Slack announce |
| Find how something works | This handbook |
| Find how code works | GitHub repo docs |

## What's Automated vs Manual

### Happens Automatically

- **Description templates** populate when you create a Task or Bug in Jira
- **Bug & Maintenance epics** are auto-created when a new Fix Version is created
- **Bookend tasks** (Research & Scoping + Final Review & Close-out) are auto-created for feature epics
- **Child tasks inherit** Component and Fix Version from their parent epic
- **GitHub branch links** to Jira ticket when branch name contains `DEV-###`
- **Deployment notifications** post to Slack via GitHub Actions

### You Need to Do This

- Set Component on every ticket (required)
- Set Fix Version when a ticket enters a sprint
- Move tickets across the Jira board as work progresses
- Write a Resolution Summary when moving to Done
- Create feature branches with `DEV-###` naming
- Choose the correct merge strategy (squash for features, merge commit for promotions)
- Delete branches after merge
- Tag components at release
- Announce staging deployments in Slack

**If something that should be automatic isn't working, flag it — don't just do it manually and move on.**

## Slack Channels

| Channel | What Goes Here |
|---------|---------------|
| **dev-amara** | Main dev discussion — questions, decisions, general coordination |
| **dev-progress-reports** | Team updates + automated daily digest |
| **dev-bug-reports** | Bug discussion. Confirmed bugs get a Jira ticket. |
| **#dev-staging-deploys** | Announce what you're deploying to staging. Check before deploying. |
| **dev-backend-supabase, dev-cloud, dev-frontend, dev-mesh-gen, dev-pcg, dev-website** | Component-specific technical discussion |

### Where Do I Post This?

| Situation | Channel |
|-----------|---------|
| Found a bug or think something's broken | dev-bug-reports |
| About to deploy to staging | #dev-staging-deploys |
| General dev question or discussion | dev-amara |
| Component-specific technical discussion | The relevant dev-* channel |
| Progress update | dev-progress-reports |
```

### 2b. content/github/how-we-use-github.md

```markdown
---
title: "How We Use GitHub"
type: "guide"
roles:
  - developer
  - all
summary: "Repository structure, branching model, merge strategies, and how GitHub connects to Jira."
version: "1.0"
lastUpdated: "2026-03-02"
---

## What GitHub Is For

GitHub is the source of truth for code and version numbers. All product code lives here, all version markers (Git tags) are created here, and all developer-facing documentation (setup guides, architecture docs, contribution conventions) lives in the repo.

Everything else — task tracking, sprint planning, company processes — lives in Jira, Notion, or Slack. GitHub is where the product is physically built.

## The Four Components

We have four independently versioned components, each following semantic versioning (MAJOR.MINOR.PATCH):

| Component | What It Is | Tag Prefix | Repo Location |
|-----------|-----------|------------|---------------|
| **Plugin** | UE5 plugin source | `plugin/` | Monorepo (`interfaces/UE5plugin/`) |
| **PluginBackend** | API interface, MCP client, and asset ingestion — versioned as one unit | `backend/` | Monorepo (`backend/`) |
| **Website** | Next.js frontend | `website/` | Monorepo (`interfaces/frontend/`) |
| **MeshGen** | Mesh generation server | `meshgen/` | Separate repo (`01C-Amara/amara-mesh-gen`) |

Each component gets its own Git tags (e.g. `plugin/v1.2.0`, `backend/v1.2.0`). When we release, we only tag the components that actually changed.

A `compatibility.json` file at the repo root tracks which component versions are tested together.

## Branching Model

We use five types of branches:

**`prod`** — Always reflects what's live in production. Protected. The only way code gets into prod is via a merge from staging (or a hotfix in emergency).

**`dev/X.Y.Z`** (e.g. `dev/1.2.0`) — The active development branch for a version. Created from prod at the start of a version cycle. All feature branches merge back into this.

**`staging`** — Pre-production testing environment. Code sits here to be verified before going live. Only the current dev branch should be merged to staging.

**`feature/DEV-###-description`** (e.g. `feature/DEV-501-add-rate-limiting`) — Individual work items. Short-lived. Created from dev, merged back into dev, then deleted. The Jira key enables automatic linking.

**`hotfix/X.Y.Z`** (e.g. `hotfix/1.2.1`) — Emergency production fixes. Created from prod, always bumps the patch version.

### The Normal Flow

```
feature/DEV-### → dev/X.Y.Z → staging → prod
   (squash)        (merge)     (merge)
```

### Dev Branch Overlap

Work doesn't stop while a version is being tested. When `dev/1.2.0` has been promoted to staging, a new `dev/1.3.0` can be created from prod so the team can keep building.

## Merge Strategies

| Merge | Strategy | Why |
|-------|----------|-----|
| Feature → dev | **Squash and merge** | Clean single commit per feature. Keeps dev history readable. |
| Dev → staging | **Merge commit** | Preserves full history. Safe on shared branches. |
| Staging → prod | **Merge commit** | Preserves history, clear promotion record. |

All merges happen via GitHub Pull Requests. Select the strategy using the PR dropdown.

## Feature Branch Rules

Three rules that prevent most Git headaches:

1. **Never reuse a merged branch.** If you need more work on the same ticket after merging, create a fresh branch from dev.
2. **Delete branches immediately after merge.** Use the "Delete branch" button on the PR page.
3. **Only code-change tasks get branches.** Research, scoping, and review tasks stay in Jira only.

## Commit Messages

Format: `DEV-###: description`

Examples:
- `DEV-501: implement rate limiter middleware`
- `DEV-342: fix auth bypass on websocket reconnect`

The Jira key at the start enables automatic linking.

## How GitHub Connects to Jira

Three connection points:

**Branch naming** — Including `DEV-###` in branch names enables automatic linking. Jira shows the branch and PRs on the ticket.

**Fix Versions** — Jira Fix Versions map 1:1 to GitHub version tags. "Plugin 1.2.0" → `plugin/v1.2.0`.

**Components** — Same four components in both systems.

## What Happens at Release

When a version ships (staging → prod):

1. Merge staging → prod via PR (merge commit)
2. Tag each component that changed (e.g. `git tag plugin/v1.2.0`)
3. Update `compatibility.json` with new version entries
4. Post a brief release summary in Slack

## Repo Documentation

Developer-facing docs live in the repo:

- **README** — what the repo/component is, local setup, how to run
- **Architecture docs** — code structure, key decisions, component relationships
- **CONTRIBUTING.md** — branch naming, PR process, commit conventions
- **Environment setup** — dependencies, configuration, secrets references

Company-wide processes live here in the handbook. If you need it to write code, it's in the repo. If you need it to work at the company, it's in the handbook.
```

### 2c. content/github/git-quick-reference.md

```markdown
---
title: "Git Quick Reference"
type: "reference"
roles:
  - developer
summary: "Branch naming, commit format, merge strategies, and tag prefixes at a glance."
version: "1.0"
lastUpdated: "2026-03-02"
---

## Branch Naming

| Branch Type | Format | Example |
|-------------|--------|---------|
| Production | `prod` | `prod` |
| Development | `dev/X.Y.Z` | `dev/1.2.0` |
| Staging | `staging` | `staging` |
| Feature | `feature/DEV-###-description` | `feature/DEV-501-add-rate-limiting` |
| Hotfix | `hotfix/X.Y.Z` | `hotfix/1.2.1` |

Feature branch descriptions: lowercase, hyphens, brief. The `DEV-###` prefix links the branch to Jira automatically.

## Commit Messages

Format: `DEV-###: description`

```
DEV-501: implement rate limiter middleware
DEV-342: fix auth bypass on websocket reconnect
DEV-188: add unit tests for mesh export
```

Lowercase description. Present tense or imperative. Jira key first.

## Merge Strategies

| Merge | Strategy | PR Dropdown Choice |
|-------|----------|--------------------|
| Feature → dev | **Squash and merge** | "Squash and merge" |
| Dev → staging | **Merge commit** | "Create a merge commit" |
| Staging → prod | **Merge commit** | "Create a merge commit" |
| Hotfix → prod | **Merge commit** | "Create a merge commit" |

All merges via GitHub Pull Requests. Never merge locally.

## The Normal Flow

```
feature/DEV-### → dev/X.Y.Z → staging → prod
   (squash)        (merge)     (merge)
```

## Tag Prefixes

| Component | Tag Format | Example |
|-----------|-----------|---------|
| Plugin | `plugin/vX.Y.Z` | `plugin/v1.2.0` |
| PluginBackend | `backend/vX.Y.Z` | `backend/v1.2.0` |
| Website | `website/vX.Y.Z` | `website/v1.1.0` |
| MeshGen | `meshgen/vX.Y.Z` | `meshgen/v2.1.0` |

Only tag the components that actually changed in a release.

## Jira Status ↔ Git State

| Jira Status | What Exists in Git |
|-------------|-------------------|
| **To Do** | No branch |
| **In Progress** | Feature branch, commits happening |
| **In Review** | PR open against dev/X.Y.Z |
| **Done** | PR merged, feature branch deleted |

"Done" = merged to dev, not released to prod.

## Feature Branch Rules

1. **Never reuse a merged branch.** New work on same ticket = new branch from dev.
2. **Delete immediately after merge.** Use the GitHub PR "Delete branch" button.
3. **Only code-change tasks get branches.** Research and scoping tasks stay in Jira only.

## Fix Version Mapping

```
Plugin 1.2.0 (Jira) = dev/1.2.0 (branch) = plugin/v1.2.0 (tag)
```
```

### 2d. content/github/git-procedures.md

```markdown
---
title: "Git Procedures"
type: "sop"
roles:
  - developer
summary: "Five step-by-step procedures: start a feature, finish a feature, promote to staging, release to prod, and hotfix."
version: "1.0"
lastUpdated: "2026-03-02"
---

Five procedures covering the full Git workflow. All merges happen via GitHub Pull Requests — select the merge strategy using the PR dropdown, not local git commands.

| Procedure | GitHub Merge Button | Who |
|-----------|-------------------|-----|
| Feature → dev/X.Y.Z | **Squash and merge** | Any developer |
| dev/X.Y.Z → staging | **Merge commit** | Coordinate in channel first |
| staging → prod | **Merge commit** | Dev branch owner, after team confirmation |
| hotfix → staging or prod | **Merge commit** | Hotfix author + reviewer |

## SOP 1: Start a Feature

Create a short-lived feature branch from the current dev branch, named with the Jira ticket key.

### Step 1 — Switch to the dev branch and pull latest

```bash
git checkout dev/1.2.0
git pull origin dev/1.2.0
```

### Step 2 — Create your feature branch

```bash
git checkout -b feature/DEV-501-add-rate-limiting
```

Always use `feature/DEV-###-short-description`. The Jira key enables automatic linking.

### Step 3 — Push the branch to remote

```bash
git push -u origin feature/DEV-501-add-rate-limiting
```

### Step 4 — Work normally — commit and push as you go

```bash
git add .
git commit -m "DEV-501: implement rate limiter middleware"
git push
```

Move your Jira ticket to **In Progress**.

## SOP 2: Finish a Feature

Merge the feature back into the dev branch via GitHub PR, then clean up.

### Step 1 — Push any remaining work

```bash
git push
```

### Step 2 — Open a Pull Request on GitHub

Base: `dev/1.2.0` ← Compare: `feature/DEV-501-add-rate-limiting`

### Step 3 — Get review and approval

Move your Jira ticket to **In Review** when the PR is open.

### Step 4 — Merge using "Squash and merge"

Select **"Squash and merge"** from the GitHub merge dropdown. Not regular merge, not rebase.

### Step 5 — Delete the feature branch

Use the "Delete branch" button on the GitHub PR page. Or from terminal:

```bash
git branch -d feature/DEV-501-add-rate-limiting
git push origin --delete feature/DEV-501-add-rate-limiting
```

Move your Jira ticket to **Done** (write a Resolution Summary when prompted).

### Step 6 — If more work is needed on the same ticket

```bash
git checkout dev/1.2.0
git pull origin dev/1.2.0
git checkout -b feature/DEV-501-fix-edge-case
```

Never reuse a merged feature branch. Always create a fresh one from dev.

## SOP 3: Promote Dev to Staging

Move a dev branch to the staging environment for pre-production testing.

### Step 1 — Announce in the team channel

Post what you're deploying and how long you need staging. Wait for the all-clear.

### Step 2 — Open a Pull Request on GitHub

Base: `staging` ← Compare: `dev/1.2.0`

### Step 3 — Merge using "Create a merge commit"

Use regular merge commit — not squash, not rebase.

> **Rule:** Only the current dev/X.Y.Z should be merged to staging. Anything else must be announced and confirmed by the team.

## SOP 4: Release to Production

Ship a tested staging build to production and tag the release.

### Step 1 — Confirm staging has been tested

Get peer sign-off from the most appropriate developer.

### Step 2 — Open a Pull Request

Base: `prod` ← Compare: `staging`

### Step 3 — Merge using "Create a merge commit"

### Step 4 — Tag the release

```bash
git checkout prod
git pull origin prod
git tag plugin/v1.2.0
git tag backend/v1.2.0
git push origin --tags
```

Only tag the components that actually changed.

### Step 5 — Post-release

- Update `compatibility.json` if component versions changed
- Mark the relevant Jira Fix Versions as Released
- Post a brief release summary in Slack
- Create the next `dev/X.Y.Z` branch from `prod`
- Delete the old dev branch

## SOP 5: Hotfix

Fix a critical production bug. The path depends on whether staging has unreleased work.

### Step 1 — Create the hotfix branch from prod

```bash
git checkout prod
git pull origin prod
git checkout -b hotfix/1.2.1
```

Hotfixes always bump the patch version.

### Step 2 — Fix, commit, and push

```bash
git add .
git commit -m "hotfix: fix critical auth bypass"
git push -u origin hotfix/1.2.1
```

### Step 3 — Choose the merge path

**Path A — Staging is clean (matches prod):**
PR from `hotfix/1.2.1` → `staging` (merge commit). Test on staging. Then PR from `staging` → `prod` (merge commit).

**Path B — Staging has unreleased features:**
Either temporarily commandeer staging (announce first, redeploy previous state after), or skip staging and PR directly from `hotfix/1.2.1` → `prod` after thorough review.

### Step 4 — Tag the release

```bash
git checkout prod
git pull origin prod
git tag backend/v1.2.1
git push origin --tags
```

Tag only the component(s) that were fixed.

### Step 5 — Merge hotfix forward

```bash
git checkout staging
git pull origin staging
git merge hotfix/1.2.1
git push origin staging

git checkout dev/1.3.0
git pull origin dev/1.3.0
git merge hotfix/1.2.1
git push origin dev/1.3.0
```

Repeat for every active dev/* branch.

### Step 6 — Clean up

```bash
git branch -d hotfix/1.2.1
git push origin --delete hotfix/1.2.1
```

### Step 7 — Jira and Slack

- Create a Hotfix epic in Jira: `[Component] Hotfix X.Y.Z`
- Mark the Fix Version as Released
- Post in Slack: what broke, what was fixed, what version
```

### 2e. content/jira/how-we-use-jira.md

```markdown
---
title: "How We Use Jira"
type: "guide"
roles:
  - developer
  - all
summary: "Board workflow, components, fix versions, epic types, ticket creation, and how Jira connects to GitHub."
version: "1.0"
lastUpdated: "2026-03-02"
---

## What Jira Is For

Jira is where we track what's being built, who's working on what, and where things stand. Every piece of development work — features, bugs, maintenance — lives as a ticket in the DEV project.

GitHub is the source of truth for code. Jira is the source of truth for work.

## The Board: Four Statuses

Every ticket moves through four columns:

| Status | What It Means | GitHub Equivalent |
|--------|--------------|-------------------|
| **To Do** | In the sprint backlog, not started | No branch exists |
| **In Progress** | You're actively working on it | Feature branch exists, commits happening |
| **In Review** | PR is open — the ball is with the reviewer | PR open against dev/X.Y.Z |
| **Done** | PR merged, branch deleted, work complete | Merged into dev branch |

**Key things:**

- **"Done" means merged to dev, not released to production.** Release tracking happens at the Fix Version level.
- **There's no "Blocked" column.** If you're blocked, use Jira's flag feature (the little flag icon). Blocked is a modifier, not a state.
- **Sprint hygiene:** If something is In Progress but you haven't touched it this sprint, move it back to To Do.
- **Resolution Summary:** When you move a ticket to Done, write a brief one-liner describing what was done.

### Allowed Transitions

| From | You Can Move To | When |
|------|----------------|------|
| **To Do** | In Progress, Done | Picking up work, or cancelling |
| **In Progress** | In Review, To Do | PR opened, or putting work back |
| **In Review** | Done, In Progress | Merged, or review found issues |
| **Done** | In Progress | Reopened (rare) |

**Not allowed:** In Review → To Do. Close or draft the PR first, then go through In Progress.

## Components

Every ticket must have a Component. We have four, matching the product:

| Component | What It Covers | GitHub Tag Prefix |
|-----------|---------------|-------------------|
| **Plugin** | Unreal Engine plugin (C++/Blueprints) | `plugin/v*` |
| **PluginBackend** | Backend services — API, inference pipeline | `backend/v*` |
| **Website** | Marketing site, mesh gen interface, plugin downloads, user accounts | `website/v*` |
| **MeshGen** | Mesh generation model and pipeline | `meshgen/v*` |

**Rules:**
- Set a component on every ticket. It's required.
- Most tickets should have one component. Three or more usually means the ticket should be split.
- Components in Jira match components in GitHub.

## Fix Versions

Fix Versions tell you which release a ticket ships with. They're component-prefixed.

**Format:** `{Component} {X.Y.Z}` — e.g. "Plugin 1.2.0", "MeshGen 2.1.0"

Each Fix Version maps directly to a GitHub tag. "Plugin 1.2.0" → `plugin/v1.2.0`.

**When to set it:**
- **Required** once the ticket is in a sprint
- **Optional** while in the backlog
- Child tasks auto-inherit Fix Version from their parent epic

**Why component-prefixed?** Our components ship on different timelines. A single unified version number wouldn't map to anything real.

## Epics: Three Types

### Feature Epics

A feature or significant change, scoped to one component and one version.

**Naming:** `[Component] Short description` — e.g. `[Plugin] Scene export wizard`

**Auto-created:** Two bookend tasks appear automatically — Research & Scoping, and Final Review & Close-out. You fill in the work between them.

### Bug & Maintenance Epics

One per component per version. Catches bugs and small fixes that don't belong to a feature epic.

**Naming:** `[Component] X.Y.Z — Bug Fixes & Maintenance`

**Auto-created** when a new Fix Version is created.

### Hotfix Epics

For production-critical issues that can't wait.

**Naming:** `[Component] Hotfix X.Y.Z`

Always bumps the patch version. See the Hotfix SOP for the full process.

### Bug Routing

- **Bug found during development** (not critical) → Bug & Maintenance epic for the current version
- **Production-critical bug** → Create a Hotfix epic with its own patch version
- **Bug with no active version** → Backlog without Fix Version

## Creating a Ticket

8 fields on the create screen:

| Field | Required? | Notes |
|-------|----------|-------|
| **Summary** | Yes | Clear, descriptive title |
| **Issue Type** | Yes | Task, Bug, Sub-task, Epic |
| **Description** | Yes | Auto-populated with template — just fill in the sections |
| **Assignee** | No | You might not know yet |
| **Component** | Yes | One of the four components |
| **Fix Version** | Conditional | Required in sprint, optional in backlog |
| **Priority** | No | Defaults to Medium — sprint ordering is the real priority |
| **Parent** | Yes (tasks) | Links to parent epic |

**Hidden fields** (intentionally): Start Date, Due Date, Team, Story Points. Sprints are our time boundaries. Board position is our priority signal.

### Description Templates

Auto-populated when you create a ticket.

**For Tasks:**
```
## What
[One line: what needs to happen]

## Why
[One line: what problem this solves]

## Acceptance Criteria
- [ ] [How we know it's done]
```

**For Bugs:**
```
## What's happening
[Describe the bug]

## Expected behaviour
[What should happen instead]

## Steps to reproduce
1.

## Environment
[Component version, browser, OS if relevant]
```

## Labels

Labels are restricted to source and process tags (`ai-generated`, `meeting-processor`, `discord-intake`) and are applied automatically. They're not for topic categorisation.

## Epic Lifecycle

Epics use three statuses: **To Do**, **In Progress**, **Done**.

Epics don't auto-close when child tasks are done. The epic owner makes a deliberate decision to close — this is a quality gate.

## How Jira Connects to GitHub

**Branch naming** — `DEV-###` in branch names enables automatic linking.

**Fix Versions** — Map 1:1 to GitHub tags. "Plugin 1.2.0" = `plugin/v1.2.0`.

**Components** — Same four in both systems.

## What Gets Automated

- Description templates populate on Task/Bug creation
- Bug & Maintenance epics auto-created with new Fix Versions
- Bookend tasks auto-created for feature epics
- Component and Fix Version inheritance from parent epic
- Deployment notifications from GitHub to Slack

**If something automatic isn't working, flag it — don't just do it manually.**

## Product Discovery

Ideas go through Product Discovery (separate Jira project):

1. Ideas land in an Inbox
2. Founders triage every 2-4 weeks: approve, backlog, or reject
3. Approved ideas get a delivery epic in DEV
4. Progress tracked automatically

If you have an idea, submit it. If you want to check status, look at the In Development view.
```

---

## 3. Interactive Visual Components

Build React components for system diagrams that can be rendered within content pages via MDX, or as standalone visual pages. These should be clean, modern, and match the app's aesthetic (Stripe Docs meets Linear — zinc theme, dark/light mode support).

### Architecture Decision

The app uses `next-mdx-remote` for rendering. Rather than complex MDX component injection (which adds fragility), create a **dedicated visuals page** as a standalone route:

**Route:** `/visuals` — A single page with tabbed/sectioned interactive diagrams.

Create `app/visuals/page.tsx` as a client component with the following diagrams:

### 3a. System Map — The Four Platforms

An interactive diagram showing GitHub, Jira, Slack, and Notion as nodes with animated connection lines between them. Hovering on a connection shows what flows between them.

**Data:**
```
Nodes: GitHub, Jira, Slack, Notion
Connections:
  GitHub ↔ Jira: "Branch linking (DEV-###)", "Version alignment", "Component alignment"
  GitHub → Slack: "Deployment notifications"
  Slack → Notion: "Daily progress updates"
  Jira ↔ Jira JPD: "Ideas → delivery epics"
```

**Style:** Nodes as rounded cards with platform icons and brief "what it owns" text. Connections as animated dashed lines. Hover reveals connection details in a tooltip or panel.

### 3b. Ticket Lifecycle — A Ticket's Journey

A horizontal timeline/flow showing a ticket moving through all 10 stages from idea to release, with system icons showing which platform is active at each stage.

**Data (10 stages):**
1. Idea enters (JPD) → 2. Triage (JPD) → 3. Epic planned (Jira) → 4. Task picked up (Jira+GitHub) → 5. Work happens (GitHub) → 6. PR & review (GitHub+Jira) → 7. Merge & complete (GitHub+Jira) → 8. Epic closes (Jira) → 9. Staging (GitHub+Slack) → 10. Release (GitHub+Jira+Slack)

**Style:** Horizontal stepped flow. Each step is a card showing the stage name, which platform(s) are involved (small icons), and a one-line description. Clicking a step expands to show detail. The active/hover step highlights with the accent color.

### 3c. Branch Flow — The Git Model

A visual representation of the branching model showing prod, dev, staging, feature branches and the merge flow between them.

**Data:**
```
prod (base) ─────────────────────────────────────────── (tagged release)
  ├── dev/1.2.0 ──────────────────────── (merge to staging)
  │     ├── feature/DEV-501 ─ (squash merge back to dev)
  │     └── feature/DEV-502 ─ (squash merge back to dev)
  └── dev/1.3.0 (created after 1.2.0 ships) ──────...
staging ─────────────── (testing) ────── (merge to prod)
```

**Style:** A git-graph style visualization with colored branch lines. Merge points shown as dots. Labels on each branch. Merge strategy noted at each merge point.

### 3d. Status Alignment — Board ↔ Branch

A side-by-side two-panel view. Left panel shows the Jira board columns (To Do, In Progress, In Review, Done). Right panel shows the corresponding Git state. Arrows show allowed transitions.

### Implementation Notes

- Use React + Tailwind (consistent with existing app)
- All diagrams must support dark/light mode (use CSS variables from the theme)
- Make them responsive (stack vertically on mobile)
- Add to the sidebar navigation as a "System Overview" link with a `Map` or `Network` icon
- Consider using simple SVG or CSS-based graphics rather than heavy charting libraries — the data is structural, not quantitative

### Navigation Addition

Add the visuals page to the sidebar navigation. Place it prominently — this is a key onboarding tool.

---

## 4. LLM Chat Feature

### Overview

Add a chat interface where team members can ask questions about the handbook and get answers grounded in the content. This is Phase 4 work being pulled forward for the presentation.

### Architecture

**API Route:** `app/api/chat/route.ts`
- POST endpoint accepting `{ message: string, history?: Array<{role, content}> }`
- Calls Anthropic API with handbook content as system context
- Returns streamed response with page references

**Chat Component:** `components/chat/ChatWidget.tsx`
- Floating button (bottom-right) that opens a chat panel
- Simple message input, response display, conversation history within session
- Shows suggested questions on first open
- When the response references a handbook page, render as a clickable link

**Chat Page:** `app/chat/page.tsx`
- Full-page chat experience (alternative to the widget)
- Add to sidebar navigation

### System Prompt Design

The system prompt should include ALL handbook content (it's small enough — ~5 pages of markdown). Structure it as:

```
You are Amara, the handbook assistant for Zero One Creative's development team.
Answer questions based ONLY on the handbook content provided below.
If the answer is in the handbook, provide it clearly and reference which section it's from.
If the answer isn't in the handbook, say so honestly.
Always be concise and practical.

When referencing sections, format them as links:
- Getting Started > How We Work: /getting-started/how-we-work
- GitHub > How We Use GitHub: /github/how-we-use-github
- GitHub > Git Quick Reference: /github/git-quick-reference
- GitHub > Git Procedures: /github/git-procedures
- Jira > How We Use Jira: /jira/how-we-use-jira

[FULL HANDBOOK CONTENT HERE — all 5 markdown files concatenated]
```

### Implementation Notes

- Use the `@anthropic-ai/sdk` npm package (or direct fetch to the API)
- Environment variable: `ANTHROPIC_API_KEY` — must be set in Vercel env vars
- Use `claude-sonnet-4-5-20250929` model (fast, cheap, good for Q&A)
- Stream the response for good UX
- No conversation persistence needed — session-only memory is fine
- Suggested first questions:
  - "How do I start working on a Jira ticket?"
  - "What merge strategy should I use?"
  - "Where do I report a bug?"
  - "What happens when a version is released?"

### Graceful Degradation

If the API key isn't set or the API call fails, the chat should:
- Show a friendly error message
- Fall back to linking the user to relevant handbook pages based on keyword matching (use the existing Fuse.js search)

---

## 5. Deployment & Access

### Vercel

- The app should already be auto-deploying from GitHub pushes to main
- Confirm the Vercel project is set to "Public" (no password protection, no Vercel Authentication)
- Note the production URL for sharing with the team
- Add `ANTHROPIC_API_KEY` as an environment variable in Vercel project settings

### Access Check

After deploying, verify:
- [ ] The production URL loads without any login
- [ ] All five content pages render correctly
- [ ] Dark/light theme toggle works
- [ ] Search finds content across all pages
- [ ] Visuals page loads and diagrams are interactive
- [ ] Chat widget opens and responds (if API key is configured)
- [ ] Mobile layout is usable

---

## 6. Build Order

Execute in this order to ensure each layer builds on the last:

1. **Clean up** — Delete all existing sample content directories and files
2. **Create sections** — New `_section.json` files for the three sections
3. **Create content** — All five markdown files with frontmatter
4. **Update icon map** — Add any missing icons to `lib/icons.ts`
5. **Test content rendering** — `npm run build` should pass, check each page renders with correct type renderer
6. **Build visuals page** — `/visuals` route with the four interactive diagrams
7. **Add visuals to navigation** — Sidebar link
8. **Build chat API route** — `/api/chat/route.ts`
9. **Build chat UI** — Widget component + chat page
10. **Add chat to navigation** — Sidebar link
11. **Polish** — Final visual check, responsive testing, dark/light mode
12. **Deploy** — Push to GitHub, confirm Vercel auto-deploys, check public access

---

## 7. Reference: Existing App Architecture

From CLAUDE.md — key patterns to follow:

- Server components by default. Client components only for interactivity (`"use client"`)
- Named exports for all components. Default export only for `page.tsx`
- Content parsing goes through `lib/content.ts` — never read files directly in components
- Type-specific rendering via ContentRenderer → SOPRenderer, ReferenceRenderer, PolicyRenderer, GuideRenderer
- Props typed with interfaces from `types/`
- Use `Link` from `next/link` for internal navigation
- Dynamic icon lookup through `lib/icons.ts` → `SectionIcon` component
- Tailwind v4 + shadcn/ui (zinc theme)
- Fonts: Space Grotesk (headings), JetBrains Mono (code)

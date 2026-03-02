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

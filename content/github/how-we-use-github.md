---
title: "How We Use GitHub"
order: 1
type: "guide"
roles:
  - developer
  - all
summary: "Repository structure, branching model, merge strategies, and how GitHub connects to Jira."
version: "1.0"
lastUpdated: "2026-03-02"
---

> [!TLDR]
> - GitHub is where code lives. Everything else is in Jira, Notion, or Slack.
> - Four components, independently versioned: Plugin, PluginBackend, MeshGen, Website.
> - Branch flow: feature → dev → staging → prod (squash, merge, merge).
> - Commit format: `DEV-###: description`
> - Never reuse a merged branch. Delete immediately after merge.

## What GitHub Is For

GitHub is the source of truth for code and version numbers. All product code lives here, all version markers (Git tags) are created here, and all developer-facing documentation (setup guides, architecture docs, contribution conventions) lives in the repo.

Everything else — task tracking, sprint planning, company processes — lives in Jira, Notion, or Slack. GitHub is where the product is physically built.

---

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

---

## Branching Model

We use five types of branches:

<DefList>
  <Def term="prod" color="red">
    Always reflects what's live in production. Protected. The only way code gets into prod is via a merge from staging (or a hotfix in emergency).
  </Def>
  <Def term="dev/X.Y.Z" color="green" example="dev/1.2.0">
    The active development branch for a version. Created from prod at the start of a version cycle. All feature branches merge back into this.
  </Def>
  <Def term="staging" color="amber">
    Pre-production testing environment. Code sits here to be verified before going live. Only the current dev branch should be merged to staging.
  </Def>
  <Def term="feature/DEV-###-description" color="blue" example="feature/DEV-501-add-rate-limiting">
    Individual work items. Short-lived. Created from dev, merged back into dev, then deleted. The Jira key enables automatic linking.
  </Def>
  <Def term="hotfix/X.Y.Z" color="rose" example="hotfix/1.2.1">
    Emergency production fixes. Created from prod, always bumps the patch version.
  </Def>
</DefList>

### The Normal Flow

<Flow>
  <Step color="blue">feature/DEV-###</Step>
  <Arrow label="squash" />
  <Step color="green">dev/X.Y.Z</Step>
  <Arrow label="merge" />
  <Step color="amber">staging</Step>
  <Arrow label="merge" />
  <Step color="red">prod</Step>
</Flow>

### Dev Branch Overlap

Work doesn't stop while a version is being tested. When `dev/1.2.0` has been promoted to staging, a new `dev/1.3.0` can be created from prod so the team can keep building.

---

## Merge Strategies

| Merge | Strategy | Why |
|-------|----------|-----|
| Feature → dev | **Squash and merge** | Clean single commit per feature. Keeps dev history readable. |
| Dev → staging | **Merge commit** | Preserves full history. Safe on shared branches. |
| Staging → prod | **Merge commit** | Preserves history, clear promotion record. |

All merges happen via GitHub Pull Requests. Select the strategy using the PR dropdown.

## Feature Branch Rules

Three rules that prevent most Git headaches:

> [!RULE]
> Never reuse a merged branch. If you need more work on the same ticket after merging, create a fresh branch from dev.

> [!RULE]
> Delete branches immediately after merge. Use the "Delete branch" button on the PR page.

> [!RULE]
> Only code-change tasks get branches. Research, scoping, and review tasks stay in Jira only.

---

## Commit Messages

Format: `DEV-###: description`

Examples:
- `DEV-501: implement rate limiter middleware`
- `DEV-342: fix auth bypass on websocket reconnect`

> [!TIP]
> The Jira key at the start of commit messages and branch names enables automatic linking between GitHub and Jira.

---

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

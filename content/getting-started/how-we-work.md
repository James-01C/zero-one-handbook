---
title: 'How We Work'
type: 'guide'
roles:
  - developer
  - all
summary: 'The four platforms, how they connect, and your daily workflow loop.'
version: '1.1'
lastUpdated: '2026-03-03'
---

> [!TLDR]
>
> - **Four platforms, four jobs:** GitHub (code), Jira (work tracking), Slack (communication), Notion (knowledge)
> - **Naming connects everything:** ticket keys, component names, and version numbers link all systems automatically
> - **Your loop:** pick up task → branch → code → PR → merge → move ticket to Done
> - **Know what's automatic vs manual** — if an automation breaks, flag it, don't just do it manually

> [!TIP] See it visually
> The [System Overview](/visuals) page has interactive diagrams for the system map, ticket lifecycle, and branch flow.

## The Four Platforms

We use four platforms. Each one owns a specific part of the workflow.

| Platform   | What It Owns                                                                                    | Core Principle                               |
| ---------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **GitHub** | Code, version numbers (tags), developer-facing docs (READMEs, architecture, contribution guide) | Source of truth for code and versions        |
| **Jira**   | Work tracking (sprint board, backlog), bug tracking, product ideas (Product Discovery)          | Where work is planned, tracked, and measured |
| **Slack**  | Real-time communication, automated alerts, coordination                                         | Real-time coordination — see callout below   |
| **Notion** | Knowledge base, company processes, decision records, this handbook                              | Where knowledge and decisions live           |

> [!INFO] Slack is a river, not a lake
> Information flows through Slack, but anything that needs to be found later lands in Jira, Notion, or GitHub. If a decision is made in Slack, record it somewhere permanent.

### The Boundary Rule

> [!TIP] The Boundary Rule
> When you're not sure where something goes:
>
> - **Need it to write code?** → GitHub repo docs
> - **Need to track or plan work?** → Jira
> - **Need to tell someone now?** → Slack
> - **Need to know how the company works?** → This handbook

---

## How the Platforms Connect

The systems aren't isolated — they link through naming conventions and automations.

| Connection         | What Flows               | How                                                                           |
| ------------------ | ------------------------ | ----------------------------------------------------------------------------- |
| **GitHub ↔ Jira**  | Branch → ticket linking  | Branch name contains `DEV-###`, Jira auto-detects                             |
| **GitHub ↔ Jira**  | Version alignment        | Fix Version `Plugin 1.2.0` = Git tag `plugin/v1.2.0` = dev branch `dev/1.2.0` |
| **GitHub ↔ Jira**  | Component alignment      | Same four components in both systems                                          |
| **GitHub → Slack** | Deployment notifications | GitHub Actions → Slack webhook                                                |
| **Slack → Notion** | Daily progress updates   | Automated via n8n                                                             |

---

## The Naming Thread

Consistent naming is what makes everything self-linking. Three anchors tie it all together:

> [!INFO] One name, everywhere
> A single naming convention threads through all four systems. No manual linking required — just follow the pattern and the tools connect automatically.

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

---

## Your Daily Loop

<div className="my-6 flex items-start gap-4">
  <div className="flex flex-col items-center gap-0">
    <Step color="blue">Check board & pick up task</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step color="blue">Move ticket to In Progress</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step color="green">Create feature/DEV-### branch</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step color="green">Code, commit with DEV-###, push</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step color="green">Open PR against dev/X.Y.Z</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step color="purple">In Review</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step color="green">Squash merge, delete branch</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step color="blue">Done — write Resolution Summary</Step>
    <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground shrink-0"><path d="M6 0v18M2 15l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    <Step>Pick up next task</Step>
  </div>
</div>

### Tools by Activity

| Activity                 | Tool                                               |
| ------------------------ | -------------------------------------------------- |
| See what to work on      | Jira board                                         |
| Write and commit code    | GitHub + terminal                                  |
| Get code reviewed        | GitHub PRs                                         |
| Track task progress      | Jira (move across board)                           |
| Report a bug             | Slack → Jira                                       |
| Coordinate staging       | Slack #dev-staging-deploys                         |
| Ship a release           | GitHub → tag → Jira mark released → Slack announce |
| Find how something works | This handbook                                      |
| Find how code works      | GitHub repo docs                                   |

---

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

> [!RULE] Don't silently work around broken automation
> If something that should be automatic isn't working, flag it in dev-amara. We fix the system rather than adding manual steps.

---

## Slack Channels

| Channel                                                                               | What Goes Here                                                     |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **dev-amara**                                                                         | Main dev discussion — questions, decisions, general coordination   |
| **dev-progress-reports**                                                              | Team updates + automated daily digest                              |
| **dev-bug-reports**                                                                   | Bug discussion. Confirmed bugs get a Jira ticket.                  |
| **#dev-staging-deploys**                                                              | Announce what you're deploying to staging. Check before deploying. |
| **dev-backend-supabase, dev-cloud, dev-frontend, dev-mesh-gen, dev-pcg, dev-website** | Component-specific technical discussion                            |

### Where Do I Post This?

| Situation                               | Channel                     |
| --------------------------------------- | --------------------------- |
| Found a bug or think something's broken | dev-bug-reports             |
| About to deploy to staging              | #dev-staging-deploys        |
| General dev question or discussion      | dev-amara                   |
| Component-specific technical discussion | The relevant dev-\* channel |
| Progress update                         | dev-progress-reports        |

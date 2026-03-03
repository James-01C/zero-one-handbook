---
title: 'How We Work'
type: 'guide'
roles:
  - developer
  - all
summary: 'The four platforms, how they connect, and your daily workflow loop.'
version: '1.0'
lastUpdated: '2026-03-02'
---

## The Four Platforms

We use four platforms. Each one owns a specific part of the workflow.

| Platform   | What It Owns                                                                                    | Core Principle                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **GitHub** | Code, version numbers (tags), developer-facing docs (READMEs, architecture, contribution guide) | Source of truth for code and versions                                                                    |
| **Jira**   | Work tracking (sprint board, backlog), bug tracking, product ideas (Product Discovery)          | Where work is planned, tracked, and measured                                                             |
| **Slack**  | Real-time communication, automated alerts, coordination                                         | A river, not a lake — information flows through, but anything permanent lands in Jira, Notion, or GitHub |
| **Notion** | Knowledge base, company processes, decision records, this handbook                              | Where knowledge and decisions live                                                                       |

### The Boundary Rule

When you're not sure where something goes:

- **Need it to write code?** → GitHub repo docs (README, architecture, setup)
- **Need it to track or plan work?** → Jira
- **Need to tell someone now?** → Slack
- **Need to know how the company works?** → This handbook

## How the Platforms Connect

The systems aren't isolated — they link through naming conventions and automations.

| Connection         | What Flows               | How                                                                           |
| ------------------ | ------------------------ | ----------------------------------------------------------------------------- |
| **GitHub ↔ Jira**  | Branch → ticket linking  | Branch name contains `DEV-###`, Jira auto-detects                             |
| **GitHub ↔ Jira**  | Version alignment        | Fix Version `Plugin 1.2.0` = Git tag `plugin/v1.2.0` = dev branch `dev/1.2.0` |
| **GitHub ↔ Jira**  | Component alignment      | Same four components in both systems                                          |
| **GitHub → Slack** | Deployment notifications | GitHub Actions → Slack webhook                                                |
| **Slack → Notion** | Daily progress updates   | Automated via n8n                                                             |

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

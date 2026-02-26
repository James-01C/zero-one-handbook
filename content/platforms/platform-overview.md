---
title: "Platform Overview"
type: "reference"
roles:
  - all
summary: "Quick reference for all the platforms and tools used at Zero One Creative — what each does and how to access it."
version: "1.0"
lastUpdated: "2026-02-26"
---

## Core Platforms

| Platform | Purpose | Access | URL |
|----------|---------|--------|-----|
| **GitHub** | Source code, pull requests, CI/CD | SSO via company email | github.com/zero-one-creative |
| **Jira** | Sprint planning, task tracking, roadmap | SSO via company email | zeroonecreative.atlassian.net |
| **Slack** | Real-time communication | Invitation from #team-ops | zeroonecreative.slack.com |
| **Notion** | Design docs, meeting notes, wikis | SSO via company email | notion.so/zeroonecreative |
| **Vercel** | Deployment, hosting, preview deploys | GitHub SSO | vercel.com/zero-one-creative |
| **Figma** | UI/UX design, prototyping | Invitation from design team | figma.com |

## Development Tools

| Tool | Purpose | Who Uses It |
|------|---------|-------------|
| **Docker** | Local services, containerised builds | All developers |
| **Supabase** | Database, auth, storage (production) | Full-stack engineers |
| **AWS S3** | Asset storage, model artifacts | ML engineers, backend |
| **Sentry** | Error tracking, performance monitoring | All developers |
| **Linear** | Bug tracking overflow (migrating to Jira) | Legacy — check Jira first |

## CI/CD Pipeline

| Stage | Tool | Trigger |
|-------|------|---------|
| Linting & formatting | GitHub Actions | Every push |
| Unit tests | GitHub Actions | Every push |
| Integration tests | GitHub Actions | PR to `main` |
| Preview deploy | Vercel | PR opened/updated |
| Production deploy | Vercel | Merge to `main` |
| ML model validation | Custom pipeline | PR to `amara-engine/main` |

## Key Slack Channels

| Channel | Purpose |
|---------|---------|
| `#general` | Company-wide announcements |
| `#team-dev` | Engineering discussions, deploy notifications |
| `#team-ops` | Access requests, onboarding, admin |
| `#daily-standup` | Async daily updates |
| `#incidents` | Production issues and incident response |
| `#random` | Non-work chat, memes, music recs |

## Access Requests

If you need access to any platform:

1. Post in **#team-ops** on Slack
2. Tag **@ops-team** with the platform name and your role
3. Access is typically granted within 2 hours during business hours

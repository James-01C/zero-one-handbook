---
title: "Branch Naming Conventions"
type: "reference"
roles:
  - developer
summary: "Quick reference for Git branch naming patterns used across all Zero One repositories."
version: "1.0"
lastUpdated: "2026-02-26"
---

## Branch Name Format

All branches follow this pattern:

```
type/TICKET-ID-short-description
```

## Branch Types

| Type | When to Use | Example |
|------|------------|---------|
| `feat` | New features or capabilities | `feat/AMRA-123-texture-picker` |
| `fix` | Bug fixes | `fix/AMRA-456-viewport-crash` |
| `refactor` | Code restructuring (no behaviour change) | `refactor/AMRA-789-extract-renderer` |
| `chore` | Tooling, dependencies, config | `chore/AMRA-101-update-eslint` |
| `docs` | Documentation changes only | `docs/AMRA-102-api-reference` |
| `test` | Adding or fixing tests | `test/AMRA-103-shader-unit-tests` |
| `hotfix` | Urgent production fix | `hotfix/AMRA-999-auth-bypass` |

## Rules

- **Always include the Jira ticket ID** — this links the branch to the task automatically
- **Use kebab-case** for the description portion
- **Keep it short** — the description should be 3-5 words max
- **No personal prefixes** — don't use your name or initials in branch names
- **Lowercase only** — except for the Jira ticket ID (e.g., `AMRA-123`)

## Special Branches

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready code | Protected — requires PR and review |
| `staging` | Pre-production testing | Protected — auto-deploys to staging |
| `release/v*` | Release candidates | Created from `main` for final QA |

## Commit Message Format

We use **Conventional Commits** for all commit messages:

```
type(scope): short description

Optional longer description explaining why,
not what (the diff shows what).

Refs: AMRA-123
```

### Common Scopes

| Scope | Covers |
|-------|--------|
| `studio` | Amara Studio (web editor) |
| `engine` | Amara Engine (ML pipeline) |
| `api` | Amara API (backend services) |
| `infra` | Infrastructure, CI/CD, deployment |
| `deps` | Dependency updates |

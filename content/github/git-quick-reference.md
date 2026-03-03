---
title: 'Git Quick Reference'
order: 3
type: 'reference'
roles:
  - developer
summary: 'Branch naming, commit format, merge strategies, and tag prefixes at a glance.'
version: '1.1'
lastUpdated: '2026-03-03'
---

## Branch Naming

| Branch Type | Format                        | Example                             |
| ----------- | ----------------------------- | ----------------------------------- |
| Production  | `prod`                        | `prod`                              |
| Development | `dev/X.Y.Z`                   | `dev/1.2.0`                         |
| Staging     | `staging`                     | `staging`                           |
| Feature     | `feature/DEV-###-description` | `feature/DEV-501-add-rate-limiting` |
| Hotfix      | `hotfix/X.Y.Z`                | `hotfix/1.2.1`                      |

Feature branch descriptions: lowercase, hyphens, brief. The `DEV-###` prefix links the branch to Jira automatically.

---

## Commit Messages

Format: `DEV-###: description`

```
DEV-501: implement rate limiter middleware
DEV-342: fix auth bypass on websocket reconnect
DEV-188: add unit tests for mesh export
```

Lowercase description. Present tense or imperative. Jira key first.

---

## Merge Strategies

| Merge          | Strategy             | PR Dropdown Choice      |
| -------------- | -------------------- | ----------------------- |
| Feature → dev  | **Squash and merge** | "Squash and merge"      |
| Dev → staging  | **Merge commit**     | "Create a merge commit" |
| Staging → prod | **Merge commit**     | "Create a merge commit" |
| Hotfix → prod  | **Merge commit**     | "Create a merge commit" |

> [!RULE]
> All merges via GitHub Pull Requests. Never merge locally.

---

## The Normal Flow

<Flow>
  <Step color="purple">feature/DEV-###</Step>
  <Arrow label="squash" />
  <Step color="blue">dev/X.Y.Z</Step>
  <Arrow label="merge" />
  <Step color="amber">staging</Step>
  <Arrow label="merge" />
  <Step color="red">prod</Step>
</Flow>

---

## Tag Prefixes

| Component     | Tag Format       | Example          |
| ------------- | ---------------- | ---------------- |
| Plugin        | `plugin/vX.Y.Z`  | `plugin/v1.2.0`  |
| PluginBackend | `backend/vX.Y.Z` | `backend/v1.2.0` |
| Website       | `website/vX.Y.Z` | `website/v1.1.0` |
| MeshGen       | `meshgen/vX.Y.Z` | `meshgen/v2.1.0` |

Only tag the components that actually changed in a release.

---

## Jira Status ↔ Git State

| Jira Status     | What Exists in Git                |
| --------------- | --------------------------------- |
| **To Do**       | No branch                         |
| **In Progress** | Feature branch, commits happening |
| **In Review**   | PR open against dev/X.Y.Z         |
| **Done**        | PR merged, feature branch deleted |

> [!RULE]
> "Done" means merged to dev, not released to prod. Release tracking happens at the Fix Version level.

---

## Feature Branch Rules

> [!RULE]
>
> 1. **Never reuse a merged branch.** New work on same ticket = new branch from dev.
> 2. **Delete immediately after merge.** Use the GitHub PR "Delete branch" button.
> 3. **Only code-change tasks get branches.** Research and scoping tasks stay in Jira only.

---

## Fix Version Mapping

```
Plugin 1.2.0 (Jira) = dev/1.2.0 (branch) = plugin/v1.2.0 (tag)
```

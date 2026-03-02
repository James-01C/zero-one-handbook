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

## Step 1: Start a Feature

Create a short-lived feature branch from the current dev branch, named with the Jira ticket key.

Switch to the dev branch and pull latest:

```bash
git checkout dev/1.2.0
git pull origin dev/1.2.0
```

Create your feature branch:

```bash
git checkout -b feature/DEV-501-add-rate-limiting
```

Always use `feature/DEV-###-short-description`. The Jira key enables automatic linking.

Push the branch to remote:

```bash
git push -u origin feature/DEV-501-add-rate-limiting
```

Work normally — commit and push as you go:

```bash
git add .
git commit -m "DEV-501: implement rate limiter middleware"
git push
```

Move your Jira ticket to **In Progress**.

## Step 2: Finish a Feature

Merge the feature back into the dev branch via GitHub PR, then clean up.

Push any remaining work:

```bash
git push
```

Open a Pull Request on GitHub. Base: `dev/1.2.0` ← Compare: `feature/DEV-501-add-rate-limiting`.

Get review and approval. Move your Jira ticket to **In Review** when the PR is open.

Merge using **"Squash and merge"** from the GitHub merge dropdown. Not regular merge, not rebase.

Delete the feature branch using the "Delete branch" button on the GitHub PR page. Or from terminal:

```bash
git branch -d feature/DEV-501-add-rate-limiting
git push origin --delete feature/DEV-501-add-rate-limiting
```

Move your Jira ticket to **Done** (write a Resolution Summary when prompted).

If more work is needed on the same ticket:

```bash
git checkout dev/1.2.0
git pull origin dev/1.2.0
git checkout -b feature/DEV-501-fix-edge-case
```

Never reuse a merged feature branch. Always create a fresh one from dev.

## Step 3: Promote Dev to Staging

Move a dev branch to the staging environment for pre-production testing.

Announce in the team channel. Post what you're deploying and how long you need staging. Wait for the all-clear.

Open a Pull Request on GitHub. Base: `staging` ← Compare: `dev/1.2.0`.

Merge using **"Create a merge commit"**. Use regular merge commit — not squash, not rebase.

> **Rule:** Only the current dev/X.Y.Z should be merged to staging. Anything else must be announced and confirmed by the team.

## Step 4: Release to Production

Ship a tested staging build to production and tag the release.

Confirm staging has been tested. Get peer sign-off from the most appropriate developer.

Open a Pull Request. Base: `prod` ← Compare: `staging`.

Merge using **"Create a merge commit"**.

Tag the release:

```bash
git checkout prod
git pull origin prod
git tag plugin/v1.2.0
git tag backend/v1.2.0
git push origin --tags
```

Only tag the components that actually changed.

Post-release:

- Update `compatibility.json` if component versions changed
- Mark the relevant Jira Fix Versions as Released
- Post a brief release summary in Slack
- Create the next `dev/X.Y.Z` branch from `prod`
- Delete the old dev branch

## Step 5: Hotfix

Fix a critical production bug. The path depends on whether staging has unreleased work.

Create the hotfix branch from prod:

```bash
git checkout prod
git pull origin prod
git checkout -b hotfix/1.2.1
```

Hotfixes always bump the patch version.

Fix, commit, and push:

```bash
git add .
git commit -m "hotfix: fix critical auth bypass"
git push -u origin hotfix/1.2.1
```

Choose the merge path:

**Path A — Staging is clean (matches prod):** PR from `hotfix/1.2.1` → `staging` (merge commit). Test on staging. Then PR from `staging` → `prod` (merge commit).

**Path B — Staging has unreleased features:** Either temporarily commandeer staging (announce first, redeploy previous state after), or skip staging and PR directly from `hotfix/1.2.1` → `prod` after thorough review.

Tag the release:

```bash
git checkout prod
git pull origin prod
git tag backend/v1.2.1
git push origin --tags
```

Tag only the component(s) that were fixed.

Merge hotfix forward:

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

Clean up:

```bash
git branch -d hotfix/1.2.1
git push origin --delete hotfix/1.2.1
```

Jira and Slack:

- Create a Hotfix epic in Jira: `[Component] Hotfix X.Y.Z`
- Mark the Fix Version as Released
- Post in Slack: what broke, what was fixed, what version

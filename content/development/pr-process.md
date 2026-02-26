---
title: "How to Open a Pull Request"
type: "sop"
roles:
  - developer
summary: "Step-by-step process for opening, reviewing, and merging PRs at Zero One Creative."
version: "1.0"
lastUpdated: "2026-02-26"
---

## Step 1: Create a Feature Branch

Branch off `main` using our naming convention (see the Branch Naming reference). Make sure your local `main` is up to date first:

```bash
git checkout main
git pull origin main
git checkout -b feat/AMRA-123-add-texture-picker
```

## Step 2: Make Your Changes

Write your code, committing early and often. Each commit should be a logical unit of work with a clear message:

```
feat(studio): add texture picker component

- Created TexturePicker with grid and list views
- Added keyboard navigation support
- Connected to asset library API
```

Follow the conventional commits format: `type(scope): description`.

## Step 3: Push and Open the PR

Push your branch and open a pull request on GitHub:

```bash
git push -u origin feat/AMRA-123-add-texture-picker
```

In the PR description, include:

- **What** — a brief summary of the changes
- **Why** — the motivation or linked Jira ticket
- **How** — any notable implementation decisions
- **Screenshots** — if there are visual changes, include before/after screenshots
- **Testing** — describe how you verified it works

## Step 4: Request Review

Add at least one reviewer. For most changes, any team member can review. For changes touching:

- **ML pipelines** → tag an ML engineer
- **Infrastructure/deployment** → tag a senior engineer
- **API contracts** → tag both frontend and backend engineers

The PR should be linked to the Jira ticket by including the ticket ID in the branch name or PR title.

## Step 5: Address Feedback

Reviewers may leave comments or request changes. Respond to every comment — either make the change or explain why you disagree. Push new commits to the same branch; don't force-push during review.

Mark conversations as resolved once addressed.

## Step 6: Merge

Once you have at least one approval and CI is green:

1. **Squash and merge** — this keeps the main branch history clean
2. Delete the feature branch after merging
3. Move the Jira ticket to "Done"
4. If the change affects other team members, post a brief note in #team-dev on Slack

> **Important:** Never merge your own PR without at least one review, even for small changes. The only exception is typo fixes or documentation updates.

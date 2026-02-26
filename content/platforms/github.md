---
title: "How to Set Up GitHub Access"
type: "sop"
roles:
  - developer
summary: "Step-by-step process for configuring your GitHub account, SSH keys, and repository access."
version: "1.0"
lastUpdated: "2026-02-26"
---

## Step 1: Create or Link Your GitHub Account

If you already have a GitHub account, you can use it — just make sure your Zero One email is added as a verified email address.

Go to **GitHub Settings → Emails** and add your `@zeroonecreative.com` email. Verify it via the confirmation link.

## Step 2: Request Organisation Access

Post in **#team-ops** on Slack:

> "Requesting GitHub org access — my GitHub username is `@yourusername`"

An admin will send you an invitation to the `zero-one-creative` organisation. Accept it from your GitHub notifications.

## Step 3: Set Up SSH Keys

Generate a new SSH key for your work machine:

```bash
ssh-keygen -t ed25519 -C "you@zeroonecreative.com"
```

Add the public key to your GitHub account:

1. Copy the key: `cat ~/.ssh/id_ed25519.pub`
2. Go to **GitHub Settings → SSH and GPG keys → New SSH key**
3. Paste the key and save

## Step 4: Configure Git Identity

Set your Git identity to match your company profile:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@zeroonecreative.com"
```

## Step 5: Clone Your First Repo

Test that everything works by cloning a repository:

```bash
git clone git@github.com:zero-one-creative/amara-studio.git
```

If the clone succeeds, you're all set.

## Step 6: Enable Branch Protection Notifications

Go to **GitHub Settings → Notifications** and make sure you're subscribed to:

- PRs where you're requested as a reviewer
- Mentions and team mentions
- CI/CD failure notifications on your PRs

> **Note:** We use GitHub's built-in code review tools. Install the GitHub CLI (`gh`) for a faster workflow — see `gh pr create`, `gh pr checkout`, and `gh pr review`.

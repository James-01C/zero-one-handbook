---
title: "Security Practices"
type: "policy"
roles:
  - all
summary: "Security expectations for all team members — handling credentials, access controls, and incident response."
version: "1.0"
lastUpdated: "2026-02-26"
---

## TL;DR

Never commit secrets. Use strong passwords with a password manager. Report anything suspicious immediately. Security is everyone's responsibility, not just engineering's.

## Credentials & Secrets

### Rules

- **Never commit secrets to Git** — no API keys, passwords, tokens, or certificates in code. Use `.env` files and ensure they're in `.gitignore`.
- **Use a password manager** — 1Password is provided to all team members. Use it for everything.
- **Enable 2FA everywhere** — GitHub, Jira, Slack, AWS, Supabase. No exceptions.
- **Don't share credentials via Slack or email** — use 1Password shared vaults or secure one-time links.

### Rotating Secrets

If you suspect a credential has been exposed:

1. Rotate the credential immediately
2. Post in **#incidents** on Slack
3. Check Git history — if it was committed, the rotation is even more urgent
4. Update the credential in all environments (local, staging, production)

## Access Control

### Principle of Least Privilege

You should only have access to the systems you need for your current role. Don't request access "just in case."

- **Production databases** — read access for debugging is available; write access requires manager approval
- **AWS console** — limited to the services your team owns
- **Deployment credentials** — managed by CI/CD, not stored locally

### Offboarding

When someone leaves the team, their access is revoked within 24 hours across all platforms. If you notice a former team member still has access to something, report it to #team-ops.

## Incident Response

If you discover a security issue:

1. **Don't panic** — but do act quickly
2. **Contain** — if it's an active breach, take the affected system offline
3. **Report** — post in #incidents and DM the engineering lead
4. **Document** — write down what you know: what happened, when, what's affected
5. **Don't discuss publicly** — security incidents stay in #incidents until resolved

## Code Security

### For Developers

- Validate all user input — never trust data from the client
- Use parameterised queries — no string concatenation in database queries
- Keep dependencies updated — run `npm audit` regularly
- Review security-sensitive PRs with extra care (auth, payments, data access)

## Why This Matters

We handle user data and creative assets. A security breach doesn't just affect us — it affects every creator who trusts Amara with their work. Taking security seriously is how we earn and keep that trust.

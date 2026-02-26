---
title: "Code Review Guidelines"
type: "guide"
roles:
  - developer
summary: "How to give and receive effective code reviews that improve code quality without slowing the team down."
version: "1.0"
lastUpdated: "2026-02-26"
---

## Why We Review Code

Code review isn't about gatekeeping or catching mistakes — it's about shared ownership. Every line of code that ships is the team's code, not one person's. Reviews help us:

- **Spread knowledge** — everyone learns how different parts of the system work
- **Catch bugs early** — a second pair of eyes catches things the author misses
- **Maintain consistency** — we keep the codebase coherent as the team grows
- **Mentor each other** — reviews are one of the best ways to learn and teach

## For Reviewers

### What to Look For

Focus your review on these areas, roughly in order of importance:

1. **Correctness** — Does it do what it claims to do? Are there edge cases?
2. **Design** — Does it fit the system's architecture? Is the abstraction level right?
3. **Readability** — Will someone unfamiliar with this code understand it in 6 months?
4. **Performance** — Are there obvious performance issues? (Don't optimise prematurely though.)
5. **Testing** — Are the important paths tested? Are the tests meaningful?

### How to Give Feedback

- **Be specific** — "This could be clearer" is less helpful than "Consider renaming `processData` to `validateUserInput` since that's what it actually does."
- **Explain why** — Don't just say what to change; explain the reasoning.
- **Distinguish must-fix from nice-to-have** — Prefix optional suggestions with "Nit:" or "Optional:" so the author knows what's blocking approval.
- **Praise good work** — If you see something clever or well-structured, say so.

> **Tip:** If a comment thread is going back and forth more than twice, move the conversation to a quick Slack call. Text-based debates rarely converge.

### Turnaround Time

- Aim to review PRs within **4 hours** of being tagged
- If you can't review that quickly, let the author know so they can find another reviewer
- Small PRs (< 200 lines) should be reviewed within **2 hours**

## For Authors

### Make It Easy to Review

- **Keep PRs small** — under 400 lines of meaningful changes. Split larger work into stacked PRs.
- **Write a good description** — explain what, why, and how. Link the Jira ticket.
- **Self-review first** — read through your own diff before requesting review. You'll catch the obvious things.
- **Respond to every comment** — either make the change or explain your reasoning. Don't leave comments unresolved.

### Receiving Feedback

- **Don't take it personally** — feedback is about the code, not about you.
- **Assume good intent** — if a comment feels harsh, assume it was written quickly, not maliciously.
- **Learn from patterns** — if you get the same feedback repeatedly, it's worth internalising.

## Review Checklist

When reviewing, mentally check:

- [ ] Does the PR description explain the change clearly?
- [ ] Is the code doing what the ticket/description says?
- [ ] Are there tests for the new/changed behaviour?
- [ ] Are there any security concerns (user input handling, auth checks)?
- [ ] Will this work at scale (if relevant)?
- [ ] Is the code consistent with our existing patterns?
- [ ] Are error cases handled?

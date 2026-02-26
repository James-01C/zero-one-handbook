---
title: "Setting Up Your Dev Environment"
type: "sop"
roles:
  - developer
summary: "Step-by-step guide to getting your local development environment ready for Amara development."
version: "1.0"
lastUpdated: "2026-02-26"
---

## Step 1: Install Prerequisites

Make sure you have the following installed on your machine before proceeding:

- **Node.js 20+** — we recommend using `nvm` to manage versions
- **pnpm** — our package manager of choice (`npm install -g pnpm`)
- **Docker Desktop** — required for running local services
- **Git** — configured with your Zero One GitHub email

Verify your setup by running:

```bash
node --version    # Should be 20.x or higher
pnpm --version    # Should be 9.x or higher
docker --version  # Should be 24.x or higher
```

## Step 2: Clone the Repositories

Clone the repos you'll be working with into a common directory:

```bash
mkdir ~/zero-one && cd ~/zero-one
git clone git@github.com:zero-one-creative/amara-studio.git
git clone git@github.com:zero-one-creative/amara-api.git
git clone git@github.com:zero-one-creative/amara-engine.git
```

## Step 3: Configure Environment Variables

Each repo has a `.env.example` file. Copy it and fill in the values:

```bash
cd amara-studio
cp .env.example .env.local
```

Ask in #team-dev on Slack for any API keys or secrets you need. Never commit `.env.local` files.

## Step 4: Install Dependencies

Run the install command in each repo:

```bash
pnpm install
```

This will also set up Git hooks via Husky for pre-commit linting and formatting.

## Step 5: Start Local Services

Use Docker Compose to spin up the local database and services:

```bash
docker compose up -d
```

Then start the development server:

```bash
pnpm dev
```

The app should be available at `http://localhost:3000`.

## Step 6: Verify Everything Works

Run the test suite to confirm your environment is correctly configured:

```bash
pnpm test
```

All tests should pass. If you see failures related to environment variables or missing services, double-check Steps 3 and 5.

> **Troubleshooting:** If Docker containers fail to start, make sure Docker Desktop is running and you have at least 8GB of RAM allocated to it. Check #team-dev for known issues.

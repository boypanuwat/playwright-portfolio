# playwright-portfolio

Playwright E2E portfolio project for the public QA Automation Practice demo app.

Target app:

https://qa-automation-practice.netlify.app

## Structure

```text
config/
fixtures/
pages/
support/
test-data/
test-ids/
tests/
skill-codex/
```

## Setup

```bash
corepack enable
corepack prepare pnpm@9 --activate
pnpm install
pnpm install:browsers
```

Optional:

```bash
QA_PRACTICE_EMAIL=admin@admin.com
QA_PRACTICE_PASSWORD=admin123
TARGET_ENV=production
```

## Commands

```bash
pnpm lint
pnpm typecheck
pnpm test:qa-practice
pnpm test:smoke
TARGET_ENV=production pnpm test:qa-practice --grep "SCRUM-TC-1001"
pnpm test:ui
```

## GitHub Actions

The CI workflow lives at `.github/workflows/playwright.yml` and runs on pushes or pull requests to `main` and `develop`.

It runs:

```bash
pnpm lint
pnpm typecheck
pnpm test:qa-practice --grep "@smoke"
```

Optional repository secrets:

```text
QA_PRACTICE_EMAIL
QA_PRACTICE_PASSWORD
```

## Test Writing Rules

- Specs import from `fixtures/qa-practice`.
- Specs contain no raw locators.
- UI interaction lives in Page Objects.
- Reusable data comes from `test-data/qa-practice`.
- Stable `data-testid` values go in `test-ids/qa-practice.ts`.
- The public demo app often has no test IDs, so Page Objects may use role/label/placeholder fallbacks.

For detailed assistant guidance, see `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, and `skill-codex/playwright-test-writer/SKILL.md`.

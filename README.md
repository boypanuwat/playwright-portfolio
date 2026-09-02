# playwright-portfolio

## ภาษาไทย

โปรเจกต์นี้เป็นตัวอย่าง Playwright E2E Automation สำหรับเว็บ demo:

```text
https://qa-automation-practice.netlify.app
```

ครอบคลุม test cases จาก `testcase.md` จำนวน 40 เคส สำหรับ Login, Shopping Cart, Ecommerce Auth Flow, Register, Recover Password และ Automation/NFR checks

## รันบน GitHub Actions

Workflow อยู่ที่:

```text
.github/workflows/playwright.yml
```

สิ่งที่ CI ทำ:

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium
pnpm lint
pnpm typecheck
pnpm test:qa-practice --grep "@smoke"
```

วิธีรันเองบน GitHub:

1. Push code ขึ้น GitHub
2. เข้า repo บน GitHub
3. ไปที่แท็บ `Actions`
4. เลือก workflow `Playwright CI`
5. กด `Run workflow`

Secrets ที่ตั้งเพิ่มได้ใน GitHub repo:

```text
QA_PRACTICE_EMAIL
QA_PRACTICE_PASSWORD
```

ถ้าไม่ตั้ง secrets ระบบจะใช้ demo credentials จาก `config/accounts.ts`

## ต้องมีอะไรบ้าง

- Node.js 20+
- pnpm 9+
- Playwright browsers
- Git
- Internet access เพื่อเปิดเว็บ demo และดาวน์โหลด browser ตอน setup

## ต้องทำอะไรบ้างเมื่อลงเครื่องใหม่

ติดตั้ง dependencies:

```bash
corepack enable
corepack prepare pnpm@9 --activate
pnpm install
pnpm install:browsers
```

ตั้งค่า environment variables ได้ถ้าต้องการ override demo credentials:

```bash
QA_PRACTICE_EMAIL=admin@admin.com
QA_PRACTICE_PASSWORD=admin123
TARGET_ENV=production
```

รันตรวจพื้นฐาน:

```bash
pnpm lint
pnpm typecheck
```

รัน test:

```bash
pnpm test:qa-practice
pnpm test:smoke
TARGET_ENV=production pnpm test:qa-practice --grep "TC-LOGIN-001"
pnpm test:ui
```

## โครงสร้างโปรเจกต์

```text
config/                    # environment และ credentials config
fixtures/                  # Playwright fixtures
pages/                     # Page Object Model
support/                   # shared helpers เช่น aioTag
test-data/                 # test data factories
test-ids/                  # data-testid catalogue
tests/                     # Playwright specs
.github/workflows/         # GitHub Actions workflows
```

## กติกาการเขียน Test

- Spec files ต้อง import จาก `fixtures/qa-practice`
- ห้ามใช้ raw locator ใน spec เช่น `page.locator`, `page.getByTestId`, `getByText`
- UI interaction ต้องอยู่ใน Page Object
- Test data ต้องมาจาก `test-data/qa-practice`
- URL ต้องมาจาก `config/environments.ts`
- Credentials ต้องมาจาก `config/accounts.ts` หรือ environment variables
- Critical path tests ต้องมี `@smoke`

## English

This project is a Playwright E2E automation portfolio for the public demo app:

```text
https://qa-automation-practice.netlify.app
```

It implements 40 test cases from `testcase.md`, covering Login, Shopping Cart, Ecommerce Auth Flow, Register, Recover Password, and Automation/NFR checks.

## Run On GitHub Actions

The workflow file is:

```text
.github/workflows/playwright.yml
```

CI steps:

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium
pnpm lint
pnpm typecheck
pnpm test:qa-practice --grep "@smoke"
```

To run it manually:

1. Push the code to GitHub
2. Open the GitHub repository
3. Go to the `Actions` tab
4. Select `Playwright CI`
5. Click `Run workflow`

Optional repository secrets:

```text
QA_PRACTICE_EMAIL
QA_PRACTICE_PASSWORD
```

If the secrets are not configured, the suite uses the demo credentials from `config/accounts.ts`.

## Requirements

- Node.js 20+
- pnpm 9+
- Playwright browsers
- Git
- Internet access for the demo app and browser installation

## First-Time Setup

Install dependencies:

```bash
corepack enable
corepack prepare pnpm@9 --activate
pnpm install
pnpm install:browsers
```

Optional environment variables:

```bash
QA_PRACTICE_EMAIL=admin@admin.com
QA_PRACTICE_PASSWORD=admin123
TARGET_ENV=production
```

Run basic checks:

```bash
pnpm lint
pnpm typecheck
```

Run tests:

```bash
pnpm test:qa-practice
pnpm test:smoke
TARGET_ENV=production pnpm test:qa-practice --grep "TC-LOGIN-001"
pnpm test:ui
```

## Project Structure

```text
config/                    # environment and credentials config
fixtures/                  # Playwright fixtures
pages/                     # Page Object Model
support/                   # shared helpers such as aioTag
test-data/                 # test data factories
test-ids/                  # data-testid catalogue
tests/                     # Playwright specs
.github/workflows/         # GitHub Actions workflows
```

## Test Writing Rules

- Spec files must import from `fixtures/qa-practice`
- Do not use raw locators in specs, such as `page.locator`, `page.getByTestId`, or `getByText`
- UI interactions belong in Page Objects
- Test data must come from `test-data/qa-practice`
- URLs must come from `config/environments.ts`
- Credentials must come from `config/accounts.ts` or environment variables
- Critical path tests must include `@smoke`

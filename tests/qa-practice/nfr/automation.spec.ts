import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { aioTag } from "../../../support/aio";
import { expect, test } from "../../../fixtures/qa-practice";

const repoRoot = process.cwd();

async function readProjectFile(path: string): Promise<string> {
  return readFile(join(repoRoot, path), "utf8");
}

async function specFiles(directory = "tests/qa-practice"): Promise<string[]> {
  const entries = await readdir(join(repoRoot, directory), { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return specFiles(entryPath);
      }

      return entry.name.endsWith(".spec.ts") ? [entryPath] : [];
    })
  );

  return files.flat();
}

async function productSpecFiles(): Promise<string[]> {
  const files = await specFiles();

  return files.filter((file) => !file.includes("/nfr/"));
}

test.describe("Automation NFR - qa-practice @smoke", () => {
  test("TC-NFR-007: ตรวจสอบ Smoke Tag ของ Critical Path", async () => {
    aioTag("TC-NFR-007");

    const files = await productSpecFiles();
    const contents = await Promise.all(files.map((file) => readProjectFile(file)));

    await expect(contents.some((content) => content.includes("@smoke"))).toBeTruthy();
  });
});

test.describe("Automation NFR - qa-practice", () => {
  test("TC-NFR-001: ตรวจสอบ Automated Tests รันบน Local", async () => {
    aioTag("TC-NFR-001");

    const packageJson = await readProjectFile("package.json");

    await expect(packageJson).toContain("\"test:qa-practice\"");
  });

  test("TC-NFR-002: ตรวจสอบ Automated Tests บน GitHub Actions", async () => {
    aioTag("TC-NFR-002");

    const workflow = await readProjectFile(".github/workflows/playwright.yml");

    await expect(workflow).toContain("pnpm test:qa-practice --grep \"@smoke\"");
  });

  test("TC-NFR-003: ตรวจสอบ Page Object Model และ Raw Locator", async () => {
    aioTag("TC-NFR-003");

    const files = await productSpecFiles();
    const contents = await Promise.all(files.map((file) => readProjectFile(file)));
    const specs = contents.join("\n");

    await expect(specs).not.toMatch(/\bpage\.(locator|getByTestId|getByRole|getByLabel|getByPlaceholder)\(/);
  });

  test("TC-NFR-004: ตรวจสอบ Test Data Factory", async () => {
    aioTag("TC-NFR-004");

    const files = await productSpecFiles();
    const contents = await Promise.all(files.map((file) => readProjectFile(file)));

    await expect(contents.some((content) => content.includes("../../../test-data/qa-practice"))).toBeTruthy();
  });

  test("TC-NFR-005: ตรวจสอบ Environment URL Configuration", async () => {
    aioTag("TC-NFR-005");

    const config = await readProjectFile("config/environments.ts");
    const files = await productSpecFiles();
    const specs = (await Promise.all(files.map((file) => readProjectFile(file)))).join("\n");

    await expect(config).toContain("https://qa-automation-practice.netlify.app");
    await expect(specs).not.toContain("https://qa-automation-practice.netlify.app");
  });

  test("TC-NFR-006: ตรวจสอบ Credential Configuration", async () => {
    aioTag("TC-NFR-006");

    const accountConfig = await readProjectFile("config/accounts.ts");
    const files = await productSpecFiles();
    const specs = (await Promise.all(files.map((file) => readProjectFile(file)))).join("\n");

    await expect(accountConfig).toContain("QA_PRACTICE_EMAIL");
    await expect(accountConfig).toContain("QA_PRACTICE_PASSWORD");
    await expect(specs).not.toContain("admin@admin.com");
    await expect(specs).not.toContain("admin123");
  });
});

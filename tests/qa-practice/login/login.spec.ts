import { aioTag } from "../../../support/aio";
import { expect, test } from "../../../fixtures/qa-practice";
import {
  emptyLogin,
  loginWithInvalidEmailFormat,
  loginWithWrongPassword,
  loginWithoutEmail,
  loginWithoutPassword,
  validLogin
} from "../../../test-data/qa-practice/login/data";

test.describe("Login - qa-practice @smoke", () => {
  test("TC-LOGIN-001: ตรวจสอบองค์ประกอบหน้า Login", async ({ loginPage }) => {
    aioTag("TC-LOGIN-001");

    await loginPage.goto();

    await expect(loginPage.heading).toBeVisible();
    await loginPage.expectReady();
  });

  test("TC-LOGIN-002: Login ด้วย Demo Credential", async ({ loginPage }) => {
    aioTag("TC-LOGIN-002");

    const user = validLogin();

    await loginPage.goto();
    await loginPage.login(user);

    await expect(loginPage.message).toBeVisible();
    await loginPage.expectSuccessFor(user.email);
  });
});

test.describe("Login - qa-practice", () => {
  test("TC-LOGIN-003: Login โดยไม่กรอกข้อมูล", async ({ loginPage }) => {
    aioTag("TC-LOGIN-003");

    await loginPage.goto();
    await loginPage.login(emptyLogin());

    await expect(loginPage.message).toBeVisible();
    await loginPage.expectBadCredentials();
  });

  test("TC-LOGIN-004: Login โดยไม่กรอก Email", async ({ loginPage }) => {
    aioTag("TC-LOGIN-004");

    await loginPage.goto();
    await loginPage.login(loginWithoutEmail());

    await expect(loginPage.message).toBeVisible();
    await loginPage.expectBadCredentials();
  });

  test("TC-LOGIN-005: Login โดยไม่กรอก Password", async ({ loginPage }) => {
    aioTag("TC-LOGIN-005");

    await loginPage.goto();
    await loginPage.login(loginWithoutPassword());

    await expect(loginPage.message).toBeVisible();
    await loginPage.expectBadCredentials();
  });

  test("TC-LOGIN-006: Login ด้วย Password ไม่ถูกต้อง", async ({ loginPage }) => {
    aioTag("TC-LOGIN-006");

    await loginPage.goto();
    await loginPage.login(loginWithWrongPassword());

    await expect(loginPage.message).toBeVisible();
    await loginPage.expectBadCredentials();
  });

  test("TC-LOGIN-007: Login ด้วย Email format ไม่ถูกต้อง", async ({ loginPage }) => {
    aioTag("TC-LOGIN-007");

    await loginPage.goto();
    await loginPage.login(loginWithInvalidEmailFormat());

    await expect(loginPage.message).toBeVisible();
    await loginPage.expectBadCredentials();
  });
});

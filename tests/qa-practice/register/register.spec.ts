import { aioTag } from "../../../support/aio";
import { expect, test } from "../../../fixtures/qa-practice";
import {
  registrationWithoutEmail,
  registrationWithoutEmailAndPassword,
  registrationWithoutPassword,
  validRegistration
} from "../../../test-data/qa-practice/register/data";

test.describe("Register - qa-practice @smoke", () => {
  test("TC-REG-001: ตรวจสอบหน้า Register", async ({ registerPage }) => {
    aioTag("TC-REG-001");

    await registerPage.goto();

    await expect(registerPage.heading).toBeVisible();
    await registerPage.expectReady();
  });

  test("TC-REG-003: Register ด้วยข้อมูลครบถ้วน", async ({ registerPage }) => {
    aioTag("TC-REG-003");

    await registerPage.goto();
    await registerPage.fill(validRegistration());
    await registerPage.submit();

    await expect(registerPage.message).toBeVisible();
    await registerPage.expectCreated();
  });
});

test.describe("Register - qa-practice", () => {
  test("TC-REG-002: เลือก Country จาก Dropdown", async ({ registerPage }) => {
    aioTag("TC-REG-002");

    const data = validRegistration();

    await registerPage.goto();
    await registerPage.selectCountry(data.country);

    await expect(registerPage.countrySelect).toBeVisible();
    await registerPage.expectCountrySelected(data.country);
  });

  test("TC-REG-004: Register โดยไม่ยอมรับ Terms", async () => {
    test.fixme(
      true,
      "เว็บ demo ปัจจุบันไม่ได้ validate terms checkbox และสร้าง account ได้เมื่อ email/password มีค่า"
    );
  });

  test("TC-REG-005: Register โดย Email ว่าง", async ({ registerPage }) => {
    aioTag("TC-REG-005");

    await registerPage.goto();
    await registerPage.fill(registrationWithoutEmail());
    await registerPage.submit();

    await expect(registerPage.message).toBeHidden();
    await registerPage.expectNotCreated();
  });

  test("TC-REG-006: Register โดย Password ว่าง", async ({ registerPage }) => {
    aioTag("TC-REG-006");

    await registerPage.goto();
    await registerPage.fill(registrationWithoutPassword());
    await registerPage.submit();

    await expect(registerPage.message).toBeHidden();
    await registerPage.expectNotCreated();
  });

  test("TC-REG-007: Register โดย Email และ Password ว่าง", async ({ registerPage }) => {
    aioTag("TC-REG-007");

    await registerPage.goto();
    await registerPage.fill(registrationWithoutEmailAndPassword());
    await registerPage.submit();

    await expect(registerPage.message).toBeHidden();
    await registerPage.expectNotCreated();
  });
});

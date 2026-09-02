import { aioTag } from "../../../support/aio";
import { expect, test } from "../../../fixtures/qa-practice";
import { validRecoveryEmail } from "../../../test-data/qa-practice/recover-password/data";

test.describe("Recover Password - qa-practice @smoke", () => {
  test("TC-RECOVER-001: ตรวจสอบหน้า Recover Password", async ({ recoverPasswordPage }) => {
    aioTag("TC-RECOVER-001");

    await recoverPasswordPage.goto();

    await expect(recoverPasswordPage.heading).toBeVisible();
    await recoverPasswordPage.expectReady();
  });
});

test.describe("Recover Password - qa-practice", () => {
  test("TC-RECOVER-002: Recover ด้วย Email format ถูกต้อง", async ({ recoverPasswordPage }) => {
    aioTag("TC-RECOVER-002");

    const email = validRecoveryEmail();

    await recoverPasswordPage.goto();
    await recoverPasswordPage.recover(email);

    await expect(recoverPasswordPage.message).toBeVisible();
    await recoverPasswordPage.expectRequestAccepted(email);
  });

  test("TC-RECOVER-003: Recover โดยไม่กรอก Email", async ({ recoverPasswordPage }) => {
    aioTag("TC-RECOVER-003");

    await recoverPasswordPage.goto();
    await recoverPasswordPage.submit();

    await expect(recoverPasswordPage.message).toBeHidden();
    await recoverPasswordPage.expectRequestNotAccepted();
  });

  test("TC-RECOVER-004: Recover ด้วย Email format ไม่ถูกต้อง", async () => {
    test.fixme(
      true,
      "เว็บ demo ปัจจุบัน validate แค่ email มีค่า จึงรับ email format ไม่ถูกต้องตาม expected ใน testcase.md"
    );
  });
});

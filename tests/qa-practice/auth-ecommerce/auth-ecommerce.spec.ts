import { aioTag } from "../../../support/aio";
import { expect, test } from "../../../fixtures/qa-practice";
import { productCatalog, products } from "../../../test-data/qa-practice/cart/data";
import { incompleteShippingDetails, validShippingDetails } from "../../../test-data/qa-practice/auth-ecommerce/data";
import { validLogin } from "../../../test-data/qa-practice/login/data";

test.describe("Ecommerce Auth Flow - qa-practice @smoke", () => {
  test("TC-AUTH-001: ตรวจสอบ Ecommerce Login Shop", async ({ authEcommercePage }) => {
    aioTag("TC-AUTH-001");

    await authEcommercePage.goto();

    await expect(authEcommercePage.loginHeading).toBeVisible();
    await authEcommercePage.expectLoginReady();
  });

  test("TC-AUTH-002: Submit Login Shop", async ({ authEcommercePage }) => {
    aioTag("TC-AUTH-002");

    await authEcommercePage.mockProducts(productCatalog());
    await authEcommercePage.goto();
    await authEcommercePage.login(validLogin());

    await expect(authEcommercePage.cartHeading).toBeVisible();
    await authEcommercePage.expectShopFlowReady();
  });

  test("TC-AUTH-004: Submit Order ด้วย Shipping Details ครบ", async ({ authEcommercePage }) => {
    aioTag("TC-AUTH-004");

    const details = validShippingDetails();

    await authEcommercePage.mockProducts(productCatalog());
    await authEcommercePage.goto();
    await authEcommercePage.login(validLogin());
    await authEcommercePage.addProduct(products.iphone12);
    await authEcommercePage.proceedToCheckout();
    await authEcommercePage.fillShipping(details);
    await authEcommercePage.submitOrder();

    await expect(authEcommercePage.message).toBeVisible();
    await authEcommercePage.expectOrderSubmitted(details);
  });
});

test.describe("Ecommerce Auth Flow - qa-practice", () => {
  test("TC-AUTH-003: ตรวจสอบ Shipping Details Form", async ({ authEcommercePage }) => {
    aioTag("TC-AUTH-003");

    const details = validShippingDetails();

    await authEcommercePage.mockProducts(productCatalog());
    await authEcommercePage.goto();
    await authEcommercePage.login(validLogin());
    await authEcommercePage.proceedToCheckout();
    await authEcommercePage.expectShippingFieldsReady();
    await authEcommercePage.fillShipping(details);

    await expect(authEcommercePage.shippingHeading).toBeVisible();
    await authEcommercePage.expectShippingValues(details);
  });

  test("TC-AUTH-005: Submit Order เมื่อ Shipping Details ไม่ครบ", async ({ authEcommercePage }) => {
    aioTag("TC-AUTH-005");

    await authEcommercePage.mockProducts(productCatalog());
    await authEcommercePage.goto();
    await authEcommercePage.login(validLogin());
    await authEcommercePage.proceedToCheckout();
    await authEcommercePage.fillShipping(incompleteShippingDetails());
    await authEcommercePage.submitOrder();

    await expect(authEcommercePage.shippingHeading).toBeVisible();
    await authEcommercePage.expectOrderNotSubmitted();
  });

  test("TC-AUTH-006: ตรวจสอบ Cart คงอยู่ระหว่าง Checkout", async () => {
    test.fixme(
      true,
      "เว็บ demo ปัจจุบัน remove cart/products section หลัง Proceed to Checkout จึงไม่สามารถตรวจ cart คงอยู่ตาม expected ใน testcase.md"
    );
  });

  test("TC-AUTH-007: ตรวจสอบ Total คงอยู่ระหว่าง Checkout", async () => {
    test.fixme(
      true,
      "เว็บ demo ปัจจุบัน remove cart/products section หลัง Proceed to Checkout จึงไม่สามารถตรวจ total คงอยู่ตาม expected ใน testcase.md"
    );
  });
});

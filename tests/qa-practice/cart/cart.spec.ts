import { aioTag } from "../../../support/aio";
import { expect, test } from "../../../fixtures/qa-practice";
import { cartTotal, productCatalog, products } from "../../../test-data/qa-practice/cart/data";

test.describe("Shopping Cart - qa-practice @smoke", () => {
  test("TC-CART-001: ตรวจสอบหน้า Shopping Cart เริ่มต้น", async ({ productsPage }) => {
    aioTag("TC-CART-001");

    await productsPage.mockProducts(productCatalog());
    await productsPage.goto();

    await expect(productsPage.heading).toBeVisible();
    await productsPage.expectInitialCart();
  });

  test("TC-CART-003: เพิ่ม iPhone 12 ลง Cart", async ({ productsPage }) => {
    aioTag("TC-CART-003");

    await productsPage.mockProducts(productCatalog());
    await productsPage.goto();
    await productsPage.addProduct(products.iphone12);

    await expect(productsPage.total).toBeVisible();
    await productsPage.expectCartLine(products.iphone12, 1);
    await productsPage.expectTotal(products.iphone12.price);
  });

  test("TC-CART-007: ตรวจสอบ Purchase/Checkout เมื่อ Cart มีสินค้า", async ({ productsPage }) => {
    aioTag("TC-CART-007");

    await productsPage.mockProducts(productCatalog());
    await productsPage.goto();
    await productsPage.addProduct(products.iphone12);

    await expect(productsPage.purchaseButton).toBeEnabled();
    await productsPage.expectPurchaseReady();
  });
});

test.describe("Shopping Cart - qa-practice", () => {
  test("TC-CART-002: ตรวจสอบรายการสินค้าและราคา", async ({ productsPage }) => {
    aioTag("TC-CART-002");

    const catalog = productCatalog();

    await productsPage.mockProducts(catalog);
    await productsPage.goto();

    await expect(productsPage.heading).toBeVisible();
    for (const product of catalog) {
      await productsPage.expectProductVisible(product);
    }
  });

  test("TC-CART-004: เพิ่ม Huawei และ Nokia", async ({ productsPage }) => {
    aioTag("TC-CART-004");

    const selectedProducts = [products.huaweiMate20, products.nokia105];

    await productsPage.mockProducts(productCatalog());
    await productsPage.goto();
    await productsPage.addProducts(selectedProducts);

    await expect(productsPage.total).toBeVisible();
    await productsPage.expectCartLine(products.huaweiMate20, 1);
    await productsPage.expectCartLine(products.nokia105, 1);
    await productsPage.expectTotal(cartTotal(selectedProducts));
  });

  test("TC-CART-005: เพิ่มสินค้ารายการเดิมซ้ำ", async () => {
    test.fixme(
      true,
      "เว็บ demo ปัจจุบันแสดง alert และไม่เพิ่ม quantity เมื่อ add สินค้าซ้ำ จึงขัดกับ expected quantity=2 ใน testcase.md"
    );
  });

  test("TC-CART-006: ตรวจสอบ Total ของสินค้าหลายรายการ", async ({ productsPage }) => {
    aioTag("TC-CART-006");

    const selectedProducts = [products.iphone12, products.huaweiMate20, products.nokia105];

    await productsPage.mockProducts(productCatalog());
    await productsPage.goto();
    await productsPage.addProducts(selectedProducts);

    await expect(productsPage.total).toBeVisible();
    await productsPage.expectTotal(cartTotal(selectedProducts));
  });

  test("TC-CART-008: ดำเนินการ Purchase/Checkout", async ({ productsPage }) => {
    aioTag("TC-CART-008");

    await productsPage.mockProducts(productCatalog());
    await productsPage.goto();
    await productsPage.addProduct(products.iphone12);
    await productsPage.purchase();

    await expect(productsPage.message).toBeVisible();
    await productsPage.expectPurchaseCompleted("$905.99");
  });
});

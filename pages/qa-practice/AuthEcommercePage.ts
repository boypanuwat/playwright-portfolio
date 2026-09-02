import { expect, type Locator, type Page } from "@playwright/test";
import type { LoginAccount } from "../../config/accounts";
import type { Product } from "../../test-data/qa-practice/cart/data";
import type { ShippingDetails } from "../../test-data/qa-practice/auth-ecommerce/data";

export class AuthEcommercePage {
  readonly loginHeading: Locator;
  readonly shippingHeading: Locator;
  readonly cartHeading: Locator;
  readonly credentialHint: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly countrySelect: Locator;
  readonly submitOrderButton: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly total: Locator;
  readonly message: Locator;
  private mockedProducts: Product[] = [];

  constructor(readonly page: Page) {
    this.loginHeading = page.getByRole("heading", { name: "Login - Shop" });
    this.shippingHeading = page.getByRole("heading", { name: "Shipping Details" });
    this.cartHeading = page.getByRole("heading", { name: "SHOPPING CART" });
    this.credentialHint = page.getByText("Please use credentials Email: admin@admin.com");
    this.emailInput = page.getByPlaceholder("Enter email - insert admin@admin.com");
    this.passwordInput = page.getByPlaceholder("Enter Password - insert admin123");
    this.loginButton = page.getByRole("button", { name: "Submit" });
    this.phoneInput = page.getByPlaceholder("Enter phone number");
    this.streetInput = page.getByPlaceholder("5876 Little Streets");
    this.cityInput = page.getByPlaceholder("London");
    this.countrySelect = page.locator("#countries_dropdown_menu");
    this.submitOrderButton = page.getByRole("button", { name: "Submit Order" });
    this.proceedToCheckoutButton = page.getByRole("button", { name: "PROCEED TO CHECKOUT" });
    this.total = page.locator(".cart-total-price");
    this.message = page.locator("#message");
  }

  async mockProducts(products: Product[]): Promise<void> {
    this.mockedProducts = products;
    await this.page.route("**/products?limit=10&skip=0", async (route) => {
      await route.fulfill({
        headers: {
          "access-control-allow-origin": "*"
        },
        json: {
          products,
          total: products.length,
          skip: 0,
          limit: 10
        }
      });
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/auth_ecommerce");
    await this.renderMockedProductsIfNeeded();
  }

  async expectLoginReady(): Promise<void> {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.credentialHint).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  async login(account: LoginAccount): Promise<void> {
    await this.emailInput.fill(account.email);
    await this.passwordInput.fill(account.password);
    await this.loginButton.click();
  }

  async expectShopFlowReady(): Promise<void> {
    await expect(this.loginHeading).toBeHidden();
    await expect(this.cartHeading).toBeVisible();
    await this.addToCartButtonFor("Apple iPhone 12, 128GB, Black").waitFor();
  }

  async expectShippingFieldsReady(): Promise<void> {
    await expect(this.shippingHeading).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.streetInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.countrySelect).toBeVisible();
  }

  async fillShipping(details: Partial<ShippingDetails>): Promise<void> {
    if (details.phone !== undefined) {
      await this.phoneInput.fill(details.phone);
    }

    if (details.street !== undefined) {
      await this.streetInput.fill(details.street);
    }

    if (details.city !== undefined) {
      await this.cityInput.fill(details.city);
    }

    if (details.country !== undefined) {
      await this.countrySelect.selectOption({ label: details.country });
    }
  }

  async expectShippingValues(details: ShippingDetails): Promise<void> {
    await expect(this.phoneInput).toHaveValue(details.phone);
    await expect(this.streetInput).toHaveValue(details.street);
    await expect(this.cityInput).toHaveValue(details.city);
    await expect(this.countrySelect).toHaveValue(details.country);
  }

  async addProduct(product: Product): Promise<void> {
    await this.addToCartButtonFor(product.title).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async submitOrder(): Promise<void> {
    await this.submitOrderButton.click();
  }

  async expectCartLine(product: Product, quantity: number): Promise<void> {
    const line = this.cartLine(product.title);

    await expect(line).toContainText(product.title);
    await expect(this.quantityInput(product.title)).toHaveValue(String(quantity));
  }

  async expectTotal(expectedTotal: number): Promise<void> {
    await expect.poll(async () => this.currentTotal()).toBe(expectedTotal);
  }

  async expectOrderSubmitted(details: ShippingDetails): Promise<void> {
    await expect(this.message).toContainText(`has been registered and will be shipped to ${details.street}, ${details.city} - ${details.country}.`);
  }

  async expectOrderNotSubmitted(): Promise<void> {
    await expect(this.shippingHeading).toBeVisible();
    await expect(this.submitOrderButton).toBeEnabled();
  }

  async currentTotal(): Promise<number> {
    const text = await this.total.innerText();
    return Number(text.replace("$", "").replace(",", ""));
  }

  private productCard(title: string): Locator {
    // The demo product cards have no roles, labels, or data-testid values.
    return this.page.locator(".shop-item").filter({ hasText: title });
  }

  private addToCartButtonFor(title: string): Locator {
    return this.productCard(title).getByRole("button", { name: "ADD TO CART" });
  }

  private cartLine(title: string): Locator {
    // Cart rows are generated by the app script without semantic row roles or test IDs.
    return this.page.locator(".cart-row").filter({ hasText: title });
  }

  private quantityInput(title: string): Locator {
    return this.cartLine(title).locator(".cart-quantity-input");
  }

  private async renderMockedProductsIfNeeded(): Promise<void> {
    if (this.mockedProducts.length === 0) {
      return;
    }

    await this.page.waitForFunction(() => typeof window.addItemToCart === "function" && typeof window.updateCartTotal === "function");
    await this.page.evaluate((products) => {
      const shopItemsContainer = document.querySelector(".shop-items");

      if (!shopItemsContainer) {
        throw new Error("Missing .shop-items container");
      }

      shopItemsContainer.innerHTML = "";

      for (const product of products) {
        const shopItem = document.createElement("div");
        shopItem.classList.add("shop-item");
        shopItem.innerHTML = `
          <span class="shop-item-title">${product.title}</span>
          <div class="shop-item-details">
            <span class="shop-item-price">$${product.price}</span>
            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
          </div>`;
        shopItem.querySelector(".shop-item-button")?.addEventListener("click", () => {
          window.addItemToCart(product.title, `$${product.price}`);
          window.updateCartTotal();
        });
        shopItemsContainer.appendChild(shopItem);
      }
    }, this.mockedProducts);
  }
}

declare global {
  interface Window {
    addItemToCart(title: string, price: string): void;
    updateCartTotal(): void;
  }
}

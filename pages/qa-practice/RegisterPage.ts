import { expect, type Locator, type Page } from "@playwright/test";
import type { RegisterData } from "../../test-data/qa-practice/register/data";

export class RegisterPage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly countrySelect: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly registerButton: Locator;
  readonly message: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Register Form" });
    this.firstNameInput = page.getByPlaceholder("Enter first name");
    this.lastNameInput = page.getByPlaceholder("Enter last name");
    this.phoneInput = page.getByPlaceholder("Enter phone number");
    this.countrySelect = page.locator("#countries_dropdown_menu");
    this.emailInput = page.getByPlaceholder("Enter email");
    this.passwordInput = page.getByPlaceholder("Password");
    this.termsCheckbox = page.getByLabel("I agree with the terms and conditions");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.message = page.locator("#message");
  }

  async goto(): Promise<void> {
    await this.page.goto("/register");
  }

  async expectReady(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.countrySelect).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.termsCheckbox).toBeVisible();
    await expect(this.registerButton).toBeEnabled();
  }

  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption({ label: country });
  }

  async expectCountrySelected(country: string): Promise<void> {
    await expect(this.countrySelect).toHaveValue(country);
  }

  async fill(data: Partial<RegisterData>): Promise<void> {
    if (data.firstName !== undefined) {
      await this.firstNameInput.fill(data.firstName);
    }

    if (data.lastName !== undefined) {
      await this.lastNameInput.fill(data.lastName);
    }

    if (data.phone !== undefined) {
      await this.phoneInput.fill(data.phone);
    }

    if (data.country !== undefined) {
      await this.selectCountry(data.country);
    }

    if (data.email !== undefined) {
      await this.emailInput.fill(data.email);
    }

    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password);
    }

    if (data.acceptTerms) {
      await this.termsCheckbox.check();
    }
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  async expectCreated(): Promise<void> {
    await expect(this.message).toHaveText("The account has been successfully created!");
  }

  async expectNotCreated(): Promise<void> {
    await expect(this.message).toBeHidden();
  }
}

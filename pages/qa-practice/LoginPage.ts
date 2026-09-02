import { expect, type Locator, type Page } from "@playwright/test";
import type { LoginAccount } from "../../config/accounts";

export class LoginPage {
  readonly heading: Locator;
  readonly credentialHint: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly message: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Login Form" });
    this.credentialHint = page.getByText("Use the register credentials");
    this.emailInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.message = page.locator("#message");
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async expectReady(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
    await expect(this.credentialHint).toBeVisible();
  }

  async fillCredentials(account: LoginAccount): Promise<void> {
    await this.emailInput.fill(account.email);
    await this.passwordInput.fill(account.password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(account: LoginAccount): Promise<void> {
    await this.fillCredentials(account);
    await this.submit();
  }

  async expectSuccessFor(email: string): Promise<void> {
    await expect(this.message).toContainText(`${email}, you have successfully logged in!`);
  }

  async expectBadCredentials(): Promise<void> {
    await expect(this.message).toContainText("Bad credentials! Please try again!");
  }
}

import { expect, type Locator, type Page } from "@playwright/test";

export class RecoverPasswordPage {
  readonly heading: Locator;
  readonly instruction: Locator;
  readonly emailInput: Locator;
  readonly recoverButton: Locator;
  readonly message: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "Recover Password" });
    this.instruction = page.getByText("Please enter your email address, to recover the password");
    this.emailInput = page.getByPlaceholder("Enter email");
    this.recoverButton = page.getByRole("button", { name: "Recover Password" });
    this.message = page.locator("#message");
  }

  async goto(): Promise<void> {
    await this.page.goto("/recover-password");
  }

  async expectReady(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.instruction).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.recoverButton).toBeEnabled();
  }

  async recover(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.recoverButton.click();
  }

  async submit(): Promise<void> {
    await this.recoverButton.click();
  }

  async expectRequestAccepted(email: string): Promise<void> {
    await expect(this.message).toHaveText(`An email with the new password has been sent to ${email}. Please verify your inbox!`);
  }

  async expectRequestNotAccepted(): Promise<void> {
    await expect(this.message).toBeHidden();
  }
}

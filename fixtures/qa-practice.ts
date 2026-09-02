import { expect, test as base } from "@playwright/test";
import { AuthEcommercePage } from "../pages/qa-practice/AuthEcommercePage";
import { LoginPage } from "../pages/qa-practice/LoginPage";
import { ProductsPage } from "../pages/qa-practice/ProductsPage";
import { RecoverPasswordPage } from "../pages/qa-practice/RecoverPasswordPage";
import { RegisterPage } from "../pages/qa-practice/RegisterPage";

type QaPracticeFixtures = {
  authEcommercePage: AuthEcommercePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  recoverPasswordPage: RecoverPasswordPage;
  registerPage: RegisterPage;
};

const test = base.extend<QaPracticeFixtures>({
  authEcommercePage: async ({ page }, use) => {
    await use(new AuthEcommercePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  recoverPasswordPage: async ({ page }, use) => {
    await use(new RecoverPasswordPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  }
});

export { expect, test };

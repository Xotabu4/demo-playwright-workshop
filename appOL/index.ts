import { Page } from "@playwright/test";
import { API } from "../api/api";
import { AppPage } from "./abstract";
import { AccountDetails } from "../app/page/account/details.page";
import { Confirmation } from "../app/page/confirmation.page";
import { Product } from "../app/page/product";
import { Shop } from "../app/page/shop.page";
import { SignIn } from "../app/page/signin.page";
import { SignUp } from "../app/page/signup.page";
import { ContactUs } from "./page/contactus.page";
import { Home } from "./page/home.page";

export const Application = (page: Page) => ({
  ...AppPage(page),
  api: new API(page.request),

  signUp: new SignUp(page),
  home: Home(page),
  shop: new Shop(page),
  product: new Product(page),
  signIn: new SignIn(page),
  accountDetails: new AccountDetails(page),
  confirmation: new Confirmation(page),
  contactus: ContactUs(page),

  async headlessLogin(data: { email: string; password: string }) {
    const token = (await this.api.auth.login(data)).token;
    await this.setTokenToLocalStorage(token);
  },

  async setTokenToLocalStorage(token: string) {
    await page.goto("/", { waitUntil: "commit" });
    await page.evaluate(
      (_token) => window.localStorage.setItem("token", _token),
      token
    );
  },
});

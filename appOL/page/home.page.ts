import { Page, expect } from "@playwright/test";
import { AppPage } from "../abstract";
import { Header } from "../component/header.component";

export const Home = (page: Page) => {
  const carousel = page.locator(".main .homepage .home-carousel");

  return {
    ...AppPage(page),
    pagePath: "/",
    header: Header(page),

    async expectLoaded(message = "Expected Home page to be opened") {
      await expect(carousel, message).toBeVisible();
    },
  };
};

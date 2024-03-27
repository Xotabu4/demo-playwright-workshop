import { test } from "@playwright/test";
import { Application } from "../../../app";
import { randomUUID } from "node:crypto";

/**
 * Setting token thru navigating to home page and calling localstorage.setItem();
 */
test("logged in user can buy a product", async ({ page }) => {
  const app = new Application(page);

  const email = `test+${randomUUID()}@test.com`;
  const resp = await app.api.auth.createNewUser({
    isSubscribed: false,
    email,
    firstName: "Test",
    lastName: "Test",
    password: email,
  });
  await app.setTokenToLocalStorage(resp.token);
  await app.shop.open();

  await app.shop.openProductDetailsByName("CHERRY TOMATOES");
  await app.product.addToBag();
  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

import { test } from "@playwright/test";
import { Application } from "../../../app";

const data = {
  email: "test+e1f76f13-0f04-4f2e-86d8-0e78e3df2ddd@test.com",
  password: "xotabu4@gmail.com",
};

/**
 * Setting token thru navigating to home page and calling localstorage.setInitScript();
 */
test("logged in user can buy a product ", async ({ context, page, request }) => {
  const app = new Application(page);

  const loginResponse = await request.post(
    "https://shopdemo-alex-hot.koyeb.app/api/auth/login",
    {
      data,
    }
  );
  const token = ((await loginResponse.json()) as { token: string }).token;
  await context.addInitScript(`window.localStorage.setItem("token", "${token}")`)
  
  // await page.goto("/", { waitUntil: "commit" });
  // await page.evaluate(
  //   (_token) => window.localStorage.setItem("token", _token),
  //   token
  // );
  await app.shop.open();

  await app.shop.openProductDetailsByName("CHERRY TOMATOES");
  await app.product.addToBag();
  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

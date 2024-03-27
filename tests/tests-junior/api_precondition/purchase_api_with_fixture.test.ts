import { loggedInAsNewUserFixture } from "../../../fixtures";

loggedInAsNewUserFixture(
  "logged in user can buy a product",
  async ({ app, user }) => {
    console.dir(user);
    await app.home.header.openShop();
    await app.shop.openProductDetailsByName("CHERRY TOMATOES");
    await app.product.addToBag();
    await app.accountDetails.miniCart.placeOrder();
    await app.confirmation.expectOrderPlaced();
  }
);

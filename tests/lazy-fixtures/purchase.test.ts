/* eslint-disable @typescript-eslint/no-unused-vars */
import { shopTest } from "../../fixtures/lazy";

shopTest(
  "lazy-fixt: logged in user can buy a product",
  async ({ app, newUser, itemAddedInCart }) => {
    await app.accountDetails.miniCart.placeOrder();
    await app.confirmation.expectOrderPlaced();
  }
);

shopTest.describe(() => {
  shopTest.use({
    testOptions: {
      itemsToAddInCart: [{ slug: "cherry-tomatoes" }, { slug: "MARINATED_CUCUMBERS_NEZHIN_STYLE" }],
    },
  });

  shopTest(
    "lazy-fixt: logged in user can purchase multiple items",
    async ({ app, newUser, itemAddedInCart }) => {
      await app.accountDetails.miniCart.placeOrder();
      await app.confirmation.expectOrderPlaced();
    }
  );
});

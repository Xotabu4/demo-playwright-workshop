/* eslint-disable @typescript-eslint/no-unused-vars */
import { shopTest } from "../fixtures";

const testData = [
  {
    testName: "lazy-fixt: logged in user can buy a product",
  },
  {
    testName: "lazy-fixt: logged in user can purchase multiple items",
    testOptions: {
      itemsToAddInCart: [
        { slug: "cherry-tomatoes" },
        { slug: "MARINATED_CUCUMBERS_NEZHIN_STYLE" },
      ],
    },
  },
  {
    testName: "lazy-fixt: logged in user can purchase item with quantity 2",
    testOptions: {
      itemsToAddInCart: [
        {
          slug: "cherry-tomatoes",
          quantity: 2,
        },
        { slug: "MARINATED_CUCUMBERS_NEZHIN_STYLE" },
      ],
    },
  },
];

for (const td of testData) {
  shopTest.describe(() => {
    shopTest.use({
      testOptions: td.testOptions,
    });

    shopTest(td.testName, async ({ app, newUser, itemAddedInCart }) => {
      await app.accountDetails.miniCart.placeOrder();
      await app.confirmation.expectOrderPlaced();
    });
  });
}

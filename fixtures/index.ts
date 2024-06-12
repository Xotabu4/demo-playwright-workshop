import { test } from "@playwright/test";
import { Application } from "../app";
import { randomUUID } from "crypto";
import { UserCreateRequest, UserCreatedResponse } from "../api/models";

interface UserContext {
  userModel: UserCreateRequest;
  createdUser: UserCreatedResponse;
}

export const shopTest = test.extend<{
  app: Application;
  newUser: UserContext;
  itemAddedInCart: {
    itemsInCart: { slug: string }[];
  };
  testOptions: {
    itemsToAddInCart: { slug: string; quantity?: number }[];
  };
}>({
  testOptions: [
    {
      itemsToAddInCart: [
        {
          slug: "cherry-tomatoes",
        },
      ],
    },
    {
      option: true,
    },
  ],

  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },

  newUser: async ({ app }, use) => {
    const userModel = {
      isSubscribed: false,
      email: `test+${randomUUID()}@test.com`,
      firstName: "test",
      lastName: "test",
      password: "xotabu4@gmail.com",
    };

    const createdUser = await app.api.auth.createNewUser(userModel);
    await app.headlessLogin(userModel);
    await app.home.open();

    await use({ userModel, createdUser });
  },

  itemAddedInCart: async ({ app, testOptions }, use) => {
    // TODO: Investigate posibility to set cart with localStorage.setItem
    // window.localStorage.setItem('cart_items',
    // '[{"taxable":false,"isActive":true,"brand":{"isActive":true,"_id":"64bbbc91e9d7a367fcb1d462","name":"Nizhyn cannery","slug":"Nizhyn"},"_id":"64e106888e01260021ea480c","sku":"CHERRY_TOMATOES","name":"CHERRY TOMATOES","description":"cherry tomatoes, salt, sugar, greens, acetic acid, garlic, spices","quantity":1,"price":95,"created":"2023-08-19T18:14:32.255Z","slug":"cherry-tomatoes","__v":0,"inventory":98913,"totalPrice":95}]')
    for (const item of testOptions.itemsToAddInCart) {
      await app.product.open(`/product/${item.slug}`);
      if (item.quantity !== undefined) {
        await app.product.changeQuantity(item.quantity);
      }
      await app.product.addToBag();
    }
    await use({ itemsInCart: testOptions.itemsToAddInCart });
  },
});

import { test } from '@playwright/test';
import { Application } from '../app';

const testUser = {
  email: 'test+1692462339712@test.com',
  password: '123456'
}

test('logged in user can buy a product', async ({ page }) => {
  const app = new Application(page);

  await app.signIn.open();
  await app.signIn.signIn(testUser);
  await app.accountDetails.expectLoaded();
  await app.home.header.openShop();
  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();
  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

test('logged in user can purchase multiple items', async ({ page }) => {
  const app = new Application(page);

  await app.signIn.open();
  await app.signIn.signIn(testUser);
  await app.accountDetails.expectLoaded();
  
  // Item #1
  await app.home.header.openShop();
  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();

  // Item #2
  await app.product.header.openShop();
  await app.shop.openProductDetailsByName('MARINATED CUCUMBERS NEZHIN STYLE');
  await app.product.addToBag();

  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

import { test } from '@playwright/test';
import { Application } from '../../app';

const testUser = {
  email: 'test+e1f76f13-0f04-4f2e-86d8-0e78e3df2ddd@test.com',
  password: 'xotabu4@gmail.com'
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

test('logged in user can buy a cheapest product', async ({ page }) => {  
  const app = new Application(page);

  await app.signIn.open();
  await app.signIn.signIn(testUser);
  await app.accountDetails.expectLoaded();

  await app.home.header.openShop();

  const details = await app.shop.results.getResultsDetails();
  const cheapest = details.sort((a, b) => a.price.amount - b.price.amount)[0];
  await app.shop.openProductDetailsByName(cheapest.name);
  await app.product.addToBag();
  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

test('logged in user can purchase multiple items', async ({ page }) => {
  const app = new Application(page);

  await app.signIn.open();
  await app.signIn.signIn(testUser);
  await app.accountDetails.expectLoaded();

  await app.home.header.openShop();

  // Item #1
  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();
  await app.home.open();

  // Item #2
  await app.home.header.openShop();
  await app.shop.openProductDetailsByName('MARINATED CUCUMBERS NEZHIN STYLE');
  await app.product.addToBag();

  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

import { test } from '@playwright/test';
import { Application } from '../../app';
import { loginAsUserPrecondition } from '../preconditions';

loginAsUserPrecondition();

test('logged in user can buy a product', async ({ page }) => {
  const app = new Application(page);

  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();
  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

test('logged in user can purchase multiple items', async ({ page }) => {
  const app = new Application(page);

  // Item #1
  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();

  // Item #2
  await app.product.header.openShop();
  await app.shop.openProductDetailsByName('MARINATED CUCUMBERS NEZHIN STYLE');
  await app.product.addToBag();

  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

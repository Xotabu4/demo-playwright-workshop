import { test, expect } from '@playwright/test';
import { Application } from '../app';

const testUser = {
  email: 'test+1692462339712@test.com',
  password: '123456'
}

test('logged in user can buy a product', async ({ page }) => {
  const app = new Application(page);

  await app.home.open();
  await app.home.header.openShop();
  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();
  await app.product.miniCart.proceedToCheckout();
  await app.signIn.signIn(testUser);
  await app.accountDetails.expectLoaded();
  await app.accountDetails.header.openCart();
  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

test.fixme('logged in user can purchase multiple items', ({ page }) => {
  // TODO: 
});

test.fixme('non-logged user should be asked to login', ({ page }) => {
  // TODO: 
});

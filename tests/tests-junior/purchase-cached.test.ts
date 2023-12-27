import { test } from '@playwright/test';
import { Application } from '../../app';

const testUser = {
  email: 'test+e1f76f13-0f04-4f2e-86d8-0e78e3df2ddd@test.com',
  password: 'xotabu4@gmail.com'
}

// test.beforeEach(async ({page}) => {
//   await page.routeFromHAR('cache/cache.har', {
//     notFound: 'fallback',
//   });
// })

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

// [CACHE WARMER] Warming up static files cache...
// [CACHE WARMER] Done warming up static files cache.: 4.572s
// Running 2 tests using 1 worker

//   ok 1 [chromium] › purchase-cached.test.ts:15:5 › logged in user can buy a product (3.9s)
//   ok 2 [chromium] › purchase-cached.test.ts:30:5 › logged in user can purchase multiple items (5.1s)

//   2 passed (15.1s)
// TOP-10 slowest steps
// ┌─────────┬───────┬─────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────┐
// │ (index) │ count │                            name                             │                                                    location                                                    │ duration │
// ├─────────┼───────┼─────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────┤
// │    0    │   2   │              'Confirmation.expectOrderPlaced'               │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:27' │   904    │
// │    1    │   2   │ 'Confirmation.expectOrderPlaced->Confirmation.expectLoaded' │       'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\app\\page\\confirmation.page.ts:17'        │   902    │
// │    2    │   1   │                         'Home.open'                         │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:42' │   889    │
// │    3    │   2   │                        'SignIn.open'                        │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:18' │   713    │
// │    4    │   2   │                    'MiniCart.placeOrder'                    │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:26' │   632    │
// │    5    │   3   │                     'Product.addToBag'                      │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:25' │   491    │
// │    6    │   2   │                'AccountDetails.expectLoaded'                │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:20' │   399    │
// │    7    │   3   │          'Product.addToBag->Product.expectLoaded'           │         'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\app\\page\\product\\index.ts:34'         │   395    │
// │    8    │   3   │               'Shop.openProductDetailsByName'               │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:24' │   215    │
// │    9    │   2   │                       'SignIn.signIn'                       │ 'c:\\Users\\xotab\\Documents\\Code\\demo-playwright-workshop\\tests\\tests-junior\\purchase-cached.test.ts:19' │   139    │
// └─────────┴───────┴─────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────┘

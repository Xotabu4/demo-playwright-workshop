/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test } from "@playwright/test"
import { MiniCart } from "./components/minicart.component"
import { Application } from "../../app"

const testUser = {
    email: 'test+e1f76f13-0f04-4f2e-86d8-0e78e3df2ddd@test.com',
    password: 'xotabu4@gmail.com'
  }

test('Components test', async ({ page }) => {
    const root: any = page.locator('.mini-cart')
    const minicart = new MiniCart(root['_frame'], root['_selector'])

    const app = new Application(page);

    await app.signIn.open();
    await app.signIn.signIn(testUser);
    await app.accountDetails.expectLoaded();
  
    await app.home.header.openShop();
  
    await app.shop.openProductDetailsByName('CHERRY TOMATOES');
    await app.product.addToBag();
    await expect(minicart).toBeVisible();
    await app.confirmation.expectOrderPlaced();
})


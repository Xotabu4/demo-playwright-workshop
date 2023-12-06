
import { expect } from '@playwright/test';
import { loggedInAsNewUserFixture } from '../../../fixtures'

loggedInAsNewUserFixture(`user can post review for product`, async ({ app }) => {
    await app.home.open();
    await app.home.header.openShop();
    await app.shop.openProductDetailsByName('CHERRY TOMATOES');

    await app.product.reviewComponent.add({
        title: 'review title',
        comment: 'review comment',
        stars: 4
    })
    await app.product.reviewComponent.expectReviewAdded();
})

loggedInAsNewUserFixture(`visual regression Product Details page`, async ({ app, page }) => {
    await app.home.open();
    await app.home.header.openShop();
    await app.shop.openProductDetailsByName('CHERRY TOMATOES');

    // Fullpage
    await expect(page).toHaveScreenshot({ fullPage: true });
})
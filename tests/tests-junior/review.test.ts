import { test } from '@playwright/test';
import { Application } from '../../app';

const testUser = {
    email: 'test+e1f76f13-0f04-4f2e-86d8-0e78e3df2ddd@test.com',
    password: 'xotabu4@gmail.com'
}

test(`user can post review for product`, async ({ page }) => {
    const app = new Application(page);

    await app.signIn.open();
    await app.signIn.signIn(testUser);
    await app.accountDetails.expectLoaded();

    await app.home.header.openShop();

    await app.shop.openProductDetailsByName('CHERRY TOMATOES');

    await app.product.reviewComponent.add({
        title: 'review title',
        comment: 'review comment',
        stars: 4
    })
    await app.product.reviewComponent.expectReviewAdded();
})
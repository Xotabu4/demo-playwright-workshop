import { test } from '@playwright/test';
import { Application } from '../app';

// const testUser = {
//     email: 'test+1692462339712@test.com',
//     password: '123456'
// }

const adminUser = {
    email: 'xotabu4@gmail.com',
    password: 'xotabu4@gmail.com'
}

test(`user can post review for product`, async ({ page }) => {
    const app = new Application(page);

    await app.signIn.open();
    await app.signIn.signIn(adminUser);
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
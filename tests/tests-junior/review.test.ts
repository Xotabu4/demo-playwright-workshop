import { test } from '@playwright/test';
import { Application } from '../../app';
import { loginAsUserPrecondition } from '../preconditions';

loginAsUserPrecondition();

test(`user can post review for product`, async ({ page }) => {
    const app = new Application(page);

    await app.shop.openProductDetailsByName('CHERRY TOMATOES');

    await app.product.reviewComponent.add({
        title: 'review title',
        comment: 'review comment',
        stars: 4
    })
    await app.product.reviewComponent.expectReviewAdded();
})
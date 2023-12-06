import { loggedInAsNewUserFixture } from "../../../fixtures";

loggedInAsNewUserFixture(`user can post review for product`, async ({ app: { home, shop, product }, user }) => {
    await home.open();
    await home.header.openShop();
    await shop.openProductDetailsByName('CHERRY TOMATOES');

    await product.reviewComponent.add({
        title: 'review title',
        comment: 'review comment',
        stars: 4
    })
    await product.reviewComponent.expectReviewAdded();
})

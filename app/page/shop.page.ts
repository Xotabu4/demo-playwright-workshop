import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { Header } from "../globalComponent/header.component";

export class Shop extends AppPage {
    public pagePath = '/shop';

    public header = new Header(this.page);

    private productList = this.page.locator('.shop .product-list');

    async expectLoaded(message = 'Expected Shop page to be opened') {
        await expect(this.productList, message).toBeVisible();
    }

    async openProductDetails(filter: { name: string; }) {
        await this.page.getByRole('heading', filter)
    }
}
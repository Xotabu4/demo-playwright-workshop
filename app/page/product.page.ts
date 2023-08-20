import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { Header } from "../globalComponent/header.component";
import { MiniCart } from "../globalComponent/minicart.component";

export class Product extends AppPage {
    public pagePath = '/product';

    public header = new Header(this.page);
    public miniCart = new MiniCart(this.page);

    private addToBagButton = this.page.getByRole('button', { name: 'Add To Bag' });
    private removeFromBagButton = this.page.getByRole('button', { name: 'Remove From Bag' });

    async expectLoaded(message = 'Expected Product page to be opened') {
        await expect(
            this.addToBagButton.or(
                this.removeFromBagButton
            ), message
        ).toBeVisible();
    }

    async open(productPath: string): Promise<void> {
        await this.page.goto(productPath);
    }

    async addToBag() {
        await this.addToBagButton.click();
    }
}
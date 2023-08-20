import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";

export class Header extends Component {

    private shopLink = this.page.getByRole('link', { name: 'Shop' });

    async expectLoaded(message = 'Expected Header to be loaded'): Promise<void> {
        await expect(this.shopLink, message).toBeVisible();
    }

    async openShop() {
        await this.shopLink.click();
    }
}
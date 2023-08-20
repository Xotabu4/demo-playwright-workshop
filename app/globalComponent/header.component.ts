import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";

export class Header extends Component {
    private shopLink = this.page.getByRole('link', { name: 'Shop' })
    private cartLink = this.page.getByRole('button', { name: 'your cart' })

    async expectLoaded(message = 'Expected Header to be loaded'): Promise<void> {
        await expect(this.shopLink, message).toBeVisible()
    }
    async openCart() {
        await this.cartLink.click();
    }
    async openShop() {
        await this.shopLink.click()
    }
}
import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../misc/reporters/step";

export class Header extends Component {
    private shopLink = this.page.getByRole('link', { name: 'Shop' })
    private cartLink = this.page.getByRole('button', { name: 'your cart' })

    @step()
    async expectLoaded(message = 'Expected Header to be loaded'): Promise<void> {
        await expect(this.shopLink, message).toBeVisible();
    }

    @step()
    async openCart() {
        await this.cartLink.click();
    }

    @step()
    async openShop() {
        await this.shopLink.click()
    }
}
import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";

export class MiniCart extends Component {
    private proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed To Checkout' });
    private placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });

    async expectLoaded() {
        await expect(this.proceedToCheckoutButton.or(this.placeOrderButton)).toBeVisible();
    }
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
    async placeOrder() {
        await this.placeOrderButton.click();
    }
}
import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";

export class MiniCart extends Component {
    private proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed To Checkout' });

    async expectLoaded() {
        // TODO: 
    }
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}
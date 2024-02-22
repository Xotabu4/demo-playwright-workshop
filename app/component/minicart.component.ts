import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../misc/reporters/step";

export class MiniCart extends Component {
    private proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed To Checkout' });
    private placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });

    @step()
    async expectLoaded() {
        await expect(this.proceedToCheckoutButton.or(this.placeOrderButton),
            'Minicart is not loaded')
            .toBeVisible();
    }

    @step()
    async proceedToCheckout() {
        await this.expectLoaded();
        await this.proceedToCheckoutButton.click();
    }

    @step()
    async placeOrder() {
        await this.expectLoaded();
        await this.placeOrderButton.click();
    }
}

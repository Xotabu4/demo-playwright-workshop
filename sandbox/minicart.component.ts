import { expect } from "@playwright/test";
import { PageHolder } from "../app/abstractClasses";
import { step } from "../misc/reporters/step";

export class MiniCart extends PageHolder {
    private root = this.page.locator('.mini-cart');
    private proceedToCheckoutButton = this.root.getByRole('button', { name: 'Proceed To Checkout' });
    private placeOrderButton = this.root.getByRole('button', { name: 'Place Order' });

    @step()
    async expectLoaded() {
        await expect(this.proceedToCheckoutButton.or(this.placeOrderButton)).toBeVisible();
    }

    @step()
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    @step()
    async placeOrder() {
        await this.placeOrderButton.click();
    }
}

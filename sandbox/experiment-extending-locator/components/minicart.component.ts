/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, Locator as ILocator } from "@playwright/test";

const { Locator } = require('../node_modules/playwright-core/lib/client/locator') as { Locator: new (...args: any[]) => ILocator };
import { step } from "../../../misc/reporters/step";

// class BaseComponent {
//     constructor(protected page: Page) { }
// }

export class MiniCart extends Locator {
    // constructor(...args: any[]) {
    //     (super as any)(args[0], args[1], args[2]);
    // }
    private root = this.page().locator('.mini-cart');
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

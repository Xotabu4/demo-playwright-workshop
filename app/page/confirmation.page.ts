import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";

export class Confirmation extends AppPage {
    public pagePath = 'order/success/';

    private successMessage = this.page.getByRole('heading', { name: 'Thank you for your order.' })

    async expectLoaded(message = 'Expected confirmation page to be loaded') {
        await expect(this.successMessage, message).toBeVisible();
    }

    async expectOrderPlaced() {
        await this.expectLoaded('Expected order to be placed sucessfully');
    }
}
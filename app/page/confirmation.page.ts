import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "../../misc/reporters/step";

export class Confirmation extends AppPage {
    public pagePath = 'order/success/';

    private successMessage = this.page.getByRole('heading', { name: 'Thank you for your order.' })

    @step()
    async expectLoaded(message = 'Expected confirmation page to be loaded') {
        await expect(this.successMessage, message).toBeVisible();
    }

    @step()
    async expectOrderPlaced() {
        await this.expectLoaded('Expected order to be placed sucessfully');
    }
}
import { expect } from "@playwright/test";
import { AppPage } from "../../abstractClasses";
import { Header } from "../../globalComponent/header.component";
import { MiniCart } from "../../globalComponent/minicart.component";

export class AccountDetails extends AppPage {
    public pagePath = '/details'

    public header = new Header(this.page)
    public miniCart = new MiniCart(this.page)

    private heading = this.page.getByRole('heading', { name: 'Account Details' })

    async expectLoaded() {
        await expect(this.heading).toBeVisible();
    }
}
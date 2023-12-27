import { expect } from "@playwright/test";
import { AppPage } from "../../abstractClasses";
import { Header } from "../../component/header.component";
import { MiniCart } from "../../component/minicart.component";
import { step } from "../../../misc/reporters/step";

export class AccountDetails extends AppPage {
    public pagePath = '/details'

    public header = new Header(this.page)
    public miniCart = new MiniCart(this.page)

    private heading = this.page.getByRole('heading', { name: 'Account Details' })

    @step()
    async expectLoaded() {
        await expect(this.heading).toBeVisible();
    }
}
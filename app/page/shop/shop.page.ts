import { expect } from "@playwright/test";
import { AppPage } from "../../abstractClasses";
import { Header } from "../../component/header.component";
import { step } from "../../../misc/reporters/step";
import { Results } from "./component/results.component";

export class Shop extends AppPage {
    public pagePath = '/shop';

    public header = new Header(this.page)
    public results = new Results(this.page)

    private productList = this.page.locator('.shop .product-list')

    @step()
    async expectLoaded(message = 'Expected Shop page to be opened') {
        await expect(this.productList, message).toBeVisible()
    }

    @step()
    async openProductDetailsByName(name: string) {
        // await this.page.getByRole('heading', { name }).click();
        const matchedFirstResult = (await this.results.getResultByName(name))[0];
        await matchedFirstResult.select();
    }

    

    // @step()
    // async openProductDetailsByPriceGreaterThan(price: number) {
    //     // await this.page.getByRole('heading', { name }).click();
    //     const matchedFirstResult = (await this.results.getResultByName(name))[0];
    //     await matchedFirstResult.select();
    // }

    // @step()
    // async openProductDetailsByPriceLessThan(price: number) {
    //     // await this.page.getByRole('heading', { name }).click();
    //     const matchedFirstResult = (await this.results.getResultByName(name))[0];
    //     await matchedFirstResult.select();
    // }
}
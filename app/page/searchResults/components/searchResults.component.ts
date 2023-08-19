import { Locator, expect } from "@playwright/test";
import { AppComponent } from "../../appComponent";


export class SearchResults extends AppComponent {
    private allResults = async (): Promise<SearchResult[]> => {
        await expect(this.page.locator('.item-box').first(), '').toBeVisible();
        const allResults = await this.page.locator('.item-box').all();

        return allResults.map(r => new SearchResult(r));
    }

    async filterByPrice(price: string) {
        const results = await this.allResults();
        const filtered: SearchResult[] = [];
        for (let r of results) {
            if (await r.price() === price) {
                filtered.push(r);
            }
        }
        return filtered
    }

    // async getAllSearchResultsInfo() {
    //     const results = await this.allResults();
    //     const resultsInfo: any[] = [];
    //     for (let r of results) {
    //         resultsInfo.push({
    //             name: r.name(),
    //             price: { 
    //                 currency: r.currency()
    //                 value: r.priceValue(),
    //             }
    //             description: r.description()
    //         })
    //     }
    //     return resultsInfo
    // }
}

export class SearchResult extends AppComponent {
    constructor(private baseLocator: Locator) {
        super(baseLocator.page())
    }

    price() {
        return this.baseLocator.locator('.price').innerText()
    }

}
import { Locator, expect } from "@playwright/test";
import { Component } from "../../../abstractClasses";
import { step } from "../../../../misc/reporters/step";

export class Result extends Component {

    private nameLocator = this.root.locator('h1')

    // .product-container
    constructor(private root: Locator) {
        super(root.page());
    }

    @step()
    async expectLoaded(message?: string | undefined) {
        await expect(this.nameLocator, message).toBeVisible();
    }

    name() {
        return this.nameLocator.innerText();
    }

    async price() {
        const text = await this.root.locator('.price').innerText();
        const currencySymbol = text.charAt(0)
        const amount = parseFloat(text.slice(1))

        return {
            currencySymbol,
            amount
        }
    }

    async resultDetails() {
        return {
            name: await this.name(),
            price: await this.price()
        }
    }

    async select() {
        await this.expectLoaded();
        await this.nameLocator.click();
    }
}
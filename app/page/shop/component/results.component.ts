import { expect } from "@playwright/test";
import { Component } from "../../../abstractClasses";
import { step } from "../../../../misc/reporters/step";
import { Result } from "./result.component";

export class Results extends Component {
    private resultsLocator = this.page.locator('.product-container');

    async expectLoaded(message?: string | undefined): Promise<void> {
        await expect(this.resultsLocator, message).not.toHaveCount(0);
        await new Result(this.resultsLocator.first()).expectLoaded(message);
    }

    @step()
    async getResultByName(name: string): Promise<Result[]> {
        await this.expectLoaded();
        const results = await this.resultsLocator.all();
        const filtered = [];
        for (const r of results) {
            if ((await new Result(r).name()) === name) {
                filtered.push(r);
            }
        }
        return filtered.map(r => new Result(r));
    }

    @step()
    async getResultsDetails(): Promise<Awaited<ReturnType<Result['resultDetails']>>[]> {
        await this.expectLoaded();
        const results = await this.resultsLocator.all();
        const details = [];

        for (const r of results) { 
            details.push(await new Result(r).resultDetails());
        }
        return details
    }
}
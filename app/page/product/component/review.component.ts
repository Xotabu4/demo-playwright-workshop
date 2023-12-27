import { expect } from "@playwright/test";
import { Component } from "../../../abstractClasses";
import { step } from "../../../../misc/reporters/step";

export class Review extends Component {
    starRating = (star: number) => this.page.locator(`.react-stars [data-index="${star}"] .fa-star`);
    titleInput = this.page.getByPlaceholder('Enter Review title');
    commentInput = this.page.getByPlaceholder('Write Review');
    publishButton = this.page.getByRole('button', { name: 'Publish Review' });


    @step()
    async expectLoaded(): Promise<void> {
        await expect(this.starRating(0)).toBeVisible();
        await expect(this.starRating(4)).toBeVisible();
        await expect(this.titleInput).toBeVisible();
        await expect(this.commentInput).toBeVisible();
        await expect(this.publishButton).toBeVisible();
    }

    @step()
    async add(options: { title: string, comment: string, stars: number }) {
        await this.expectLoaded();
        if (options.stars < 0 || options.stars > 4) throw new Error('Stars should be between 0 and 4');

        await this.titleInput.fill(options.title);
        await this.commentInput.fill(options.comment);
        await this.starRating(options.stars).click();
        await this.publishButton.click();
    }

    @step()
    async expectReviewAdded() {
        await expect(this.page.getByRole('heading', { name: 'Your review has been added' })).toBeVisible();
    }
}
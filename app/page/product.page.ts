import { expect } from "@playwright/test";
import { AppPage, Component } from "../abstractClasses";
import { Header } from "../globalComponent/header.component";
import { MiniCart } from "../globalComponent/minicart.component";

export class Product extends AppPage {
    public pagePath = '/product';

    public header = new Header(this.page);
    public miniCart = new MiniCart(this.page);

    private addToBagButton = this.page.getByRole('button', { name: 'Add To Bag' });
    private removeFromBagButton = this.page.getByRole('button', { name: 'Remove From Bag' });

    public reviewComponent = new class extends Component {
        starRating = (star: number) => this.page.locator(`.react-stars [data-index="${star}"] .fa-star`);
        titleInput = this.page.getByPlaceholder('Enter Review title');
        commentInput = this.page.getByPlaceholder('Write Review');
        publishButton = this.page.getByRole('button', { name: 'Publish Review' });
        confirmation = this.page.locator('.notification-title');

        override async expectLoaded(): Promise<void> {
            await expect(this.starRating(0)).toBeVisible();
            await expect(this.starRating(4)).toBeVisible();
            await expect(this.titleInput).toBeVisible();
            await expect(this.commentInput).toBeVisible();
            await expect(this.publishButton).toBeVisible();
        }
        async add(options: { title: string, comment: string, stars: number }) {
            await this.expectLoaded();
            if (options.stars < 0 || options.stars > 4) throw new Error('Stars should be between 0 and 4');

            await this.titleInput.fill(options.title);
            await this.commentInput.fill(options.comment);
            await this.starRating(options.stars).click();
            await this.publishButton.click();
        }
        async expectReviewAdded() {
            await expect(this.confirmation).toHaveText('Your review has been added successfully and will appear when approved!')
        }
    }(this.page);

    async expectLoaded(message = 'Expected Product page to be opened') {
        await expect(this.addToBagButton
            .or(this.removeFromBagButton),
            message
        ).toBeVisible();
    }

    override async open(productPath: string): Promise<void> {
        await this.page.goto(productPath);
    }

    async addToBag() {
        await this.addToBagButton.click();
    }
}
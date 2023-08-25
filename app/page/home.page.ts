import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { Header } from "../component/header.component";

export class Home extends AppPage {
    public pagePath = '/';
    
    public header = new Header(this.page);
    private carousel = this.page.locator('.main .homepage .home-carousel')

    async expectLoaded(message = 'Expected Home page to be opened') {
        await expect(this.carousel, message).toBeVisible();
    }
}
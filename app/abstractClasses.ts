import type { Page } from '@playwright/test';

export abstract class PageHolder { 
    constructor(protected page: Page) {}
}
export abstract class Component extends PageHolder {
    abstract expectLoaded(): Promise<void>;

    async isLoaded(): Promise<boolean> {
        try { 
            await this.expectLoaded()
            return true
        } catch {
            return false
        }
    }
}

export abstract class AppPage extends Component {
    /**
     * Path to the page can be relative to the baseUrl defined in playwright.config.ts
     * or absolute (on your own risk)
     */
    abstract pagePath: string;

    /**
     * Opens the page in the browser and expectLoaded should pass
     */
    async open() {
        await this.page.goto(this.pagePath);
        await this.expectLoaded();
    }
}

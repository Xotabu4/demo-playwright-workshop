import { test } from '@playwright/test';
import { Application } from "../app";

export const baseFixture = test.extend<{ app: Application }>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
});

export const loggedUserFixture = baseFixture.extend < { defaultUser: { email: string, password: string } } & { app: Application }> ({
    defaultUser: [{
        email: 'test+1692462339712@test.com',
        password: '123456'
    }, { option: true }],

    app: async ({ app, defaultUser }, use) => {
        await app.signIn.open();
        await app.signIn.signIn(defaultUser);
        await app.accountDetails.expectLoaded();

        await use(app);
    },
});
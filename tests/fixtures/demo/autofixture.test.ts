import { test } from '@playwright/test';

const autoFixture = test.extend<{ someData1: { test1: boolean } }>({
    someData1: [async ({ }, use) => {
        console.log('autoFixture executed')
        await use({ test1: true });
    }, { auto: true }],
});

autoFixture('Fixture not defined in params', ({ }) => {
    // browser not started since not used, "someData" is not set since not used
    console.log('test done!')
})


const lazyFixture = test.extend<{ someData1: { test1: boolean }, someData2: { test2: boolean } }>({
    someData1: async ({ }, use) => {
        console.log('someData1 executed')
        await use({ test1: true });
    },
    someData2: async ({ }, use) => {
        console.log('someData2 executed')
        await use({ test2: true });
    },
});

test.describe('suite', () => {
    // test.skip(() => !test.info().project.name.includes('mobile'));
    // test.skip(({ isMobile }) => !isMobile);

    autoFixture.beforeEach(() => {
        console.log('beforeEach executed!')
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lazyFixture('Fixture defined in params', ({ page, someData1 }) => {
        console.log('someData:', someData1)
        console.log('test done!')
    })

    autoFixture('Fixture not defined in params', ({ }) => {
        // browser not started since not used, "someData" is not set since not used
        console.log('test done!')
    })
})


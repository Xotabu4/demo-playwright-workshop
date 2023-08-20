import { test, expect } from '@playwright/test';

test(`user can post review for product`, async ({ page }) => {
    await page.goto('https://shopdemo-alex-hot.koyeb.app/register');

    await page.getByRole('main').getByPlaceholder('Please Enter Your Email').click();
    await page.getByRole('main').getByPlaceholder('Please Enter Your Email').fill(`test+${Date.now()}@test.com`);
    await page.getByPlaceholder('Please Enter Your First Name').click();
    await page.getByPlaceholder('Please Enter Your First Name').fill('test');
    await page.getByPlaceholder('Please Enter Your First Name').press('Tab');
    await page.getByPlaceholder('Please Enter Your Last Name').fill('test');
    await page.getByPlaceholder('Please Enter Your Last Name').press('Tab');
    await page.getByPlaceholder('Please Enter Your Password').fill('123456');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await page.goto('https://shopdemo-alex-hot.koyeb.app/');
    await page.getByRole('link', { name: 'Brands ' }).click();
    await page.locator('div').filter({ hasText: /^test$/ }).nth(1).click();
    await page.getByRole('menuitem', { name: 'test' }).click();
    await page.getByRole('link', { name: 'test By test test $100' }).click();

    await page.getByPlaceholder('Enter Review title').fill('review title');
    await page.getByPlaceholder('Write Review').fill('review comment');
    await page.locator('.react-stars [data-index="4"] .fa-star').click();

    await page.getByRole('button', { name: 'Publish Review' }).click();
    await expect(page.locator('.notification-title')).toHaveText('Your review has been added successfully and will appear when approved!')
})
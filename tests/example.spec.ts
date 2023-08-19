import { test, expect } from '@playwright/test';
import { Application } from '../app';

test('new user can sign up and buy product', async ({ page }) => {
  const app = new Application(page);

  await page.goto('https://shopdemo-alex-hot.koyeb.app/');
  await page.getByRole('link', { name: 'Brands ' }).click();
  await page.locator('div').filter({ hasText: /^test$/ }).nth(1).click();
  await page.getByRole('menuitem', { name: 'test' }).click();
  await page.getByRole('link', { name: 'test By test test $100' }).click();
  await page.getByRole('button', { name: 'Add To Bag' }).click();
  await page.getByRole('button', { name: 'Proceed To Checkout' }).click();
  await page.getByRole('button', { name: 'Create an account' }).click();
  
  await app.signUp.signUpNewUser();

  await page.getByRole('button', { name: 'your cart have 1 items' }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.locator('a.order-label').click();
});

test(`user can post review for product`, async ({ page }) => {
  test.info().annotations.push({ type: 'issue', description: 'https://github.com/microsoft/playwright/issues/<some-issue>' });

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

  await page.getByRole('button', {name: 'Publish Review'}).click();
  await expect(page.locator('.notification-title')).toHaveText('Your review has been added successfully and will appear when approved!')
})

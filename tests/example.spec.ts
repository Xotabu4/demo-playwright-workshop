import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://shopdemo-alex-hot.koyeb.app/');
  await page.getByRole('link', { name: 'Welcome! ' }).click();
  await page.getByRole('link', { name: 'Welcome! ' }).click();
  await page.getByRole('link', { name: 'Welcome! ' }).click();
  await page.getByRole('menuitem', { name: 'Sign Up' }).click();
  await page.getByRole('main').getByPlaceholder('Please Enter Your Email').click();
  await page.getByRole('main').getByPlaceholder('Please Enter Your Email').fill('test123@gmail.com');
  await page.getByRole('main').getByPlaceholder('Please Enter Your Email').press('Control+a');
  await page.getByRole('main').getByPlaceholder('Please Enter Your Email').press('Control+c');
  await page.getByRole('main').getByPlaceholder('Please Enter Your Email').press('Tab');
  await page.getByPlaceholder('Please Enter Your First Name').fill('test123@gmail.com');
  await page.getByPlaceholder('Please Enter Your First Name').press('Tab');
  await page.getByPlaceholder('Please Enter Your Last Name').fill('test123@gmail.com');
  await page.getByPlaceholder('Please Enter Your Password').click();
  await page.getByPlaceholder('Please Enter Your Password').fill('test123@gmail.com');
  await page.getByRole('button', { name: 'Sign Up' }).click();
});

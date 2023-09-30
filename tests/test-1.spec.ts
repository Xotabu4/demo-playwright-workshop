import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { AppPage } from '../app/abstractClasses';

test('test', async ({ page }) => {
  const contactUs = new ContactUs(page);

  await contactUs.open();
  await contactUs.submitContactUsForm({
    email: `xotabu4+${randomUUID()}@gmail.com`,
    fullName: 'test name',
    message: 'test message'
  });
  // TODO: add success popup appears expectation
});

class ContactUs extends AppPage {
  public pagePath = '/contact'

  private fullNameInput = this.page.getByPlaceholder('You Full Name');
  private emailInput = this.page.getByPlaceholder('Your Email Address');
  private messageInput = this.page.getByPlaceholder('Please Describe Your Message');
  private submitButton = this.page.getByRole('button', { name: 'Submit' });

  async expectLoaded() {
    await expect(this.fullNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async submitContactUsForm(options: { fullName: string, email: string, message: string }) {
    await this.expectLoaded();
    await this.fullNameInput.fill(options.fullName);
    await this.emailInput.fill(options.email);
    await this.messageInput.fill(options.message);
    await this.submitButton.click();
  }
}
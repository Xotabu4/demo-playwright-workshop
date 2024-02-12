import { randomUUID } from 'node:crypto';
import { test } from '@playwright/test';
import { Application } from '../app';

test('user can submit contact form', async ({ page }) => {
  const app = new Application(page);

  await app.contactus.open();
  await app.contactus.submitContactUsForm({
    email: `xotabu4+${randomUUID()}@gmail.com`,
    fullName: 'test name',
    message: 'test message'
  });
  // TODO: add success popup appears expectation
});

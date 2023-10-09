import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { Application } from '../../app';

test.skip('contact us page', async ({ page }) => {
  const app = new Application(page);

  await app.contactus.open();
  await expect(page).toHaveScreenshot({
    mask: [page.getByPlaceholder('You Full Name')]
  });
  await app.contactus.submitContactUsForm({
    email: `xotabu4+${randomUUID()}@gmail.com`,
    fullName: 'test name',
    message: 'test message'
  });
  // TODO: add success popup appears expectation
});


test('js coverage', async ({ page }) => {
  const v8toIstanbul = require('v8-to-istanbul');
  await page.coverage.startJSCoverage();
  const app = new Application(page);
  await app.contactus.open();
  await app.contactus.submitContactUsForm({
    email: `xotabu4+${randomUUID()}@gmail.com`,
    fullName: 'test name',
    message: 'test message'
  });
  const coverage = await page.coverage.stopJSCoverage();
  for (const entry of coverage) {
    const converter = v8toIstanbul('', 0, { source: entry.source });
    await converter.load();
    converter.applyCoverage(entry.functions);
    console.log(JSON.stringify(converter.toIstanbul()));
  }
})


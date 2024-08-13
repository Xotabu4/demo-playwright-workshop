import { Browser, BrowserContext, Page, test } from "@playwright/test";
import { DoctorApplication, PatientApplication } from "../app";

export type DoxymeRole<T> = {
  app: T;
  page: Page;
  context: BrowserContext;
  browser: Browser;
};

export const doxymeTest = test.extend<{
  doctor: DoxymeRole<DoctorApplication>;
  patient: DoxymeRole<PatientApplication> & { name: string };
}>({
  doctor: async ({ page, context, browser }, use) => {
    // @ts-expect-error - adding custom property to context
    context.DOXYME_ROLE = "Doctor";
    const app = new DoctorApplication(page);
    await use({
      app,
      page,
      context,
      browser,
    });
  },
  patient: async ({ browser }, use) => {
    const patientCtx = await browser.newContext({
      viewport: { width: 1280, height: 1080 },
    });
    // @ts-expect-error - adding custom property to context
    patientCtx.DOXYME_ROLE = "Patient1";
    const patientPage = await patientCtx.newPage();
    const app = new PatientApplication(patientPage);
    await use({
      app,
      page: patientPage,
      context: patientCtx,
      browser,
      name: "Patient1",
    });
    await patientPage.close();
    await patientCtx.close();
  },
});

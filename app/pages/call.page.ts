import { expect } from "@playwright/test";
import { PageHolder } from "../abstractClasses";
import { step } from "../../misc/reporters/step";

export class Call extends PageHolder {
  @step()
  async expectCallStarted(userName: string) {
    await expect(
      this.page.getByLabel(`${userName} on main view`)
    ).toBeVisible();
  }
}

import { expect } from "@playwright/test";
import { PageHolder } from "./abstractClasses";
import { Dashboard } from "./pages/dashboard.page";
import { Call } from "./pages/call.page";
import { WaitingRoom } from "./pages/waitingRoom.page";
import { step } from "../misc/reporters/step";

// email = "xotabu4+DOXYME@gmail.com",
// password = "xotabu4+DOXYME@gmail.com"

abstract class Application extends PageHolder {
  public call = new Call(this.page);
}

export class DoctorApplication extends Application {
  public dashboard = new Dashboard(this.page);

  @step()
  async signIn() {
    await this.page.goto("/signin");

    await this.page
      .getByPlaceholder("Email")
      .pressSequentially(process.env.DOXYME_USER as string);
    await this.page
      .getByPlaceholder("Password")
      .pressSequentially(process.env.DOXYME_PASSWORD as string);
    await this.page.getByRole("button", { name: "Sign in" }).click();
    await expect(
      this.page.getByRole("heading", { name: "Welcome Mr. User1" })
    ).toBeVisible({ timeout: 30000 });
  }
}

export class PatientApplication extends Application {
  public waitingRoom = new WaitingRoom(this.page);
}

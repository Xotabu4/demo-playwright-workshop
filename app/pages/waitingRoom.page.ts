import { step } from "../../misc/reporters/step";
import { PageHolder } from "../abstractClasses";

export class WaitingRoom extends PageHolder {
  @step()
  async checkin(patientName: string, roomPath = "/proroom1") {
    await this.page.goto(roomPath);
    await this.page
      .getByRole("textbox", { name: "Enter your full name" })
      .fill(patientName);
    await this.page.getByRole("button", { name: "Check in" }).click();
  }
}

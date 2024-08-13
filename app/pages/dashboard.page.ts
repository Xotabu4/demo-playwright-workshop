import { step } from "../../misc/reporters/step";
import { PageHolder } from "../abstractClasses";

export class Dashboard extends PageHolder {
  @step()
  async startCallWithFirstPatient() {
    await this.page.getByRole("button", { name: "Start video call" }).click({
      timeout: 10000,
    });
  }
}

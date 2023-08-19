import { PageHolder } from "./abstractClasses";
import { SignUp } from "./page/signup.page";

export class Application extends PageHolder {
    public readonly signUp = new SignUp(this.page);
}
import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "../../misc/reporters/step";

export class SignUp extends AppPage {
    public pagePath = '/register';

    private emailInput = this.page.getByRole('main').getByPlaceholder('Please Enter Your Email');
    private firstNameInput = this.page.getByPlaceholder('Please Enter Your First Name');
    private lastNameInput = this.page.getByPlaceholder('Please Enter Your Last Name');
    private passwordInput = this.page.getByPlaceholder('Please Enter Your Password')
    private signUpButton = this.page.getByRole('button', { name: 'Sign Up' });

    @step()
    async expectLoaded() {
        await expect(this.emailInput, 'Expected SignUp page to be opened').toBeVisible();
    }

    @step()
    async signUpNewUser() {
        await this.emailInput.fill(`test+${Date.now()}@test.com`);
        await this.firstNameInput.fill('test');
        await this.lastNameInput.fill('test');
        await this.passwordInput.fill('123456');
        await this.signUpButton.click();
    }
}
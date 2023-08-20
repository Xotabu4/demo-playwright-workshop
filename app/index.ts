import { PageHolder } from "./abstractClasses";
import { Home } from "./page/home.page";
import { Product } from "./page/product.page";
import { Shop } from "./page/shop.page";
import { SignIn } from "./page/signin.page";
import { SignUp } from "./page/signup.page";

export class Application extends PageHolder {
    public signUp = new SignUp(this.page);
    public home = new Home(this.page);
    public shop = new Shop(this.page);
    public product = new Product(this.page);
    public signIn = new SignIn(this.page);
}
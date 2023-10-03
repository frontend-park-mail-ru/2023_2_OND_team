import { renderAuthPage } from "../Authorization/auth-page.js";
import { renderRegPage } from "../Registration/reg-page.js";

export class Header {
    #parent;
    #main;

    constructor(parent, main) {
        this.#parent = parent;
        this.#main = main;
    }

    renderHeader(isAuthorized, username) {
        const header = Handlebars.templates['Header.hbs'];
        const userData = Handlebars.templates['UserData.hbs'];
        const headerNonAuthorized = Handlebars.templates['HeaderNonAuthorized.hbs'];
        
        const context = {
            isAuthorized: isAuthorized,
            UserData: userData,
            HeaderNonAuthorized: headerNonAuthorized,
            userDataContext: { username }
        };

        this.#parent.innerHTML = header(context);

        this.logoutButton = document.querySelector('.header-logout-button');
        if (this.logoutButton != undefined) {
            this.logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.#parent.style.display = 'none';
                this.#main.style.paddingTop = '0';
                renderAuthPage(this.#parent, this.#main);
            });
        }

        this.loginButton = document.querySelector('.header-login-button');
        if (this.loginButton != undefined) {
            this.loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.#parent.style.display = 'none';
                this.#main.style.paddingTop = '0';
                renderAuthPage(this.#parent, this.#main);
            });
        }

        this.signupButton = document.querySelector('.header-signup-button');
        if (this.signupButton != undefined) {
            this.signupButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.#parent.style.display = 'none';
                this.#main.style.paddingTop = '0';
                renderRegPage(this.#parent, this.#main);
            });
        }
    }
}
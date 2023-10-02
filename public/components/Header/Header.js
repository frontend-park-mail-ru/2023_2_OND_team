import { renderAuthPage } from "../Authorization/auth-page.js";

export class Header {
    #parent;
    #main;
    logoutButton;

    constructor(parent, main) {
        this.#parent = parent;
        this.#main = main;
        this.logoutButton = document.querySelector('.header-logout-button');
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
                renderAuthPage(this.#parent, this.#main);
            });
        }
    }
}
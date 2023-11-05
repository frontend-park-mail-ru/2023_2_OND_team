import { renderRegPage } from "../Registration/Registration.js";
import { renderAuthPage } from "../Authorization/Authorization.js";

export function renderHeaderGuest() {
    const header = document.querySelector('#header');
    
    const headerTemplate = Handlebars.templates['HeaderGuest.hbs'];
    const headerContext = {};

    header.innerHTML = headerTemplate(headerContext);

    const loginBtn = document.querySelector('.js-header__login-btn');
    loginBtn?.addEventListener('click', () => {
        renderAuthPage();
    })

    const signupBtn = document.querySelector('.js-header__singup-btn');
    signupBtn?.addEventListener('click', () => {
        renderRegPage();
    })
}


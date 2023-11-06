import { renderRegPage } from "../Registration/Registration.js";
import { renderAuthPage } from "../Authorization/Authorization.js";
import { Router } from "../../components/Router/router.js";

export function renderHeaderGuest() {
    const router = new Router();
    const header = document.querySelector('#header');
    
    const headerTemplate = Handlebars.templates['HeaderGuest.hbs'];
    const headerContext = {};

    header.innerHTML = headerTemplate(headerContext);

    const loginBtn = document.querySelector('.js-header__login-btn');
    loginBtn?.addEventListener('click', () => {
        router.navigate('/login');
    })

    const signupBtn = document.querySelector('.js-header__singup-btn');
    signupBtn?.addEventListener('click', () => {        
        router.navigate('/signup');
    })
}


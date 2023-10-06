import { renderAuthPage } from "../Authorization/auth-page.js";
import { renderRegPage } from "../Registration/reg-page.js";
import { API } from "../../utils/api.js";

/**
* Класс для рендеринга хэдера главной страницы.
*/
export class Header {
    #parent;
    #main;

    /**
    * Создает экземпляр класса Header.
    * @param {HTMLElement} parent - Элемент, в который будет рендериться хэдр.
    * @param {HTMLElement} main - Элемент основного контента страницы.
    */
    constructor(parent, main) {
        this.#parent = parent;
        this.#main = main;
    }

    /**
    * Рендерит хэдр страницы в зависимости от статуса авторизации.
    * @param {boolean} isAuthorized - Флаг, указывающий, авторизован ли пользователь.
    * @param {string} username - Имя пользователя, если авторизован.
    */
    renderHeader(isAuthorized, username) {
        console.log('header', this.#parent, this.#main);
        const header = Handlebars.templates['Header.hbs'];
        const userData = Handlebars.templates['UserData.hbs'];
        const headerNonAuthorized = Handlebars.templates['HeaderNonAuthorized.hbs'];
        
        const context = {
            isAuthorized: isAuthorized,
            UserData: userData,
            HeaderNonAuthorized: headerNonAuthorized,
            userDataContext: { username }
        };

        this.#parent.innerHTML = '<h1>user<h1>'

        //  header(context);

        // this.logoutButton = document.querySelector('.header-logout-button');
        // if (this.logoutButton != undefined) {
        //     this.logoutButton.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         this.#parent.classList.add('header-hidden');
        //         this.#main.classList.add('main-no-padding');

        //         if (API.logoutUser()) {
        //             this.#parent.innerHTML = '';
        //             window.removeEventListener('scroll', window.scrollFunc);
        //             renderAuthPage(this.#parent, this.#main);
        //         }
        //     });
        // }

        // this.loginButton = document.querySelector('.header-login-button');
        // if (this.loginButton != undefined) {
        //     this.loginButton.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         this.#parent.classList.add('header-hidden');
        //         this.#main.classList.add('main-no-padding');
        //         this.#parent.innerHTML = '';
        //         window.removeEventListener('scroll', window.scrollFunc);
        //         renderAuthPage(this.#parent, this.#main);
        //     });
        // }

        // this.signupButton = document.querySelector('.header-signup-button');
        // if (this.signupButton != undefined) {
        //     this.signupButton.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         this.#parent.classList.add('header-hidden');
        //         this.#main.classList.add('main-no-padding');
        //         this.#parent.innerHTML = '';
        //         window.removeEventListener('scroll', window.scrollFunc);
        //         renderRegPage(this.#parent, this.#main);
        //     });
        // }
    }
}

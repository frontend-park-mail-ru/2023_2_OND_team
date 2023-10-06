import { Header } from "../Header/Header.js";
import { API } from "../../utils/api.js";
// import { handleScroll } from "../../utils/handleScroll.js";
import { renderPins } from "../../utils/renderPins.js";

const NUM_REQUESTED_PINS = 20;
// let PIN_LAST_ID;

/**
* Рендерится главная страница с пинами.
* @param {HTMLElement} headerElement - Элемент заголовка.
* @param {HTMLElement} pageElement - Элемент страницы.
*/
export function renderFeedPage() {
    const rootElement = document.getElementById('root');

    const feed = Handlebars.templates['Feed.hbs'];
    const header = Handlebars.templates['Header.hbs'];
    const userData = Handlebars.templates['UserData.hbs'];
    const headerNonAuthorized = Handlebars.templates['HeaderNonAuthorized.hbs'];

    const headerContext = {
        isAuthorized: null,
        UserData: userData,
        HeaderNonAuthorized: headerNonAuthorized,
        userDataContext: null
    };
            
    API.checkLogin()
        .then(data => {
            headerContext.isAuthorized = data.isAuthorized;
            headerContext.userDataContext = data.username;
            // renderHeader(data.isAuthorized, data.username);
        })
        .catch(error => {
            console.error('Ошибка при рендеринге хедера:', error);
        });

    const context = {
        Header: header,
        headerContext: headerContext 
    }


    rootElement.innerHTML = feed(context);

    // const headerElement = document.getElementsByTagName('header');
    const pageElement = document.getElementsByTagName('main');

    // if (!headerElement || !pageElement) {
    //     const rootElement = document.getElementById('root');
    //     headerElement = document.createElement('header');
    //     pageElement = document.createElement('main');
    //     rootElement.appendChild(headerElement);
    //     rootElement.appendChild(pageElement);
    // }

    // PIN_LAST_ID = NUM_REQUESTED_PINS;
    
    pageElement.innerHTML = ''
    document.body.style.overflow = 'visible';

    // const header = new Header(headerElement, pageElement);
    // const div = document.createElement('div');
    // div.classList.add('container');
    // pageElement.appendChild(div);

    // const section = document.createElement('section');
    // section.id = "pins";
    // section.classList.add('gallery');
    // div.appendChild(section);
    

    API.generatePins(NUM_REQUESTED_PINS, 0)
        .then(({images, lastID}) => {
            const section = document.getElementById('pins');
            renderPins(section, images);
        })
        .catch(error => {
            console.error(error);
        });


    // function renderHeader(isAuthorized, username) {
    //     const header = Handlebars.templates['Header.hbs'];
    //     const userData = Handlebars.templates['UserData.hbs'];
    //     const headerNonAuthorized = Handlebars.templates['HeaderNonAuthorized.hbs'];
        
    //     const context = {
    //         isAuthorized: isAuthorized,
    //         UserData: userData,
    //         HeaderNonAuthorized: headerNonAuthorized,
    //         userDataContext: { username }
    //     };

    //     this.#parent.innerHTML = header(context);

    //     this.logoutButton = document.querySelector('.header-logout-button');
    //     if (this.logoutButton != undefined) {
    //         this.logoutButton.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             this.#parent.classList.add('header-hidden');
    //             this.#main.classList.add('main-no-padding');

    //             if (API.logoutUser()) {
    //                 this.#parent.innerHTML = '';
    //                 window.removeEventListener('scroll', window.scrollFunc);
    //                 renderAuthPage(this.#parent, this.#main);
    //             }
    //         });
    //     }

    //     this.loginButton = document.querySelector('.header-login-button');
    //     if (this.loginButton != undefined) {
    //         this.loginButton.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             this.#parent.classList.add('header-hidden');
    //             this.#main.classList.add('main-no-padding');
    //             this.#parent.innerHTML = '';
    //             window.removeEventListener('scroll', window.scrollFunc);
    //             renderAuthPage(this.#parent, this.#main);
    //         });
    //     }

    //     this.signupButton = document.querySelector('.header-signup-button');
    //     if (this.signupButton != undefined) {
    //         this.signupButton.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             this.#parent.classList.add('header-hidden');
    //             this.#main.classList.add('main-no-padding');
    //             this.#parent.innerHTML = '';
    //             window.removeEventListener('scroll', window.scrollFunc);
    //             renderRegPage(this.#parent, this.#main);
    //         });
    //     }
    // }

    let scrollFunc = debounce(handleScroll, 100);
    window.scrollFunc = scrollFunc;
    window.addEventListener('scroll', window.scrollFunc);
}

function debounce(f, ms) {
    let isCooldown = false;

    return function() {
        if (isCooldown) return;

        f.apply(this, arguments);
        isCooldown = true;

        setTimeout(() => isCooldown = false, ms);
    };
}

/**
* Обработчик скролла страницы.
* Загружает дополнительные пины при достижении нижней части страницы.
*/
function handleScroll() {
    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;

    if (scrollY + windowHeight >= documentHeight - 600) {
        API.generatePins(NUM_REQUESTED_PINS, 0)
            .then(({images, lastID}) => {
                const section = document.getElementById('pins');
                renderPins(section, images);

                // if (PIN_LAST_ID === lastID) {
                //     window.removeEventListener('scroll', window.scrollFunc);
                // }

                // PIN_LAST_ID = lastID;
            })
            .catch(error => {
                console.error('Ошибка при рендеринге пинов:', error);
            });
    }
}

import { API } from "../../utils/api.js";
import { renderAuthPage } from "../Authorization/AuthPage.js";
import { renderRegPage } from "../Registration/reg-page.js";
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

    document.body.style.overflow = 'visible';

    const feed = Handlebars.templates['Feed.hbs'];
    const header = Handlebars.templates['Header.hbs'];
    const userData = Handlebars.templates['UserData.hbs'];
    const headerNonAuthorized = Handlebars.templates['HeaderNonAuthorized.hbs'];

    const userDataContext = {
        username: null
    }

    const headerContext = {
        isAuthorized: null,
        UserData: userData,
        HeaderNonAuthorized: headerNonAuthorized,
        userDataContext: userDataContext
    };
            
    API.checkLogin()
        .then(data => {
            headerContext.isAuthorized = data.isAuthorized;
            headerContext.userDataContext.username = data.username;

             const context = {
                Header: header,
                headerContext: headerContext 
            }

            rootElement.innerHTML = feed(context);
        
            defineButtons();
        })
        .catch(error => {
            console.error(error);
        });

    API.generatePins(NUM_REQUESTED_PINS, 0)
        .then(({images, lastID}) => {
            const section = document.getElementById('pins');
            renderPins(section, images);
        })
        .catch(error => {
            console.error(error);
        });

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

function defineButtons() {
    const headerElement = document.getElementById('header');
    const pageElement = document.getElementById('main');

    const logoutButton = document.querySelector('.header-logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            headerElement.classList.add('header-hidden');
            pageElement.classList.add('main-no-padding');

            if (API.logoutUser()) {
                headerElement.innerHTML = '';
                window.removeEventListener('scroll', window.scrollFunc);
                renderAuthPage(headerElement, pageElement);
            }
        });
    }

    const loginButton = document.querySelector('.header-login-button');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            headerElement.classList.add('header-hidden');
            pageElement.classList.add('main-no-padding');
            headerElement.innerHTML = '';
            window.removeEventListener('scroll', window.scrollFunc);
            renderAuthPage(headerElement, pageElement);
        });
    }

    const signupButton = document.querySelector('.header-signup-button');
    if (signupButton) {
        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            headerElement.classList.add('header-hidden');
            pageElement.classList.add('main-no-padding');
            headerElement.innerHTML = '';
            window.removeEventListener('scroll', window.scrollFunc);
            renderRegPage(headerElement, pageElement);
        });
    }
}
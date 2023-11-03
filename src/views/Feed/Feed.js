import { API } from '../../utils/api.js';
import { renderAuthPage } from '../Authorization/Authorization.js';
import { renderRegPage } from '../Registration/Registration.js';
import { renderPins } from '../../components/RenderPins/renderPins.js';
import { renderProfilePage } from '../ProfileUser/Profile.js';

const PINS_MAX = 100;
const PINS_REQUEST = 20;
let PIN_LAST_ID = 0;

/**
* Рендерит главную страницу с пинами.
*/
export function renderFeedPage() {
    const rootElement = document.getElementById('root');
    PIN_LAST_ID = 0;

    document.body.style.overflow = 'visible';

    const feed = Handlebars.templates['Feed.hbs'];

    API.checkLogin()
        .then((data) => {
            let header = Handlebars.templates['HeaderGuest.hbs'];
            let sidebar, headerContext;

            if (data.isAuthorized) {
                header = Handlebars.templates['HeaderDefault.hbs'];
                sidebar = Handlebars.templates['Sidebar.hbs'];
                headerContext = {
                    isAuthorized: true,
                    username: null,
                    avatar: null,
                };
            }

            const context = {
                Header: header,
                Sidebar: sidebar,
                headerContext: headerContext,
            };

            rootElement.innerHTML = feed(context);

            definePageElements();
        })
        .catch((error) => {
            console.error(error);
        });
}

/**
* Определяет обработчики событий для кнопок в шапке страницы и генерирует пины.
*/
function definePageElements() {
    const headerElement = document.getElementById('header');
    const pageElement = document.getElementById('main');

    const logo = document.querySelector('.js-header__logo');
    if (logo) {
        logo.addEventListener('click', handleLogoClick);
    }

    function handleLogoClick(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const logoutBtn = document.querySelector('.js-header-btns__logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            headerElement.classList.add('header-hidden');
            pageElement.classList.add('main-no-padding');

            if (API.logoutUser()) {
                headerElement.innerHTML = '';
                window.removeEventListener('scroll', window.scrollFunc);
                logo.removeEventListener('click', handleLogoClick);
                renderAuthPage(headerElement, pageElement);
            }
        });
    }

    const loginBtn = document.querySelector('.js-header-btns__login');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            headerElement.classList.add('header-hidden');
            pageElement.classList.add('main-no-padding');
            headerElement.innerHTML = '';
            window.removeEventListener('scroll', window.scrollFunc);
            logo.removeEventListener('click', handleLogoClick);
            renderAuthPage(headerElement, pageElement);
        });
    }

    const signupBtn = document.querySelector('.js-header-btns__signup');
    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            headerElement.classList.add('header-hidden');
            pageElement.classList.add('main-no-padding');
            headerElement.innerHTML = '';
            window.removeEventListener('scroll', window.scrollFunc);
            logo.removeEventListener('click', handleLogoClick);
            renderRegPage(headerElement, pageElement);
        });
    }

    const menuBtn = document.querySelector('.header__nav-create__menu');
    if (menuBtn) {
        const navCreate = document.querySelector('.nav-create');
        const navCreateLineOne = document.querySelector('.header__nav-create__menu-line1');
        const navCreateLineTwo = document.querySelector('.header__nav-create__menu-line2');
        const navCreateLineThree = document.querySelector('.header__nav-create__menu-line3');
        const links = document.querySelector('.header__nav-create__btns');
        menuBtn.addEventListener('click', () => {
            navCreate.classList.toggle('nav-open');
            navCreateLineOne.classList.toggle('line-cross');
            navCreateLineTwo.classList.toggle('line-fade-out');
            navCreateLineThree.classList.toggle('line-cross');
            links.classList.toggle('fade-in');
        });
    }

    const headerUserData = document.querySelector('.js-header-user__data');
    if (headerUserData) {
        const navUser = document.querySelector('.nav-user');
        const links = document.querySelector('.header__nav-user__btns');
        headerUserData.addEventListener('click', (e) => {
            if (!navUser.contains(e.target)) {
                navUser.classList.toggle('nav-open');
                links.classList.toggle('fade-in');
            }
        });
    }

    const profileBtn = document.querySelector('.js-header-btns__profile');
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.removeEventListener('scroll', window.scrollFunc);
            logo.removeEventListener('click', handleLogoClick);
            renderProfilePage(headerElement, pageElement);
        });
    }

    /**
    * Создает функцию с задержкой для предотвращения слишком частых вызовов.
    */
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
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        if (scrollY + windowHeight >= documentHeight - 1000) {
            API.generatePins(PINS_REQUEST, PIN_LAST_ID)
                .then(({images, lastID}) => {
                    if (PIN_LAST_ID == lastID) {
                        window.removeEventListener('scroll', window.scrollFunc);
                        return;
                    }

                    if (lastID > PINS_MAX) {
                        const pinsToDelete = document.querySelectorAll('.gallery__item');
                        pinsToDelete.forEach(pin => {
                            const pinID = pin.getAttribute('class').replace('gallery__item js-pin-id-', '');

                            if (pinID < lastID - PINS_MAX) {
                                pin.remove();
                                console.log(`remove element ${pinID}}`);
                            }
                        })
                    }

                    const section = document.getElementById('pins');
                    renderPins(section, images);
                    PIN_LAST_ID = lastID;
                })
                .catch((error) => {
                    console.error('Ошибка при рендеринге пинов:', error);
                });
        }
    }

    const scrollFunc = debounce(handleScroll, 150);
    window.scrollFunc = scrollFunc;
    scrollFunc();
    window.addEventListener('scroll', window.scrollFunc);
}

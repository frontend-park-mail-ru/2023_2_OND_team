import { API } from '../../utils/api.js';
import { renderPins } from '../../components/RenderPins/renderPins.js';
import { State } from '../../components/State/state.js'
import { Router } from '../../components/Router/router.js'
 
/**
* Рендерит главную страницу с пинами.
*/
export function renderFeedPage() {
    const router = new Router();
    const main = document.querySelector('#main');

    const numRequestedPins = 20;
    let pinMaxID = -Infinity; 
    let pinMinID = Infinity; 

    document.body.style.overflow = 'visible';

    const state = new State();

    const feedTemplate = Handlebars.templates['Feed.hbs'];
    const introTemplate = Handlebars.templates['Intro.hbs'];
    const feedContext = {
        isAuthorized: state.getIsAuthorized(),
        Intro: introTemplate,
    };

    main.innerHTML = feedTemplate(feedContext);

    const pins = document.querySelectorAll('.gallery__item');

    pins?.forEach((pin) => {
      pin.addEventListener('click', () => {
        console.log('КЛИК');
        const pinID = pin.className.split(' ')[1].split('-')[3];
        router.navigate(`/pin/${pinID}`);
      });
    });

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
            API.generatePins(numRequestedPins, pinMaxID, pinMinID)
                .then((data) => {
                    if (data.maxID === pinMaxID && data.minID === pinMinID) {
                        window.removeEventListener('scroll', window.scrollFunc);
                        return;
                    }

                    pinMaxID = Math.max(pinMaxID, data.maxID);
                    pinMinID = Math.min(pinMinID, data.minID);

                    const section = document.getElementById('pins');
                    renderPins(section, data.pins);
                    definePins();
    
                    const pins = document.querySelectorAll('.gallery__item');
                    if (pins?.length > 100) {
                        const pinsToDelete = Array.from(pins).slice(0, 20);
                        pinsToDelete.forEach(pin => {
                            pin.remove();
                        });
                    }
    
                })
                .catch((error) => {
                    console.error('Ошибка при рендеринге пинов:', error);
                });
        }
    }
    
    const scrollFunc = debounce(handleScroll, 250);
    window.scrollFunc = scrollFunc;
    scrollFunc();
    window.removeEventListener('scroll', window.scrollFunc);
    window.addEventListener('scroll', window.scrollFunc);
    
    function definePins() {
        const pins = document.querySelectorAll('.gallery__item');
        console.log(pins)
    
        pins?.forEach((pin) => {
          pin.addEventListener('click', () => {
            console.log('КЛИК');
            const pinID = pin.className.split(' ')[1].split('-')[3];
            router.navigate(`/pin/${pinID}`, pinID);
          });
        });
    }

    // const logo = document.querySelector('.js-header__logo');
    // if (logo) {
    //     logo.addEventListener('click', handleLogoClick);
    // }

    // function handleLogoClick(e) {
    //     e.preventDefault();
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // }

    
}

// /**
// * Определяет обработчики событий для кнопок в шапке страницы и генерирует пины.
// */
// function definePageElements() {
//     const headerElement = document.getElementById('header');
//     const pageElement = document.getElementById('main');

    

//     const logoutBtn = document.querySelector('.js-header-btns__logout');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             headerElement.classList.add('header-hidden');
//             pageElement.classList.add('main-no-padding');

//             if (API.logoutUser()) {
//                 headerElement.innerHTML = '';
//                 window.removeEventListener('scroll', window.scrollFunc);
//                 logo.removeEventListener('click', handleLogoClick);
//                 // renderAuthPage(headerElement, pageElement);
//             }
//         });
//     }

//     const loginBtn = document.querySelector('.js-header-btns__login');
//     if (loginBtn) {
//         loginBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             headerElement.classList.add('header-hidden');
//             pageElement.classList.add('main-no-padding');
//             headerElement.innerHTML = '';
//             window.removeEventListener('scroll', window.scrollFunc);
//             logo.removeEventListener('click', handleLogoClick);
//             // renderAuthPage(headerElement, pageElement);
//         });
//     }

//     const signupBtn = document.querySelector('.js-header-btns__signup');
//     if (signupBtn) {
//         signupBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             headerElement.classList.add('header-hidden');
//             pageElement.classList.add('main-no-padding');
//             headerElement.innerHTML = '';
//             window.removeEventListener('scroll', window.scrollFunc);
//             logo.removeEventListener('click', handleLogoClick);
//             // renderRegPage(headerElement, pageElement);
//         });
//     }

//     const menuBtn = document.querySelector('.header__nav-create__menu');
//     if (menuBtn) {
//         const navCreate = document.querySelector('.nav-create');
//         const navCreateLineOne = document.querySelector('.header__nav-create__menu-line1');
//         const navCreateLineTwo = document.querySelector('.header__nav-create__menu-line2');
//         const navCreateLineThree = document.querySelector('.header__nav-create__menu-line3');
//         const links = document.querySelector('.header__nav-create__btns');
//         menuBtn.addEventListener('click', () => {
//             navCreate.classList.toggle('nav-open');
//             navCreateLineOne.classList.toggle('line-cross');
//             navCreateLineTwo.classList.toggle('line-fade-out');
//             navCreateLineThree.classList.toggle('line-cross');
//             links.classList.toggle('fade-in');
//         });
//     }

//     const headerUserData = document.querySelector('.js-header-user__data');
//     if (headerUserData) {
//         const navUser = document.querySelector('.nav-user');
//         const links = document.querySelector('.header__nav-user__btns');
//         headerUserData.addEventListener('click', (e) => {
//             if (!navUser.contains(e.target)) {
//                 navUser.classList.toggle('nav-open');
//                 links.classList.toggle('fade-in');
//             }
//         });
//     }

//     const profileBtn = document.querySelector('.js-header-btns__profile');
//     if (profileBtn) {
//         profileBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             window.removeEventListener('scroll', window.scrollFunc);
//             logo.removeEventListener('click', handleLogoClick);
//             // renderProfilePage(headerElement, pageElement);
//         });
//     }

    

//     // defineSidebar();
// }

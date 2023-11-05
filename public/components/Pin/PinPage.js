import { API } from '../../utils/api.js';
import { renderAuthPage } from '../Authorization/AuthPage.js';
import { renderRegPage } from '../Registration/RegPage.js';
import { renderPins } from '../../utils/renderPins.js';
import { renderProfilePage } from '../Profile/Profile.js';
import { renderFeedPage } from '../Feed/Feed.js';

const PINS_MAX = 100;
const PINS_REQUEST = 20;
let PIN_LAST_ID = 0;

export function renderPinPage(pin) {
    const rootElement = document.getElementById('root');
    PIN_LAST_ID = 0;

    document.body.style.overflow = 'visible';

    const pinsCard = Handlebars.templates['PinsCard.hbs'];
    const feed = Handlebars.templates['Feed.hbs'];
    const header = Handlebars.templates['Header.hbs'];
    const userData = Handlebars.templates['UserData.hbs'];
    const headerNonAuthorized = Handlebars.templates['HeaderNonAuthorized.hbs'];

    const userDataContext = {
        username: null,
    };

    const headerContext = {
        isAuthorized: null,
        UserData: userData,
        HeaderNonAuthorized: headerNonAuthorized,
        userDataContext: userDataContext,
    };

    API.checkLogin()
      .then((data) => {
        headerContext.isAuthorized = data.isAuthorized;
        headerContext.userDataContext.username = data.username;

        const context = {
          Header: header,
          headerContext: headerContext,
        };

        rootElement.innerHTML = feed(context);

        definePageElements();
      })
      .catch((error) => {
        console.error(error);
      });

    const pinID = pin.getAttribute('class').replace('gallery__item js-pin-id-', '');
    API.getPinInfo(pinID)
        .then((pinInfo) => {
            const context = {
                id: pinInfo.id,
                src: pinInfo.picture,
            };

            const html = pinsCard(context);

            rootElement.innerHTML = html;
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
        });
}

function definePageElements() {
    const headerElement = document.getElementById('header');
    const pageElement = document.getElementById('main');
  
    const logoutBtn = document.querySelector('.js-header-btns__logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
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
  
    const loginBtn = document.querySelector('.js-header-btns__login');
    if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        headerElement.classList.add('header-hidden');
        pageElement.classList.add('main-no-padding');
        headerElement.innerHTML = '';
        window.removeEventListener('scroll', window.scrollFunc);
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
              PinClick();
            })
            .catch((error) => {
              console.error('Ошибка при рендеринге пинов:', error);
            });
      }
    }
  
    const scrollFunc = debounce(handleScroll, 100);
    window.scrollFunc = scrollFunc;
    scrollFunc();
    window.addEventListener('scroll', window.scrollFunc);
  }
  
  function PinClick() {
    const pins = document.querySelectorAll('.gallery__item');
  
    pins.forEach((pin) => {
      pin.addEventListener('click', () => {
        console.log('КЛИК');
        renderPinPage(pin);
      });
    });
  }
  
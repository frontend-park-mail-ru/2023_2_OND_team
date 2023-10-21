import {API} from '../../utils/api.js';
import {renderAuthPage} from '../Authorization/AuthPage.js';
import {renderRegPage} from '../Registration/RegPage.js';
import {renderPins} from '../../utils/renderPins.js';

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
}

/**
* Определяет обработчики событий для кнопок в шапке страницы и генерирует пины.
*/
function definePageElements() {
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



  var menuBtn = document.querySelector('.header__nav-create__menu');
  var nav = document.querySelector('.nav-create');
  var lineOne = document.querySelector('.header__nav-create__menu-line1');
  var lineTwo = document.querySelector('.header__nav-create__menu-line2');
  var lineThree = document.querySelector('.header__nav-create__menu-line3');
  var link = document.querySelector('.header__nav-create__btns');
  menuBtn.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      lineOne.classList.toggle('line-cross');
      lineTwo.classList.toggle('line-fade-out');
      lineThree.classList.toggle('line-cross');
      link.classList.toggle('fade-in');
  })

  const scrollFunc = debounce(handleScroll, 100);
  window.scrollFunc = scrollFunc;
  scrollFunc();
  window.addEventListener('scroll', window.scrollFunc);
}

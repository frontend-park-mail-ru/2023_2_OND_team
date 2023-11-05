import {API} from '../../utils/api.js';
import {renderFeedPage} from '../Feed/Feed.js';
import { renderAuthPage } from '../Authorization/AuthPage.js';

export function renderPinPage() {
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

  const scrollFunc = debounce(handleScroll, 100);
  window.scrollFunc = scrollFunc;
  scrollFunc();
  window.addEventListener('scroll', window.scrollFunc);
}
  
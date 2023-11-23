import State from '../../components/State/state.js';
import {Router} from '../../components/Router/router.js';

export function renderHeaderGuest() {
  const state = new State();
  const router = new Router();
  const header = document.querySelector('#header');

  const headerTemplate = Handlebars.templates['HeaderGuest.hbs'];
  const headerContext = {};

  header.innerHTML = headerTemplate(headerContext);

  const loginBtn = document.querySelector('.js-header__login-btn');
  loginBtn?.addEventListener('click', () => {
    router.navigate('/login');
  });

  const signupBtn = document.querySelector('.js-header__singup-btn');
  signupBtn?.addEventListener('click', () => {
    router.navigate('/signup');
  });

  const logo = document.querySelector('.js-header-guest__logo-img');
  logo?.addEventListener('click', handleLogoClick);

  function handleLogoClick(e) {
    e.preventDefault();

    if (state.getCurrentPage() === 'feed') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      router.navigate('/');
    }
  }
}


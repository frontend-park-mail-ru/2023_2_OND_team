import {renderAuthPage} from '../Authorization/Authorization.js';
import {renderFeedPage} from '../Feed/Feed.js';
import {emailValid, passwordValid, nameValid, repeatPasswordValid} from '../../components/Validation/valid.js';
import {API} from '../../utils/api.js';
import { renderHeaderGuest } from '../HeaderGuest/HeaderGuest.js';
import { Router } from '../../components/Router/router.js';

/**
 * Рендерит страницу регистрации.
 *
 * @param {HTMLElement} headerElement - Элемент заголовка.
 * @param {HTMLElement} pageElement - Элемент страницы.
 *
 * @return {void}
 */
export function renderRegPage() {
  const router = new Router();

  const sidebar = document.querySelector('#sidebar');
  const header = document.querySelector('#header');
  const main = document.querySelector('#main');
  const registration = document.querySelector('#fullpage');

  sidebar.innerHTML = '';
  header.innerHTML = '';
  main.innerHTML = '';


  const registrationTemplate = Handlebars.templates['Registration.hbs'];
  const registrationContext = {};

  registration.innerHTML = registrationTemplate(registrationContext);

  const passwordInput = document.querySelector('#password');
  const repeatPasswordInput = document.querySelector('#repeat-password');
  const emailInput = document.querySelector('#email');
  const usernameInput = document.querySelector('#username');
  const RegButton = document.querySelector('.button');
  const cancelButton = document.querySelector('.cancel-button');

  const signInLink = document.querySelector('.already-registered a');
  signInLink.addEventListener('click', function(e) {
    e.preventDefault();
    registration.innerHTML = '';
    router.navigate('/login');
  });

  const usernameErrorSpan = document.querySelector('.username-error-message');
  const emailErrorSpan = document.querySelector('.email-error-message');
  const passwordErrorSpan = document.querySelector('.password-error-message');
  const repeatPasswordErrorSpan = document.querySelector('.repeat-password-error-message');
  const wrongDataErrorSpan = document.querySelector('.wrong-data-error-message');

  RegButton.addEventListener('click', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    usernameInput.style.borderColor = '';
    emailInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
    repeatPasswordInput.style.borderColor = '';

    const usernameValidationResult = nameValid(username);
    const emailValidationResult = emailValid(email);
    const passwordValidationResult = passwordValid(password);
    const repeatPasswordValidResult = repeatPasswordValid(password, repeatPassword);

    if (!usernameValidationResult.valid) {
      usernameInput.style.borderColor = 'var(--error-50, #F4210B)';
      usernameInput.style.color = 'var(--error-50, #F4210B)';
      usernameErrorSpan.textContent = usernameValidationResult.message;
    } else {
      usernameErrorSpan.textContent = '';
    }

    if (!emailValidationResult.valid) {
      emailInput.style.borderColor = 'var(--error-50, #F4210B)';
      emailInput.style.color = 'var(--error-50, #F4210B)';
      emailErrorSpan.textContent = emailValidationResult.message;
    } else {
      emailErrorSpan.textContent = '';
    }

    if (!passwordValidationResult.valid) {
      passwordInput.style.borderColor = 'var(--error-50, #F4210B)';
      passwordInput.style.color = 'var(--error-50, #F4210B)';
      passwordErrorSpan.textContent = passwordValidationResult.message;
    } else {
      passwordErrorSpan.textContent = '';
    }

    if (!repeatPasswordValidResult.valid) {
      repeatPasswordInput.style.borderColor = 'var(--error-50, #F4210B)';
      repeatPasswordInput.style.color = 'var(--error-50, #F4210B)';
      repeatPasswordErrorSpan.textContent = repeatPasswordValidResult.message;
    } else {
      repeatPasswordErrorSpan.textContent = '';
    }

    if (usernameValidationResult.valid && emailValidationResult.valid && passwordValidationResult.valid) {
      API.registerUser(username, email, password)
          .then((status) => {
            if (status) {
              header.innerHTML = '';
              registration.innerHTML = '';
              router.navigate('/');
            } else {
              usernameInput.style.borderColor = 'var(--error-50, #F4210B)';
              emailInput.style.borderColor = 'var(--error-50, #F4210B)';
              passwordInput.style.borderColor = 'var(--error-50, #F4210B)';
              wrongDataErrorSpan.textContent = 'Пользователь уже зарегистрирован';
            }
          });
    }
  });

  cancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    registration.innerHTML = '';
    router.navigate('/');
  });
}

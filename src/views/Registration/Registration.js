import {renderAuthPage} from '../Authorization/Authorization.js';
import {renderFeedPage} from '../Feed/Feed.js';
import {emailValid, passwordValid, nameValid} from '../../components/Validation/valid.js';
import {API} from '../../utils/api.js';

/**
 * Рендерит страницу регистрации.
 *
 * @param {HTMLElement} headerElement - Элемент заголовка.
 * @param {HTMLElement} pageElement - Элемент страницы.
 *
 * @return {void}
 */
export function renderRegPage(headerElement, pageElement) {
  document.body.style.overflow = 'hidden';

  const regPage = Handlebars.templates['Reg.hbs'];
  const context = {};

  pageElement.innerHTML = regPage(context);
  const passwordInput = pageElement.querySelector('#password');
  const emailInput = pageElement.querySelector('#email');
  const usernameInput = pageElement.querySelector('#username');
  const RegButton = pageElement.querySelector('.button');
  const cancelButton = pageElement.querySelector('.cancel-button');

  const signInLink = pageElement.querySelector('.already-registered a');
  signInLink.addEventListener('click', function(e) {
    e.preventDefault();
    renderAuthPage(headerElement, pageElement);
  });

  const usernameErrorSpan = document.querySelector('.username-error-message');
  const emailErrorSpan = document.querySelector('.email-error-message');
  const passwordErrorSpan = document.querySelector('.password-error-message');
  const wrongDataErrorSpan = document.querySelector('.wrong-data-error-message');

  RegButton.addEventListener('click', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    usernameInput.style.borderColor = '';
    emailInput.style.borderColor = '';
    passwordInput.style.borderColor = '';

    const usernameValidationResult = nameValid(username);
    const emailValidationResult = emailValid(email);
    const passwordValidationResult = passwordValid(password);

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

    if (usernameValidationResult.valid && emailValidationResult.valid && passwordValidationResult.valid) {
      API.registerUser(username, email, password)
          .then((status) => {
            if (status) {
              headerElement.classList.remove('header-hidden');
              pageElement.classList.remove('main-no-padding');
              renderFeedPage();
            } else {
              usernameInput.style.borderColor = 'var(--error-50, #F4210B)';
              emailInput.style.borderColor = 'var(--error-50, #F4210B)';
              passwordInput.style.borderColor = 'var(--error-50, #F4210B)';
              wrongDataErrorSpan.textContent = 'Пользователь уже заригистрирован';
            }
          });
    }
  });

  cancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    headerElement.classList.remove('header-hidden');
    pageElement.classList.remove('main-no-padding');
    renderFeedPage();
  });
}

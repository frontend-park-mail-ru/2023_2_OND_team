import {renderRegPage} from '../Registration/RegPage.js';
import {API} from '../../utils/api.js';
import {renderFeedPage} from '../Feed/Feed.js';
import {passwordValid, nameValid} from '../../utils/valid.js';

/**
* Рендерит страницу аутентификации.
*
* @param {HTMLElement} headerElement - Элемент заголовка.
* @param {HTMLElement} pageElement - Элемент страницы.
*
* @return {void}
*/
export function renderAuthPage(headerElement, pageElement) {
  document.body.style.overflow = 'hidden';

  const authPage = Handlebars.templates['Auth.hbs'];
  const context = {};

  pageElement.innerHTML = authPage(context);
  const passwordInput = pageElement.querySelector('#password');
  const usernameInput = pageElement.querySelector('#username');
  const AuthButton = pageElement.querySelector('.button');
  const cancelButton = pageElement.querySelector('.cancel-button');

  const signUpLink = pageElement.querySelector('.already-registered a');
  signUpLink.addEventListener('click', function(e) {
    e.preventDefault();
    renderRegPage(headerElement, pageElement);
  });

  const usernameErrorSpan = document.querySelector('.username-error-message');
  const passwordErrorSpan = document.querySelector('.password-error-message');
  const wrongDataErrorSpan = document.querySelector('.wrong-data-error-message');

  AuthButton.addEventListener('click', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    usernameInput.style.borderColor = '';
    passwordInput.style.borderColor = '';

    const usernameValidationResult = nameValid(username);
    const passwordValidationResult = passwordValid(password);

    if (!usernameValidationResult.valid) {
      usernameInput.style.borderColor = 'var(--error-50, #F4210B)';
      usernameInput.style.color = 'var(--error-50, #F4210B)';
      usernameErrorSpan.textContent = usernameValidationResult.message;
    } else {
      usernameErrorSpan.textContent = '';
    }

    if (!passwordValidationResult.valid) {
      passwordInput.style.borderColor = 'var(--error-50, #F4210B)';
      passwordInput.style.color = 'var(--error-50, #F4210B)';
      passwordErrorSpan.textContent = passwordValidationResult.message;
    } else {
      passwordErrorSpan.textContent = '';
    }

    if (usernameValidationResult.valid && passwordValidationResult.valid) {
      API.loginUser(username, password)
          .then((status) => {
            if (status) {
              headerElement.classList.remove('header-hidden');
              pageElement.classList.remove('main-no-padding');
              renderFeedPage();
            } else {
              usernameInput.style.borderColor = 'var(--error-50, #F4210B)';
              passwordInput.style.borderColor = 'var(--error-50, #F4210B)';
              wrongDataErrorSpan.textContent = 'Неверное имя пользователя или пароль';
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

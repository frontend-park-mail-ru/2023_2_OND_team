import { renderRegPage } from '../Registration/Registration.js';
import { API } from '../../utils/api.js';
import { renderFeedPage } from '../Feed/Feed.js';
import {passwordValid, nameValid} from '../../components/Validation/valid.js'

/**
* Рендерит страницу аутентификации.
*
* @param {HTMLElement} headerElement - Элемент заголовка.
* @param {HTMLElement} pageElement - Элемент страницы.
*
* @return {void}
*/
export function renderAuthPage() {
  const sidebar = document.querySelector('#sidebar');
  const header = document.querySelector('#header');
  const main = document.querySelector('#main');

  sidebar.classList.add('hide');
  header.classList.add('hide');
  main.classList.add('hide');

  const authorization = document.querySelector('#fullpage');


  const authorizationTemplate = Handlebars.templates['Authorization.hbs'];
  const authorizationContext = {};

  authorization.innerHTML = authorizationTemplate(authorizationContext);

  const passwordInput = document.querySelector('#password');
  const usernameInput = document.querySelector('#username');
  const AuthButton = document.querySelector('.button');
  const cancelButton = document.querySelector('.cancel-button');

  const signUpLink = document.querySelector('.already-registered a');
  signUpLink.addEventListener('click', function(e) {
    e.preventDefault();
    renderRegPage();
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
              sidebar.classList.remove('hide');
              header.classList.remove('hide');
              main.classList.remove('hide');
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
    sidebar.classList.remove('hide');
    header.classList.remove('hide');
    main.classList.remove('hide');
    renderFeedPage();
  });
}
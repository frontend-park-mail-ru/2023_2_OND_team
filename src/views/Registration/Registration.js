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
export function renderRegPage() {
  const sidebar = document.querySelector('#sidebar');
  const header = document.querySelector('#header');
  const main = document.querySelector('#main');
  const registration = document.querySelector('#fullpage');

  sidebar.style.display = 'none';
  header.style.display = 'none';
  main.style.display = 'none';
  registration.style.display = 'flex';


  const registrationTemplate = Handlebars.templates['Registration.hbs'];
  const registrationContext = {};

  registration.innerHTML = registrationTemplate(registrationContext);

  const passwordInput = document.querySelector('#password');
  const emailInput = document.querySelector('#email');
  const usernameInput = document.querySelector('#username');
  const RegButton = document.querySelector('.button');
  const cancelButton = document.querySelector('.cancel-button');

  const signInLink = document.querySelector('.already-registered a');
  signInLink.addEventListener('click', function(e) {
    e.preventDefault();
    renderAuthPage();
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
              sidebar.style.display = 'flex';
              header.style.display = 'flex';
              main.style.display = 'flex';
              registration.style.display = 'none';
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
    sidebar.style.display = 'flex';
    header.style.display = 'flex';
    main.style.display = 'flex';
    registration.style.display = 'none';
    renderFeedPage();
  });
}

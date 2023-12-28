import {API} from '../../utils/Api/api.js';
import {passwordValid, nameValid} from '../../components/Validation/valid.js';
import {Router} from '../../components/Router/router.js';

/**
* Рендерит страницу аутентификации.
*
* @param {HTMLElement} headerElement - Элемент заголовка.
* @param {HTMLElement} pageElement - Элемент страницы.
*
* @return {void}
*/
export function renderAuthPage() {
  const router = new Router();

  const sidebar = document.querySelector('#sidebar');
  const header = document.querySelector('#header');
  const main = document.querySelector('#main');
  const authorization = document.querySelector('#fullpage');

  sidebar.innerHTML = '';
  header.innerHTML = '';
  main.innerHTML = '';

  const authorizationTemplate = Handlebars.templates['Authorization.hbs'];
  const isMobile = window.innerWidth < 968;
  
  const authorizationContext = {
    mobile: isMobile
  };

  authorization.innerHTML = authorizationTemplate(authorizationContext);

  const passwordInput = document.querySelector('#password');
  const usernameInput = document.querySelector('#username');
  const AuthButton = document.querySelector('.form__button');
  const cancelButton = document.querySelector('.cancel-button');

  const signUpLink = document.querySelector('.already-registered a');
  signUpLink.addEventListener('click', function(e) {
    e.preventDefault();
    authorization.innerHTML = '';
    router.navigate('/signup');
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

    usernameInput.style.color = '';
    passwordInput.style.color = '';

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
              API.checkLogin()
                  .then(() => {
                    header.innerHTML = '';
                    authorization.innerHTML = '';
                    router.navigate('/');
                  })
                  .catch((error) => {
                    console.error(error);
                  });
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
    authorization.innerHTML = '';
    router.navigate('/');
  });
}

import { renderRegPage } from '../Registration/reg-page.js';
import { API } from '../../utils/api.js';
import { nameValid, passwordValid } from '../../utils/valid.js';

const template = require('../../templates/Auth.hbs');

/**
 * Рендерится страница аутентификации.
 * @param {HTMLElement} headerElement - Элемент заголовка.
 * @param {HTMLElement} pageElement - Элемент страницы.
 */
export function renderAuthPage(headerElement, pageElement) {
    const Api = new API();

    const context = {
        
    };

    pageElement.innerHTML = template(context);

    const cancelButton = pageElement.querySelector('.cancel-button');
    const form = pageElement.querySelector('form');
    const usernameInput = form.querySelector('#username');
    const passwordInput = form.querySelector('#password');

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        headerElement.style.display = '';
        pageElement.style.paddingTop = '90px';
        renderFeedPage(headerElement, pageElement);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        usernameInput.style.borderColor = '';
        passwordInput.style.borderColor = '';

        const usernameValidationResult = nameValid(username);
        const passwordValidationResult = passwordValid(password);

        if (!usernameValidationResult.valid) {
        handleValidationError(usernameInput, usernameValidationResult.message);
        }

        if (!passwordValidationResult.valid) {
        handleValidationError(passwordInput, passwordValidationResult.message);
        }

        if (usernameValidationResult.valid && passwordValidationResult.valid) {
        Api.loginUser(username, password)
            .then(status => { 
            if (status) {
                headerElement.style.display = '';
                pageElement.style.paddingTop = '90px';
                renderFeedPage(headerElement, pageElement);
            } else {
                handleValidationError(form, 'Неверное имя пользователя или пароль');
            }
            });
        }
    });

    const signUpLink = pageElement.querySelector('.already-registered a');
    signUpLink.addEventListener('click', function (e) {
        e.preventDefault();
        renderRegPage(headerElement, pageElement);
    });

    function handleValidationError(element, message) {
        const errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        errorSpan.textContent = message;
    
        const existingErrorSpan = element.querySelector('.error-message');
        if (existingErrorSpan) {
        existingErrorSpan.remove();
        }
    
        element.appendChild(errorSpan);
    
        element.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
  }
}

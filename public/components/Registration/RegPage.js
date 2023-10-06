import { renderAuthPage } from '../Authorization/AuthPage.js';
import { renderFeedPage } from '../Feed/Feed.js';
import { emailValid, passwordValid, nameValid } from '../../utils/valid.js';
import { API } from '../../utils/api.js';

/**
 * Рендерится страница аутентификации.
 * @param {HTMLElement} headerElement - Элемент заголовка.
 * @param {HTMLElement} pageElement - Элемент страницы.
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
    signInLink.addEventListener('click', function (e) {
        e.preventDefault();
        renderAuthPage(headerElement, pageElement);
    });

    const passwordErrorSpan = document.createElement('span');
    const emailErrorSpan = document.createElement('span');
    const usernameErrorSpan = document.createElement('span');

    passwordErrorSpan.classList.add('error-message');
    emailErrorSpan.classList.add('error-message');
    usernameErrorSpan.classList.add('error-message');

    usernameInput.appendChild(usernameErrorSpan);
    emailInput.appendChild(usernameErrorSpan);
    passwordInput.appendChild(passwordErrorSpan);

    let errorSpan = document.querySelector('.error-mesage');

    RegButton.addEventListener('click', function (e) {
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
            usernameInput.style.Color = 'var(--error-50, #F4210B)';
            usernameErrorSpan.textContent = usernameValidationResult.message;
        } else {
            usernameErrorSpan.textContent = '';
        }

        if (!emailValidationResult.valid) {
            emailInput.style.borderColor = 'var(--error-50, #F4210B)';
            emailInput.style.Color = 'var(--error-50, #F4210B)';
            emailInput.textContent = emailValidationResult.message;
        } else {
            emailErrorSpan.textContent = '';
        }
    
        if (!passwordValidationResult.valid) {
            passwordInput.style.borderColor = 'var(--error-50, #F4210B)';
            passwordInput.style.Color = 'var(--error-50, #F4210B)';
            passwordErrorSpan.textContent = passwordValidationResult.message;
        } else {
            passwordErrorSpan.textContent = '';
        }
    
        if (usernameValidationResult.valid && emailValidationResult.valid && passwordValidationResult.valid) {
            API.registerUser(username, email, password)
                .then(status => { 
                    if (status) {
                        headerElement.classList.remove('header-hidden');
                        pageElement.classList.remove('main-no-padding');
                        renderFeedPage();
                    } else {
                        usernameInput.style.borderColor = 'var(--error-50, #F4210B)';
                        emailInput.style.borderColor = 'var(--error-50, #F4210B)';
                        passwordInput.style.borderColor = 'var(--error-50, #F4210B)';

                        if (!errorSpan) {
                            errorSpan = document.createElement('span');
                            errorSpan.classList.add('error-message');
                            errorSpan.textContent = 'Пользователь уже зарегистрирован';
                        }
                    }
                });
            
        }
    });

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        headerElement.classList.remove('header-hidden');
        pageElement.classList.remove('main-no-padding');
        renderFeedPage();
    });
}

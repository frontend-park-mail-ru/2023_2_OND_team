import { renderAuthPage } from '../Authorization/auth-page.js';
import { createLabeledInput } from '../Input/input.js';
import { registerUser } from '../../utils/reg.js';
import { renderFeedPage } from '../Feed/Feed.js';
import { emailValid, passwordValid, nameValid } from '../../utils/valid.js';

/**
* Рендерится страница регистрации.
* @param {HTMLElement} headerElement - Элемент заголовка страницы.
* @param {HTMLElement} pageElement - Элемент страницы, куда будет рендериться контент.
*/
export function renderRegPage(headerElement, pageElement) {
    pageElement.innerHTML = '';
    pageElement.style.overflow = 'hidden';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    const cancelIcon = document.createElement('img');
    cancelIcon.src = './static/svg/cancel.svg';
    cancelButton.appendChild(cancelIcon);
    pageElement.appendChild(cancelButton);

    const ImageElement = document.createElement('img');
    ImageElement.classList.add('ibackground');
    ImageElement.src = 'static/img/image_1.png';
    pageElement.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    pageElement.appendChild(whiteBlock);

    const form = document.createElement('form');
    form.classList.add('input-container');
    whiteBlock.appendChild(form);

    const usernameInput = createLabeledInput('Имя пользователя', 'text', 'username-input');
    const emailInput = createLabeledInput('Почта', 'email', 'email-input');
    const passwordInput = createLabeledInput('Пароль', 'password', 'password-input');

    const registrationTitle = document.createElement('h4');
    registrationTitle.textContent = 'Регистрация в PinSpire';
    registrationTitle.classList.add('registration-title');
    form.appendChild(registrationTitle);

    form.appendChild(usernameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    const RegButton = document.createElement('button');
    RegButton.classList.add('button', 'registration-button');
    RegButton.type = 'submit';
    RegButton.textContent = 'Создать аккаунт';
    form.appendChild(RegButton);

    const textContainer = document.createElement('p');
    textContainer.classList.add('already-registered');

    const alreadyHaveAccountText = document.createTextNode('Уже есть аккаунт?');

    const signInLink = document.createElement('a');
    signInLink.href = '#';
    signInLink.textContent = 'Войти';

    textContainer.appendChild(alreadyHaveAccountText);
    textContainer.appendChild(signInLink);

    form.appendChild(textContainer);

    signInLink.addEventListener('click', function (e) {
        e.preventDefault();
        renderAuthPage(headerElement, pageElement);
    });

    const emailErrorSpan = document.createElement('span');
    const passwordErrorSpan = document.createElement('span');
    const usernameErrorSpan = document.createElement('span');

    emailErrorSpan.classList.add('error-message', 'email-error-message');
    passwordErrorSpan.classList.add('error-message', 'password-error-message');
    usernameErrorSpan.classList.add('error-message', 'username-error-message');

    emailInput.appendChild(emailErrorSpan);
    usernameInput.appendChild(usernameErrorSpan);
    passwordInput.appendChild(passwordErrorSpan);

    RegButton.addEventListener('click', function (e) {
        e.preventDefault();

        const username = usernameInput.querySelector('.input-field').value;
        const email = emailInput.querySelector('.input-field').value;
        const password = passwordInput.querySelector('.input-field').value;

        const usernameValidationResult = nameValid(username);
        const emailValidationResult = emailValid(email);
        const passwordValidationResult = passwordValid(password);

        if (!usernameValidationResult.valid) {
            usernameInput.querySelector('.input-field').style.borderColor = 'var(--error-50, #F4210B)';
            usernameInput.querySelector('.input-field').style.Color = 'var(--error-50, #F4210B)';
            usernameErrorSpan.textContent = usernameValidationResult.message;
        } else {
            usernameInput.querySelector('.input-field').style.borderColor = '';
            usernameInput.querySelector('.input-field').style.Color = '';
            usernameErrorSpan.textContent = '';
        }

        if (!emailValidationResult.valid) {
            emailInput.querySelector('.input-field').style.borderColor = 'var(--error-50, #F4210B)';
            emailInput.querySelector('.input-field').style.Color = 'var(--error-50, #F4210B)';
            emailErrorSpan.textContent = emailValidationResult.message;
        } else {
            emailInput.querySelector('.input-field').style.borderColor = '';
            emailInput.querySelector('.input-field').style.backgroundColor = '';
            emailErrorSpan.textContent = '';
        }
    
        if (!passwordValidationResult.valid) {
            passwordInput.querySelector('.input-field').style.borderColor = 'var(--error-50, #F4210B)';
            passwordInput.querySelector('.input-field').style.Color = 'var(--error-50, #F4210B)';
            passwordErrorSpan.textContent = passwordValidationResult.message;
        } else {
            passwordInput.querySelector('.input-field').style.borderColor = '';
            passwordInput.querySelector('.input-field').style.Color = '';
            passwordErrorSpan.textContent = '';
        }
    
        if (usernameValidationResult.valid && emailValidationResult.valid && passwordValidationResult.valid) {
            if (registerUser(username, email, password)) {
                renderFeedPage(headerElement, pageElement);
            }
        }
    });

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        headerElement.style.display = '';
        pageElement.style.paddingTop = '100px';
        renderFeedPage(headerElement, pageElement);
    });
}

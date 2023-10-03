import { renderRegPage } from '../Registration/reg-page.js';
import { createLabeledInput } from '../Input/input.js';
import { loginUser } from '../../utils/login.js';
import { renderFeedPage } from '../Feed/Feed.js';
import { isValidEmail, isValidPassword, isValidUserName } from '../../utils/valid.js';

/**
 * Рендерится страница аутентификации.
 * @param {HTMLElement} headerElement - Элемент заголовка.
 * @param {HTMLElement} pageElement - Элемент страницы.
 */
export function renderAuthPage(headerElement, pageElement) {
    pageElement.innerHTML = '';
    pageElement.style.display = 'blosk';
    pageElement.style.overflow = 'hidden';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    const cancelIcon = document.createElement('img');
    cancelIcon.src = './static/svg/cancel.svg';
    cancelButton.appendChild(cancelIcon);
    pageElement.appendChild(cancelButton);

    const ImageElement = document.createElement('img');
    ImageElement.classList.add('ibackground');
    ImageElement.src = 'static/img/image_2.png';
    pageElement.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    pageElement.appendChild(whiteBlock);

    const form = document.createElement('form');
    form.classList.add('input-container');
    whiteBlock.appendChild(form);

    const usernameInput = createLabeledInput('Имя пользователя', 'text', 'username');
    const passwordInput = createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●');

    const registrationTitle = document.createElement('h4');
    registrationTitle.textContent = 'Войти в PinSpire';
    registrationTitle.classList.add('auth-title');
    form.appendChild(registrationTitle);

    form.appendChild(usernameInput);
    form.appendChild(passwordInput);

    const AuthButton = document.createElement('button');
    AuthButton.classList.add('button');
    AuthButton.type = 'submit';
    AuthButton.textContent = 'Войти';
    form.appendChild(AuthButton);

    const textContainer = document.createElement('p');
    textContainer.classList.add('already-registered');

    const alreadyHaveAccountText = document.createTextNode('Все еще нет аккаунта? ');

    const signUpLink = document.createElement('a');
    signUpLink.href = '#';
    signUpLink.textContent = 'Регистрация';

    textContainer.appendChild(alreadyHaveAccountText);
    textContainer.appendChild(signUpLink);

    form.appendChild(textContainer);

    signUpLink.addEventListener('click', function (e) {
        e.preventDefault();
        renderRegPage(headerElement, pageElement);
    });

    const passwordErrorSpan = document.createElement('span');
    const usernameErrorSpan = document.createElement('span');

    passwordErrorSpan.classList.add('error-message');
    usernameErrorSpan.classList.add('error-message');

    usernameInput.appendChild(usernameErrorSpan);
    passwordInput.appendChild(passwordErrorSpan);

    AuthButton.addEventListener('click', function (e) {
        e.preventDefault();

        const username = usernameInput.querySelector('input').value;
        const password = passwordInput.querySelector('input').value;

        if (!isValidUserName(username)) {
            usernameInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
            usernameInput.querySelector('input').style.Color = 'var(--error-50, #F4210B)';
            usernameErrorSpan.textContent = 'Введите корректное имя пользователя!';
        } else {
            passwordInput.querySelector('input').style.borderColor = '';
            passwordInput.querySelector('input').style.Color = '';
            usernameErrorSpan.textContent = '';
        }

        if (!isValidPassword(password)) {
            passwordInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
            passwordInput.querySelector('input').style.Color = 'var(--error-50, #F4210B)';
            passwordErrorSpan.textContent = 'Введите корректный пароль!';
        } else {
            passwordInput.querySelector('input').style.borderColor = '';
            passwordInput.querySelector('input').style.Color = '';
            passwordErrorSpan.textContent = '';
        }
    
        if (isValidUserName(username) && isValidPassword(password)) {
            loginUser(username, password);
        }
    });

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        headerElement.style.display = '';
        pageElement.style.paddingTop = '100px';
        renderFeedPage(headerElement, pageElement);
    });
}

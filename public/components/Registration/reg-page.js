import { renderAuthPage } from '../Authorization/auth-page.js';
import { createLabeledInput } from '../Input/input.js';
import { registerUser } from '../../utils/reg.js';
import { renderFeedPage } from '../Feed/Feed.js';

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

    const usernameInput = createLabeledInput('Имя пользователя', 'text', 'username');
    const emailInput = createLabeledInput('Почта', 'email', 'test@mail.ru');
    const passwordInput = createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●');

    const registrationTitle = document.createElement('h4');
    registrationTitle.textContent = 'Регистрация в PinSpire';
    registrationTitle.classList.add('registration-title');
    form.appendChild(registrationTitle);

    form.appendChild(usernameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    const RegButton = document.createElement('button');
    RegButton.classList.add('button');
    RegButton.type = 'submit';
    RegButton.textContent = 'Создать аккаунт';
    form.appendChild(RegButton);

    const textContainer = document.createElement('p');

    const alreadyHaveAccountText = document.createTextNode('Уже есть аккаунт? ');

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

    RegButton.addEventListener('click', function (e) {
        e.preventDefault();

        const username = usernameInput.querySelector('input').value;
        const email = emailInput.querySelector('input').value;
        const password = passwordInput.querySelector('input').value;

        registerUser(username, email, password);
    });

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        headerElement.style.display = '';
        renderFeedPage(headerElement, pageElement);
    });
}

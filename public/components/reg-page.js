import { renderAuthPage } from './auth-page.js';
import { createLabeledInput } from './input.js';
import { registerUser } from '../utils/reg.js';

export function renderRegPage(fullscreenImage) {
    fullscreenImage.innerHTML = '';

    const ImageElement = document.createElement('img');
    ImageElement.src = 'static/img/image_1.png';
    fullscreenImage.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    fullscreenImage.appendChild(whiteBlock);

    const form = document.createElement('form');
    form.classList.add('input-container');
    whiteBlock.appendChild(form);

    const usernameInput = createLabeledInput('Имя пользователя', 'text', 'username');
    const emailInput = createLabeledInput('Почта', 'email', 'test@mail.ru');
    const passwordInput = createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●');

    form.appendChild(usernameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);

    const RegButton = document.createElement('button');
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
        renderAuthPage(fullscreenImage);
    });

    RegButton.addEventListener('click', function (e) {
        e.preventDefault();

        const username = usernameInput.querySelector('input').value;
        const email = emailInput.querySelector('input').value;
        const password = passwordInput.querySelector('input').value;

        registerUser(username, email, password);
    });
}

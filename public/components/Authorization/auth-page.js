import { renderRegPage } from '../Registration/reg-page.js';
import { createLabeledInput } from '../Input/input.js';
import { loginUser } from '../../utils/login.js';

export function renderAuthPage(fullscreenImage) {
    fullscreenImage.innerHTML = '';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    const cancelIcon = document.createElement('img');
    cancelIcon.src = './static/svg/cancel.svg';
    cancelButton.appendChild(cancelIcon);
    fullscreenImage.appendChild(cancelButton);

    const ImageElement = document.createElement('img');
    ImageElement.classList.add('ibackground');
    ImageElement.src = 'static/img/image_2.png';
    fullscreenImage.appendChild(ImageElement);

    const whiteBlock = document.createElement('div');
    whiteBlock.classList.add('form-container');
    fullscreenImage.appendChild(whiteBlock);

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

    const alreadyHaveAccountText = document.createTextNode('Все еще нет аккаунта? ');

    const signUpLink = document.createElement('a');
    signUpLink.href = '#';
    signUpLink.textContent = 'Регистрация';

    textContainer.appendChild(alreadyHaveAccountText);
    textContainer.appendChild(signUpLink);

    form.appendChild(textContainer);

    signUpLink.addEventListener('click', function (e) {
        e.preventDefault();
        renderRegPage(fullscreenImage);
    });

    AuthButton.addEventListener('click', function (e) {
        e.preventDefault();

        const username = usernameInput.querySelector('input').value;
        const password = passwordInput.querySelector('input').value;

        loginUser(username, password);
    });

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        // renderMainPage(fullscreenImage);
    });
}

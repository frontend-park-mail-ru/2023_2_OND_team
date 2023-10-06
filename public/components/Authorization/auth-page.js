import { renderRegPage } from '../Registration/reg-page.js';
import { createLabeledInput } from '../Input/input.js';
import { renderFeedPage } from '../Feed/Feed.js';
import { nameValid, passwordValid } from '../../utils/valid.js';
import { API } from '../../utils/api.js';

function clearInputErrors(usernameInput, passwordInput) {
    usernameInput.querySelector('input').style.borderColor = '';
    passwordInput.querySelector('input').style.borderColor = '';
}

function showErrorMessage(input, errorMessage) {
    input.style.borderColor = 'var(--error-50, #F4210B)';
    input.style.color = 'var(--error-50, #F4210B)';
    return errorMessage;
}

function renderValidationErrorMessage(input, errorMessage) {
    let errorSpan = input.querySelector('.error-message');
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        input.appendChild(errorSpan);
    }
    errorSpan.textContent = errorMessage;
}

export function renderAuthPage(headerElement, pageElement) {
    const Api = new API();

    pageElement.innerHTML = '';
    document.body.style.overflow = 'hidden';

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

    const alreadyHaveAccountText = document.createTextNode('Все еще нет аккаунта?');

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

    AuthButton.addEventListener('click', function (e) {
        e.preventDefault();

        const username = usernameInput.querySelector('input').value;
        const password = passwordInput.querySelector('input').value;

        clearInputErrors(usernameInput, passwordInput);

        const usernameValidationResult = nameValid(username);
        const passwordValidationResult = passwordValid(password);

        if (!usernameValidationResult.valid) {
            const errorMessage = showErrorMessage(usernameInput.querySelector('input'), usernameValidationResult.message);
            renderValidationErrorMessage(usernameInput, errorMessage);
        }

        if (!passwordValidationResult.valid) {
            const errorMessage = showErrorMessage(passwordInput.querySelector('input'), passwordValidationResult.message);
            renderValidationErrorMessage(passwordInput, errorMessage);
        }

        if (usernameValidationResult.valid && passwordValidationResult.valid) {
            Api.loginUser(username, password)
                .then(status => {
                    if (status) {
                        headerElement.style.display = '';
                        pageElement.style.paddingTop = '90px';
                        renderFeedPage(headerElement, pageElement);
                        
                        if (errorSpan) {
                            form.removeChild(errorSpan);
                            errorSpan = null;
                        }
                    } else {
                        const errorMessage = 'Неверное имя пользователя или пароль';
                        const errorSpan = form.querySelector('.error-message');
                        if (!errorSpan) {
                            renderValidationErrorMessage(form, errorMessage);
                        }
                    }
                });
        }
    });

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        headerElement.style.display = '';
        pageElement.style.paddingTop = '90px';
        renderFeedPage(headerElement, pageElement);
    });
}


// export function renderAuthPage(headerElement, pageElement) {

//     document.body.style.overflow = 'hidden';

//     const authPage = Handlebars.templates['Auth.hbs'];
    
//     const context = {
       
//     };

//     pageElement.innerHTML = authPage(context);

// }
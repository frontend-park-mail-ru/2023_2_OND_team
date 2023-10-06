import { renderAuthPage } from '../Authorization/AuthPage.js';
import { renderFeedPage } from '../Feed/Feed.js';
import { emailValid, passwordValid, nameValid } from '../../utils/valid.js';
import { API } from '../../utils/api.js';

/**
* Рендерится страница регистрации.
* @param {HTMLElement} headerElement - Элемент заголовка страницы.
* @param {HTMLElement} pageElement - Элемент страницы, куда будет рендериться контент.
*/
// export function renderRegPage(headerElement, pageElement) {
//     pageElement.innerHTML = '';
//     document.body.style.overflow = 'hidden';

//     const cancelButton = document.createElement('button');
//     cancelButton.classList.add('cancel-button');
//     const cancelIcon = document.createElement('img');
//     cancelIcon.src = './static/svg/cancel.svg';
//     cancelButton.appendChild(cancelIcon);
//     pageElement.appendChild(cancelButton);

//     const ImageElement = document.createElement('img');
//     ImageElement.classList.add('ibackground');
//     ImageElement.src = 'static/img/image_1.png';
//     pageElement.appendChild(ImageElement);

//     const whiteBlock = document.createElement('div');
//     whiteBlock.classList.add('form-container');
//     pageElement.appendChild(whiteBlock);

//     const form = document.createElement('form');
//     form.classList.add('input-container');
//     whiteBlock.appendChild(form);

//     const usernameInput = createLabeledInput('Имя пользователя', 'text', 'username');
//     const emailInput = createLabeledInput('Почта', 'email', 'pinspire@example.com');
//     const passwordInput = createLabeledInput('Пароль', 'password', '●●●●●●●●●●●●');

//     const registrationTitle = document.createElement('h4');
//     registrationTitle.textContent = 'Регистрация в PinSpire';
//     registrationTitle.classList.add('registration-title');
//     form.appendChild(registrationTitle);

//     form.appendChild(usernameInput);
//     form.appendChild(emailInput);
//     form.appendChild(passwordInput);

//     const RegButton = document.createElement('button');
//     RegButton.classList.add('button');
//     RegButton.type = 'submit';
//     RegButton.textContent = 'Создать аккаунт';
//     form.appendChild(RegButton);

//     const textContainer = document.createElement('p');
//     textContainer.classList.add('already-registered');

//     const alreadyHaveAccountText = document.createTextNode('Уже есть аккаунт?');

//     const signInLink = document.createElement('a');
//     signInLink.href = '#';
//     signInLink.textContent = 'Войти';

//     textContainer.appendChild(alreadyHaveAccountText);
//     textContainer.appendChild(signInLink);

//     form.appendChild(textContainer);

//     signInLink.addEventListener('click', function (e) {
//         e.preventDefault();
//         renderAuthPage(headerElement, pageElement);
//     });

//     const emailErrorSpan = document.createElement('span');
//     const passwordErrorSpan = document.createElement('span');
//     const usernameErrorSpan = document.createElement('span');

//     emailErrorSpan.classList.add('error-message');
//     passwordErrorSpan.classList.add('error-message');
//     usernameErrorSpan.classList.add('error-message');

//     emailInput.appendChild(emailErrorSpan);
//     usernameInput.appendChild(usernameErrorSpan);
//     passwordInput.appendChild(passwordErrorSpan);

//     let errorSpan = document.querySelector('.error-mesage');

//     RegButton.addEventListener('click', function (e) {
//         e.preventDefault();

//         const username = usernameInput.querySelector('input').value;
//         const email = emailInput.querySelector('input').value;
//         const password = passwordInput.querySelector('input').value;

//         const usernameValidationResult = nameValid(username);
//         const emailValidationResult = emailValid(email);
//         const passwordValidationResult = passwordValid(password);

//         if (!usernameValidationResult.valid) {
//             usernameInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
//             usernameInput.querySelector('input').style.Color = 'var(--error-50, #F4210B)';
//             usernameErrorSpan.textContent = usernameValidationResult.message;
//         } else {
//             usernameInput.querySelector('input').style.borderColor = '';
//             usernameInput.querySelector('input').style.Color = '';
//             usernameErrorSpan.textContent = '';
//         }

//         if (!emailValidationResult.valid) {
//             emailInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
//             emailInput.querySelector('input').style.Color = 'var(--error-50, #F4210B)';
//             emailErrorSpan.textContent = emailValidationResult.message;
//         } else {
//             emailInput.querySelector('input').style.borderColor = '';
//             emailInput.querySelector('input').style.backgroundColor = '';
//             emailErrorSpan.textContent = '';
//         }
    
//         if (!passwordValidationResult.valid) {
//             passwordInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
//             passwordInput.querySelector('input').style.Color = 'var(--error-50, #F4210B)';
//             passwordErrorSpan.textContent = passwordValidationResult.message;
//         } else {
//             passwordInput.querySelector('input').style.borderColor = '';
//             passwordInput.querySelector('input').style.Color = '';
//             passwordErrorSpan.textContent = '';
//         }
    
//         if (usernameValidationResult.valid && emailValidationResult.valid && passwordValidationResult.valid) {
//             API.registerUser(username, email, password)
//                 .then(status => { 
//                     if (status) {
//                         headerElement.classList.remove('header-hidden');
//                         pageElement.classList.remove('main-no-padding');
//                         renderFeedPage(headerElement, pageElement);
//                     } else {
//                         usernameInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
//                         emailInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
//                         passwordInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';

//                         if (!errorSpan) {
//                             errorSpan = document.createElement('span');
//                             errorSpan.classList.add('error-message');
//                             errorSpan.textContent = 'Пользователь уже зарегистрирован';
//                             form.appendChild(errorSpan);
//                         }
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Ошибка при регистрации пользователя:', error);
//                 });
//         }
//     });

//     cancelButton.addEventListener('click', function (e) {
//         e.preventDefault();
//         headerElement.classList.remove('header-hidden');
//         pageElement.classList.remove('main-no-padding');
//         renderFeedPage(headerElement, pageElement);
//     });
// }

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
            API.registerUser(username, password)
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
                            form.appendChild(errorSpan);
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

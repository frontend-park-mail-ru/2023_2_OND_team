import { renderRegPage } from '../Registration/reg-page.js';
import { API } from '../../utils/api.js';
import { createLabeledInput } from '../Input/input.js';
import { renderFeedPage } from '../Feed/Feed.js';
import { emailValid, passwordValid, nameValid } from '../../utils/valid.js';

/**
 * Рендерится страница аутентификации.
 * @param {HTMLElement} headerElement - Элемент заголовка.
 * @param {HTMLElement} pageElement - Элемент страницы.
 */
export async function renderAuthPage(headerElement, pageElement) {
    document.body.style.overflow = 'hidden';
    
    const templateResponse = await fetch('../templates/Auth.hbs');
    const templateText = await templateResponse.text();
    const template = Handlebars.compile(templateText);
    
    const context = {};

    pageElement.innerHTML = template(context);

    const Api = new API();

    const signUpLink = pageElement.querySelector('.already-registered a');
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

    let errorSpan = document.querySelector('.error-mesage');

    AuthButton.addEventListener('click', function (e) {
        e.preventDefault();
    
        const username = usernameInput.querySelector('input').value;
        const password = passwordInput.querySelector('input').value;

        usernameInput.querySelector('input').style.borderColor = '';
        passwordInput.querySelector('input').style.borderColor = '';
    
        const usernameValidationResult = nameValid(username);
        const passwordValidationResult = passwordValid(password);
    
        if (!usernameValidationResult.valid) {
            usernameInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
            usernameInput.querySelector('input').style.Color = 'var(--error-50, #F4210B)';
            usernameErrorSpan.textContent = usernameValidationResult.message;
        } else {
            usernameErrorSpan.textContent = '';
        }
    
        if (!passwordValidationResult.valid) {
            passwordInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
            passwordInput.querySelector('input').style.Color = 'var(--error-50, #F4210B)';
            passwordErrorSpan.textContent = passwordValidationResult.message;
        } else {
            passwordErrorSpan.textContent = '';
        }
    
        if (usernameValidationResult.valid && passwordValidationResult.valid) {
            
            Api.loginUser(username, password)
                .then(status => { 
                    if (status) {
                        headerElement.style.display = '';
                        pageElement.style.paddingTop = '90px';
                        renderFeedPage(headerElement, pageElement);
                    } else {
                        usernameInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';
                        passwordInput.querySelector('input').style.borderColor = 'var(--error-50, #F4210B)';

                        if (!errorSpan) {
                            errorSpan = document.createElement('span');
                            errorSpan.classList.add('error-message');
                            errorSpan.textContent = 'Неверное имя пользователя или пароль';
                            form.appendChild(errorSpan);
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
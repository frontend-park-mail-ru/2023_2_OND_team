import { API } from "../../utils/api.js";

export function renderProfileSecurity() {
    const main = document.querySelector('#main');

    API.getUserInfo() 
        .then((data) => {
            const profileSecurityTemplate = Handlebars.templates['ProfileSecurity.hbs'];
            const profileSecurityContext = {
               email: data.email,
            };
            main.innerHTML = profileSecurityTemplate(profileSecurityContext);

            const changeBtn = document.querySelector('.profile-security__btn-change');
            changeBtn?.addEventListener('click', () => {
                const footerChangeBtn = document.querySelector('.profile-security__change');
                const footerSaveBtns = document.querySelector('.profile-security__save')

                footerChangeBtn.classList.add('hide');
                footerSaveBtns.classList.remove('hide');

                const passwordField = document.querySelector('.profile-security__data-password');
                const passwordRepeatField = document.querySelector('.profile-security__data-password-repeat');

                passwordField.classList.remove('hide');
                passwordRepeatField.classList.remove('hide');

                const mailInput = document.querySelector('.js-profile-security__data-mail-data');
                const passwordInput = document.querySelector('.js-profile-security__data-password-data');
                const passwordRepeatInput = document.querySelector('.js-profile-security__data-password-repeat-data');

                mailInput.classList.toggle('input-primary');
                passwordInput.classList.toggle('input-primary');
                passwordRepeatInput.classList.toggle('input-primary');

                const mailTextarea = document.querySelector('.js-mail-textarea')
                const passwordTextarea = document.querySelector('.js-password-textarea')
                const passwordRepeatTextarea = document.querySelector('.js-password-repeat-textarea')

                mailTextarea.disabled = false;
                passwordTextarea.disabled = false;
                passwordRepeatTextarea.disabled = false;
            });


            const canselBtn = document.querySelector('.js-profile-security__btns__cansel-btn');
            canselBtn?.addEventListener('click', () => {
                const footerChangeBtn = document.querySelector('.profile-security__change');
                const footerSaveBtns = document.querySelector('.profile-security__save')

                footerChangeBtn.classList.remove('hide');
                footerSaveBtns.classList.add('hide');

                const passwordField = document.querySelector('.profile-security__data-password');
                const passwordRepeatField = document.querySelector('.profile-security__data-password-repeat');

                passwordField.classList.add('hide');
                passwordRepeatField.classList.add('hide');

                const mailInput = document.querySelector('.js-profile-security__data-mail-data');
                const passwordInput = document.querySelector('.js-profile-security__data-password-data');
                const passwordRepeatInput = document.querySelector('.js-profile-security__data-password-repeat-data');

                mailInput.classList.toggle('input-primary');
                passwordInput.classList.toggle('input-primary');
                passwordRepeatInput.classList.toggle('input-primary');


                const mailTextarea = document.querySelector('.js-mail-textarea')
                const passwordTextarea = document.querySelector('.js-password-textarea')
                const passwordRepeatTextarea = document.querySelector('.js-password-repeat-textarea')

                mailTextarea.disabled = true;
                passwordTextarea.disabled = true;
                passwordRepeatTextarea.disabled = true;
            });

            const saveBtn = document.querySelector('.js-profile-security__btns__save-btn');
            saveBtn?.addEventListener('click', () => {
                const footerChangeBtn = document.querySelector('.profile-security__change');
                const footerSaveBtns = document.querySelector('.profile-security__save')

                footerChangeBtn.classList.remove('hide');
                footerSaveBtns.classList.add('hide');

                const passwordField = document.querySelector('.profile-security__data-password');
                const passwordRepeatField = document.querySelector('.profile-security__data-password-repeat');

                passwordField.classList.add('hide');
                passwordRepeatField.classList.add('hide');

                const mailInput = document.querySelector('.js-profile-security__data-mail-data');
                const passwordInput = document.querySelector('.js-profile-security__data-password-data');
                const passwordRepeatInput = document.querySelector('.js-profile-security__data-password-repeat-data');

                mailInput.classList.toggle('input-primary');
                passwordInput.classList.toggle('input-primary');
                passwordRepeatInput.classList.toggle('input-primary');


                const mailTextarea = document.querySelector('.js-mail-textarea')
                const passwordTextarea = document.querySelector('.js-password-textarea')
                const passwordRepeatTextarea = document.querySelector('.js-password-repeat-textarea')

                mailTextarea.disabled = true;
                passwordTextarea.disabled = true;
                passwordRepeatTextarea.disabled = true;
            });
    });
}
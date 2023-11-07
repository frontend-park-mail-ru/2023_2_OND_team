import { API } from "../../utils/api.js";

export function renderProfileSecurity() {
    const main = document.querySelector('#main');

    API.getUserInfo() 
        .then((data) => {
            const profileSecurityTemplate = Handlebars.templates['ProfileSecurity.hbs'];
            const profileSecurityContext = {
               email: data.email,
               avatar: data.avatar,
            };

            main.innerHTML = profileSecurityTemplate(profileSecurityContext);

            const footerChangeBtn = document.querySelector('.profile-security__change');
            const footerSaveBtns = document.querySelector('.profile-security__save')

            const passwordField = document.querySelector('.profile-security__data-password');
            const passwordRepeatField = document.querySelector('.profile-security__data-password-repeat');

            const mailInput = document.querySelector('.js-profile-security__data-mail-data');
            const passwordInput = document.querySelector('.js-profile-security__data-password-data');
            const passwordRepeatInput = document.querySelector('.js-profile-security__data-password-repeat-data');

            const mailTextarea = document.querySelector('.js-mail-textarea')
            const passwordTextarea = document.querySelector('.js-password-textarea')
            const passwordRepeatTextarea = document.querySelector('.js-password-repeat-textarea')

            const changeBtn = document.querySelector('.profile-security__btn-change');
            changeBtn?.addEventListener('click', () => {

                footerChangeBtn.classList.add('hide');
                footerSaveBtns.classList.remove('hide');

                passwordField.classList.remove('hide');
                passwordRepeatField.classList.remove('hide');

                mailInput.classList.add('input-primary');
                passwordInput.classList.add('input-primary');
                passwordRepeatInput.classList.add('input-primary');

                mailTextarea.disabled = false;
                passwordTextarea.disabled = false;
                passwordRepeatTextarea.disabled = false;
            });


            const canselBtn = document.querySelector('.js-profile-security__btns__cansel-btn');
            canselBtn?.addEventListener('click', () => {
                footerChangeBtn.classList.remove('hide');
                footerSaveBtns.classList.add('hide');

                passwordField.classList.add('hide');
                passwordRepeatField.classList.add('hide');

                mailInput.classList.remove('input-primary');
                passwordInput.classList.remove('input-primary');
                passwordRepeatInput.classList.remove('input-primary');

                mailTextarea.disabled = true;
                passwordTextarea.disabled = true;
                passwordRepeatTextarea.disabled = true;

                mailTextarea.value = profileSecurityContext.email;
                passwordTextarea.value = '';
                passwordRepeatTextarea.value = '';
            });

            const saveBtn = document.querySelector('.js-profile-security__btns__save-btn');
            saveBtn?.addEventListener('click', () => {
                const data = {
                    email: mailTextarea.value,
                    password: passwordTextarea.value,
                }

                API.putUserInfo(data)
                    .then((status) => {
                        if (status === "ok") {
                            router.navigate('/profile/security');
                        } else {
                            console.error('error saving security');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            });
    });
}
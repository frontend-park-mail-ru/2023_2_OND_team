import { API } from "../../utils/api.js";

export function renderSecurityPage() {
    API.getUserInfo() 
        .then((data) => {
            const profilePage = document.querySelector('.js-profile__page');

            const profileSecurity = Handlebars.templates['ProfileSecurity.hbs'];
            const context = {
                email: data.email
            };
            profilePage.innerHTML = profileSecurity(context);

            const emailInput = document.querySelector('#email');
            const passwordInput = document.querySelector('#password');
            const passwordRepeatInput = document.querySelector('#password-repeat');

            const editBtn = document.querySelector('.js-profile-security__edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    emailInput.disabled = false;
                    passwordInput.disabled = false;
                    passwordRepeatInput.disabled = false;
                });
            }

            const canselBtn = document.querySelector('.js-profile-security__cansel-btn');
            if (canselBtn) {
                canselBtn.addEventListener('click', () => {
                    emailInput.value = context.email;

                    emailInput.disabled = true;
                    passwordInput.disabled = true;
                    passwordRepeatInput.disabled = true;
                });
            }

            const saveBtn = document.querySelector('.js-profile-security__save-btn');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    data.email = emailInput.value;
                    //userInfo.password = passwordInput.value;

                    emailInput.disabled = true;
                    passwordInput.disabled = true;
                    passwordRepeatInput.disabled = true;

                    API.putUserInfo(data)
                        .then((status) => {
                            if (status) {
                                renderSecurityPage();
                            } else {
                                console.log('error saving data');
                            }
                        })
                    
                });
            }
        })
        .catch((error) => {
            console.error('Ошибка при получении данных о пользователе:', error);
        });
}

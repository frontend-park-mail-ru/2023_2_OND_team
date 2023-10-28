

export function renderSecurityPage(userInfo) {
    const profilePage = document.querySelector('.js-profile__page');

    const profileSecurity = Handlebars.templates['ProfileSecurity.hbs'];
    const context = {
        email: userInfo.email
    };

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const passwordRepeatInput = document.querySelector('#password-repea');

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
            passwordInput.value = context.password;
            passwordRepeatInput.value = context.passwordRepeat;

            emailInput.disabled = true;
            passwordInput.disabled = true;
            passwordRepeatInput.disabled = true;
        });
    }

    const saveBtn = document.querySelector('.js-profile-security__save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            userInfo.email = emailInput.value;
            //userInfo.password = passwordInput.value;

            emailInput.disabled = true;
            passwordInput.disabled = true;
            passwordRepeatInput.disabled = true;

            API.putUserInfo(userInfo)
                .then((status) => {
                    if (status) {
                        renderSecurityPage(userInfo);
                    } else {
                        console.log('error saving data');
                    }
                })
            
        });
    }

    profilePage.innerHTML = profileSecurity(context);
}

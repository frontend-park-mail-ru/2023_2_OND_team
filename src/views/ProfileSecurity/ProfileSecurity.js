import {API} from '../../utils/Api/api.js';
import {Router} from '../../components/Router/router.js';
import {emailValid, passwordValid} from '../../components/Validation/valid.js';

export function renderProfileSecurity() {
  const main = document.querySelector('#main');
  const router = new Router();

  API.getUserInfo()
      .then((data) => {
        const profileSecurityTemplate = Handlebars.templates['ProfileSecurity.hbs'];
        const profileSecurityContext = {
          email: data.email,
          avatar: data.avatar,
        };

        main.innerHTML = profileSecurityTemplate(profileSecurityContext);

        const footerChangeBtn = document.querySelector('.profile-security__change');
        const footerSaveBtns = document.querySelector('.profile-security__save');

        const passwordField = document.querySelector('.profile-security__data-password');
        const passwordRepeatField = document.querySelector('.profile-security__data-password-repeat');

        const mailInput = document.querySelector('.js-profile-security__data-mail-data');
        const passwordInput = document.querySelector('.js-profile-security__data-password-data');
        const passwordRepeatInput = document.querySelector('.js-profile-security__data-password-repeat-data');

        const mailTextarea = document.querySelector('.js-mail-textarea');
        const passwordTextarea = document.querySelector('.js-password-textarea');
        const passwordRepeatTextarea = document.querySelector('.js-password-repeat-textarea');

        const securitySpan = document.querySelector('.profile-security-span');
        const emailSpan = document.querySelector('.profile-security__email-span');
        const passwordSpan = document.querySelector('.profile-security__password-span');
        const passwordRepeatSpan = document.querySelector('.profile-security__password-repeat-span');

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

          securitySpan.textContent = '';
          emailSpan.textContent = '';
          passwordSpan.textContent = '';
          passwordRepeatSpan.textContent = '';
        });

        const saveBtn = document.querySelector('.js-profile-security__btns__save-btn');
        saveBtn?.addEventListener('click', () => {
          const email = mailTextarea.value;
          const password = passwordTextarea.value;
          const passwordRepeat = passwordRepeatTextarea.value;

          let data;

          if (password === '' && passwordRepeat === '') {
            const emailValidationResult = emailValid(email);
            if (!emailValidationResult.valid) {
              emailSpan.textContent = emailValidationResult.message;
              return;
            } else {
              emailSpan.textContent = '';
              data = {
                email: email,
              };
            }
          } else {
            const emailValidationResult = emailValid(email);
            if (!emailValidationResult.valid) {
              emailSpan.textContent = emailValidationResult.message;
            } else {
              emailSpan.textContent = '';
            }

            const passwordValidationResult = passwordValid(password);
            if (!passwordValidationResult.valid) {
              passwordSpan.textContent = passwordValidationResult.message;
            } else {
              passwordSpan.textContent = '';
            }

            const passwordRepeatValidationResult = passwordValid(passwordRepeat);
            if (!passwordRepeatValidationResult.valid) {
              passwordRepeatSpan.textContent = passwordRepeatValidationResult.message;
            } else {
              passwordRepeatSpan.textContent = '';
            }

            if (password !== passwordRepeat) {
              passwordRepeatSpan.textContent = 'Пароли не совпадают';
            } else {
              passwordRepeatSpan.textContent = '';
            }

            if ( !(emailValidationResult.valid && passwordValidationResult.valid &&
                        passwordRepeatValidationResult.valid && (password === passwordRepeat)) ) {
              return;
            }

            data = {
              email: email,
              password: password,
            };
          }

          API.putUserInfo(data)
              .then((res) => {
                if (res.status === 'ok') {
                  router.navigate('/profile/security');
                } else {
                  securitySpan.textContent = `Некорректные данные: ${res.message}`;
                }
              })
              .catch((error) => {
                console.error(error);
              });
        });
      });
}

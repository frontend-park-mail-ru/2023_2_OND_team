import {API} from '../../utils/api.js';
import {Router} from '../../components/Router/router.js';
import {nameValid} from '../../components/Validation/valid.js';

export function renderProfileData() {
  const main = document.querySelector('#main');
  const router = new Router();

  API.getUserInfo()
      .then((data) => {
        const profileDataTemplate = Handlebars.templates['ProfileData.hbs'];
        const profileDataContext = {
          username: data.username,
          name: data.name,
          surname: data.surname,
          avatar: data.avatar,
          about: data.about_me,
        };
        main.innerHTML = profileDataTemplate(profileDataContext);

        const avatarSpan = document.querySelector('.profile-data__avatar-span');
        const usernameSpan = document.querySelector('.profile-data__username-span');
        const dataSpan = document.querySelector('.profile-data-span');

        const inputElement = document.getElementById('input__file');
        inputElement?.addEventListener('change', (event) => {
          const file = event.target.files[0];

          const reader = new FileReader();

          reader.onload = (e) => {
            const imageBytes = e.target.result;

            const blob = new Blob([imageBytes]);

            const fileExtension = file.name.split('.').pop();

            if (!['png', 'jpeg', 'svg', 'webp'].includes(fileExtension)) {
              avatarSpan.textContent = 'Эта аватарка не подойдет';
              return;
            }

            API.putUserAvatar(blob, fileExtension)
                .then((res) => {
                  if (res.status === 'ok') {
                    router.navigate('/profile/data');
                  } else if (res.status === 'error' &&
                                       res.message === 'failed to change user\'s avatar') {
                    avatarSpan.textContent = 'Эта аватарка не подойдет';
                  } else {
                    console.error('error saving avatar');
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
          };

          reader.readAsArrayBuffer(file);
        });

        const profileAvatar = document.querySelector('.profile-data__avatar');
        const editAvatarBtn = document.querySelector('.profile-data__edit-avatar');

        profileAvatar?.addEventListener('mouseenter', () => {
          editAvatarBtn.classList.remove('hide');
        });

        profileAvatar?.addEventListener('mouseleave', () => {
          editAvatarBtn.classList.add('hide');
        });

        editAvatarBtn?.addEventListener('click', () => {
          inputElement.click();
        });

        const usernameInput = document.querySelector('.js-profile-data__data-names__username-data');
        const nameInput = document.querySelector('.js-profile-data__data-names__name-data');
        const surnameInput = document.querySelector('.js-profile-data__data-names__surname-data');
        const aboutInput = document.querySelector('.js-profile-data__data-about__data');

        const usernameTextarea = document.querySelector('.js-username-textarea');
        const nameTextarea = document.querySelector('.js-name-textarea');
        const surnameTextarea = document.querySelector('.js-surname-textarea');
        const aboutTextarea = document.querySelector('.js-about-textarea');

        const editDataBtn = document.querySelector('.profile-data__edit-data');
        editDataBtn?.addEventListener('click', () => {
          editDataBtn.classList.add('hide');
          const profileData = document.querySelector('.js-profile-data');
          profileData.classList.add('profile-data-edit');

          const profileDataControl = document.querySelector('.profile-data__control');
          profileDataControl.classList.remove('hide');

          usernameInput.classList.add('input-primary');
          nameInput.classList.add('input-primary');
          surnameInput.classList.add('input-primary');
          aboutInput.classList.add('input-primary');

          usernameTextarea.disabled = false;
          nameTextarea.disabled = false;
          surnameTextarea.disabled = false;
          aboutTextarea.disabled = false;
        });

        const canselBtn = document.querySelector('.js-profile-data__btns__cansel-btn');
        canselBtn?.addEventListener('click', () => {
          editDataBtn.classList.remove('hide');
          const profileData = document.querySelector('.js-profile-data');
          profileData.classList.remove('profile-data-edit');

          const profileDataControl = document.querySelector('.profile-data__control');
          profileDataControl.classList.add('hide');

          usernameInput.classList.remove('input-primary');
          nameInput.classList.remove('input-primary');
          surnameInput.classList.remove('input-primary');
          aboutInput.classList.remove('input-primary');

          usernameTextarea.disabled = true;
          nameTextarea.disabled = true;
          surnameTextarea.disabled = true;
          aboutTextarea.disabled = true;

          usernameTextarea.value = profileDataContext.username;
          nameTextarea.value = profileDataContext.name;
          surnameTextarea.value = profileDataContext.surname;
          aboutTextarea.value = profileDataContext.about;

          avatarSpan.textContent = '';
          usernameSpan.textContent = '';
          dataSpan.textContent = '';
        });

        const saveBtn = document.querySelector('.js-profile-data__btns__save-btn');
        saveBtn?.addEventListener('click', () => {
          const username = usernameTextarea.value;
          const usernameValidationResult = nameValid(username);

          if (!usernameValidationResult.valid) {
            usernameSpan.textContent = usernameValidationResult.message;
            return;
          }

          const data = {
            username: username,
            name: nameTextarea.value,
            surname: surnameTextarea.value,
            about_me: aboutTextarea.value,
          };

          API.putUserInfo(data)
              .then((res) => {
                if (res.status === 'ok') {
                  router.navigate('/profile/data');
                } else if (res.status === 'error') {
                  dataSpan.textContent = `Некорректные данные: ${res.message}`;
                } else {
                  console.error('error saving data');
                }
              })
              .catch((error) => {
                console.error(error);
              });
        });
      });
}

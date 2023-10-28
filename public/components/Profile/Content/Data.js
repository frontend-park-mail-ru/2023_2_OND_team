import { API } from "../../../utils/api.js";

export function renderDataPage(headerElement, pageElement) {
    async function loadProfileData() {
        try {
          const { username, name, surname, email, avatar } = await API.getUserInfo();
          const context = { username, name, surname, email, avatar };
          const profilePage = document.querySelector('.js-profile__page');
          const profileData = Handlebars.templates['ProfileData.hbs'];
          profilePage.innerHTML = profileData(context);
        } catch (error) {
          console.error('Ошибка при получении данных о пользователе:', error);
        }
    }
    loadProfileData();

    const usernameInput = document.querySelector('#username');
    const nameInput = document.querySelector('#name');
    const surnameInput = document.querySelector('#surname');

    const editBtn = document.querySelector('.js-profile-data__edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            usernameInput.disabled = false;
            nameInput.disabled = false;
            surnameInput.disabled = false;
        });
    }

    const canselBtn = document.querySelector('.js-profile-data__cansel-btn');
    if (canselBtn) {
        canselBtn.addEventListener('click', () => {
            usernameInput.value = context.username;
            nameInput.value = context.name;
            surnameInput.value = context.surname;

            usernameInput.disabled = true;
            nameInput.disabled = true;
            surnameInput.disabled = true;
        });
    }
    const saveBtn = document.querySelector('.js-profile-data__save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            console.log(usernameInput.value, nameInput.value, surnameInput.value);
            context.username = usernameInput.value;
            context.name = nameInput.value;
            context.surname = surnameInput.value;



            usernameInput.disabled = true;
            nameInput.disabled = true;
            surnameInput.disabled = true;
        });
    }
}

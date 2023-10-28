import { API } from "../../../utils/api.js";

export function renderDataPage(username, name, surname, avatar) {
    const profilePage = document.querySelector('.js-profile__page');

    const profileData = Handlebars.templates['ProfileData.hbs'];
    const context = { 
        username,
        name, 
        surname, 
        avatar, 
    };
    profilePage.innerHTML = profileData(context);

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
            usernameInput.value = username;
            nameInput.value = name;
            surnameInput.value = surname;

            usernameInput.disabled = true;
            nameInput.disabled = true;
            surnameInput.disabled = true;
        });
    }

    const saveBtn = document.querySelector('.js-profile-data__save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            API.putUserInfo(usernameInput.value, nameInput.value, surnameInput.value)
                .then((status) => {
                    if (status) {
                        renderDataPage(username, name, surname, avatar);
                    } else {
                        console.log('error saving data');
                    }
                })
            

            // usernameInput.disabled = true;
            // nameInput.disabled = true;
            // surnameInput.disabled = true;
        });
    }
}

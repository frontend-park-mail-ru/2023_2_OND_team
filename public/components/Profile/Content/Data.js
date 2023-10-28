import { API } from "../../../utils/api.js";

export function renderDataPage(userInfo) {
    const profilePage = document.querySelector('.js-profile__page');

    const profileData = Handlebars.templates['ProfileData.hbs'];
    const context = { 
        username: userInfo.username, 
        name: userInfo.name, 
        surname: userInfo.surname, 
        avatar: userInfo.avatar, 
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
            userInfo.username = usernameInput.value;
            userInfo.name = nameInput.value;
            userInfo.surname = surnameInput.value;

            usernameInput.disabled = true;
            nameInput.disabled = true;
            surnameInput.disabled = true;

            API.putUserInfo(userInfo)
                .then((status) => {
                    if (status) {
                        renderDataPage(userInfo);
                    } else {
                        console.log('error saving data');
                    }
                })
        });
    }
}

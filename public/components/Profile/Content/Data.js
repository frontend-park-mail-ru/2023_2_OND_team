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
    const avatarInput = document.querySelector('#avatar');

    const uploadAvatarBtn = document.querySelector('.js-profile-data__upload-avatar-btn');
    if (uploadAvatarBtn) {
        uploadAvatarBtn.addEventListener('click', () => {
            let avatar = avatarInput.files[0];
    
            if (avatar) {
                let reader = new FileReader();
    
                reader.onload = (e) => {
                    let image = new Image();
                    image.src = e.target.result;
                    userInfo.avatar = image;
    
                    API.putUserAvatar(userInfo.avatar)
                        .then((status) => {
                            if (status) {
                                renderDataPage(userInfo);
                            } else {
                                console.log('Ошибка сохранения данных');
                            }
                        })
                        .catch((error) => {
                            console.log('Ошибка при отправке изображения на сервер:', error);
                        });
                }
    
                reader.readAsDataURL(avatar);
            }
        });
    }

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

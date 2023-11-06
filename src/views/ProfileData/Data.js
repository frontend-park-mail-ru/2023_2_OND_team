import { API } from "../../utils/api.js";

export function renderDataPage() {
    API.getUserInfo() 
        .then((data) => {

            const profilePage = document.querySelector('.js-profile__page');

            const profileData = Handlebars.templates['ProfileData.hbs'];
            const context = { 
                username: data.username, 
                name: data.name, 
                surname: data.surname, 
                avatar: data.avatar, 
            };
            profilePage.innerHTML = profileData(context);

            const usernameInput = document.querySelector('#username');
            const nameInput = document.querySelector('#name');
            const surnameInput = document.querySelector('#surname');

                const inputElement = document.getElementById('input__file');
                inputElement.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                
                    const reader = new FileReader();
                
                    reader.onload = (e) => {
                        const imageBytes = e.target.result;
                    
                        const blob = new Blob([imageBytes]);
                        
                        API.putUserAvatar(blob);
                    };
                
                  reader.readAsArrayBuffer(file);
                });
            
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
                    data.username = usernameInput.value;
                    data.name = nameInput.value;
                    data.surname = surnameInput.value;

                    usernameInput.disabled = true;
                    nameInput.disabled = true;
                    surnameInput.disabled = true;

                    API.putUserInfo(data)
                        .then((status) => {
                            if (status) {
                                renderDataPage();
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

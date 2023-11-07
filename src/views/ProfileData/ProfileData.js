import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

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

            const inputElement = document.getElementById('input__file');
            inputElement.addEventListener('change', (event) => {
                const file = event.target.files[0];

                const reader = new FileReader();

                reader.onload = (e) => {
                    const imageBytes = e.target.result;

                    const blob = new Blob([imageBytes]);

                    API.putUserAvatar(blob)
                        .then((status) => {
                            if (status === "ok") {
                                router.navigate('/profile/data');
                            } else {                       
                                console.error('error saving avatar');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
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

            editAvatarBtn?.addEventListener('click', () => {inputElement.click()});

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
            })

            const saveBtn = document.querySelector('.js-profile-data__btns__save-btn');
            saveBtn?.addEventListener('click', () => {

                const data = {
                    username: usernameTextarea.value,
                    name: nameTextarea.value,
                    surname: surnameTextarea.value,
                    about_me: aboutTextarea.value,
                }
                
                API.putUserInfo(data)
                    .then((status) => {
                        if (status === "ok") {
                            router.navigate('/profile/data');
                        } else {
                            console.error('error saving data');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
        });
}
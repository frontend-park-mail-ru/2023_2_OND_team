import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";

export function renderProfileData() {
    const main = document.querySelector('#main');

    const state = new State();

    API.getUserInfo() 
        .then((data) => {
            const profileDataTemplate = Handlebars.templates['ProfileData.hbs'];
            const profileDataContext = {
                username: data.username, 
                name: data.name, 
                surname: data.surname, 
                avatar: data.avatar, 
            };
            main.innerHTML = profileDataTemplate(profileDataContext);

            const profileAvatar = document.querySelector('.profile-data__avatar');
            const editAvatarBtn = document.querySelector('.profile-data__edit-avatar');
            
            profileAvatar?.addEventListener('mouseenter', () => {
                editAvatarBtn.classList.remove('hide');
            });
            
            profileAvatar?.addEventListener('mouseleave', () => {
                editAvatarBtn.classList.add('hide');
            });
            
            const editAvatar = () => {
                console.log('editAvatar');
            }
            
            editAvatarBtn?.addEventListener('click', editAvatar);
            
            const editDataBtn = document.querySelector('.profile-data__edit-data');
            editDataBtn?.addEventListener('click', () => {
                const profileData = document.querySelector('.js-profile-data');
                profileData.classList.toggle('profile-data-edit');
                
                const profileDataControl = document.querySelector('.profile-data__control');
                profileDataControl.classList.toggle('hide');
                
                const usernameInput = document.querySelector('.js-profile-data__data-names__username-data');
                const nameInput = document.querySelector('.js-profile-data__data-names__name-data');
                const surnameInput = document.querySelector('.js-profile-data__data-names__surname-data');
                const aboutInput = document.querySelector('.js-profile-data__data-about__data');
                
                usernameInput.classList.toggle('input-primary');
                nameInput.classList.toggle('input-primary');
                surnameInput.classList.toggle('input-primary');
                aboutInput.classList.toggle('input-primary');
                
                const usernameTextarea = document.querySelector('.js-username-textarea')
                const nameTextarea = document.querySelector('.js-name-textarea')
                const surnameTextarea = document.querySelector('.js-surname-textarea')
                const aboutTextarea = document.querySelector('.js-about-textarea')
                
                usernameTextarea.disabled = !usernameTextarea.disabled;
                nameTextarea.disabled = !nameTextarea.disabled;
                surnameTextarea.disabled = !surnameTextarea.disabled;
                aboutTextarea.disabled = !aboutTextarea.disabled;
            
            });
        });
}


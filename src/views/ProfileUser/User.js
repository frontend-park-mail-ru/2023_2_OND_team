import { API } from "../../utils/api.js";

export function renderUserPage() {
    API.getUserInfo() 
        .then((data) => {
            const profilePage = document.querySelector('.js-profile__page');
    
            const profileUser = Handlebars.templates['ProfileUser.hbs'];
            const context = {
                username: data.username,
                avatar: data.avatar,
            };

            profilePage.innerHTML = profileUser(context);
            
        })
        .catch((error) => {
            console.error('Ошибка при получении данных о пользователе:', error);
        });
}

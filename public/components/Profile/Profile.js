import { renderUserPage } from "./Content/User.js";
import { renderDataPage } from "./Content/Data.js";
import { renderSecurityPage } from "./Content/Security.js";
import { renderFeedPage } from "../Feed/Feed.js";
import { API } from "../../utils/api.js";

export function renderProfilePage(headerElement, pageElement) {
    
    API.getUserInfo() 
        .then((data) => {
            const profile = Handlebars.templates['Profile.hbs'];
            const context = {};
            pageElement.innerHTML = profile(context);

            const userInfo = data;
            renderUserPage(userInfo.username, userInfo.avatar);

            const logo = document.querySelector('.js-header__logo');
            if (logo) {
                logo.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderFeedPage();
                })
            }

            const userBtn = document.querySelector('.js-profile__menu__user-btn');
            if (userBtn) {
                userBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderUserPage(userInfo.username, userInfo.avatar);
                });
            }

            const dataBtn = document.querySelector('.js-profile__menu__data-btn');
            if (dataBtn) {
                dataBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderDataPage(userInfo.username, userInfo.name, userInfo.surname, userInfo.avatar);
                });
            }

            const securityBtn = document.querySelector('.js-profile__menu__security-btn');
            if (securityBtn) {
                securityBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderSecurityPage(userInfo.email);
                });
            }
        })
        .catch((error) => {
            console.error('Ошибка при получении данных о пользователе:', error);
        });

}

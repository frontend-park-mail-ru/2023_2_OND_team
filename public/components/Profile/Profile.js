import { renderUserPage } from "./Content/User.js";
import { renderDataPage } from "./Content/Data.js";
import { renderSecurityPage } from "./Content/Security.js";
import { renderFeedPage } from "../Feed/Feed.js";
import { API } from "../../utils/api.js";

export function renderProfilePage(headerElement, pageElement) {
    const profile = Handlebars.templates['Profile.hbs'];
    const context = {};
    pageElement.innerHTML = profile(context);

    let userInfo;

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
            API.getUserInfo() 
                .then((data) => {
                    renderUserPage(data.username, data.avatar);
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных о пользователе:', error);
                });
        });
    }

    const dataBtn = document.querySelector('.js-profile__menu__data-btn');
    if (dataBtn) {
        dataBtn.addEventListener('click', (e) => {
            e.preventDefault();
            API.getUserInfo() 
                .then((data) => {
                    renderDataPage(userInfo);
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных о пользователе:', error);
                });
        });
    }

    const securityBtn = document.querySelector('.js-profile__menu__security-btn');
    if (securityBtn) {
        securityBtn.addEventListener('click', (e) => {
            e.preventDefault();
            API.getUserInfo() 
                .then((data) => {
                    renderSecurityPage(data.email);
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных о пользователе:', error);
                });
        });
    }

    API.getUserInfo() 
        .then((data) => {
            renderUserPage(data.username, data.avatar);
        })
        .catch((error) => {
            console.error('Ошибка при получении данных о пользователе:', error);
        });

}

/**
 * Отображает основную страницу.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении основной страницы.
 */
import { renderFeedPage } from "./views/Feed/Feed.js";
import { API } from './utils/api.js';
import { renderSidebar } from "./views/Sidebar/Sidebar.js";
import { renderHeaderDefault } from "./views/HeaderDefault/HeaderDefault.js";
import State from "./components/State/state.js";
import { renderHeaderGuest } from "./views/HeaderGuest/HeaderGuest.js";

const state = new State();

API.getCsrfToken();
API.checkLogin()
    .then((status) => {
        if (status === 'ok') {
            renderSidebar();
            if (state.getIsAuthorized) {
                renderHeaderDefault();
            } else {
                renderHeaderGuest();
            }
            renderFeedPage();
        } else {
            console.log(status)
        }
    })
    .catch((error) => {
        console.error(error);
    })


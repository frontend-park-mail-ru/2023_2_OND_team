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
import { Router } from "./components/Router/router.js";

const state = new State();
const router = new Router();

API.getCsrfToken();
router.handlePopstate();



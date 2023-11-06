/**
 * Отображает основную страницу.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении основной страницы.
 */
import { API } from './utils/api.js';
import State from "./components/State/state.js";
import { Router } from "./components/Router/router.js";

const state = new State();
const router = new Router();

API.getCsrfToken();
router.handlePopstate();



/**
 * Отображает основную страницу.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении основной страницы.
 */
import {API} from './utils/api.js';
import {Router} from './components/Router/router.js';
import { renderIframeSurvey } from './views/IframeSurvey/IframeSurvey.js';

const router = new Router();

API.getCsrfToken()
    .then(() => {
      API.checkLogin()
          .then(() => {
            renderIframeSurvey(-1);
            router.handlePopstate();
          });
    });

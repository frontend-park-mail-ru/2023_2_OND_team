/**
 * Отображает основную страницу.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении основной страницы.
 */
import { API } from './utils/Api/api.js';
import {Router} from './components/Router/router.js';

const router = new Router();

API.getCsrfToken()
    .then(() => {
      API.checkLogin()
          .then(() => {
            router.handlePopstate();
          });
    });

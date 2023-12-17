/**
 * Отображает основную страницу.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении основной страницы.
 */
import { API } from './utils/Api/api.js';
import { Router } from "./components/Router/router.js";
import State from './components/State/state.js';
import { WebSocketConnection } from './utils/Api/messenger/messengerWS.js';

const router = new Router();
const state = new State();

API.getCsrfToken()
    .then(() => {
      API.checkLogin()
          .then(() => {
            router.handlePopstate();
            const WS = new WebSocketConnection(`wss://${state.getDomain()}:8080/websocket/connect/chat?${state.getUserID()}`);
          });
    });

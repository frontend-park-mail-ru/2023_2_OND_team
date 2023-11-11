import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

export function renderBoardPage(boardID) {
    const router = new Router();
    const main = document.querySelector('#main');

    const state = new State();

    const boardPage = Handlebars.templates['BoardPage.hbs'];
    API.getBoardInfo(boardID)
    .then((boardInfo) => {
        console.log('Информация о доске:', boardInfo);

        //main.innerHTML = pinPage(context);
    })
    .catch((error) => {
        console.error('Ошибка при получении информации о пине:', error);
        router.navigate('/page404');
    });
}

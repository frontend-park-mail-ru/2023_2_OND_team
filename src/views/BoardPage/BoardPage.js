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

        const context = {
            title: boardInfo.title
        };

        main.innerHTML = boardPage(context);

        const usernameReal = state.getUsername();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');

        const updateButton = document.createElement('img');
        updateButton.src = 'https://pinspire.online:1445/assets/icons/actions/icon_edit.svg';
        updateButton.classList.add('edit-button');

        console.log(usernameReal, boardInfo.author.username);

        if (usernameReal === boardInfo.author.username) {
            const rec = document.querySelector('.rectangle-add');
            rec.appendChild(deleteButton);
            rec.appendChild(updateButton);
        }
    })
    .catch((error) => {
        console.error('Ошибка при получении информации о доске:', error);
        router.navigate('/page404');
    });
}

import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";
import { renderPins } from "../../components/RenderPins/renderPins.js";

export async function renderBoardPage(boardID) {
    const router = new Router();
    const main = document.querySelector('#main');
    const state = new State();
    const boardPage = Handlebars.templates['BoardPage.hbs'];

    try {
        const boardInfo = await API.getBoardInfo(boardID);
        console.log('Информация о доске:', boardInfo);

        const context = {
            title: boardInfo.title,
            description: boardInfo.description
        };

        main.innerHTML = boardPage(context);

        const usernameReal = state.getUsername();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', function (e) {
            e.preventDefault();
            API.deleteBoard(boardID)
            router.navigate('/profile');
        });

        const updateButton = document.createElement('img');
        updateButton.src = 'https://pinspire.online:1445/assets/icons/actions/icon_edit.svg';
        updateButton.classList.add('edit-button');

        console.log(usernameReal);

        const rec = document.querySelector('.bar');
        rec.appendChild(deleteButton);
        rec.appendChild(updateButton);

        renderPins(document.getElementById('board-pins'), boardInfo.pins);
    } catch (error) {
        console.error('Ошибка при получении информации о доске:', error);
        router.navigate('/page404');
    }
}

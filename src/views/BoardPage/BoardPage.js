import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";
import { renderPins } from "../../components/RenderPins/renderPins.js";

export async function renderBoardPage(boardID) {
    const router = new Router();
    const main = document.querySelector('#main');
    const state = new State();
    const boardPage = Handlebars.templates['BoardPage.hbs'];

    const pins = [190, 2, 1];

    try {
        const boardInfo = await API.getBoardInfo(boardID);
        console.log('Информация о доске:', boardInfo);

        const context = {
            title: boardInfo.title,
            description: boardInfo.description
        };

        main.innerHTML = boardPage(context);

        const usernameReal = state.getUsername();

        const titleTextarea = document.querySelector('.pin-title');
        const descriptionTextarea = document.querySelector('.pin-description');

        const pinControl = document.querySelector('.pin-control');
        const canselDataBtn = document.querySelector('.pin-control__cansel-btn');
        const saveDataBtn = document.querySelector('.pin-control__save-btn');

        const editSpan = document.querySelector('.pin-edit-span-all');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');

        const updateButton = document.createElement('img');
        updateButton.src = '/assets/icons/actions/icon_edit.svg';
        updateButton.classList.add('edit-button');

        updateButton?.addEventListener('click', () => {
            updateButton.classList.add('hide');
            pinControl.classList.remove('hide');

            titleTextarea.classList.add('input-primary');
            descriptionTextarea.classList.add('input-primary');

            titleTextarea.disabled = false;
            descriptionTextarea.disabled = false;
            
            editSpan.textContent = '';
        });

        canselDataBtn?.addEventListener('click', () => {
            updateButton.classList.remove('hide');
            pinControl.classList.add('hide');

            titleTextarea.classList.remove('input-primary');
            descriptionTextarea.classList.remove('input-primary');

            titleTextarea.disabled = true;
            descriptionTextarea.disabled = true;

            titleTextarea.value = boardInfo.title;
            descriptionTextarea.value = boardInfo.description;
            
            editSpan.textContent = '';
        });

        saveDataBtn?.addEventListener('click', () => {
            API.putBoardInfo(boardInfo.board_id, titleTextarea.value, descriptionTextarea.value, pins)
                .then((res) => {
                    if (res.status === 'ok') {
                        router.navigate(`/board/${boardInfo.board_id}`);
                    } else {
                        editSpan.textContent = 'Некорректные данные';
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        });

        deleteButton.addEventListener('click', async function (e) {
            e.preventDefault();
            await API.deleteBoard(boardID);
            router.navigate('/profile');
        });

        console.log(usernameReal);

        const rec = document.querySelector('.bar');
        rec.appendChild(deleteButton);
        rec.appendChild(updateButton);

        await renderBoardPins();

    } catch (error) {
        console.error('Ошибка при получении информации о доске:', error);
        router.navigate('/page404');
    }

    async function renderBoardPins() {
        try {
            const data = await API.getBoardPins(boardID);
            const section = document.getElementById('board-pins');
            renderPins(section, data.pins);
        } catch (error) {
            console.error('Ошибка при рендеринге пинов:', error);
        }
    }
}

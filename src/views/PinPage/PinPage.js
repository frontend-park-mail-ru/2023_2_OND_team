import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";
import { renderPins } from '../../components/RenderPins/renderPins.js';

export function renderPinPage(pinID) {
    const router = new Router();
    const main = document.querySelector('#main');

    const state = new State();

    const pinPage = Handlebars.templates['PinPage.hbs'];

    API.getPinInfo(pinID)
        .then((pinInfo) => {
            console.log('Информация о пине:', pinInfo);
            const context = {
                id: pinInfo.id,
                src: pinInfo.picture,
                username: pinInfo.author.username,
                title: pinInfo.title,
                description: pinInfo.description,
            };

            main.innerHTML = pinPage(context);

            const usernameReal = state.getUsername();
            const isAuthorized = state.getIsAuthorized();

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Прикрепить на доску';
            saveButton.classList.add('save-button');
            UserBoards();

            function UserBoards() {
                const boardList = document.createElement('select');
                boardList.classList.add('board-list');
            
                API.getUserBoards()
                    .then((data) => {
                        data.forEach((board) => {
                            const option = document.createElement('option');
                            option.value = board.board_id;
                            option.textContent = board.title;
                            boardList.appendChild(option);
                        });
            
                        const container = document.getElementById('your-container-id');
                        container.appendChild(boardList);
                    })
                    .catch((error) => {
                        console.error('Ошибка при получении информации о досках пользователя:', error);
                    });
            }

            boardOptions.forEach((boardName, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = boardName;
                boardList.appendChild(option);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-button');

            const updateButton = document.createElement('img');
            updateButton.src = 'https://pinspire.online:1445/assets/icons/actions/icon_edit.svg';
            updateButton.classList.add('edit-button');

            console.log(usernameReal, pinInfo.author.username);

            if (usernameReal === pinInfo.author.username) {
                const rec = document.querySelector('.rectangle');
                rec.appendChild(deleteButton);
                rec.appendChild(updateButton);
            }

            if (isAuthorized) {
                const block = document.querySelector('.saved');
                block.appendChild(saveButton);
                block.appendChild(boardList);
            }

            deleteButton.addEventListener('click', function (e) {
                e.preventDefault();
                API.deletePin(pinID)
                router.navigate('/');
            });

            updateButton.addEventListener('click', function (e) {
                e.preventDefault();
                API.updatePin(pinID)
                router.navigate('/');
            });
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
            router.navigate('/page404');
    });
}

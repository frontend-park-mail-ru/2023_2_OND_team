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

            const titleTextarea = document.querySelector('.pin-title');
            const descriptionTextarea = document.querySelector('.pin-description');

            const pinControl = document.querySelector('.pin-control');
            const canselDataBtn = document.querySelector('.pin-control__cansel-btn');
            const saveDataBtn = document.querySelector('.pin-control__save-btn');

            const editSpan = document.querySelector('.pin-edit-span-all');

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Прикрепить на доску';
            saveButton.classList.add('save-button');
            const boardList = document.createElement('select');
            boardList.classList.add('board-list');

            function UserBoards(data) {
                const boardList = document.querySelector('.board-list');
            
                boardList.innerHTML = '';
            
                if (data && data.body && Array.isArray(data.body)) {
                    data.body.forEach(board => {
                        const option = document.createElement('option');
                        option.value = board.board_id;
                        option.textContent = board.title;
                        boardList.appendChild(option);
                    });
                } else {
                    console.error('Некорректный формат данных о досках пользователя:', data);
                }
            }
            
            API.getUserBoards()
                .then((data) => {
                    UserBoards(data);
                })
                .catch((error) => {
                    console.error('Ошибка при получении информации о досках пользователя:', error);
                });
            
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-button');

            const updateButton = document.createElement('img');
            updateButton.src = 'https://pinspire.online:1445/assets/icons/actions/icon_edit.svg';
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

                titleTextarea.value = pinInfo.title;
                descriptionTextarea.value = pinInfo.description;
                
                editSpan.textContent = '';
            });

            saveDataBtn?.addEventListener('click', () => {
                API.putPinInfo(pinInfo.id, titleTextarea.value, descriptionTextarea.value)
                    .then((res) => {
                        if (res.status === 'ok') {
                            router.navigate(`/pin/${pinInfo.id}`);
                        } else {
                            editSpan.textContent = 'Некорректные данные';
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            });

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
                UserBoards();
            }

            deleteButton.addEventListener('click', function (e) {
                e.preventDefault();
                API.deletePin(pinID);
                router.navigate('/');
            });
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
            router.navigate('/page404');
        });
}

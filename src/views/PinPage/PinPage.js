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
                likes: pinInfo.count_likes,
            };

            main.innerHTML = pinPage(context);

            const likeButton = document.querySelector('.pin-like-icon');
            const likeField = document.querySelector('.pin-like-counter');

            API.getLike(pinID)
                .then((data) => {
                    if (data.is_set) {
                        likeButton.src = '/assets/icons/like_active.svg';
                    } else {
                        likeButton.src = '/assets/icons/like.svg';
                    }
                })
                .catch((error) => {
                    console.error(error);
                })

            likeButton?.addEventListener('click', () => {
                API.getLike(pinID)
                    .then((data) => {
                        if (data.is_set) {
                            API.deleteLike(pinID)
                                .then((data) => {
                                    likeButton.src = '/assets/icons/like.svg';
                                    likeField.innerHTML = data.count_like;
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                        } else {
                            API.setLike(pinID)
                                .then((data) => {
                                    likeButton.src = '/assets/icons/like_active.svg';
                                    likeField.innerHTML = data.count_like;
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })

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

            /*function UserBoards() {
                API.getUserBoards()
                    .then((data) => {
                        console.log('Информация о досках пользователя:', data);

                        data.body.forEach((board) => {
                            const option = document.createElement('option');
                            option.value = board.board_id;
                            option.textContent = board.title;
                            boardList.appendChild(option);
                        });
                        data.forEach((board) => {
                            const pins = Array.from(board.pins).slice(0, 3);
                            const context = {
                                id: board.board_id,
                                title: board.title,
                                description: board.description,
                                pins: pins,
                            }
                        });

                        console.log(context);

                        //const container = document.getElementById('board-list');
                        //container.appendChild(boardList);
                    })
                    .catch((error) => {
                        console.error('Ошибка при получении информации о досках пользователя:', error);
                    });
            }**/

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

            /*if (isAuthorized) {
                const block = document.querySelector('.saved');
                block.appendChild(saveButton);
                block.appendChild(boardList);
                UserBoards();
            }*/

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

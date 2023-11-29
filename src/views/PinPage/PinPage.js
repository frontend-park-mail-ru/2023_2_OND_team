import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";
import { renderPins } from '../../components/RenderPins/renderPins.js';
//import { renderUserPage } from '../../views/UserPage/UserPage.js'

export function renderPinPage(pinID) {
    const router = new Router();
    const main = document.querySelector('#main');
    const state = new State();
    const pinPage = Handlebars.templates['PinPage.hbs'];

    API.getPinInfo(pinID)
        .then((pinInfo) => {
            console.log('Информация о пине:', pinInfo);
            console.log('Информация о пине:', pinInfo.author.id);
            const context = {
                id: pinInfo.id,
                src: pinInfo.picture,
                username: pinInfo.author.username,
                title: pinInfo.title,
                description: pinInfo.description,
                likes: pinInfo.count_likes,
                avatar: pinInfo.author.avatar
            };

            main.innerHTML = pinPage(context);

            const likeButton = document.querySelector('.pin-like-icon');
            const likeField = document.querySelector('.pin-like-counter');
            const userName = document.querySelector('.pin-username');

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

            userName?.addEventListener('click', () => {
                console.log(pinInfo.author.id);
            })

            const usernameReal = state.getUsername();
            const isAuthorized = state.getIsAuthorized();

            const titleTextarea = document.querySelector('.pin-title');
            const descriptionTextarea = document.querySelector('.pin-description');

            const pinControl = document.querySelector('.pin-control');
            const canselDataBtn = document.querySelector('.pin-control__cansel-btn');
            const saveDataBtn = document.querySelector('.pin-control__save-btn');

            const editSpan = document.querySelector('.pin-edit-span-all');
            
            const saveButton = document.querySelector('.js-pin-to-board__btn');
            const subsButton = document.querySelector('.js-subscribe__btn');
            const boardList = document.querySelector('.board-list');

            let boardID;

            function UserBoards() {
                boardList.addEventListener('change', (event) => {
                    boardID = event.target.value;
                });

                API.getUserBoards()
                .then((res) => {
                  const optgroup = document.createElement('optgroup');
                  optgroup.label = 'Выберите доску';
              
                  res.forEach(board => {
                    const option = document.createElement('option');
                    option.value = board.board_id;
                    option.textContent = board.title;
                    optgroup.appendChild(option);
                  });
              
                  boardList.appendChild(optgroup);
                })
                .catch((error) => {
                  console.error('Ошибка при получении досок:', error);
                });              
            }
            
            const deleteButton = document.querySelector('.js-delete__btn');
            const updateButton = document.querySelector('.js-edit__btn');

            updateButton.classList.add('hide');
            deleteButton.classList.add('hide');

            saveButton?.addEventListener('click', () => {
                console.log('КЛЛЛИИИК');
                console.log(boardID, [parseInt(pinID)]);
                API.addBoardPins(boardID, [parseInt(pinID)]);
            });

            deleteButton?.addEventListener('click', () => {
                //e.preventDefault();
                API.deletePin(pinID);
                router.navigate('/');
            });

            updateButton?.addEventListener('click', () => {
                updateButton.classList.add('hide');
                pinControl.classList.remove('hide');

                titleTextarea.classList.add('input-primary');
                descriptionTextarea.classList.add('input-primary');

                likeButton.classList.add('hide');
                likeField.classList.add('hide');

                titleTextarea.disabled = false;
                descriptionTextarea.disabled = false;
                
                editSpan.textContent = '';
            });

            canselDataBtn?.addEventListener('click', () => {
                updateButton.classList.remove('hide');
                pinControl.classList.add('hide');

                titleTextarea.classList.remove('input-primary');
                descriptionTextarea.classList.remove('input-primary');

                likeButton.classList.remove('hide');
                likeField.classList.remove('hide');

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
                            updateButton.classList.remove('hide');
                            pinControl.classList.add('hide');
            
                            titleTextarea.classList.remove('input-primary');
                            descriptionTextarea.classList.remove('input-primary');
            
                            likeButton.classList.remove('hide');
                            likeField.classList.remove('hide');
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
                updateButton.classList.remove('hide');
                deleteButton.classList.remove('hide');
                subsButton.classList.add('hide');
            }

            if (isAuthorized) {
                const block = document.querySelector('.saved');
                block.appendChild(saveButton);
                block.appendChild(boardList);
                UserBoards();
            }
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
            router.navigate('/page404');
        });
}

import {API} from '../../utils/Api/api.js';
import State from '../../components/State/state.js';
import {Router} from '../../components/Router/router.js';
import { Comments } from './Comments/Comments.js';
import { renderUserPage } from '../../views/UserPage/UserPage.js'

export function renderPinPage(pinID) {
    const router = new Router();
    const main = document.querySelector('#main');
    const state = new State();
    const pinPage = Handlebars.templates['PinPage.hbs'];
    const currentURL = window.location.href;

    API.getPinInfo(pinID)
        .then((pinInfo) => {
            //console.log('Информация о пине:', pinInfo);
            //console.log('Информация о пине:', pinInfo.author.id);
            const context = {
                id: pinInfo.id,
                src: pinInfo.picture,
                username: pinInfo.author.username,
                title: pinInfo.title,
                description: pinInfo.description,
                likes: pinInfo.count_likes,
                avatar: pinInfo.author.avatar,
                link: currentURL
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
                if (!isAuthorized) {
                    router.navigate('/login')
                    return;
                }

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
                //console.log(pinInfo.author.id);
                router.navigate(`/user/${pinInfo.author.id}`);
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

                API.getMyBoards()
                .then((res) => {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = 'Выберите доску';
                
                    res.forEach(board => {
                        const option = document.createElement('option');
                        option.value = board.board_id;
                        option.textContent = board.title;
                        optgroup.appendChild(option);
                    });
                  
                    if (optgroup.children.length) {
                        boardID = optgroup.children[0].value;
                    }

                    boardList.appendChild(optgroup);
                })
                .catch((error) => {
                  console.error('Ошибка при получении досок:', error);
                });              
            }
            
            const shareButton = document.querySelector('.js-share__btn');
            const deleteButton = document.querySelector('.js-delete__btn');
            const updateButton = document.querySelector('.js-edit__btn');

            const pinCommentsName = document.querySelector('.pin-comments_name');
            const pinCommentsDiv = document.querySelector('.pin-comments-div');

            updateButton.classList.add('hide');
            deleteButton.classList.add('hide');

            const showModal = () => {
                const modal = document.getElementById('deleteModal');
                modal.classList.add('show');
            };

            const hideModal = () => {
                const modal = document.getElementById('deleteModal');
                modal.classList.remove('show');
            };

            saveButton?.addEventListener('click', () => {
                //console.log(boardID, [parseInt(pinID)]);
                API.addBoardPins(boardID, [parseInt(pinID)]);
            });

            deleteButton?.addEventListener('click', () => {
                showModal();
            });

            shareButton.addEventListener('click', () => {
                const input = document.querySelector('#shareModal .field input');
                input.value = currentURL;

                const shareModal = document.getElementById('shareModal');
            
                shareModal.classList.add('show');

                const closeButton = shareModal.querySelector('.js-cancel__btn');
                const copyButton = shareModal.querySelector('.field button');

                closeButton.addEventListener('click', () => {
                    shareModal.classList.remove('show');
                }); 

                shareModal.addEventListener('click', (e) => {
                    if (e.target == shareModal) {
                        shareModal.classList.remove('show');
                    }
                });
            
                copyButton.addEventListener('click', () => {
                    const copyInput = shareModal.querySelector('.field input');
                    copyInput.select();
                
                    try {
                        const successful = document.execCommand('copy');
                        
                        if (successful) {
                            copyButton.style.backgroundColor = 'green';
                            copyButton.innerText = 'Скопировано';
                        } else {
                            copyButton.style.backgroundColor = '';
                            copyButton.innerText = 'Скопировать';
                        }
                    } catch (err) {
                        console.error('Ошибка копирования:', err);
                    }
                });                
            });            

            const confirmDeleteBtn = document.getElementById('confirmDelete');
            const cancelDeleteBtn = document.getElementById('cancelDelete');
        
            confirmDeleteBtn?.addEventListener('click', () => {
                API.deletePin(pinID)
                    .then(() => {
                        hideModal();
                        router.navigate('/');
                    })
                    .catch((error) => {
                        console.error('Ошибка при удалении пина:', error);
                        hideModal();
                    });
            });
        
            cancelDeleteBtn?.addEventListener('click', () => {
                hideModal();
            });

            updateButton?.addEventListener('click', () => {
                updateButton.classList.add('hide');
                pinControl.classList.remove('hide');

                pinCommentsName.classList.add('hide');
                pinCommentsDiv.classList.add('hide');

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

                pinCommentsName.classList.remove('hide');
                pinCommentsDiv.classList.remove('hide');

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

                            pinCommentsName.classList.remove('hide');
                            pinCommentsDiv.classList.remove('hide');
            
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

            //console.log(usernameReal, pinInfo.author.username);

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

            API.getPinComments(pinID)
                .then((data) => {
                    const comments = new Comments(pinID);
                    comments.renderAllComments(data.comments);
                })
                .catch((error) => {
                    console.error('Ошибка при получении комментариев к пину', error);
                })

        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
            router.navigate('/page404');
        });
        
}

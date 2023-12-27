import {API} from '../../utils/Api/api.js';
import State from '../../components/State/state.js';
import {Router} from '../../components/Router/router.js';
import {renderPins} from '../../components/RenderPins/renderPins.js';
import {definePins} from '../../utils/definePins/definePins.js';

export async function renderBoardPage(boardID) {
    const router = new Router();
    const main = document.querySelector('#main');
    const state = new State();
    const boardPage = Handlebars.templates['BoardPage.hbs'];
    const currentURL = window.location.href;

    const pins = [190, 2, 1];

    try {
        const boardInfo = await API.getBoardInfo(boardID);

        const context = {
            title: boardInfo.title,
            description: boardInfo.description,
            link: currentURL
        };

        main.innerHTML = boardPage(context);

        const usernameReal = state.getUsername();

        const titleTextarea = document.querySelector('.board-title');
        const descriptionTextarea = document.querySelector('.pin-description');

        const pinControl = document.querySelector('.pin-control');
        const canselDataBtn = document.querySelector('.pin-control__cansel-btn');
        const saveDataBtn = document.querySelector('.pin-control__save-btn');

        const editSpan = document.querySelector('.pin-edit-span-all');

        const deleteButton = document.querySelector('.js-delete__btn');
        const updateButton = document.querySelector('.js-edit__btn');
        const shareButton = document.querySelector('.js-share__btn');

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
        
            /*const socialIcons = shareModal.querySelectorAll('.icons a');
        
            socialIcons.forEach(icon => {
                icon.addEventListener('click', () => {
                    console.log('click');
                });
            });*/
        });  

        if (usernameReal === boardInfo.author_username) {
            const rec = document.querySelector('.rectangle-board-open');
            updateButton.classList.remove('hide');
            deleteButton.classList.remove('hide');
        }

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
                        updateButton.classList.remove('hide');
                        pinControl.classList.add('hide');
            
                        titleTextarea.classList.remove('input-primary');
                        descriptionTextarea.classList.remove('input-primary');
            
                        titleTextarea.disabled = true;
                        descriptionTextarea.disabled = true;
                        
                        editSpan.textContent = '';
                    } else {
                        editSpan.textContent = 'Некорректные данные';
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        });

        deleteButton?.addEventListener('click', () => {
            showModal();
        });

        const confirmDeleteBtn = document.getElementById('confirmDelete');
        const cancelDeleteBtn = document.getElementById('cancelDelete');
    
        confirmDeleteBtn?.addEventListener('click', () => {
            API.deleteBoard(boardID)
                .then(() => {
                    hideModal();
                    router.navigate('/profile');
                })
                .catch((error) => {
                    console.error('Ошибка при удалении доски:', error);
                    hideModal();
                });
        });
    
        cancelDeleteBtn?.addEventListener('click', () => {
            hideModal();
        });

        //console.log(usernameReal);

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
            definePins();
        } catch (error) {
            console.error('Ошибка при рендеринге пинов:', error);
        }
    }
}

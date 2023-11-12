import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

export function renderCreateBoard() {
    const router = new Router();
    const main = document.querySelector('#main');

    const state = new State();

    const createBoard = Handlebars.templates['CreateBoard.hbs'];

    const context = {};

    main.innerHTML = createBoard(context);

    const titleTextarea = document.querySelector('.board-title');
    const descriptionTextarea = document.querySelector('.board-description');

    const pinControl = document.querySelector('.pin-control');
    const canselDataBtn = document.querySelector('.pin-control__cansel-btn');
    const saveDataBtn = document.querySelector('.pin-control__save-btn');

    const editSpan = document.querySelector('.pin-edit-span-all');

    const updateButton = document.createElement('img');
    updateButton.src = 'https://pinspire.online:1445/assets/icons/actions/icon_edit.svg';
    updateButton.classList.add('edit-button');

    const cancelButton = document.querySelector('.board-cancel-button');
    const createButton = document.querySelector('.board-create-button');

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/');
    });

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

    createButton.addEventListener('click', function (e) {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
    
        console.log(title, description);
    
        API.createBoard(title, description)
            .then((response) => {
                if (response && response.status === 'ok' && response.body && response.body.new_board_id) {
                    const boardID = response.body.new_board_id;
                    router.navigate(`/create/board/${boardID}`);
                } else {
                    console.error(response);
                }
            })
            .catch((error) => {
                console.error('Ошибка создания доски:', error);
            });
    
        e.preventDefault();
    });
    
}

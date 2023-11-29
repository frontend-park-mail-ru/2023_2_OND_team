import { API } from "../../utils/Api/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

export function renderCreateBoard() {
    const router = new Router();
    const main = document.querySelector('#main');

    const state = new State();

    const createBoard = Handlebars.templates['CreateBoard.hbs'];

    const context = {};

    main.innerHTML = createBoard(context);

    const cancelButton = document.querySelector('.js-board-cancel__btn-change');
    const secCancelButton = document.querySelector('.js-cancel__btn');
    const createButton = document.querySelector('.js-board-create__btn-change');

    secCancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/');
    });

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/');
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

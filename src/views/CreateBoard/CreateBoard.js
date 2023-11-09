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

    const cancelButton = document.querySelector('.board-cancel-button');
    const createButton = document.querySelector('.board-create-button')

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
                    console.log(`Board created with ID: ${boardID}`);
                } else {
                    console.error('Error creating board or invalid response:', response);
                }
            })
            .catch((error) => {
                console.error('Error creating board:', error);
            });
    
        e.preventDefault();
    });    
    
}

import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

export function renderCreateBoard() {
    const router = new Router();
    const main = document.querySelector('#main');

    const state = new State();

    const createPin = Handlebars.templates['CreateBoard.hbs'];

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

        e.preventDefault();
        router.navigate('/');
        API.createPin(title, description)
    });
}

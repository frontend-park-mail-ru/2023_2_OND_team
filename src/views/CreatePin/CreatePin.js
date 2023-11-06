import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

export function renderCreatePin() {
    const router = new Router();
    const main = document.querySelector('#main');

    const state = new State();

    const createPin = Handlebars.templates['CreatePin.hbs'];

    const context = {};

    main.innerHTML = createPin(context);

    const cancelButton = document.querySelector('.pin-cancel-button');
    const createButton = document.querySelector('.pin-create-button')

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/');
    });

    createButton.addEventListener('click', function (e) {
        const picture = document.getElementById('picture').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        e.preventDefault();
        router.navigate('/');
        API.createPin(picture, title, description)
    });
}

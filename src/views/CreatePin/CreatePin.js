import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

export function renderCreatePin() {
    const router = new Router();
    const main = document.querySelector('#main');

    const state = new State();

    const createPins = Handlebars.templates['CreatePins.hbs'];

    const context = {};

    main.innerHTML = createPins(context);

    const cancelButton = document.querySelector('.pin-cancel-button');

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/');
    });
}

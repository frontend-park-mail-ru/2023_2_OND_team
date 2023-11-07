import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

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
                description: pinInfo.description,
            };

            main.innerHTML = pinPage(context);

            console.log(username, pinInfo.description);

        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
    });
}

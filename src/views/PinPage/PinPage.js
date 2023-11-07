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

            const usernameReal = state.getUsername();
            const isAuthorized = state.getIsAuthorized();

            console.log(isAuthorized);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-button');

            const updateButton = document.createElement('img');
            updateButton.src = 'https://pinspire.online:1444/assets/icons/icon_edit.svg';
            updateButton.classList.add('edit-button');

            console.log(usernameReal, pinInfo.author.username);

            if (usernameReal === pinInfo.author.username && isAuthorized) {
                const rec = document.querySelector('.rectangle');
                rec.appendChild(deleteButton);
                rec.appendChild(updateButton);
            }

            deleteButton.addEventListener('click', function (e) {
                e.preventDefault();
                API.deletePin(pinID)
                router.navigate('/');
            });
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
            router.navigate('/page404');
    });
}

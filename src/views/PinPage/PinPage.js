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

            const usernameDiv = document.querySelector('.header__user__menu__username-text');
            const usernameReal = usernameDiv.textContent.trim();

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-button');

            console.log(usernameReal, pinInfo.author.username);

            if (usernameReal === pinInfo.author.username) {
                const rec = document.querySelector('.rectangle');
                rec.appendChild(deleteButton);
            }

            deleteButton.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('boooom')
                //API.deletePin(pinID)
                    .then((result) => {
                        if (result) {
                            router.navigate('/');
                        } else {
                            console.error('Не удалось удалить пин.');
                        }
                    })

            });
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
    });
}

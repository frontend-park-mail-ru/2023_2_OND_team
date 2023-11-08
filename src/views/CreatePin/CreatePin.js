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
    const createButton = document.querySelector('.pin-create-button');
    const pictureInput = document.getElementById('picture');
    let picture;

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/');
    });

    createButton.addEventListener('click', function (e) {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        API.createPin(picture, title, description)
        .then((status) => {
            if (status === "ok") {
                router.navigate('/');
            } else {
                console.error('Error creating pin');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    
        e.preventDefault();
    });

    pictureInput.addEventListener('change', async (event) => {
        const pictureFile = event.target.files[0];
    
        const options = {
            method: 'POST',
            headers: {
                'x-csrf-token': this.state.getCsrfToken(),
            },
            body: new FormData(),
            credentials: 'include',
        };
    
        options.body.append('picture', pictureFile);
        options.body.append('title', title);
        options.body.append('description', description);
        options.body.append('public', true);
    
        try {
            const configItem = config.find((item) => item.name === 'createPin');
            if (!configItem) {
                throw new Error('Не найдена конфигурация для createPin');
            }
    
            const response = await API.createPin(options);
    
            if (response.status === 'ok') {
            } else {
                console.error('Ошибка создания пина');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    });
}

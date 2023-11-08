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
    
        const formData = new FormData();
        formData.append('picture', pictureFile);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('public', true);
    
        try {
            const configItem = config.find((item) => item.name === 'createPin');
            if (!configItem) {
                throw new Error('Не найдена конфигурация для createPin');
            }
    
            const response = await fetch(configItem.url, {
                method: 'POST',
                headers: {
                    'x-csrf-token': this.state.getCsrfToken(),
                },
                body: formData,
                credentials: 'include',
            });
    
            const csrfToken = response.headers.get('X-Set-CSRF-Token');
            if (csrfToken) {
                this.state.setCsrfToken(csrfToken);
            }
    
            const res = await response.json();
            if (res.status === 'ok') {
                return this.createPin(picture, title, description);
            }
    
            return false;
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    });
}

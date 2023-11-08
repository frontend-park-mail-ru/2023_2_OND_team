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

    pictureInput.addEventListener('change', (event) => {
        const pictureFile = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const pictureBytes = event.target.result;
            const mimeType = pictureFile.type;
            const picture = new Blob([pictureBytes], { type: mimeType });
    
            const formData = new FormData();
            formData.append('picture', picture);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('public', true);
    
            API.createPin(formData)
                .then((status) => {
                    if (status === "ok") {
                        console.log('Данные успешно отправлены на сервер');
                    } else {
                        console.error('Ошибка на сервере');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при выполнении запроса:', error);
                });
        };
    
        reader.readAsArrayBuffer(pictureFile);
    });    
       
}

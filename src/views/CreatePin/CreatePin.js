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
        const pictureInput = document.getElementById('picture');
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
    
        const pictureFile = pictureInput.files[0];
    
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const pictureBytes = event.target.result;
    
            const extension = pictureFile.name.split('.').pop().toLowerCase();
            let mimeType = 'application/octet-stream'; // Тип MIME по умолчанию
    
            if (extension === 'jpg' || extension === 'jpeg') {
                mimeType = 'image/jpeg';
            } else if (extension === 'png') {
                mimeType = 'image/png';
            }
    
            const picture = new Blob([pictureBytes], { type: mimeType });

            console.log(picture);
    
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
        };
    
        reader.readAsArrayBuffer(pictureFile);
    
        e.preventDefault();
    });    
}

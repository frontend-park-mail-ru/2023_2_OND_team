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
        //const title = document.getElementById('title').value;
        //const description = document.getElementById('description').value;

        API.createPin(picture)
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
    
            picture = new Blob([pictureBytes], { type: mimeType });
    
            console.log(picture);

        };

        reader.readAsArrayBuffer(pictureFile);
    });
       
}

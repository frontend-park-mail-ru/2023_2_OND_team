import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { Router } from "../../components/Router/router.js";

export function renderCreatePin() {
    const router = new Router();
    const main = document.querySelector('#main');
    const state = new State();
    const createPin = Handlebars.templates['CreatePin.hbs'];
    const context = {};
    let picture;

    main.innerHTML = createPin(context);

    const cancelButton = document.querySelector('.js-pin-cancel__btn-change');
    const createButton = document.querySelector('.js-pin-create__btn-change');
    const pictureInput = document.getElementById('picture');
    const uploadImage = document.querySelector('.upload-image');

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/');
    });

    createButton.addEventListener('click', function (e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
    
        const formData = new FormData();
        formData.append('picture', picture);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('public', true);
    
        API.createPin(formData)
            .then((response) => {
                if (response.status === 'ok') {
                    router.navigate('/');
                } else {
                    console.error('Error creating pin');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });    

    pictureInput.addEventListener('change', (event) => {
        const pictureFile = event.target.files[0];
        handleFile(pictureFile);
    });

    uploadImage.addEventListener('dragenter', preventDefaults);
    uploadImage.addEventListener('dragover', preventDefaults);
    uploadImage.addEventListener('drop', handleDrop);

    function preventDefaults(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    function handleDrop(event) {
        if (event.target === uploadImage) {
            preventDefaults(event);
            const droppedFiles = event.dataTransfer.files;
            if (droppedFiles.length > 0) {
                const pictureFile = droppedFiles[0];
                handleFile(pictureFile);
            }
        }
    }

    function handleFile(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const pictureBytes = event.target.result;
            const mimeType = file.type;
            picture = new Blob([pictureBytes], { type: mimeType });

            console.log(picture);

            //pictureInput.value = file.name;
        };

        reader.readAsArrayBuffer(file);
    }
}

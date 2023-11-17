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

    const cancelButton = document.querySelector('.js-pin-cancel__btn-change');
    const createButton = document.querySelector('.js-pin-create__btn-change');
    const pictureInput = document.getElementById('picture');
    const dropArea = document.getElementById('pin-rectangle');
    let picture;

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

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    }

    function handleFiles(files) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const pictureBytes = event.target.result;
            const mimeType = files[0].type;
            picture = new Blob([pictureBytes], { type: mimeType });
        };

        reader.readAsArrayBuffer(files[0]);
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);
}

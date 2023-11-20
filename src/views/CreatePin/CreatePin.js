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
        const pictureImg = document.querySelector('.upload-image');
    
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            pictureImg.src = dataUrl;
    
            const pictureBytes = event.target.result.split(',')[1];
            const mimeType = file.type;
            picture = base64ToBlob(pictureBytes, mimeType);
    
            console.log(picture);
        };
    
        reader.readAsDataURL(file);
    }

    function base64ToBlob(base64, mime) {
        const sliceSize = 1024;
        const byteCharacters = atob(base64);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        return new Blob(byteArrays, { type: mime });
    }
}

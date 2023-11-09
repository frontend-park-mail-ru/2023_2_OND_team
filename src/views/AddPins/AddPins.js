import { API } from '../../utils/api.js';
import { renderPins } from '../../components/RenderPins/renderPins.js';
import { State } from '../../components/State/state.js'
import { Router } from '../../components/Router/router.js'
 

export function renderAddPins() {
    const router = new Router();
    const state = new State();
    const main = document.querySelector('#main');

    const numRequestedPins = 12;
    let pinMaxID = -Infinity; 
    let pinMinID = Infinity; 
    let hasLoadedPins = false;

    const selectedPins = [];

    const feedTemplate = Handlebars.templates['AddPins.hbs'];
    const feedContext = {};

    main.innerHTML = feedTemplate(feedContext);

    function debounce(f, ms) {
        let isCooldown = false;

        return function() {
            if (isCooldown) return;

            f.apply(this, arguments);
            isCooldown = true;

            setTimeout(() => isCooldown = false, ms);
        };
    }

    function handleScroll() {
        if (!hasLoadedPins) {
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
        
            if (scrollY + windowHeight >= documentHeight - 1000) {
                API.generatePins(numRequestedPins, pinMaxID, pinMinID)
                    .then((data) => {
                        pinMaxID = Math.max(pinMaxID, data.maxID);
                        pinMinID = Math.min(pinMinID, data.minID);

                        const section = document.getElementById('pins');
                        renderPins(section, data.pins);
                        SelectPins();
        
                        hasLoadedPins = true;
                    })
                    .catch((error) => {
                        console.error('Ошибка при рендеринге пинов:', error);
                    });
            }
        }
    }

    function SelectPins() {
        const pins = document.querySelectorAll('.gallery__item');
    
        pins?.forEach((pin) => {
            pin.addEventListener('click', (e) => {
                const pinID = pin.className.split(' ')[1].split('-')[3];
    
                const index = selectedPins.indexOf(pinID);
                if (index === -1) {
                    selectedPins.push(pinID);
                } else {
                    selectedPins.splice(index, 1);
                }
    
                console.log(selectedPins);
            });
        });
    }
    
    const scrollFunc = debounce(handleScroll, 250);
    window.scrollFunc = scrollFunc;
    scrollFunc();
    window.removeEventListener('scroll', window.scrollFunc);
    window.addEventListener('scroll', window.scrollFunc);

    const backButton = document.querySelector('.pin-back-button');
    const addButton = document.querySelector('.pin-add-button')

    backButton.addEventListener('click', function (e) {
        e.preventDefault();
        router.navigate('/create/board');
    });
    
    createButton.addEventListener('click', function (e) {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
    
        console.log(title, description);
    
        API.createBoard(title, description)
            .then((response) => {
                if (response && response.status === 'ok' && response.body && response.body.new_board_id) {
                    const boardID = response.body.new_board_id;
                    console.log(`Board created with ID: ${boardID}`);
                    router.navigate(`/create/board/${boardID}`);
                } else {
                    console.error('Error creating board or invalid response:', response);
                }
            })
            .catch((error) => {
                console.error('Error creating board:', error);
            });
    
        e.preventDefault();
    });
}

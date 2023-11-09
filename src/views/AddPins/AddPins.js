import { API } from '../../utils/api.js';
import { renderPins } from '../../components/RenderPins/renderPins.js';
import { State } from '../../components/State/state.js'
import { Router } from '../../components/Router/router.js'
 

export function renderAddPins(boardID) {
    const router = new Router();
    const state = new State();
    const main = document.querySelector('#main');

    const numRequestedPins = 12;
    let pinMaxID = -Infinity; 
    let pinMinID = Infinity; 
    let hasLoadedPins = false;

    const pins = [];

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
    
                const index = pins.indexOf(pinID);
                if (index === -1) {
                    pins.push(pinID);
                } else {
                    pins.splice(index, 1);
                }
    
                console.log(pins);
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
    
    addButton.addEventListener('click', function (e) {
        console.log(boardID, pins);

        API.addBoardPins(boardID, pins)
            .then((response) => {
                if (response.status === 'ok') {
                    router.navigate(`/`);
                } else {
                    console.error('Error creating board or invalid response:', response);
                }
            })
            .catch((error) => {
                console.error('Ошибка добавления пинов в доску:', error);
            });
    
        e.preventDefault();
    });
}

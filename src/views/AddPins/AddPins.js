import { API } from '../../utils/Api/api.js';
import { renderRecPins } from '../../components/RenderRecPins/renderRecPins.js';
import { State } from '../../components/State/state.js'
import { Router } from '../../components/Router/router.js'
 

export function renderAddPins(boardID) {
    const router = new Router();
    const state = new State();
    const main = document.querySelector('#main');

    const board_id = Number(boardID);

    const numRequestedPins = 12;
    let pinMaxID = -Infinity; 
    let pinMinID = Infinity; 
    let hasLoadedPins = false;

    const selectedPins = [];

    const addPinsTemplate = Handlebars.templates['AddPins.hbs'];
    const addPinsContext = {};

    main.innerHTML = addPinsTemplate(addPinsContext);

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

                        const section = document.getElementById('add_pins');
                        renderRecPins(section, data.pins);
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
        const pins = document.querySelectorAll('.int__gallery__item');
    
        pins?.forEach((pin) => {
            pin.addEventListener('click', (e) => {
                const pinID = Number(pin.className.split(' ')[1].split('-')[3]);
                pin.classList.toggle('selected');
    
                if (!isNaN(pinID)) {
                    const index = selectedPins.indexOf(pinID);
                    if (index === -1) {
                        selectedPins.push(pinID);
                        pin.classList.add('selected');
                    } else {
                        selectedPins.splice(index, 1);
                        pin.classList.remove('selected');
                    }
    
                    console.log(selectedPins);
                }
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
        console.log(boardID, selectedPins);

        API.addBoardPins(board_id, selectedPins);
        router.navigate(`/`);

    
        e.preventDefault();
    });
}

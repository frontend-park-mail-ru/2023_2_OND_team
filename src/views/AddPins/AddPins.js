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
                        definePins();  // Добавлен вызов функции definePins()
        
                        hasLoadedPins = true;
                    })
                    .catch((error) => {
                        console.error('Ошибка при рендеринге пинов:', error);
                    });
            }
        }
    }

    function definePins() {
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
    
    function SelectPins() {
        const pins = document.querySelectorAll('.gallery__item');
        const selectedPins = [];

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
    
    SelectPins();
}

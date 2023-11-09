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

    const feedTemplate = Handlebars.templates['AddPins.hbs'];
    const feedContext = {};

    main.innerHTML = feedTemplate(feedContext);

    /**
    * Создает функцию с задержкой для предотвращения слишком частых вызовов.
    */
    function debounce(f, ms) {
        let isCooldown = false;

        return function() {
            if (isCooldown) return;

            f.apply(this, arguments);
            isCooldown = true;

            setTimeout(() => isCooldown = false, ms);
        };
    }

    /**
    * Обработчик скролла страницы.
    * Загружает дополнительные пины при достижении нижней части страницы.
    */
    function handleScroll() {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
    
            API.generatePins(numRequestedPins, pinMaxID, pinMinID)
                .then((data) => {
                    if (data.maxID === pinMaxID && data.minID === pinMinID) {
                        window.removeEventListener('scroll', window.scrollFunc);
                        return;
                    }

                    pinMaxID = Math.max(pinMaxID, data.maxID);
                    pinMinID = Math.min(pinMinID, data.minID);

                    const section = document.getElementById('pins');
                    renderPins(section, data.pins);
                    definePins();
    
                })
                .catch((error) => {
                    console.error('Ошибка при рендеринге пинов:', error);
                });
    }
    
    const scrollFunc = debounce(handleScroll, 250);
    window.scrollFunc = scrollFunc;
    scrollFunc();
    window.removeEventListener('scroll', window.scrollFunc);
    window.addEventListener('scroll', window.scrollFunc);
    
}

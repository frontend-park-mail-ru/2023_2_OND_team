import { Header } from "../Header/Header.js";
import { API } from "../../utils/api.js";
// import { handleScroll } from "../../utils/handleScroll.js";
import { renderPins } from "../../utils/renderPins.js";

const NUM_REQUESTED_PINS = 20;

/**
* Рендерится главная страница с пинами.
* @param {HTMLElement} headerElement - Элемент заголовка.
* @param {HTMLElement} pageElement - Элемент страницы.
*/
export function renderFeedPage(headerElement, pageElement) {
    if (!headerElement || !pageElement) {
        const rootElement = document.getElementById('root');
        headerElement = document.createElement('header');
        pageElement = document.createElement('main');
        rootElement.appendChild(headerElement);
        rootElement.appendChild(pageElement);
    }
    
    pageElement.innerHTML = ''
    document.body.style.overflow = 'visible';

    const header = new Header(headerElement, pageElement);
    const div = document.createElement('div');
    div.classList.add('container');
    pageElement.appendChild(div);

    const section = document.createElement('section');
    section.id = "pins";
    section.classList.add('gallery');
    div.appendChild(section);

    const Api = new API();
    
    Api.checkLogin()
        .then(data => {
            header.renderHeader(data.isAuthorized, data.username);
        })
        .catch(error => {
            console.error('Ошибка при рендеринге хедера:', error);
        });

    let Pin = {
        lastID: 0
    };

    Api.generatePins(NUM_REQUESTED_PINS, Pin.lastID)
        .then(({images, lastID}) => {
            const section = document.getElementById('pins');
            renderPins(section, images);

            if (Pin.lastID === lastID) {
                window.removeEventListener('scroll', window.scrollFunc);
            }

            Pin.lastID = lastID;

        })
        .catch(error => {
            console.error(error);
        });

    let scrollFunc = debounce(handleScroll(Pin), 100);
    window.scrollFunc = scrollFunc;
    window.addEventListener('scroll', window.scrollFunc);
}

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
function handleScroll(Pin) {
    const Api = new API();

    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;

    if (scrollY + windowHeight >= documentHeight - 400) {
        Api.generatePins(NUM_REQUESTED_PINS, Pin.lastID)
            .then(({images, lastID}) => {
                const section = document.getElementById('pins');
                renderPins(section, images);

                if (Pin.lastID === lastID) {
                    window.removeEventListener('scroll', window.scrollFunc);
                }

                Pin.lastID = lastID;

            })
            .catch(error => {
                console.error('Ошибка при рендеринге пинов:', error);
            });
    }
}
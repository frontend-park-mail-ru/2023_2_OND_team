import { Header } from "../Header/Header.js";
import { API } from "../../utils/api.js";
import { scrollFunction } from "../../utils/scrollFunction.js";
// import { handleScroll } from "../../utils/handleScroll.js";
import { renderPins } from "../../utils/renderPins.js";

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
    headerElement.style.display = '';
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

    Api.generatePins()
        .then(images => {
            const section = document.getElementById('pins');
            renderPins(section, images)
        })
        .catch(error => {
            console.error('Ошибка при рендеринге пинов:', error);
        });

    let timer;
    window.addEventListener('scroll', scrollFunction.bind({ timer: timer }));
}

// /**
// * Обработчик скролла страницы.
// * Загружает дополнительные пины при достижении нижней части страницы.
// */
// function handleScroll() {
//     const Api = new API();

//     let documentHeight = document.documentElement.scrollHeight;
//     let windowHeight = window.innerHeight;
//     let scrollY = window.scrollY;

//     if (scrollY + windowHeight >= documentHeight - 400) {
//         Api.generatePins()
//             .then(images => {
//                 const section = document.getElementById('pins');
//                 renderPins(section, images)
//             })
//             .catch(error => {
//                 console.error('Ошибка при рендеринге пинов:', error);
//             });
//     }
// }
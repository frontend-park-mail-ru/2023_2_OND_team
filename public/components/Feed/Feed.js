import { Header } from "../Header/Header.js";
import { API } from "../../utils/api.js";

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
    pageElement.style.overflow = '';
    headerElement.style.display = '';
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
    window.addEventListener('scroll', () => {
        clearTimeout(timer);
        timer = setTimeout(handleScroll, 1000);
    });
}

/**
* Обработчик скролла страницы.
* Загружает дополнительные пины при достижении нижней части страницы.
*/
function handleScroll() {
    const Api = new API();

    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;

    if (scrollY + windowHeight >= documentHeight - 400) {
        Api.generatePins()
            .then(images => {
                const section = document.getElementById('pins');
                renderPins(section, images)
            })
            .catch(error => {
                console.error('Ошибка при рендеринге пинов:', error);
            });
    }
}

/**
* Рендерятся пины на главной странице.
* @param {HTMLElement} parent - Родительский элемент для отображения изображений.
* @param {Array} images - Массив объектов с информацией о пинах.
*/
function renderPins(parent, images) {
    const template = Handlebars.templates['Pins.hbs'];
    images.forEach(image => {
        const context = { src: image.picture };

        parent.insertAdjacentHTML('beforeend', template(context));
    });
}

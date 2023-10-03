import { Header } from "../Header/Header.js";

/**
 * Рендерится главная страница с пинами.
 * @param {HTMLElement} headerElement - Элемент заголовка.
 * @param {HTMLElement} pageElement - Элемент страницы.
 */
export function renderFeedPage(headerElement, pageElement) {
    pageElement.innerHTML = ''
    pageElement.style.overflow = '';
    const header = new Header(headerElement, pageElement);
    
    Ajax.get({
        url: '/feed',
        callback: (status, responseString) => {
            let isAuthorized = false;

            const parsedData = JSON.parse(responseString);
            const images = parsedData[0].images;
            const username = parsedData[0].name;

            if (status === 200) {
                isAuthorized = true;
            }
            
            header.renderHeader(isAuthorized, username)
            

            if (images && Array.isArray(images)) {
                const div = document.createElement('div');
                div.classList.add('container');
                pageElement.appendChild(div);
                
                const section = document.createElement('section');
                section.id = "pins";
                section.classList.add('gallery')
                div.appendChild(section);

                renderPins(section, images);
            }
            
        }
    })

    window.addEventListener('scroll', handleScroll);

}

function handleScroll() {
    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;

    if (scrollY + windowHeight >= documentHeight - 400) {
        generatePins();
    }
}

function generatePins() {
    fetch('/pin')
        .then(response => response.json())
        .then(images => {
            const section = document.getElementById('pins');
            renderPins(section, images)
        })
        .catch(error => {
            console.error('Произошла ошибка при получении изображений:', error);
        });
}

/**
 * Рендерятся пины на главной странице.
 * @param {HTMLElement} parent - Родительский элемент для отображения изображений.
 * @param {Array} images - Массив объектов с информацией о пинах.
 */
function renderPins(parent, images) {

    const template = Handlebars.templates['Pins.hbs'];
    images.forEach(image => {
        const context = { src: image.src };

        parent.insertAdjacentHTML('beforeend', template(context));
    });
}
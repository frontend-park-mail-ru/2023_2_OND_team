import { Header } from "../Header/Header.js";

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
                div.classList.add('container')
                pageElement.appendChild(div);
                
                const section = document.createElement('section');
                section.id = "pins"
                section.classList.add('gallery')
                div.appendChild(section)

                images.forEach(({src}) => {
                    section.innerHTML += `
                        <div class="gallery__item">
                            <img src="${src}" width="200" />
                        </div>
                    `;
                });
            }
            
        }
    })

    window.addEventListener('scroll', handleScroll);

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

function handleScroll() {
    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;

    if (scrollY + windowHeight >= documentHeight - 200) {
        generatePins();
    }
}

export function renderPins(parent, images) {

    const template = Handlebars.templates['Pins.hbs'];
    images.forEach(image => {
        const context = { src: image.src };

        parent.insertAdjacentHTML('beforeend', template(context));
    });
}
import { API } from "./api";
import { renderPins } from "./renderPins";

/**
* Обработчик скролла страницы.
* Загружает дополнительные пины при достижении нижней части страницы.
*/
export function handleScroll() {
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
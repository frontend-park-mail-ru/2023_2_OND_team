import { Router } from "../../components/Router/router.js";

export function renderNonContentNotification(elementMount, textContent, btnContent, url) {
    const router = new Router();

    const notificationTemplate = Handlebars.templates['NonContentNotification.hbs'];
    const notificationContext = {
        textContent,
        btnContent,
    };

    elementMount.innerHTML = notificationTemplate(notificationContext);

    const gotoBtn = document.querySelector('.js-non-content-goto-btn');
    gotoBtn.addEventListener('click', () => {
        elementMount.innerHTML = '';
        router.navigate(url);
    })
} 
import { renderNonContentNotification } from "../NonContentNotification/NonContentNotification.js";

export function renderSearchPage() {
    const main = document.querySelector('#main');

    const searchTemplate = Handlebars.templates['Search.hbs'];
    const searchContext = {};

    main.innerHTML = searchTemplate(searchContext);

    const nonContent = document.querySelector('.search-non-content');
    renderNonContentNotification(nonContent, 'Ничего не найдено', 'На главную', '/');
}
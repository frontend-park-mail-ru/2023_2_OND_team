import { renderNonContentNotification } from "../NonContentNotification/NonContentNotification.js";

export function renderSubscriptionsPage() {
    const main = document.querySelector('#main');

    const subscriptionsTemplate = Handlebars.templates['Subscriptions.hbs'];
    const subscriptionsContext = {};

    main.innerHTML = subscriptionsTemplate(subscriptionsContext);

    const nonContent = document.querySelector('.subscriptions-non-content');
    renderNonContentNotification(nonContent, 'Вы пока ни на кого не подписались', 'На главную', '/');
}

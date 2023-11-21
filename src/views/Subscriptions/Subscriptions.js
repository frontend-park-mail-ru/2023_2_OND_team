import { renderNonContentNotification } from "../NonContentNotification/NonContentNotification.js";
import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { renderUserItems } from "./SubscriptionsUserItem.js";
import { renderUserPage } from "../UserPage/UserPage.js";

export function renderSubscriptionsPage() {
    const state = new State();

    const main = document.querySelector('#main');
    const subscriptionsTemplate = Handlebars.templates['Subscriptions.hbs'];
    const subscriptionsContext = {};
    main.innerHTML = subscriptionsTemplate(subscriptionsContext);

    API.getUserSubscriptions()
        .then((data) => {
            if (!data) {
                const nonContent = document.querySelector('.subscriptions-non-content');
                renderNonContentNotification(nonContent, 'Вы пока ни на кого не подписались', 'На главную', '/');
                
                return;
            }

            const searchField = document.querySelector('.subscriptions__search');
            searchField.classList.remove('hide');
            const section = document.querySelector('.subscriptions-gallery');
            renderUserItems(section, data);

            const userItem = document.querySelector('.subscriptions__items');
            userItem?.addEventListener('click', () => {
                renderUserPage(1);
            });
        })
        .catch((error) => {
            console.error(error);
        })

}

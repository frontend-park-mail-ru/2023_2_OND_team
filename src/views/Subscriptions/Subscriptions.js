import { renderNonContentNotification } from "../NonContentNotification/NonContentNotification.js";
import { API } from "../../utils/api.js";
import { Router } from "../../components/Router/router.js";
import { renderUserItems } from "./SubscriptionsUserItem.js";

export function renderSubscriptionsPage() {
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
            defineUserItems();
        })
        .catch((error) => {
            console.error(error);
        })

}

function defineUserItems() {
    const router = new Router();
    const userItems = document.querySelectorAll('.subscriptions__items');

    userItems?.forEach((userItem) => {
        userItem.addEventListener('click', () => {
            const userID = userItem.getAttribute('class').split(' ')[1].split('-')[1];
            router.navigate(`/user/${userID}`);
        });
    });
}
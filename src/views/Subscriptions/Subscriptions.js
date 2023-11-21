import { renderNonContentNotification } from "../NonContentNotification/NonContentNotification.js";
import { API } from "../../utils/api.js";
import State from "../../components/State/state.js";
import { renderUserItems } from "./SubscriptionsUserItem.js";

export function renderSubscriptionsPage() {
    const state = new State();

    const main = document.querySelector('#main');
    const subscriptionsTemplate = Handlebars.templates['Subscriptions.hbs'];
    const subscriptionsContext = {
        nonContent: true,
    };

    API.getUserSubscriptions()
        .then((data) => {
            if (!data) {
                main.innerHTML = subscriptionsTemplate(subscriptionsContext);
                const nonContent = document.querySelector('.subscriptions-non-content');
                renderNonContentNotification(nonContent, 'Вы пока ни на кого не подписались', 'На главную', '/');
                
                return;
            }

            subscriptionsContext.nonContent = false;
            main.innerHTML = subscriptionsTemplate(subscriptionsContext);

            const section = document.querySelector('.subscriptions-gallery');
            renderUserItems(section, data);
        })
        .catch((error) => {
            console.error(error);
        })

}

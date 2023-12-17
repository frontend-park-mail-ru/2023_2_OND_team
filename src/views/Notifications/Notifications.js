import { Router } from "../../components/Router/router.js";

export class Notifications {
    #notificationMenu;
    #notificationCounter;

    constructor() {
        if (Notifications.instance) {
            return Notifications.instance
        }

        Notifications.instance = this;

        this.#notificationMenu = document.querySelector('.header__notifications__menu__items');
        this.#notificationCounter = 0;
    }

    renderNotification(type, payload) {
        const notification = {
            id: this.#notificationCounter++,
            handler: this.createHandler(type, payload),
        }

        const notificationTemplate = Handlebars.templates['NotificationTemplate.hbs'];

        switch (type) {
            case 'NEW_MESSAGE': 
                const notificationContext = {
                    id: notification.id,
                    content: 'Вам пришло сообщение',
                }

                this.#notificationMenu.insertAdjacentHTML('afterbegin', notificationTemplate(notificationContext));

                const notificationElement = document.querySelector(`[data-notification-id="${notification.id}"]`);

                const notificationElementText = notificationElement.querySelector('.header__notifications__menu_item-text');
                notificationElementText?.addEventListener('click', notification.handler);

                const notificationElementDelete = notificationElement.querySelector('.header__notifications__menu_item-btn');
                notificationElementDelete?.addEventListener('click', () => {
                    notificationElement.remove();
                });

                break;
            default:
                break;
        }
    
    }

    createHandler(type, payload) {
        switch (type) {
            case 'NEW_MESSAGE': 
                return function() {
                    const router = new Router();
                    router.navigate(`/messenger/${payload}`);
                }
            case 'NEW_COMMENT': 
                return function() {
                    const router = new Router();
                    router.navigate(`/pin/${payload}`);
                } 
            default:
                break;
        }
    }
}
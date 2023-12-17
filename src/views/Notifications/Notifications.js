import { Router } from "../../components/Router/router.js";

export class Notifications {
    #notificationMenu;
    #notificationCounter;
    #notifications;

    constructor() {
        if (Notifications.instance) {
            return Notifications.instance
        }

        Notifications.instance = this;

        this.#notificationMenu = document.querySelector('.header__notifications__menu__items');
        this.#notificationCounter = 0;
        this.#notifications = [];

        this.#defineClearBtn();
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

                this.#notifications.push(notification);

                const notificationElement = document.querySelector(`[data-notification-id="${notification.id}"]`);

                const notificationElementText = notificationElement.querySelector('.header__notifications__menu_item-text');
                notificationElementText?.addEventListener('click', () => {
                    notification.handler();
                    this.#notifications = this.#notifications.filter((item) => {return item !== notification})
                    notificationElement.remove();
                    this.checkNotificationCount();
                });

                const notificationElementDelete = notificationElement.querySelector('.header__notifications__menu_item-btn');
                notificationElementDelete?.addEventListener('click', () => {
                    this.#notifications = this.#notifications.filter((item) => {return item !== notification})
                    notificationElement.remove();
                    this.checkNotificationCount();
                });


                this.checkNotificationCount();

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

    checkNotificationCount() {
        const notificationsNonContent = document.querySelector('.header__notifications__menu-no_notifications-text');
        if (this.#notifications.length == 0) {
            notificationsNonContent.classList.remove('hide');
        } else {
            notificationsNonContent.classList.add('hide');
        }
    }

    #defineClearBtn() {
        const clearAllBtn = document.querySelector('.header__notifications__menu__footer-text');
        clearAllBtn?.addEventListener('click', () => {
            this.#notifications = [];
            const notifications = document.querySelectorAll('[data-notification-id]');
            notifications.forEach((notification) => notification.remove());
            this.checkNotificationCount();
        });
    }
}
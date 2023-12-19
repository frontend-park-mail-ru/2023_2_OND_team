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

    setNotificationMenu() {
        this.#notificationMenu = document.querySelector('.header__notifications__menu__items');
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

                if (document.hidden) {
                    this.createBrowserNotification(type, notificationContext.content, payload);
                }
                
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
        console.log(clearAllBtn)
        clearAllBtn?.addEventListener('click', () => {
            this.#notifications = [];
            const notifications = document.querySelectorAll('[data-notification-id]');
            notifications.forEach((notification) => notification.remove());
            this.checkNotificationCount();
        });
    }

    createBrowserNotification(type, content, payload) {
        if (!("Notification" in window)) {
            return;
        }
     
        let notification;

        switch (type) {
            case 'NEW_MESSAGE': 
                if (Notification.permission === "granted") {
                    notification = new Notification(content);
                } else if (Notification.permission !== "denied") {
                    Notification.requestPermission(function (permission) {
                        if (permission === "granted") {
                            notification = new Notification(content);
                        }
                    });
                }
        
                notification.onclick = function(event) {
                    event.preventDefault(); 
                    window.focus();
                    const router = new Router();
                    router.navigate(`/messenger/${payload}`);
                };

                break;
            case 'NEW_COMMENT': 
                break;
            default:
                break;
        }
    }       
}
import { API } from "../../utils/api";

export function renderUserPage(userID) {
    const main = document.querySelector('#main');

    API.getSomeUserInfo(userID)
        .then((data) => {
            const userPageTemplate = Handlebars.templates['UserPage.hbs'];
            const userPageContext = {
                id: data.id,
                username: data.username,
                avatar: data.avatar,
                name: data.name,
                surname: data.surname,
                about: data.about,
                subscribers: data.subscribers,
                subscribeText: data.is_subscribed ? 'Отписаться' : 'Подписаться',
            }

            main.innerHTML = userPageTemplate(userPageContext);
        })
        .catch((error) => {
            console.error(error);
        })
}
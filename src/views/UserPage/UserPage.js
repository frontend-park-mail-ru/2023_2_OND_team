import { API } from "../../utils/api.js";
import { definePins } from "../../utils/definePins/definePins.js";
import { defineBoards } from "../../utils/defingeBoards/defineBoards.js";

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
                isSubscribed: data.is_subscribed,
            }

            main.innerHTML = userPageTemplate(userPageContext);

            const subscribeBtn = document.querySelector('.user__subscribe-btn');
            const unsubscribeBtn = document.querySelector('.user__unsubscribe-btn');

            if (data.is_subscribed) {
                unsubscribeBtn.classList.remove('hide');
            } else {
                subscribeBtn.classList.remove('hide');
            }

            subscribeBtn?.addEventListener('click', () => {
                subscribeBtn.classList.add('hide');
                unsubscribeBtn.classList.remove('hide');

                // API.subscribeToUser(userID);
            });

            unsubscribeBtn?.addEventListener('click', () => {
                subscribeBtn.classList.remove('hide');
                unsubscribeBtn.classList.add('hide');

                // API.unsubscribeFromUser(userID);
            });

            const pinsBtn = document.querySelector('.user__pins-btn');
            pinsBtn?.addEventListener('click', () => {
                const activeElement = document.querySelector('.user__btn-active');
                if (activeElement === pinsBtn) {
                    return;
                }

                activeElement.classList.remove('user__btn-active');
                pinsBtn.classList.add('user__btn-active');
                
                renderUserPins(userID);
            })

            const boardsBtn = document.querySelector('.user__boards-btn');
            boardsBtn?.addEventListener('click', () => {
                const activeElement = document.querySelector('.user__btn-active');
                if (activeElement === boardsBtn) {
                    return;
                }

                activeElement.classList.remove('user__btn-active');
                boardsBtn.classList.add('user__btn-active');

                renderUserBoards(userID);
            })

            renderUserPins(userID);

        })
        .catch((error) => {
            console.error(error);
        })
}


function renderUserPins(userID) {
    API.getUserPins(userID)
        .then((data) => {
            // const nonContent = document.querySelector('.user-non-content');
            // if (!data.pins) {
            //     renderNonContentNotification(nonContent, 'У вас пока нет пинов', 'Создать пин', '/create/pin');
            //     return;
            // }

            // const sectionPins = document.querySelector('.user-pins-gallery');
            // const sectionBoards = document.querySelector('.user-boards-gallery');
            // sectionBoards.innerHTML = '';
            // nonContent.innerHTML = '';
            // renderPins(sectionPins, data.pins);
            // definePins();
        })
        .catch((error) => {
            console.error('Ошибка при рендеринге пинов:', error);
        });
}

function renderUserBoards(userID) {
    API.getUserBoards(userID)
        .then((data) => {
            // const nonContent = document.querySelector('.user-non-content');
            // if (!data.length) {
            //     renderNonContentNotification(nonContent, 'У вас пока нет досок', 'Создать доску', '/create/board');
            //     return;
            // }         

            // const sectionPins = document.querySelector('.user-pins-gallery');
            // const sectionBoards = document.querySelector('.user-boards-gallery');
            // sectionPins.innerHTML = '';
            // nonContent.innerHTML = '';
            // renderBoards(sectionBoards, data);
            // defineBoards();
        })
        .catch((error) => {
            console.error('Ошибка при рендеринге досок:', error);
        });
}

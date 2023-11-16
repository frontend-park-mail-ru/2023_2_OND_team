import State from "../../components/State/state.js";
import { API } from "../../utils/api.js";
import { Router } from "../../components/Router/router.js";
import { renderPins } from "../../components/RenderPins/renderPins.js";
import { renderBoards } from "../../components/RenderBoards/renderBoards.js";
import { renderNonContentNotification } from "../NonContentNotification/NonContentNotification.js";
import { definePins } from "../../utils/definePins/definePins.js";

export function renderProfilePage() {
    const main = document.querySelector('#main');

    const state = new State();
    const router = new Router();

    const profileTemplate = Handlebars.templates['ProfileUser.hbs'];
    const profileContext = {
        avatar: state.getAvatar(),
        username: state.getUsername(),
    };

    main.innerHTML = profileTemplate(profileContext);

    const pinsBtn = document.querySelector('.profile-user__pins-btn');
    pinsBtn?.addEventListener('click', () => {
        const activeElement = document.querySelector('.profile-user__btn-active');
        if (activeElement === pinsBtn) {
            return;
        }

        activeElement.classList.remove('profile-user__btn-active');
        pinsBtn.classList.add('profile-user__btn-active');
        
        renderUserPins();
    })

    const boardsBtn = document.querySelector('.profile-user__boards-btn');
    boardsBtn?.addEventListener('click', () => {
        const activeElement = document.querySelector('.profile-user__btn-active');
        if (activeElement === boardsBtn) {
            return;
        }

        activeElement.classList.remove('profile-user__btn-active');
        boardsBtn.classList.add('profile-user__btn-active');

        renderUserBoards();
    })

    renderUserPins();

    function renderUserPins() {
        API.getUserPins()
            .then((data) => {
                const nonContent = document.querySelector('.user-non-content');
                if (!data.pins) {
                    renderNonContentNotification(nonContent, 'У вас пока нет пинов', 'Создать пин', '/create/pin');
                    return;
                }

                const section = document.querySelector('.user-gallery');
                section.innerHTML = '';
                nonContent.innerHTML = '';
                renderPins(section, data.pins);
                definePins();
            })
            .catch((error) => {
                console.error('Ошибка при рендеринге пинов:', error);
            });
    }
    
    function renderUserBoards() {
        API.getUserBoards()
            .then((data) => {
                const nonContent = document.querySelector('.user-non-content');
                if (!data.length) {
                    renderNonContentNotification(nonContent, 'У вас пока нет досок', 'Создать доску', '/create/board');
                    return;
                }         

                const section = document.querySelector('.user-gallery');
                section.innerHTML = '';
                nonContent.innerHTML = '';
                renderBoards(section, data);
                defineBoards();
            })
            .catch((error) => {
                console.error('Ошибка при рендеринге досок:', error);
            });
    }

    function defineBoards() {
        const boards = document.querySelectorAll('.user__board');
    
        boards?.forEach((board) => {
            board.addEventListener('click', (e) => {

            const boardID = board.className.split(' ')[1].split('-')[3];
            router.navigate(`/board/${boardID}`);
          });
        });
    }
}

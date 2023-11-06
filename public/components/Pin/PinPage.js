import {API} from '../../utils/api.js';
import {renderAuthPage} from '../Authorization/AuthPage.js';
import {renderRegPage} from '../Registration/RegPage.js';
import {renderPins} from '../../utils/renderPins.js';
import { renderProfilePage } from '../Profile/Profile.js';
import {renderFeedPage} from '../Feed/Feed.js';

export function renderPinPage(pin) {
    document.body.style.overflow = 'visible';

    const pinsCard = Handlebars.templates['PinsCard.hbs'];
    const pinID = pin.getAttribute('class').replace('gallery__item js-pin-id-', '');

    const rootElement = document.getElementById('root');

    API.getPinInfo(pinID)
        .then((pinInfo) => {
            console.log('Информация о пине:', pinInfo);
            const context = {
                id: pinInfo.id,
                src: pinInfo.picture,
                username: pinInfo.author.username,
                description: pinInfo.description,
            };

            rootElement.innerHTML = pinsCard(context);
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
    });

    rootElement.innerHTML = pinsCard(context);
    const cancelButton = rootElement.querySelector('.cancel-button');

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        renderFeedPage();
    });
}

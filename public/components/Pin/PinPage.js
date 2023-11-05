import {API} from '../../utils/api.js';
import {renderAuthPage} from '../Authorization/AuthPage.js';
import {renderRegPage} from '../Registration/RegPage.js';
import {renderPins} from '../../utils/renderPins.js';
import { renderProfilePage } from '../Profile/Profile.js';
import {renderFeedPage} from '../Feed/Feed.js';

export function renderPinPage(pin) {
    const rootElement = document.getElementById('root');

    document.body.style.overflow = 'visible';

    const pinsCard = Handlebars.templates['PinsCard.hbs'];
    const pinID = pin.getAttribute('class').replace('gallery__item js-pin-id-', '');
    API.getPinInfo(pinID)
        .then((pinInfo) => {
            const context = {
                id: pinInfo.id,
                src: pinInfo.picture,
                username: pinInfo.username,
                discription: pinInfo.discription,
            };

            const html = pinsCard(context);

            rootElement.innerHTML = html;
        })
        .catch((error) => {
            console.error('Ошибка при получении информации о пине:', error);
    });
}

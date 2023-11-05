import {API} from '../../utils/api.js';
import {renderAuthPage} from '../Authorization/AuthPage.js';
import {renderRegPage} from '../Registration/RegPage.js';
import {renderPins} from '../../utils/renderPins.js';
import { renderProfilePage } from '../Profile/Profile.js';
import {renderFeedPage} from '../Feed/Feed.js';
import { renderAuthPage } from '../Authorization/AuthPage.js';

export function renderPinPage() {
    const pinID = pin.getAttribute('class').replace('gallery__item js-pin-id-', '');
    API.getPinInfo(pinID)
        .then((pinInfo) => {
        console.log('Информация о пине:', pinInfo);
    })
    .catch((error) => {
        console.error('Ошибка при получении информации о пине:', error);
    });
}

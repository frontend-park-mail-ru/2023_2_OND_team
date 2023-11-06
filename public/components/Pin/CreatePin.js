import {API} from '../../utils/api.js';
import {renderAuthPage} from '../Authorization/AuthPage.js';
import {renderRegPage} from '../Registration/RegPage.js';
import {renderPins} from '../../utils/renderPins.js';
import { renderProfilePage } from '../Profile/Profile.js';
import {renderFeedPage} from '../Feed/Feed.js';

export function renderCreatePin() {
    document.body.style.overflow = 'visible';
    const createPins = Handlebars.templates['CreatePins.hbs'];
    const rootElement = document.getElementById('root');

    const context = {};
    rootElement.innerHTML = createPins(context);

    const cancelButton = rootElement.querySelector('.pin-cancel-button');

    cancelButton.addEventListener('click', function (e) {
        e.preventDefault();
        renderFeedPage();
    });
}

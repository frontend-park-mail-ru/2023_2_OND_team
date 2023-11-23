import {API} from '../../utils/api.js';
import {definePins} from '../../utils/definePins/definePins.js';
import {renderPins} from '../../components/RenderPins/renderPins.js';
import {renderNonContentNotification} from '../NonContentNotification/NonContentNotification.js';

export function renderFavouritePage() {
  const main = document.querySelector('#main');

  const favouriteTemplate = Handlebars.templates['Favourite.hbs'];
  const favouriteContext = {};

  main.innerHTML = favouriteTemplate(favouriteContext);

  API.getLikedPins()
      .then((data) => {
        const section = document.getElementById('favourite-pins');
        if (data.pins) {
          renderPins(section, data.pins);
          definePins();
          return;
        }
        const nonContent = document.querySelector('.favourite-non-content');
        renderNonContentNotification(nonContent, 'У вас пока нет понравившихся пинов', 'Оценить пины', '/');
      })
      .catch((error) => {
        console.error('Ошибка при рендеринге пинов:', error);
      });
}

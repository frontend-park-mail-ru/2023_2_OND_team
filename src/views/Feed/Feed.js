import { API } from '../../utils/Api/api.js';
import { State } from '../../components/State/state.js'
import { renderPins } from '../../components/RenderPins/renderPins.js';
import { definePins } from '../../utils/definePins/definePins.js';

/**
* Рендерит главную страницу с пинами.
*/
export function renderFeedPage() {
  const state = new State();
  const main = document.querySelector('#main');

  const numRequestedPins = 20;
  let pinMaxID = -Infinity;
  let pinMinID = Infinity;

  const feedTemplate = Handlebars.templates['Feed.hbs'];
  const introTemplate = Handlebars.templates['Intro.hbs'];
  const feedContext = {
    isAuthorized: !state.getIsAuthorized(),
    Intro: introTemplate,
  };

  main.innerHTML = feedTemplate(feedContext);

  /**
    * Создает функцию с задержкой для предотвращения слишком частых вызовов.
    */
  function debounce(f, ms) {
    let isCooldown = false;

    return function() {
      if (isCooldown) return;

      f.apply(this, arguments);
      isCooldown = true;

      setTimeout(() => isCooldown = false, ms);
    };
  }

  /**
    * Обработчик скролла страницы.
    * Загружает дополнительные пины при достижении нижней части страницы.
    */
  function handleScroll() {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (scrollY + windowHeight >= documentHeight - 1000) {
      API.generatePins(numRequestedPins, pinMaxID, pinMinID)
          .then((data) => {
            if (data.maxID === pinMaxID && data.minID === pinMinID) {
              window.removeEventListener('scroll', window.scrollFunc);
              return;
            }

            pinMaxID = Math.max(pinMaxID, data.maxID);
            pinMinID = Math.min(pinMinID, data.minID);

            const section = document.getElementById('pins');
            renderPins(section, data.pins);
            definePins();

            const pins = document.querySelectorAll('.gallery__item');
            if (pins?.length > 100) {
              const pinsToDelete = Array.from(pins).slice(0, 20);
              state.removePins(20);
              pinsToDelete.forEach((pin) => {
                pin.remove();
              });
            }
          })
          .catch((error) => {
            console.error('Ошибка при рендеринге пинов:', error);
          });
    }
  }

  const scrollFunc = debounce(handleScroll, 250);
  window.scrollFunc = scrollFunc;
  scrollFunc();
  window.removeEventListener('scroll', window.scrollFunc);
  window.addEventListener('scroll', window.scrollFunc);
}

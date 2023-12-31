import {API} from '../../utils/api';
import {renderPins} from '../RenderPins/renderPins';

/**
* Обработчик скролла страницы.
* Загружает дополнительные пины при достижении нижней части страницы.
*/
export function handleScroll() {
  const Api = new API();

  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;

  if (scrollY + windowHeight >= documentHeight - 400) {
    Api.generatePins()
        .then((images) => {
          const section = document.getElementById('pins');
          renderPins(section, images);
        })
        .catch((error) => {
          console.error('Ошибка при рендеринге пинов:', error);
        });
  }
}

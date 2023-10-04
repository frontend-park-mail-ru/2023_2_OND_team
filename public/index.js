/**
 * Отображает основную страницу.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении основной страницы.
 */
import { renderFeedPage } from './components/Feed/Feed.js';

function initializeApp() {
  const rootElement = document.getElementById('root');
  renderFeedPage(rootElement);
}

initializeApp()

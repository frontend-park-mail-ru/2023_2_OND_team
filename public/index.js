/**
 * Отображает основную страницу.
 *
 * @function
 * @param {HTMLElement} headerElement - Элемент заголовка страницы.
 * @param {HTMLElement} pageElement - Элемент основной части страницы.
 * @throws {Error} Если произошла ошибка при отображении основной страницы.
 */
import { renderFeedPage } from './components/Feed/Feed.js';

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const pageElement = document.createElement('main');
rootElement.appendChild(headerElement);
rootElement.appendChild(pageElement);

renderFeedPage(headerElement, pageElement);

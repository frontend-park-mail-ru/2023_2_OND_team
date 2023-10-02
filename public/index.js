
import { renderFeedPage } from './components/Feed/Feed.js';

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const pageElement = document.createElement('main');
rootElement.appendChild(headerElement);
rootElement.appendChild(pageElement);

renderFeedPage(headerElement, pageElement);

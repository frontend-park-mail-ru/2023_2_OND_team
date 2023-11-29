import {renderNonContentNotification} from '../NonContentNotification/NonContentNotification.js';

export function renderMessengerPage() {
  const main = document.querySelector('#main');

  const messengerTemplate = Handlebars.templates['Messenger.hbs'];
  const messengerContext = {};

  main.innerHTML = messengerTemplate(messengerContext);

  const nonContent = document.querySelector('.messenger-non-content');
  renderNonContentNotification(nonContent, 'У вас пока нет чатов', 'На главную', '/');
}

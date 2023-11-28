import {renderNonContentNotification} from '../NonContentNotification/NonContentNotification.js';
import { MessengerApi } from '../../utils/Api/messenger/messengerApi.js';
import { defineChatWithUser } from './chat/chatProcessing.js';
import { MessengerChatsMenu } from './chatsMenu/ChatsMenu.js';


export function renderMessengerPage() {
  const messengerApi = new MessengerApi();

  const rootElement = document.querySelector('#root');
  rootElement.style.overflow = 'hidden';

  const main = document.querySelector('#main');

  const messengerTemplate = Handlebars.templates['Messenger.hbs'];
  const messengerContext = {};

  main.innerHTML = messengerTemplate(messengerContext);


  messengerApi.getUserChats()
    .then((res) => {
      if (res.status === 'ok') {
        const messengerChatsMenu = new MessengerChatsMenu();
        messengerChatsMenu.renderChatsMenu(res.body.chats);
      }
    })


  // const nonContent = document.querySelector('.messenger-non-content');
  // renderNonContentNotification(nonContent, 'У вас пока нет чатов', 'На главную', '/');

  // defineChatsMenu();
  // defineChatWithUser();

  // function renderChatWithUser() {
    
  // }
}

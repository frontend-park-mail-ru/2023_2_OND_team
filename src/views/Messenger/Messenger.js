import {renderNonContentNotification} from '../NonContentNotification/NonContentNotification.js';
import { MessengerApi } from '../../utils/Api/messenger/messengerApi.js';
import { MessengerChat } from './chat/Chat.js';
import { MessengerChatsMenu } from './chatsMenu/ChatsMenu.js';
import State from '../../components/State/state.js';
import { WebSocketConnection } from '../../utils/Api/messenger/messengerWS.js';

export function renderMessengerPage() {
  const state = new State();
  const messengerApi = new MessengerApi();

  const rootElement = document.querySelector('#root');
  rootElement.style.overflow = 'hidden';

  const main = document.querySelector('#main');

  const messengerTemplate = Handlebars.templates['Messenger.hbs'];
  const messengerContext = {};

  main.innerHTML = messengerTemplate(messengerContext);

  const WS = new WebSocketConnection(`wss://pinspire.online:8080/websocket/connect/chat?${state.getUserID()}`);

  messengerApi.getUserChats()
    .then((res) => {
      if (res.status === 'ok') {
        if (!res.body) {
          const nonContent = document.querySelector('.messenger-non-content');
          nonContent.classList.remove('hide');
          renderNonContentNotification(nonContent, 'У вас пока нет чатов', 'На главную', '/');
          return;
        } 

        const chatsMenuDiv = document.querySelector('.messenger');
        chatsMenuDiv.classList.remove('hide');

        const messengerChatsMenu = new MessengerChatsMenu();
        messengerChatsMenu.defineMessengerChatsMenu(res.body.chats);
      }
    })

}

import {renderNonContentNotification} from '../NonContentNotification/NonContentNotification.js';
import { MessengerApi } from '../../utils/Api/messenger/messengerApi.js';
import { MessengerChatsMenu } from './chatsMenu/ChatsMenu.js';
import { API } from '../../utils/Api/api.js';

export function renderMessengerPage() {
  const messengerApi = new MessengerApi();

  const main = document.querySelector('#main');

  const messengerTemplate = Handlebars.templates['Messenger.hbs'];
  const messengerContext = {};

  main.innerHTML = messengerTemplate(messengerContext);


  messengerApi.getUserChats()
    .then((res) => {
      if (res.status === 'ok') {
        if (!res?.body?.chats) {
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


export function renderChatPage(userID) {
  const messengerApi = new MessengerApi();

  const main = document.querySelector('#main');

  const messengerTemplate = Handlebars.templates['Messenger.hbs'];
  const messengerContext = {};

  main.innerHTML = messengerTemplate(messengerContext);

  messengerApi.getUserChats()
    .then((res) => {
      if (res.status === 'ok') {
        const userChats = res?.body?.chats;

        const chatsMenuDiv = document.querySelector('.messenger');
        chatsMenuDiv.classList.remove('hide');

        const messengerChatsMenu = new MessengerChatsMenu();
        messengerChatsMenu.defineMessengerChatsMenu(userChats);

        let isOpen = false;

        userChats?.forEach((chat) => {  // case user has chats
          if (chat?.user?.id == userID) {
            messengerChatsMenu.openChatWithUser(userID);
            isOpen = true;
          }
        });


        if (isOpen) {
          return;
        }

        API.getSomeUserInfo(userID)  // case no chats
          .then((data) => {
            messengerChatsMenu.renderChatMenuWithUser(data);
            messengerChatsMenu.openChatWithUser(userID);
          });
      }
    })
}

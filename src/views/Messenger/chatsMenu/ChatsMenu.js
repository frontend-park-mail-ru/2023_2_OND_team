import { MessengerApi } from "../../../utils/Api/messenger/messengerApi.js";
import { MessengerChat } from "../chat/Chat.js";
import { WebSocketConnection } from "../../../utils/Api/messenger/messengerWS.js";
import State from "../../../components/State/state.js";
import { Router } from "../../../components/Router/router.js";
import { Notifications } from "../../Notifications/Notifications.js";

export class MessengerChatsMenu {
  #ws;
  #state;
  #router;
  #notifications;
  #messengerChat;
  #messengerApi;
  #definedChats;
  #chatsMenuList;
  #searchField;
  #chatsMenuItems;
  #activeChatMenu;
  activeChatId;

  constructor() {
    // if (MessengerChatsMenu.instance) {
    //   return MessengerChatsMenu.instance;
    // }

    // MessengerChatsMenu.instance = this;

    this.#state = new State();
    this.#router = new Router();
    this.#notifications = new Notifications();
    this.#messengerChat = new MessengerChat();
    this.#ws = new WebSocketConnection(`wss://${this.#state.getDomain()}:8080/websocket/connect/chat?${this.#state.getUserID()}`);
    this.#messengerApi = new MessengerApi();
    this.#definedChats = [];
    this.#chatsMenuList = document.querySelector('.messenger__chat-menu__chat-list');
    this.#searchField = document.querySelector('.messenger__search__text-input');
    this.#chatsMenuItems = document.querySelectorAll('.messenger__chat-menu__chat-item');
    this.#activeChatMenu = document.querySelector('.messenger__chat-menu__chat-item-active');
    this.activeChatId = null;

    this.defineChatsMenuItems();
  }

  defineMessengerChatsMenu(chats) {
    this.renderChatsMenu(chats);
    this.#defineSearchField();

    this.#ws.setOnMessageMethod((event) => {
      const jsonObject = JSON.parse(event.data);

      if (jsonObject?.type === 'response') {  //getting response from server
          if (jsonObject?.status === 'ok' && jsonObject.message === 'publish success') {
            switch (jsonObject.body.eventType) {
              case 'create':
                this.#messengerChat.defineSendedMessage(jsonObject.requestID, jsonObject.body.id);
                break;
              case 'update':
                this.#messengerChat.setMessageUpdated(jsonObject.requestID);
                break;
              case 'delete':
                this.#messengerChat.setMessageDeleted(jsonObject.requestID);
                break;
              default:
                break;
            }
          } else {
              console.log(jsonObject);
          }
        } else if (jsonObject?.type === 'event') {  // getting message
          if (jsonObject.message.message?.from == this.activeChatId) {  // message from opened chat
              if (jsonObject.message.eventType === 'create') {
                this.#messengerChat.renderCompanionMessage(jsonObject.message.message.ID, jsonObject.message.message.content);
              } else if (jsonObject.message.eventType === 'update') {
                this.#messengerChat.updateCompanionMessage(jsonObject?.message?.message?.ID, jsonObject?.message?.message?.content);
              } else if (jsonObject.message.eventType === 'delete') {                
                this.#messengerChat.deleteCompanionMessage(jsonObject?.message?.message?.ID);
              } else {
                  console.log(jsonObject);
              }
          } else {  // message from other chat
              if (jsonObject.message.eventType === 'create') {
                  this.#notifications.renderNotification('NEW_MESSAGE', jsonObject?.message?.message?.from)
                  // raiseUpChatMenuItem(jsonObject.message.message.from)  поднять чат в списке чатов вверх
                  // this.renderCompanionMessage(jsonObject.message.message.ID, jsonObject.message.message.content);
                  // this.scrollToBottom();
              } else {
                  console.log(jsonObject);
              }
          }
      }

  })
  }

  renderChatsMenu(chats) {
    const chatTemplate = Handlebars.templates['chatsMenuItem.hbs'];

    chats?.forEach((chat) => {
      const chatContext = {
        id: chat.user.id,
        username: chat.user.username,
        avatar: chat.user.avatar,
      }
  
      this.#chatsMenuList.insertAdjacentHTML('beforeend', chatTemplate(chatContext));
    });

    this.#chatsMenuItems = document.querySelectorAll('.messenger__chat-menu__chat-item');

    this.defineChatsMenuItems();
  }

  renderChatMenuWithUser(user) {
    const chatTemplate = Handlebars.templates['chatsMenuItem.hbs'];

    const chatContext = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    }

    this.#chatsMenuList.insertAdjacentHTML('beforeend', chatTemplate(chatContext));
    
    this.#chatsMenuItems = document.querySelectorAll('.messenger__chat-menu__chat-item');

    this.defineChatsMenuItems();
  }
  
  defineChatsMenuItems() {  
    this.#chatsMenuItems?.forEach((chatMenu) => {
      this.#definedChats.push(chatMenu);
   
      const chatMenuUserAvatar = chatMenu.querySelector('.messenger__chat-menu__chat-avatar');
   
      const userID = chatMenuUserAvatar.getAttribute('data-section').split('-')[3];
      
      chatMenuUserAvatar?.addEventListener('click', () => {
        this.#router.navigate(`/user/${userID}`);
      })
   
      chatMenu.addEventListener('click', (e) => {
        if (e.target === chatMenuUserAvatar) {
          return;
        }

        this.#router.navigate(`/messenger/${userID}`);
      });
    });
  }

  openChatWithUser(userID) {
    const chatDiv = document.querySelector('.messenger__chat');
    const chatNoContentDiv = document.querySelector('.messenger__chat-non-content');
    const nestedChatMenu = document.querySelector(`[data-section*="messenger__chat-menu__chat-${userID}"]`);

    this.#activeChatMenu?.classList.remove('messenger__chat-menu__chat-item-active');
    
    nestedChatMenu.classList.add('messenger__chat-menu__chat-item-active');

    this.#activeChatMenu = nestedChatMenu;
    this.activeChatId = userID;

    this.#messengerApi.getChatWithUser(this.activeChatId)
      .then((res) => {
        this.#messengerChat.setChatWithUserID(this.activeChatId);
        if(res.status === "ok") {
          chatNoContentDiv.classList.add('hide');
          chatDiv.classList.remove('hide');
          this.#messengerChat.defineChat(res.body);
        }
      })
  }

  #defineSearchField() {
    this.#searchField.addEventListener('input', () => {
      this.#searchChatMenu();
    });
  }
  
  #searchChatMenu() {
    this.#definedChats?.forEach((chatMenu) => {
      chatMenu.classList.remove('hide');
      const name = chatMenu.getAttribute('data-section').split(' ')[1].split('-')[2];

      if (this.#searchField.value && !name.toLocaleLowerCase().includes(this.#searchField.value.toLocaleLowerCase())) {
        chatMenu.classList.add('hide');
      }
    });
  }
}

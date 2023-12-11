import { MessengerApi } from "../../../utils/Api/messenger/messengerApi.js";
import { MessengerChat } from "../chat/Chat.js";
import { Router } from "../../../components/Router/router.js";

export class MessengerChatsMenu {
  #router;
  #messengerChat;
  #messengerApi;
  #definedChats;
  #chatsMenuList;
  #searchField;
  #chatsMenuItems;
  #activeChatMenu;
  #activeChatId;

  constructor() {
    this.#router = new Router();
    this.#messengerChat = new MessengerChat();
    this.#messengerApi = new MessengerApi();
    this.#definedChats = [];
    this.#chatsMenuList = document.querySelector('.messenger__chat-menu__chat-list');
    this.#searchField = document.querySelector('.messenger__search__text-input');
    this.#chatsMenuItems = null;
    this.#activeChatMenu = null;
    this.#activeChatId = null;
  }

  defineMessengerChatsMenu(chats) {
    this.renderChatsMenu(chats);
    // this.defineChatsMenuItems();
    this.defineSearchField();
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
    const chatDiv = document.querySelector('.messenger__chat');
    const chatNoContentDiv = document.querySelector('.messenger__chat-non-content');

    this.#chatsMenuItems?.forEach((chatMenu) => {
      this.#definedChats.push(chatMenu);

      const chatMenuUserAvatar = chatMenu.querySelector('.messenger__chat-menu__chat-avatar');
      chatMenuUserAvatar?.addEventListener('click', () => {
        const userID = chatMenuUserAvatar.getAttribute('data-section').split('-')[3];
        this.#router.navigate(`/user/${userID}`);
      })
   
      chatMenu.addEventListener('click', (e) => {
        if (e.target === chatMenuUserAvatar) {
          return;
        }

        if (this.#activeChatMenu) {
          this.#activeChatMenu.classList.remove('messenger__chat-menu__chat-item-active');
        }
        
        chatMenu.classList.add('messenger__chat-menu__chat-item-active');
        this.#activeChatMenu = chatMenu;

        this.#activeChatId = chatMenu.getAttribute('data-section').split(' ')[0].split('-')[2];
        this.#messengerApi.getChatWithUser(this.#activeChatId)
          .then((res) => {
            this.#messengerChat.setChatWithUserID(this.#activeChatId);
            if(res.status === "ok") {
              chatNoContentDiv.classList.add('hide');
              chatDiv.classList.remove('hide');
              this.#messengerChat.defineChat(res.body);
            }
          })
      });
    });
  }

  openChatWithUser(userID) {
    const chatDiv = document.querySelector('.messenger__chat');
    const chatNoContentDiv = document.querySelector('.messenger__chat-non-content');
    const nestedChatMenu = document.querySelector(`[data-section*="messenger__chat-menu__chat-${userID}"]`)
    
    nestedChatMenu.classList.add('messenger__chat-menu__chat-item-active');

    this.#activeChatMenu = nestedChatMenu;
    this.#activeChatId = userID;

    this.#messengerApi.getChatWithUser(this.#activeChatId)
      .then((res) => {
        this.#messengerChat.setChatWithUserID(this.#activeChatId);
        if(res.status === "ok") {
          chatNoContentDiv.classList.add('hide');
          chatDiv.classList.remove('hide');
          this.#messengerChat.defineChat(res.body);
        }
      })
  }

  defineSearchField() {
    this.#searchField.addEventListener('input', () => {
      this.searchChatMenu();
    });
  }
  
  searchChatMenu() {
    this.#definedChats?.forEach((chatMenu) => {
      chatMenu.classList.remove('hide');
      const name = chatMenu.getAttribute('data-section').split(' ')[1].split('-')[2];

      if (this.#searchField.value && !name.toLocaleLowerCase().includes(this.#searchField.value.toLocaleLowerCase())) {
        chatMenu.classList.add('hide');
      }
    });
  }
}

import { MessengerApi } from "../../../utils/Api/messenger/messengerApi.js";
import { MessengerChat } from "../chat/Chat.js";

export class MessengerChatsMenu {
  #messengerChat;
  #messengerApi;
  #definedChats;
  #chatsMenuList;
  #searchField;
  #chatsMenuItems;
  #activeChatMenu;
  #activeChatId;

  constructor() {
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
    this.defineChatsMenuItems();
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
  }
  
  defineChatsMenuItems() {   
    this.#chatsMenuItems?.forEach((chatMenu) => {
      this.#definedChats.push(chatMenu);
   
      chatMenu.addEventListener('click', () => {
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
              this.#messengerChat.defineChat(res.body);
            }
          })
      });
    });
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

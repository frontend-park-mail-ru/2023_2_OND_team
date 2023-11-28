export class MessengerChatsMenu {
  #definedChats;
  #chatsMenuList;
  #searchField;
  #chatsMenuItems;
  #activeChatMenu;

  constructor() {
    this.#definedChats = [];
    this.#chatsMenuList = document.querySelector('.messenger__chat-menu__chat-list');
    this.#searchField = document.querySelector('.messenger__search__text-input');
    this.#chatsMenuItems = document.querySelectorAll('.messenger__chat-menu__chat-item');
    this.#activeChatMenu = null;
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
        username: chat.user.username,
        avatar: chat.user.avatar,
      }
  
      this.#chatsMenuList.insertAdjacentHTML('beforeend', chatTemplate(chatContext));
    });
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
      const name = chatMenu.getAttribute('data-section').split('-')[2];

      if (this.#searchField.value && !name.toLocaleLowerCase().includes(this.#searchField.value.toLocaleLowerCase())) {
        chatMenu.classList.add('hide');
      }
    });
  }
}

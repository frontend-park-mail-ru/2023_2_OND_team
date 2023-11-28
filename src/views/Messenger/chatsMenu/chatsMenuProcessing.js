// export function renderChatMenu() {
    
// }


export function defineChatsMenu() {
  const definedChats = [];
  const searchField = document.querySelector('.messenger__search__text-input');
  
  const chatsMenu = document.querySelectorAll('.messenger__chat-menu__chat-item');
  
  chatsMenu?.forEach((chatMenu) => {
    if (definedChats.includes(chatMenu)) {
      return;
    }

    definedChats.push(chatMenu);

    chatMenu.addEventListener('click', () => {
      const activeChatMenu = document.querySelector('.messenger__chat-menu__chat-item-active');
      activeChatMenu.classList.remove('messenger__chat-menu__chat-item-active');
      
      chatMenu.classList.add('messenger__chat-menu__chat-item-active');
    });
  });

  searchField.addEventListener('input', () => {
    searchChatMenu(definedChats, searchField.value);
  });
}

function searchChatMenu(definedChats, substring) {
  definedChats?.forEach((chatMenu) => {
    chatMenu.classList.remove('hide');
    const name = chatMenu.getAttribute('data-section').split('-')[2];
    if (substring && !name.toLocaleLowerCase().includes(substring.toLocaleLowerCase())) {
      chatMenu.classList.add('hide');
    }
  });
}

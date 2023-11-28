// export function renderChat() {

// }

// export function defineChat() {

// }

// export function renderMessage() {

// }

// export function editMessage() {

// }

// export function deleteMessage() {

// }



const CHAT = document.querySelector('.messenger__chat__messages');
const SEND_MESSAGE_BTN = document.querySelector('.messenger__chat__footer__send_message-img');
const MESSAGE_FIELD_INPUT = document.querySelector('.messenger__chat__footer__text-input');
const DEFINED_MESSAGES = [];

export function defineChatWithUser() {
    CHAT.scrollTop = CHAT.scrollHeight;

    const myMessages = document.querySelectorAll('.messenger__chat__message-item-my');

    myMessages?.forEach((message) => {
        if (DEFINED_MESSAGES.includes(message)) {
            return;
        }

        DEFINED_MESSAGES.push(message);

        const messageButtons = message.querySelector('.messenger__chat__message-item__buttons');

        message.addEventListener('click', () => {
            messageButtons.classList.toggle('hide');
        });

        const editMessageButton = message.querySelector('.messenger__chat__message-item__button-edit');
        const deleteMessageButton = message.querySelector('.messenger__chat__message-item__button-delete');

        editMessageButton.addEventListener('click', () => editMessage());
        deleteMessageButton.addEventListener('click', ()=> deleteMessage());
    });


    SEND_MESSAGE_BTN?.addEventListener('click', () => {
        const messageToSend = MESSAGE_FIELD_INPUT.value;
        if (messageToSend) {
            sendMessage(messageToSend);
            MESSAGE_FIELD_INPUT.value = '';
        }
    })
}


function editMessage() {
    console.log('edit')
}   

function deleteMessage() {
    console.log('delete')
}


function sendMessage(messageToSend) {
    const messageToSendDiv = document.createElement('div');
    messageToSendDiv.classList.add('messenger__chat__message-item-my');
    
    const messageToSendTextDiv = document.createElement('div');
    messageToSendTextDiv.classList.add('messenger__chat__message-item-my-text');
    
    const messageToSendTextSpan = document.createElement('span');
    messageToSendTextSpan.classList.add('messenger__chat__message-item__text');
    messageToSendTextSpan.classList.add('text-base2-medium');
    messageToSendTextSpan.innerHTML = messageToSend;
    
    messageToSendTextDiv.appendChild(messageToSendTextSpan);
    
    
    const messageToSendBtnsDiv = document.createElement('div');
    messageToSendBtnsDiv.classList.add('messenger__chat__message-item-my-buttons');
    
    const messageToSendBtnsField = document.createElement('div');
    messageToSendBtnsField.classList.add('messenger__chat__message-item__buttons');
    messageToSendBtnsField.classList.add('hide');
    
    const messageToSendEditBtn = document.createElement('img');
    messageToSendEditBtn.src = 'https://pinspire.online:8081/assets/icons/forMessenger/icon_edit_message.svg';
    messageToSendEditBtn.classList.add('messenger__chat__message-item__button-edit');
    
    const messageToSendDeleteBtn = document.createElement('img');
    messageToSendDeleteBtn.src = 'https://pinspire.online:8081/assets/icons/forMessenger/icon_delete_message.svg';
    messageToSendDeleteBtn.classList.add('messenger__chat__message-item__button-delete');
    
    messageToSendBtnsField.appendChild(messageToSendEditBtn);
    messageToSendBtnsField.appendChild(messageToSendDeleteBtn);
    
    messageToSendBtnsDiv.appendChild(messageToSendBtnsField);
    
    messageToSendDiv.appendChild(messageToSendTextDiv);
    messageToSendDiv.appendChild(messageToSendBtnsDiv);
    
    CHAT.insertAdjacentHTML('beforeend', messageToSendDiv.outerHTML);
    
    defineChatWithUser();
}
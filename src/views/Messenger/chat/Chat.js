export class MessengerChat {
    #definedMessages;
    #chat;
    #sendMessageBtn;
    #messageFieldInput;

    constructor() {
        this.#definedMessages = null;
        this.#chat = document.querySelector('.messenger__chat__messages');
        this.#sendMessageBtn = document.querySelector('.messenger__chat__footer__send_message-img');
        this.#messageFieldInput = document.querySelector('.messenger__chat__footer__text-input');
    }

    scrollToBottom() {
        this.#chat.scrollTop = this.#chat.scrollHeight;
    }

    defineChat() {
        defineMyMessages();
        defineSendMessageBtn();
        this.scrollToBottom();
    }

    defineMyMessages() {
        const myMessages = document.querySelectorAll('.messenger__chat__message-item-my');
    
        myMessages?.forEach((message) => {    
            this.#definedMessages.push(message);
    
            const messageButtons = message.querySelector('.messenger__chat__message-item__buttons');
    
            message.addEventListener('click', () => {
                messageButtons.classList.toggle('hide');
            });
    
            const editMessageButton = message.querySelector('.messenger__chat__message-item__button-edit');
            const deleteMessageButton = message.querySelector('.messenger__chat__message-item__button-delete');
    
            editMessageButton.addEventListener('click', () => editMessage());
            deleteMessageButton.addEventListener('click', ()=> deleteMessage());
        });
    }

    editMessage() {
        console.log('edit');
    }

    deleteMessage() {
        console.log('delete');
    }

    defineSendMessageBtn() {
        this.#sendMessageBtn?.addEventListener('click', () => {
            const messageToSend = this.#messageFieldInput.value;
            if (messageToSend) {
                sendMessage(messageToSend);
                this.#messageFieldInput.value = '';
            }
        })
    }

    sendMessage(messageToSend) {
        const myMessageItemTemplate = Handlebars.templates['myMessageItem.hbs'];
        const myMessageItemContext = { message: messageToSend, };

        this.#chat.insertAdjacentHTML('beforeend', myMessageItemTemplate(myMessageItemContext));
        this.defineSendedMessage();
    }

    defineSendedMessage() {
        const sendedMessage = document.querySelector('[data-section="waiting-server-responce"]');
        this.#definedMessages.push(sendedMessage);

        const messageIndicator = sendedMessage.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = 'https://pinspire.online:8081/assets/icons/forMessenger/icon_delete_message.svg';

        this.scrollToBottom();
    }

}


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


export function defineChatWithUser() {
    
}


function editMessage() {
    console.log('edit')
}   

function deleteMessage() {
    console.log('delete')
}


function sendMessage(chat, messageToSend) {
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
    
    chat.insertAdjacentHTML('beforeend', messageToSendDiv.outerHTML);
    
    // defineChatWithUser();
}
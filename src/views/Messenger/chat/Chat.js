export class MessengerChat {
    #definedMessages;
    #chat;
    #sendMessageBtn;
    #messageFieldInput;

    constructor() {
        this.#definedMessages = [];
        this.#chat = document.querySelector('.messenger__chat__messages');
        this.#sendMessageBtn = document.querySelector('.messenger__chat__footer__send_message-img');
        this.#messageFieldInput = document.querySelector('.messenger__chat__footer__text-input');
    }

    scrollToBottom() {
        this.#chat.scrollTop = this.#chat.scrollHeight;
    }

    defineChat() {
        this.defineMyMessages();
        this.defineSendMessageBtn();
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
    
            editMessageButton.addEventListener('click', () => this.editMessage());
            deleteMessageButton.addEventListener('click', ()=> this.deleteMessage());
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
                this.sendMessage(messageToSend);
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

        const messageButtons = sendedMessage.querySelector('.messenger__chat__message-item__buttons');
    
        sendedMessage.addEventListener('click', () => {
            messageButtons.classList.toggle('hide');
        });

        const editMessageButton = sendedMessage.querySelector('.messenger__chat__message-item__button-edit');
        const deleteMessageButton = sendedMessage.querySelector('.messenger__chat__message-item__button-delete');

        editMessageButton.addEventListener('click', () => this.editMessage());
        deleteMessageButton.addEventListener('click', ()=> this.deleteMessage());

        const messageIndicator = sendedMessage.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = 'https://pinspire.online:8081/assets/icons/forMessenger/icon_delete_message.svg';

        this.scrollToBottom();
    }

}

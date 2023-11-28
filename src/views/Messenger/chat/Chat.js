import { MessengerApi } from "../../../utils/Api/messenger/messengerApi.js";

export class MessengerChat {
    #requestID;
    #messegerApi;
    #chatWithUserId;
    #definedMessages;
    #chat;
    #sendMessageBtn;
    #messageFieldInput;

    constructor(chatWithUserId) {
        if (MessengerChat.instance) {
            this.#redefineChat(chatWithUserId);
            return MessengerChat.instance;
        }

        MessengerChat.instance = this;

        this.#requestID = -1;
        this.#messegerApi = new MessengerApi();
        this.#chatWithUserId = chatWithUserId;
        this.#definedMessages = [];
        this.#chat = document.querySelector('.messenger__chat__messages');
        this.#sendMessageBtn = document.querySelector('.messenger__chat__footer__send_message-img');
        this.#messageFieldInput = document.querySelector('.messenger__chat__footer__text-input');
    }

    #redefineChat(chatWithUserId) {
        this.#requestID = -1;
        this.#messegerApi = new MessengerApi();
        this.#chatWithUserId = chatWithUserId;
        this.#definedMessages = [];
        this.#chat = document.querySelector('.messenger__chat__messages');
        this.#sendMessageBtn = document.querySelector('.messenger__chat__footer__send_message-img');
        this.#messageFieldInput = document.querySelector('.messenger__chat__footer__text-input');

        this.#chat.innerHTML = '';
        this.#messageFieldInput.innerHTML = '';
    }

    scrollToBottom() {
        this.#chat.scrollTop = this.#chat.scrollHeight;
    }

    defineChat(content) {
        if (!this.renderChatMessages(content)) {
            return;
        }

        this.defineMyMessages();
        this.defineSendMessageBtn();
        this.scrollToBottom();
    }

    renderChatMessages(content) {
        if (!content.messages) {
            return false; // вывести что пока нет сообщений
        }

        const messages = content.message.reverse();
        messages.forEach((message) => {
            if (message.from == this.#chatWithUserId) {
                this.renderCompanionMessage(message.ID, message.content)
            } else {
                this.renderMyMessage(message.ID, message.content);
            }
        })

        return true;
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
        this.#requestID++;
        const myMessageItemTemplate = Handlebars.templates['myMessageItem.hbs'];
        const myMessageItemContext = { messageID: -2, message: messageToSend, requestID: this.#requestID };

        this.#chat.insertAdjacentHTML('beforeend', myMessageItemTemplate(myMessageItemContext));
        this.defineSendedMessage(this.#requestID);
    }

    defineSendedMessage(requestID) {
        const sendedMessage = document.querySelector(`[data-section="request-id-${requestID}"]`);
        this.#definedMessages.push(sendedMessage);

        const messageIndicator = sendedMessage.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = 'https://pinspire.online:8081/assets/icons/forMessenger/icon_delete_message.svg';

        sendedMessage.setAttribute('data-message-id', -1); // установить id после получения ответа

        const messageButtons = sendedMessage.querySelector('.messenger__chat__message-item__buttons');
    
        sendedMessage.addEventListener('click', () => {
            messageButtons.classList.toggle('hide');
        });

        const editMessageButton = sendedMessage.querySelector('.messenger__chat__message-item__button-edit');
        const deleteMessageButton = sendedMessage.querySelector('.messenger__chat__message-item__button-delete');

        editMessageButton.addEventListener('click', () => this.editMessage());
        deleteMessageButton.addEventListener('click', ()=> this.deleteMessage());


        this.scrollToBottom();
    }

    renderMyMessage(messageID, message) {
        const myMessageItemTemplate = Handlebars.templates['myMessageItem.hbs'];
        const myMessageItemContext = { messageID, message: message, requestID: -1 };

        this.#chat.insertAdjacentHTML('beforeend', myMessageItemTemplate(myMessageItemContext));
    }

    renderCompanionMessage(messageID, message) {
        const companionMessageItemTemplate = Handlebars.templates['companionMessageItem.hbs'];
        const companionMessageItemContext = { messageID, message };

        this.#chat.insertAdjacentHTML('beforeend', companionMessageItemTemplate(companionMessageItemContext));
    }

}

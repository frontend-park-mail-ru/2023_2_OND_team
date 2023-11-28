import { WebSocketConnection } from "../../../utils/Api/messenger/messengerWS.js";
import State from "../../../components/State/state.js";

export class MessengerChat {
    #chatWithUserId;
    #definedMessages;
    #chat;
    #sendMessageBtn;
    #messageFieldInput;
    #state

    constructor(chatWithUserId) {
        this.#chatWithUserId = chatWithUserId;
        this.#definedMessages = [];
        this.#chat = document.querySelector('.messenger__chat__messages');
        this.#sendMessageBtn = document.querySelector('.messenger__chat__footer__send_message-img');
        this.#messageFieldInput = document.querySelector('.messenger__chat__footer__text-input');
        this.#state = new State();

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

        console.log(this.#chatWithUserId)
    }

    renderChatMessages(content) {
        if (!content.messages) {
            return false; // вывести что пока нет сообщений
        }

        const messages = content.messages.reverse();
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
        // const wsConnectMessage = {
        //     "requestID": 0,
        //     "action": "Subscribe",
        //     "channel":{
        //     "name": String(this.#state.getUserID()),
        //     "topic": "chat"
        //     }
        // }

        const WS = new WebSocketConnection(`wss://pinspire.online:8080/websocket/connect/chat?${this.#state.getUserID()}`);

        // WS.sendMessage(JSON.stringify(wsConnectMessage));
            console.log(this.#chatWithUserId);

        const myMessageItemTemplate = Handlebars.templates['myMessageItem.hbs'];
        const myMessageItemContext = { messageID: -2, message: messageToSend, requestID: this.#state.requestID, status: 'send' };

        this.#chat.insertAdjacentHTML('beforeend', myMessageItemTemplate(myMessageItemContext));

        const wsSendMessage = {
            "requestID": this.#state.requestID,
            "action": "Publish",
            "channel":{
              "name": this.#chatWithUserId,
              "topic": "chat",
            },
            "message": {
                "eventType": "create",
                "message": {
                    "to": +this.#chatWithUserId,
                    "content": messageToSend,
                }
            }
        }

        WS.sendMessage(JSON.stringify(wsSendMessage));

        this.defineSendedMessage(this.#state.requestID++);
    }

    defineSendedMessage(requestID) {
        const sendedMessage = document.querySelector(`[data-section="request-id-${requestID}"]`);
        this.#definedMessages.push(sendedMessage);

        const messageIndicator = sendedMessage.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = 'https://pinspire.online:8081/assets/icons/forMessenger/icon_received_message.svg';

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
        const myMessageItemContext = { messageID, message, requestID: -1, status: 'received' };

        this.#chat.insertAdjacentHTML('beforeend', myMessageItemTemplate(myMessageItemContext));
    }

    renderCompanionMessage(messageID, message) {
        const companionMessageItemTemplate = Handlebars.templates['companionMessageItem.hbs'];
        const companionMessageItemContext = { messageID, message };

        this.#chat.insertAdjacentHTML('beforeend', companionMessageItemTemplate(companionMessageItemContext));
    }

    setChatWithUserID(userID) {
        this.#chatWithUserId = userID;
    }

}

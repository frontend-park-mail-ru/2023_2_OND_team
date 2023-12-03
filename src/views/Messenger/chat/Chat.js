import { WebSocketConnection } from "../../../utils/Api/messenger/messengerWS.js";
import State from "../../../components/State/state.js";

export class MessengerChat {
    #ws;
    #chatWithUserId;
    #definedMessages;
    #chat;
    #sendMessageBtn;
    #messageFieldInput;
    #state
    #messageMode

    constructor(chatWithUserId) {
        this.#state = new State();
        this.#ws = new WebSocketConnection(`wss://${this.#state.getDomain()}:8080/websocket/connect/chat?${this.#state.getUserID()}`);
        this.#chatWithUserId = chatWithUserId;
        this.#definedMessages = [];
        this.#chat = document.querySelector('.messenger__chat__messages');
        this.#sendMessageBtn = document.querySelector('.messenger__chat__footer__send_message-img');
        this.#messageFieldInput = document.querySelector('.messenger__chat__footer__text-input');
        this.#messageMode = {mode: 'send', messageID: -2};

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

        // this.#ws.setOnMessageMethod((event) => {
        //     const jsonObject = JSON.parse(event.data);

        //     if (jsonObject?.type === 'responce') {  //getting response from server
        //         if (jsonObject?.status === 'ok' && jsonObject.message === 'publish success') {
        //             if (jsonObject.body) {
        //                 // markMessageAsReceived(jsonObject.requestID, jsonObject.body.id);  // сделать провеку в функции, есть ли сообщение на странице
        //             } else {
        //                 // markMessageAsUpdated(jsonObject.requestID);
        //             }
        //         } else {
        //             console.log(jsonObject);
        //         }
        //     } else if (jsonObject?.type === 'event') {  // getting message
        //         if (jsonObject.message.message?.from == this.#chatWithUserId) {  // message from opened chat
        //             if (jsonObject.message.eventType === 'create') {
        //                 this.renderCompanionMessage(jsonObject.message.message.ID, jsonObject.message.message.content);
        //                 this.scrollToBottom();
        //             } else if (jsonObject.message.eventType === 'update') {
        //                 // this.renderCompanionMessage(jsonObject.message.message.ID, jsonObject.message.message.content);  update message text
        //             } else if (jsonObject.message.eventType === 'delete') {
        //                 // this.renderCompanionMessage(jsonObject.message.message.ID, jsonObject.message.message.content);  delete message
        //             } else {
        //                 console.log(jsonObject);
        //             }
        //         } else {  // message from other chat
        //             if (jsonObject.message.eventType === 'create') {
        //                 // raiseUpChatMenuItem(jsonObject.message.message.from)  поднять чат в списке чатов вверх
        //                 // this.renderCompanionMessage(jsonObject.message.message.ID, jsonObject.message.message.content);
        //                 // this.scrollToBottom();
        //             } else {
        //                 console.log(jsonObject);
        //             }
        //         }
        //     }

        // })
    }

    renderChatMessages(content) {
        if (!content.messages) {
            return false; // вывести что пока нет сообщений
        }

        this.#chat.innerHTML = '';

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
    
            const messageID = message.getAttribute('data-message-id');

            editMessageButton.addEventListener('click', () => this.editMessage(messageID));
            deleteMessageButton.addEventListener('click', ()=> this.deleteMessage(messageID));
        });
    }

    editMessage(messageID) {
        const messageToUpdate = document.querySelector(`[data-message-id="${messageID}"]`);
        const messageText = messageToUpdate.querySelector('.messenger__chat__message-item__text').value;

        this.#messageFieldInput.value = messageText;
        
        this.#messageMode.mode = 'update';
        this.#messageMode.messageID = messageID;

        console.log('edit');
    }

    updateMessage(messageText, messageID) {
        const messageToUpdate = document.querySelector(`[data-message-id="${messageID}"]`);

        const messageToUpdateText = messageToUpdate.querySelector('.messenger__chat__message-item__text');
        messageToUpdateText.value = messageText;

        messageToUpdate.setAttribute('data-section', `request-id-${this.#state.requestID}`); // обновить id

        const messageIndicator = messageToUpdate.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = '/assets/icons/forMessenger/icon_send_message.svg';

        const wsUpdateMessage = {
            "requestID": this.#state.requestID,
            "action": "Publish",
            "channel":{
              "name": this.#chatWithUserId,
              "topic": "chat",
            },
            "message": {
                "eventType": "update",
                "message": {
                    "to": +this.#chatWithUserId,
                    "content": messageText,
                }
            }
        }

        this.#ws.sendMessage(JSON.stringify(wsUpdateMessage));
        this.#state.requestID++;
    }

    setMessageUpdated(requestID) {
        const updatedMessage = document.querySelector(`[data-section="request-id-${requestID}"]`);

        const messageIndicator = updatedMessage.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = '/assets/icons/forMessenger/icon_received_message.svg';
    }

    deleteMessage(messageID) {
        const messageToDelete = document.querySelector(`[data-message-id="${messageID}"]`);

        messageToDelete.setAttribute('data-section', `request-id-${this.#state.requestID}`); // обновить id

        const messageIndicator = messageToDelete.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = '/assets/icons/forMessenger/icon_send_message.svg';

        const wsDeleteMessage = {
            "requestID": this.#state.requestID,
            "action": "Publish",
            "channel":{
              "name": this.#chatWithUserId,
              "topic": "chat",
            },
            "message": {
                "eventType": "delete",
                "message": {
                    "to": +this.#chatWithUserId,
                }
            }
        }

        this.#ws.sendMessage(JSON.stringify(wsDeleteMessage));
        this.#state.requestID++;
    }

    setMessageDeleted(requestID) {
        const messageToDelete = document.querySelector(`[data-section="request-id-${requestID}"]`);

        this.#definedMessages = this.#definedMessages.filter((item) => {item !== messageToDelete});

        messageToDelete.remove();
    }

    defineSendMessageBtn() {
        this.#sendMessageBtn?.addEventListener('click', () => {
            const messageToSend = this.#messageFieldInput.value;
            if (messageToSend) {
                switch (this.#messageMode) {
                    case 'send':
                        this.sendMessage(messageToSend);
                        break;
                    case 'update':
                        this.updateMessage(messageToSend, this.#messageMode.messageID);
                        break;
                    default:
                        break;
                }
                
                this.#messageFieldInput.value = '';
                this.#messageMode.mode = 'send';
                this.#messageMode.messageID = -2;
            }
        })
    }

    sendMessage(messageToSend) {
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

        this.#ws.sendMessage(JSON.stringify(wsSendMessage));
        
        // this.defineSendedMessage(this.#state.requestID++);
        this.#state.requestID++;
    }

    defineSendedMessage(requestID, messageID) {
        const sendedMessage = document.querySelector(`[data-section="request-id-${requestID}"]`);

        if (!sendedMessage) {
            return;
        }

        this.#definedMessages.push(sendedMessage);

        const messageIndicator = sendedMessage.querySelector('.messenger__chat__message-item-my__indicator-img');
        messageIndicator.src = '/assets/icons/forMessenger/icon_received_message.svg';

        sendedMessage.setAttribute('data-message-id', messageID); // установить id после получения ответа

        const messageButtons = sendedMessage.querySelector('.messenger__chat__message-item__buttons');
    
        sendedMessage.addEventListener('click', () => {
            messageButtons.classList.toggle('hide');
        });

        const editMessageButton = sendedMessage.querySelector('.messenger__chat__message-item__button-edit');
        const deleteMessageButton = sendedMessage.querySelector('.messenger__chat__message-item__button-delete');

        editMessageButton.addEventListener('click', () => this.editMessage(messageID));
        deleteMessageButton.addEventListener('click', ()=> this.deleteMessage(messageID));


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

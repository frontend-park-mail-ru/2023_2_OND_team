import State from "../../../components/State/state.js";

export class MessengerWS {

    constructor() {
        if (MessengerWS.instance) {
            return MessengerWS.instance;
        }

        MessengerWS.instance = this;

        this.state = new State();

        this.socket = new WebSocket(`wss://pinspire.online:8080/websocket/connect/chat?${this.state.getUserID}`);
    }

    sendMessage(message) {
        this.socket.send(message);
    }

    onMessage(callback) {
        this.socket.onmessage = (event) => {
            callback(event);
        }
    }

}
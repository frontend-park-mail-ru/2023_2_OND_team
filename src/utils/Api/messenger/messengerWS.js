import State from "../../../components/State/state.js";

export class messengerWS {

    constructor() {
        if (messengerWS.instance) {
            return messengerWS.instance;
        }

        messengerWS.instance = this;

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
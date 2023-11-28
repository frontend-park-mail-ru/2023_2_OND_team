import State from "../../../components/State/state.js";

export class MessengerWS {
    static #socket = new WebSocket(`wss://pinspire.online:8080/websocket/connect/chat?${this.state.getUserID()}`);
    static state = new State();
    
    static sendMessage(message) {
        this.#socket.send(message);
    }

    static onMessage(callback) {
        this.#socket.onmessage = (event) => {
            callback(event);
        }
    }
}

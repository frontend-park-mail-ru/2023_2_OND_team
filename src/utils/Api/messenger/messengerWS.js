import State from "../../../components/State/state.js";

export class MessengerWS {
    static state = new State();
    static #socket = new WebSocket(`wss://pinspire.online:8080/websocket/connect/chat?${MessengerWS.state.getUserID()}`);
    
    static sendMessage(message) {
        this.#socket.send(message);
    }

    static onMessage(callback) {
        this.#socket.onmessage = (event) => {
            callback(event);
        }
    }
}
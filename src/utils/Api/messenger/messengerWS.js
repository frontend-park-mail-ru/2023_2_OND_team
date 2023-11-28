import State from "../../../components/State/state.js";

class WebSocketConnection {
    constructor(url) {
        this.url = url;
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }

    onOpen(event) {
        console.log('WebSocket connection opened:', event);
    }

    onMessage(event) {
        console.log('WebSocket message received:', event.data);
    }

    onError(event) {
        console.log('WebSocket error:', event);
    }

    onClose(event) {
        console.log('WebSocket connection closed:', event);
        setTimeout(() => {
            this.socket = new WebSocket(this.url);
        }, 5000); // Попытка повторного подключения через 5 секунд
    }

    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.log('WebSocket connection is not open. Cannot send message.');
        }
    }
}

const state = new State();

const WS = new WebSocketConnection(`wss://pinspire.online:8080/websocket/connect/chat?${state.getUserID()}`);

export default WS;

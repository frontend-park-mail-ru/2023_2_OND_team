import State from "../../../components/State/state.js";

export class WebSocketConnection {
    constructor(url) {
        if (WebSocketConnection.instance) {
            return WebSocketConnection.instance;
        }

        WebSocketConnection.instance = this;
                
        this.url = url;
        this.state = new State();
        this.socket = new WebSocket(url);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);

    }

    close() {
        this.socket.close();
    }

    open(url) {
        if (this.socket.readyState === WebSocket.OPEN) {
            return
        }

        this.socket = new WebSocket(url);
    }

    onMessage(event) {
        console.log('WebSocket message received:', event.data);
    }

    setOnMessageMethod(callback) {
        this.socket.onmessage = callback;
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

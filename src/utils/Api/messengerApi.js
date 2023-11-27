import State from "../../components/State/state.js";

export class MessengerApi {
    #handlers;

    constructor() {
        if (MessengerApi.instance) {
            return MessengerApi.instance;
        }

        MessengerApi.instance = this;

        this.state = new State();

        this.#handlers = [
            {name: 'userChats', url: '//pinspire.online:8080/api/v1/chat/personal&count=100'},
        ]
    }

    async getUserChats() {
        try {
            const hander = this.#handlers.find((item) => item.name === 'userChats');
            if (!hander) {
                throw new Error('Не найдена ручка для userChats');
            }

            const response = await fetch(hander.url, {
                headers: {
                    'X-CSRF-Token': this.state.getCsrfToken(),
                },
                credentials: 'include',
            });
        
            const csrfToken = response.headers.get('X-Set-CSRF-Token');

            if (csrfToken) {
                this.state.setCsrfToken(csrfToken);
            }
    
            const res = await response.json();
            
            return res;
        } catch (error) {
            console.error('messengerApi getUserChats error:', error);
        }
    }
}
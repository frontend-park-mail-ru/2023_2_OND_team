import State from "../../../components/State/state.js";

const PORT = '443';

export class MessengerApi {
    #handlers;

    constructor() {
        if (MessengerApi.instance) {
            return MessengerApi.instance;
        }

        MessengerApi.instance = this;

        this.state = new State();

        this.#handlers = [
            {name: 'userChats', url: `//${this.state.getDomain()}:${PORT}/api/v1/chat/personal?count=100`},
            {name: 'chatWithUser', url: `//${this.state.getDomain()}:${PORT}/api/v1/chat/get/`},
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

    async getChatWithUser(userID) {
        try {
            const hander = this.#handlers.find((item) => item.name === 'chatWithUser');
            if (!hander) {
                throw new Error('Не найдена ручка для chatWithUser');
            }

            const response = await fetch(hander.url + `${userID}?count=1000`, {
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
            console.error('messengerApi getChatWithUser error:', error);
        }
    }
}
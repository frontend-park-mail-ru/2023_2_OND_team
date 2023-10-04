export class API {
    #config
    constructor() {
        this.#config = [
            { name: 'loginUser', url: '//pinspire.online:8080/api/v1/auth/login' },
            { name: 'checkLogin', url: '//pinspire.online:8080/api/v1/auth/login' },
            { name: 'logoutUser', url: '//pinspire.online:8080/api/v1/auth/logout' },
            { name: 'registerUser', url: '//pinspire.online:8080/api/v1/auth/signup' },
            { name: 'generatePins', url: '//pinspire.online:8080/api/v1/pin?count=20' },
        ];
    }

    async loginUser(username, password) {
        try {
            const configItem = this.#config.find(item => item.name === 'loginUser');
            if (!configItem) {
                throw new Error('Не найдена конфигурация для loginUser');
            }
            
            const response = await fetch(configItem.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            const res = await response.json();
            if (res.status === 'ok') {
                return true;
            }

            return false;

        } catch (error) {
            console.error('Ошибка при выполнении запроса loginUser:', error);
            throw error;
        }
    }

    /**
    * Проверяет статус авторизации пользователя.
    *
    * @async
    * @function
    * @returns {Promise<{ isAuthorized: boolean, username: string }>} Объект с информацией о статусе авторизации и именем пользователя.
    * @throws {Error} Если произошла ошибка при запросе или обработке данных.
    */
    async checkLogin() {
        try {
            const configItem = this.#config.find(item => item.name === 'checkLogin');
            if (!configItem) {
                throw new Error('Не найдена конфигурация для checkLogin');
            }

            const response = await fetch(configItem.url, {
                credentials: 'include',
            });

            const res = await response.json();
            let isAuthorized = false;
            let username = '';

            if (res.status === 'ok') {
                username = res.body.username;
                isAuthorized = true;
            }

            return { isAuthorized, username };

        } catch (error) {
            console.error('Ошибка при получении данных об авторизации:', error);
        }
    }

    async logoutUser() {
        try {
            const configItem = this.#config.find(item => item.name === 'logoutUser');
            if (!configItem) {
                throw new Error('Не найдена конфигурация для logoutUser');
            }

            const response = await fetch(configItem.url, {
                method: 'DELETE',
                credentials: 'include',
            })

            const res = await response.json();
            if (res.status === 'ok') {
                return true;
            }
    
            return false;
    
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }

    /**
    * Регистрирует пользователя с указанными данными.
    * Если регистрация успешна, устанавливает куки `registered` и отправляет их на сервер.
    * @param {string} username - Имя пользователя.
    * @param {string} email - Почта.
    * @param {string} password - Пароль.
    */
    async registerUser(username, email, password) {
        try {
            const configItem = this.#config.find(item => item.name === 'registerUser');
            if (!configItem) {
                throw new Error('Не найдена конфигурация для registerUser');
            }

            const response = await fetch(configItem.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include',
            })

            const res = await response.json();
            if (res.status === 'ok') {
                return this.loginUser(username, password);
            }

            return false;

        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }

    /**
    * Генерирует изображения (пины) для отображения на странице.
    *
    * @async
    * @function
    * @throws {Error} Если произошла ошибка при запросе или обработке данных.
    * @returns {Promise<{ images: { picture: string }[] }>} Объект с массивом изображений.
    */
    async generatePins() {
        try {
            const configItem = this.#config.find(item => item.name === 'generatePins');
            if (!configItem) {
                throw new Error('Не найдена конфигурация для generatePins');
            }

            const response = await fetch(configItem.url);
            const res = await response.json();
            let images = [];

            if (res.status === 'ok') {
                images = res.body.pins;
            }

            return images;

        } catch (error) {
            console.error('Ошибка при получении пинов:', error);
        }
    }

}


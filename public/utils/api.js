export class API {
    #config
    constructor() {
        this.#config = [
            { loginUser: '//pinspire.online:8080/api/v1/auth/login' },
            { checkLogin: '//pinspire.online:8080/api/v1/auth/login' },
            { logoutUser: '//pinspire.online:8080/api/v1/auth/logout' },
            { registerUser: '//pinspire.online:8080/api/v1/auth/signup' },
            { generatePins: '//pinspire.online:8080/api/v1/pin?count=20' },
        ]
    }

    /**
    * Выполняется запрос на вход пользователя с указанным именем и паролем.
    * Если вход успешен, устанавливается куки `loggedIn` и отправляет их на сервер.
    * @param {string} username - Имя пользователя.
    * @param {string} password - Пароль.
    */
    async loginUser(username, password) {
        try {
            const response = await fetch(this.#config.loginUser, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
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
    * Проверяет статус авторизации пользователя.
    *
    * @async
    * @function
    * @returns {Promise<{ isAuthorized: boolean, username: string }>} Объект с информацией о статусе авторизации и именем пользователя.
    * @throws {Error} Если произошла ошибка при запросе или обработке данных.
    */
    async checkLogin() {
        try {
            const response = await fetch(this.#config.checkLogin, {
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
            const response = await fetch(this.#config.logoutUser, {
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
            const response = await fetch(this.#config.registerUser, {
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
            const response = await fetch(this.#config.generatePins);
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


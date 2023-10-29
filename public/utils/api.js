import State from "./state.js";

export class API {
    static state = new State();

    static #config = [
      {name: 'loginUser', url: '//pinspire.online:8080/api/v1/auth/login'},
      {name: 'logoutUser', url: '//pinspire.online:8080/api/v1/auth/logout'},
      {name: 'registerUser', url: '//pinspire.online:8080/api/v1/auth/signup'},
      {name: 'profileAvatar', url: '//pinspire.online:8080/api/v1/profile/avatar'},
      {name: 'profileInfo', url: '//pinspire.online:8080/api/v1/profile/info'},
      {name: 'profileEdit', url: '//pinspire.online:8080/api/v1/profile/edit'},
    ];

    static async loginUser(username, password) {
      try {
        const configItem = this.#config.find((item) => item.name === 'loginUser');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для loginUser');
        }

        const response = await fetch(configItem.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': this.state.getCsrfToken(),
          },
          body: JSON.stringify({username, password}),
          credentials: 'include',
        });

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));

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
      * @return {Promise<{ isAuthorized: boolean, username: string }>} Объект с информацией о статусе авторизации и именем пользователя.
      * @throws {Error} Если произошла ошибка при запросе или обработке данных.
      */
    static async checkLogin() {
      try {
        const configItem = this.#config.find((item) => item.name === 'loginUser');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для checkLogin');
        }

        const response = await fetch(configItem.url, {
          credentials: 'include',
        });

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));

        const res = await response.json();
        let isAuthorized = false;
        let username = '';

        if (res.status === 'ok') {
          username = res.body.username;
          isAuthorized = true;
        }

        return {isAuthorized, username};
      } catch (error) {
        console.error('Ошибка при получении данных об авторизации:', error);
      }
    }

    static async logoutUser() {
      try {
        const configItem = this.#config.find((item) => item.name === 'logoutUser');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для logoutUser');
        }

        const response = await fetch(configItem.url, {
          method: 'DELETE',
          headers: {
            'x-csrf-token': this.state.getCsrfToken(),
          },
          credentials: 'include',
        });

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));

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
    static async registerUser(username, email, password) {
      try {
        const configItem = this.#config.find((item) => item.name === 'registerUser');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для registerUser');
        }

        const response = await fetch(configItem.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': this.state.getCsrfToken(),
          },
          body: JSON.stringify({username, email, password}),
          credentials: 'include',
        });

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));

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
      * @return {Promise<{ images: { picture: string }[] }>} Объект с массивом изображений.
      */
    static async generatePins(num=20, id=0) {
      try {
        const configItem = `//pinspire.online:8080/api/v1/pin?count=${num}&lastID=${id}`;
        const response = await fetch(configItem);

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));
        console.log(this.state.getCsrfToken())

        const res = await response.json();
        let images = [];
        let lastID;

        if (res.status === 'ok') {
          images = res.body.pins;
          lastID = res.body.lastID;

          return {images, lastID};
        } else {
          throw new Error('Ошибка при получении данных из API');
        }
      } catch (error) {
        console.error('Ошибка при получении пинов:', error);
      }
    }

    static async getUserInfo() {
      try {
        const configItem = this.#config.find((item) => item.name === 'profileInfo');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для profileInfo');
        }

        const response = await fetch(configItem.url, {
          credentials: 'include',
        });

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));

        const res = await response.json();

        if (res.status === 'ok') {
          return res.body;
        } else {
          console.log(res);
        }

      } catch (error) {
        console.error('Ошибка при получении данных об авторизации:', error);
      }
    }

    static async putUserInfo({username, name, surname, email, password}) {
      try {
        const configItem = this.#config.find((item) => item.name === 'profileEdit');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для profileEdit');
        }

        const response = await fetch(configItem.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': this.state.getCsrfToken(),
          },
          body: JSON.stringify({username, name, surname, email, password}),
          credentials: 'include',
        });

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));

        const res = await response.json();

        if (res.status === 'ok') {
          return true;
        } else {
          console.log(res);
        }

      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
      }
    }

    static async putUserAvatar(avatar) {
      try {
        const configItem = this.#config.find((item) => item.name === 'profileAvatar');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для profileAvatar');
        }

        const response = await fetch(configItem.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/png',
            'x-csrf-token': this.state.getCsrfToken(),
          },
          body: avatar,
          credentials: 'include',
        });

        this.state.setCsrfToken(response.headers.get('X-Set-CSRF-Token'));

        const res = await response.json();

        if (res.status === 'ok') {
          return true;
        } else {
          console.log(res);
        }

      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
      }
    }
}

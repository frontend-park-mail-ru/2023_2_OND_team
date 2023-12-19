import State from '../../components/State/state.js';
import { WebSocketConnection } from './messenger/messengerWS.js';
import { Notifications } from '../../views/Notifications/Notifications.js';

export class API {
  static state = new State();

  static #config = [
    {name: 'loginUser', url: `//${this.state.getDomain()}:8080/api/v1/auth/login`},
    {name: 'logoutUser', url: `//${this.state.getDomain()}:8080/api/v1/auth/logout`},
    {name: 'registerUser', url: `//${this.state.getDomain()}:8080/api/v1/auth/signup`},
    {name: 'profileAvatar', url: `//${this.state.getDomain()}:8080/api/v1/profile/avatar`},
    {name: 'profileInfo', url: `//${this.state.getDomain()}:8080/api/v1/profile/info`},
    {name: 'profileEdit', url: `//${this.state.getDomain()}:8080/api/v1/profile/edit`},
    {name: 'profileEdit', url: `//${this.state.getDomain()}:8080/api/v1/profile/edit`},
    {name: 'csrfToken', url: `//${this.state.getDomain()}:8080/api/v1/csrf`},
    {name: 'getPinInfo', url: `//${this.state.getDomain()}:8080/api/v1/pin`},
    {name: 'createPin', url: `//${this.state.getDomain()}:8080/api/v1/pin/create`},
    {name: 'deletePin', url: `//${this.state.getDomain()}:8080/api/v1/pin/delete`},
    {name: 'addPins', url: `//${this.state.getDomain()}:8080/api/v1/board/add/pins`},
    {name: 'getUserPins', url: `//${this.state.getDomain()}:8080/api/v1/feed/pin/personal?count=1000`},
    {name: 'pinEdit', url: `//${this.state.getDomain()}:8080/api/v1/pin/edit`},
    {name: 'createBoard', url: `//${this.state.getDomain()}:8080/api/v1/board/create`},
    {name: 'getBoardInfo', url: `//${this.state.getDomain()}:8080/api/v1/board/get`},
    {name: 'deleteBoard', url: `//${this.state.getDomain()}:8080/api/v1/board/delete`},
    {name: 'getBoardPins', url: `//${this.state.getDomain()}:8080/api/v1/feed/pin/personal?count=1000`},
    {name: 'boardUpdate', url: `//${this.state.getDomain()}:8080/api/v1/board/update`},
    {name: 'Search', url: `//${this.state.getDomain()}:8080/api/v1/search`},
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
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({username, password}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

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
      if (res.status === 'ok') {
        this.state.setIsAuthorized(true);
        this.state.setUserID(res.body.id);
        this.state.setUsername(res.body.username);
        this.state.setAvatar(res.body.avatar);


        const notifications = new Notifications();
        const WS = new WebSocketConnection(`wss://${this.state.getDomain()}:8080/websocket/connect/chat?${this.state.getUserID()}`);
        WS.open(`wss://${this.state.getDomain()}:8080/websocket/connect/chat?${this.state.getUserID()}`);
        WS.setOnMessageMethod((event) => {
            const jsonObject = JSON.parse(event.data);
            if (jsonObject.message.eventType === 'create') {
                notifications.renderNotification('NEW_MESSAGE', jsonObject?.message?.message?.from)
            } else {
                console.log(jsonObject);
            }
        });

      } else {
        if (res.code === 'csrf') {
          this.getCsrfToken()
              .then(() => {
                this.checkLogin();
              });
        } else {
          this.state.setIsAuthorized(false);
        }
      }

      return res.status;
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
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      if (res.status === 'ok') {
        this.state.setIsAuthorized(false);
        this.state.setUserID(null);
        this.state.setUsername(null);
        this.state.setAvatar(null);

        const WS = new WebSocketConnection(`wss://${this.state.getDomain()}:8080/websocket/connect/chat?${this.state.getUserID()}`);
        WS.close();
        
      }

      return res.status;
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
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({username, email, password}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

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
  static async generatePins(num, maxID, minID) {
    try {
      let configItem;
      if (maxID === -Infinity && minID === Infinity) {
        configItem = `//${this.state.getDomain()}:8080/api/v1/feed/pin?count=${num}`;
      } else {
        configItem = `//${this.state.getDomain()}:8080/api/v1/feed/pin?count=${num}&maxID=${maxID}&minID=${minID}`;
      }
      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных пользователя');
      }
    } catch (error) {
      console.error('Ошибка при получении данных об авторизации:', error);
    }
  }

  static async putUserInfo({username, name, surname, about_me, email, password}) {
    try {
      const configItem = this.#config.find((item) => item.name === 'profileEdit');
      if (!configItem) {
        throw new Error('Не найдена конфигурация для profileEdit');
      }

      const response = await fetch(configItem.url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({username, name, surname, about_me, email, password}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      return res;
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
      throw error;
    }
  }

  static async putUserAvatar(avatar, contentType) {
    try {
      const configItem = this.#config.find((item) => item.name === 'profileAvatar');
      if (!configItem) {
        throw new Error('Не найдена конфигурация для profileAvatar');
      }

      const response = await fetch(configItem.url, {
        method: 'PUT',
        headers: {
          'Content-Type': `image/${contentType}`,
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        body: avatar,
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      return res;
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    }
  }

  static async getCsrfToken() {
    try {
      const configItem = this.#config.find((item) => item.name === 'csrfToken');
      if (!configItem) {
        throw new Error('Не найдена конфигурация для csrfToken');
      }

      const response = await fetch(configItem.url, {
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      console.log(csrfToken);

      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }
    } catch (error) {
      console.error('Ошибка при получении csrf токена', error);
    }
  }

  static async getLike(id) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/pin/like/isSet/${id}`;
      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных о лайке');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async setLike(id) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/pin/like/set/${id}`;
      const response = await fetch(configItem, {
        method: 'POST',
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных о лайке');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async deleteLike(id) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/pin/like/${id}`;
      const response = await fetch(configItem, {
        method: 'DELETE',
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных о лайке');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async getPinInfo(pinID) {
    try {
      const configItem = this.#config.find((item) => item.name === 'getPinInfo');
      if (!configItem) {
        throw new Error('Не найдена конфигурация для getPinInfo');
      }

      const pinInfoURL = `${configItem.url}/${pinID}`;

      const response = await fetch(pinInfoURL, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных о пине');
      }
    } catch (error) {
      console.error('Ошибка при получении данных о пине:', error);
      throw error;
    }
  }

  static async createPin(formData) {
    try {
      const configItem = this.#config.find((item) => item.name === 'createPin');
      if (!configItem) {
        throw new Error('Не найдена конфигурация для createPin');
      }

      const response = await fetch(configItem.url, {
        method: 'POST',
        headers: {
          'x-csrf-token': this.state.getCsrfToken(),
        },
        body: formData,
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();
      if (res.status === 'ok') {
        return res;
      }

      return false;
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  }

  static async deletePin(pinID) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/pin/delete/${pinID}`;
      const response = await fetch(configItem, {
        method: 'DELETE',
        headers: {
          'x-csrf-token': this.state.getCsrfToken(),
        },
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных об удалении пина');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async addBoardPins(board_id, pins) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/board/add/pins/${board_id}`;
      const response = await fetch(configItem, {
        method: 'POST',
        headers: {
          'x-csrf-token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({pins}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных о доске');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async putPinInfo(pinID, title, description) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/pin/edit/${pinID}`;

      const response = await fetch(configItem, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({title, description}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      return res;
    } catch (error) {
      console.error('Ошибка при обновлении данных пина:', error);
      throw error;
    }
  }

  static async createBoard(title, description) {
    try {
      const configItem = this.#config.find((item) => item.name === 'createBoard');
      if (!configItem) {
        throw new Error('Не найдена конфигурация для createBoard');
      }

      const response = await fetch(configItem.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({title, description, 'public': true, 'tags': [' ']}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();
      if (res.status === 'ok' && res.body && res.body.new_board_id) {
        return {status: 'ok', body: {new_board_id: res.body.new_board_id}};
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  }

  static async getMyPins() {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/feed/pin?count=1000&userID=${this.state.getUserID()}`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении пинов:', error);
    }
  }

  static async getMyBoards() {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/board/get/user/${this.state.getUsername()}`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении досок:', error);
    }
  }

  static async getUserPins(userID) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/feed/pin?count=1000&userID=${userID}`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении пинов:', error);
    }
  }

  static async getLikedPins() {
    try {
      const userID = this.state.getUserID();

      const configItem = `//${this.state.getDomain()}:8080/api/v1/feed/pin?count=1000&userID=${userID}&liked=true`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении лайкнутых пинов:', error);
    }
  }

  static async getUserBoards(username) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/board/get/user/${username}`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении досок:', error);
    }
  }

  static async getBoardInfo(boardID) {
    try {
      const configItem = this.#config.find((item) => item.name === 'getBoardInfo');
      if (!configItem) {
        throw new Error('Не найдена конфигурация для getBoardInfo');
      }

      const boardInfoURL = `${configItem.url}/${boardID}`;

      const response = await fetch(boardInfoURL, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных о доске');
      }
    } catch (error) {
      console.error('Ошибка при получении данных о доске:', error);
      throw error;
    }
  }

  static async deleteBoard(boardID) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/board/delete/${boardID}`;
      const response = await fetch(configItem, {
        method: 'DELETE',
        headers: {
          'x-csrf-token': this.state.getCsrfToken(),
        },
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных об удалении доски');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  static async getBoardPins(boardID) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/feed/pin?count=1000&boardID=${boardID}`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении пинов:', error);
    }
  }

  static async putBoardInfo(boardID, title, description, pins) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/board/update/${boardID}`;

      const response = await fetch(configItem, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({title, description, pins, 'public': false}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      return res;
    } catch (error) {
      console.error('Ошибка при обновлении данных доски:', error);
      throw error;
    }
  }

  static async getUserSubscriptions() {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/subscription/user/get?&view=subscriptions`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении подписок:', error);
    }
  }

  static async getSomeUserInfo(userID) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/user/info/${userID}`;

      const response = await fetch(configItem, {
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

      if (res.status === 'ok') {
        return res.body;
      } else {
        throw new Error('Ошибка при получении данных из API');
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  }

  static async subscribeToUser(userID) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/subscription/user/create`;

      const response = await fetch(configItem, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({to: +userID}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      if (res.status === 'ok') {
        return res.body;
      } else {
        return res.message, res.code;
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  }

  static async unsubscribeFromUser(userID) {
    try {
      const configItem = `//${this.state.getDomain()}:8080/api/v1/subscription/user/delete`;

      const response = await fetch(configItem, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({to: +userID}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      if (res.status === 'ok') {
        return res.body;
      } else {
        return res.message, res.code;
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  }

  static async Search(searchMode, searchInput) {
    try {
        const configItem = `//${this.state.getDomain()}:8080/api/v1/search/${searchMode}?template=${searchInput}&count=&offset=&sortBy=&order=`;
      
        const response = await fetch(configItem, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': this.state.getCsrfToken(),
            },
            credentials: 'include',
        });

        const csrfToken = response.headers.get('X-Set-CSRF-Token');
        if (csrfToken) {
            this.state.setCsrfToken(csrfToken);
        }

        const res = await response.json();

        if (res.status === 'ok') {
            return res.body;
        } else {
            throw new Error('Ошибка при получении данных из API');
        }
    } catch (error) {
        console.error('Ошибка при получении данных поиска:', error);
    }
  }
}

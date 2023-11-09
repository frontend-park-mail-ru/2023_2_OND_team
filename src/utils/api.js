import State from "../components/State/state.js";

export class API {
    static state = new State();

    static #config = [
      {name: 'loginUser', url: '//pinspire.online:8080/api/v1/auth/login'},
      {name: 'logoutUser', url: '//pinspire.online:8080/api/v1/auth/logout'},
      {name: 'registerUser', url: '//pinspire.online:8080/api/v1/auth/signup'},
      {name: 'profileAvatar', url: '//pinspire.online:8080/api/v1/profile/avatar'},
      {name: 'profileInfo', url: '//pinspire.online:8080/api/v1/profile/info'},
      {name: 'profileEdit', url: '//pinspire.online:8080/api/v1/profile/edit'},
      {name: 'profileEdit', url: '//pinspire.online:8080/api/v1/profile/edit'},
      {name: 'csrfToken', url: '//pinspire.online:8080/api/v1/csrf'},
      {name: 'getPinInfo', url: '//pinspire.online:8080/api/v1/pin'},
      {name: 'createPin', url: '//pinspire.online:8080/api/v1/pin/create'},
      {name: 'deletePin', url: '//pinspire.online:8080/api/v1/pin/delete'},
      {name: 'addPins', url:'//pinspire.online:8080/api/v1/board/add/pins'},
      {name: 'createBoard', url:'//pinspire.online:8080/api/v1/board/create'},
      {name: 'getUserPins', url: '//pinspire.online:8080/api/v1/pin/personal?count=1000'},
      {name: 'pinEdit', url: '//pinspire.online:8080/api/v1/pin/edit'},
      {name: 'createBoard', url:'//pinspire.online:8080/api/v1/board/create'}

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
          this.state.setUsername(res.body.username);
          this.state.setAvatar(res.body.avatar);
        } else {
          if (res.code === 'csrf') {
            this.getCsrfToken()
              .then(() => {
                this.checkLogin();
              })
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

        if(res.status === 'ok') {
          this.state.setUsername(null);
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
          configItem = `//pinspire.online:8080/api/v1/pin?count=${num}`;
        } else {
          configItem = `//pinspire.online:8080/api/v1/pin?count=${num}&maxID=${maxID}&minID=${minID}`;
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
    
        if (res.status === 'ok') {
          return res.status;
        } else {
          throw new Error('Ошибка при отправке данных пользователя');
        }
    
      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
        throw error;
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
            'Content-Type': 'image/*',
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

        if (res.status === 'ok') {
          return res.status;
        } else {
          throw new Error('Ошибка при отправке аватара пользователя');
        }

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
        const configItem = `//pinspire.online:8080/api/v1/pin/like/isSet/${id}`;
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
        const configItem = `//pinspire.online:8080/api/v1/pin/like/set/${id}`;
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
        const configItem = `//pinspire.online:8080/api/v1/pin/like/${id}`;
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
        const configItem = `//pinspire.online:8080/api/v1/pin/delete/${pinID}`;
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
          console.log(res.body)
          
          return res.body;
        } else {
          throw new Error('Ошибка при получении данных о лайке');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }

    static async addBoardPins(boardID) {
      try {
        const configItem = `//pinspire.online:8080/api/v1/board/add/pins/${boardID}`;
        const response = await fetch(configItem, {
          method: 'POST',
          headers: {
            'x-csrf-token': this.state.getCsrfToken(),
          },
          body: JSON.stringify(boardID, pins),
          credentials: 'include',
        });

        const csrfToken = response.headers.get('X-Set-CSRF-Token');
        if (csrfToken) {
          this.state.setCsrfToken(csrfToken);
        }

        const res = await response.json();

        if (res.status === 'ok') {
          console.log(res.body)
          
          return res.body;
        } else {
          throw new Error('Ошибка при получении данных о доске');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }

    static async putPinInfo({description}) {
      try {
        const configItem = this.#config.find((item) => item.name === 'pinEdit');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для pinEdit');
        }
    
        const response = await fetch(configItem.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': this.state.getCsrfToken(),
          },
          body: JSON.stringify({description}),
          credentials: 'include',
        });
    
        const csrfToken = response.headers.get('X-Set-CSRF-Token');
        if (csrfToken) {
          this.state.setCsrfToken(csrfToken);
        }
    
        const res = await response.json();
    
        if (res.status === 'ok') {
          return res.status;
        } else {
          throw new Error('Ошибка при отправке данных пина');
        }
    
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
              body: JSON.stringify({ title, description, 'public': true, 'tags': [" "] }),
              credentials: 'include',
          });
  
          const csrfToken = response.headers.get('X-Set-CSRF-Token');
          if (csrfToken) {
              this.state.setCsrfToken(csrfToken);
          }
  
          const res = await response.json();
          if (res.status === 'ok' && res.body && res.body.new_board_id) {
              return { status: 'ok', body: { new_board_id: res.body.new_board_id } };
          } else {
              throw new Error('Ошибка при получении данных из API');
          }
      } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
          throw error;
      }
    }  

    static async getUserPins() {
      try {
        const configItem = this.#config.find((item) => item.name === 'getUserPins');
        if (!configItem) {
          throw new Error('Не найдена конфигурация для getUserPins');
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
          throw new Error('Ошибка при получении данных из API');
        }
      } catch (error) {
        console.error('Ошибка при получении пинов:', error);
      }
    }

    static async getUserBoards() {
      try {
        const configItem = `//pinspire.online:8080/api/v1/board/get/user/${this.state.getUsername()}`;

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

}

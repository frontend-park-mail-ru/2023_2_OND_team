/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/components/Authorization/AuthPage.js":
/*!*****************************************************!*\
  !*** ./public/components/Authorization/AuthPage.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderAuthPage: () => (/* binding */ renderAuthPage)\n/* harmony export */ });\n/* harmony import */ var _Registration_RegPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Registration/RegPage.js */ \"./public/components/Registration/RegPage.js\");\n/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/api.js */ \"./public/utils/api.js\");\n/* harmony import */ var _Feed_Feed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Feed/Feed.js */ \"./public/components/Feed/Feed.js\");\n/* harmony import */ var _utils_valid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/valid.js */ \"./public/utils/valid.js\");\n\n\n\n\n\n/**\n* Рендерит страницу аутентификации.\n*\n* @param {HTMLElement} headerElement - Элемент заголовка.\n* @param {HTMLElement} pageElement - Элемент страницы.\n*\n* @return {void}\n*/\nfunction renderAuthPage(headerElement, pageElement) {\n  document.body.style.overflow = 'hidden';\n\n  const authPage = Handlebars.templates['Auth.hbs'];\n  const context = {};\n\n  pageElement.innerHTML = authPage(context);\n  const passwordInput = pageElement.querySelector('#password');\n  const usernameInput = pageElement.querySelector('#username');\n  const AuthButton = pageElement.querySelector('.button');\n  const cancelButton = pageElement.querySelector('.cancel-button');\n\n  const signUpLink = pageElement.querySelector('.already-registered a');\n  signUpLink.addEventListener('click', function(e) {\n    e.preventDefault();\n    (0,_Registration_RegPage_js__WEBPACK_IMPORTED_MODULE_0__.renderRegPage)(headerElement, pageElement);\n  });\n\n  const usernameErrorSpan = document.querySelector('.username-error-message');\n  const passwordErrorSpan = document.querySelector('.password-error-message');\n  const wrongDataErrorSpan = document.querySelector('.wrong-data-error-message');\n\n  AuthButton.addEventListener('click', function(e) {\n    e.preventDefault();\n\n    const username = document.getElementById('username').value;\n    const password = document.getElementById('password').value;\n\n    usernameInput.style.borderColor = '';\n    passwordInput.style.borderColor = '';\n\n    const usernameValidationResult = (0,_utils_valid_js__WEBPACK_IMPORTED_MODULE_3__.nameValid)(username);\n    const passwordValidationResult = (0,_utils_valid_js__WEBPACK_IMPORTED_MODULE_3__.passwordValid)(password);\n\n    if (!usernameValidationResult.valid) {\n      usernameInput.style.borderColor = 'var(--error-50, #F4210B)';\n      usernameInput.style.color = 'var(--error-50, #F4210B)';\n      usernameErrorSpan.textContent = usernameValidationResult.message;\n    } else {\n      usernameErrorSpan.textContent = '';\n    }\n\n    if (!passwordValidationResult.valid) {\n      passwordInput.style.borderColor = 'var(--error-50, #F4210B)';\n      passwordInput.style.color = 'var(--error-50, #F4210B)';\n      passwordErrorSpan.textContent = passwordValidationResult.message;\n    } else {\n      passwordErrorSpan.textContent = '';\n    }\n\n    if (usernameValidationResult.valid && passwordValidationResult.valid) {\n      _utils_api_js__WEBPACK_IMPORTED_MODULE_1__.API.loginUser(username, password)\n          .then((status) => {\n            if (status) {\n              headerElement.classList.remove('header-hidden');\n              pageElement.classList.remove('main-no-padding');\n              (0,_Feed_Feed_js__WEBPACK_IMPORTED_MODULE_2__.renderFeedPage)();\n            } else {\n              usernameInput.style.borderColor = 'var(--error-50, #F4210B)';\n              passwordInput.style.borderColor = 'var(--error-50, #F4210B)';\n              wrongDataErrorSpan.textContent = 'Неверное имя пользователя или пароль';\n            }\n          });\n    }\n  });\n\n  cancelButton.addEventListener('click', function(e) {\n    e.preventDefault();\n    headerElement.classList.remove('header-hidden');\n    pageElement.classList.remove('main-no-padding');\n    (0,_Feed_Feed_js__WEBPACK_IMPORTED_MODULE_2__.renderFeedPage)();\n  });\n}\n\n\n//# sourceURL=webpack://2023_2_ond_team/./public/components/Authorization/AuthPage.js?");

/***/ }),

/***/ "./public/components/Feed/Feed.js":
/*!****************************************!*\
  !*** ./public/components/Feed/Feed.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderFeedPage: () => (/* binding */ renderFeedPage)\n/* harmony export */ });\n/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/api.js */ \"./public/utils/api.js\");\n/* harmony import */ var _Authorization_AuthPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Authorization/AuthPage.js */ \"./public/components/Authorization/AuthPage.js\");\n/* harmony import */ var _Registration_RegPage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Registration/RegPage.js */ \"./public/components/Registration/RegPage.js\");\n/* harmony import */ var _utils_renderPins_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/renderPins.js */ \"./public/utils/renderPins.js\");\n/* harmony import */ var _Profile_Profile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Profile/Profile.js */ \"./public/components/Profile/Profile.js\");\n\n\n\n\n\n\nconst PINS_MAX = 100;\nconst PINS_REQUEST = 20;\nlet PIN_LAST_ID = 0;\n\n/**\n* Рендерит главную страницу с пинами.\n*/\nfunction renderFeedPage() {\n  const rootElement = document.getElementById('root');\n  PIN_LAST_ID = 0;\n\n  document.body.style.overflow = 'visible';\n\n  const feed = Handlebars.templates['Feed.hbs'];\n  const header = Handlebars.templates['Header.hbs'];\n  const userData = Handlebars.templates['UserData.hbs'];\n  const headerNonAuthorized = Handlebars.templates['HeaderNonAuthorized.hbs'];\n\n  const userDataContext = {\n    username: null,\n  };\n\n  const headerContext = {\n    isAuthorized: null,\n    UserData: userData,\n    HeaderNonAuthorized: headerNonAuthorized,\n    userDataContext: userDataContext,\n  };\n\n  _utils_api_js__WEBPACK_IMPORTED_MODULE_0__.API.checkLogin()\n      .then((data) => {\n        headerContext.isAuthorized = data.isAuthorized;\n        headerContext.userDataContext.username = data.username;\n\n        const context = {\n          Header: header,\n          headerContext: headerContext,\n        };\n\n        rootElement.innerHTML = feed(context);\n\n        definePageElements();\n      })\n      .catch((error) => {\n        console.error(error);\n      });\n}\n\n/**\n* Определяет обработчики событий для кнопок в шапке страницы и генерирует пины.\n*/\nfunction definePageElements() {\n  const headerElement = document.getElementById('header');\n  const pageElement = document.getElementById('main');\n\n  const logoutBtn = document.querySelector('.js-header-btns__logout');\n  if (logoutBtn) {\n    logoutBtn.addEventListener('click', (e) => {\n      e.preventDefault();\n      headerElement.classList.add('header-hidden');\n      pageElement.classList.add('main-no-padding');\n\n      if (_utils_api_js__WEBPACK_IMPORTED_MODULE_0__.API.logoutUser()) {\n        headerElement.innerHTML = '';\n        window.removeEventListener('scroll', window.scrollFunc);\n        (0,_Authorization_AuthPage_js__WEBPACK_IMPORTED_MODULE_1__.renderAuthPage)(headerElement, pageElement);\n      }\n    });\n  }\n\n  const loginBtn = document.querySelector('.js-header-btns__login');\n  if (loginBtn) {\n    loginBtn.addEventListener('click', (e) => {\n      e.preventDefault();\n      headerElement.classList.add('header-hidden');\n      pageElement.classList.add('main-no-padding');\n      headerElement.innerHTML = '';\n      window.removeEventListener('scroll', window.scrollFunc);\n      (0,_Authorization_AuthPage_js__WEBPACK_IMPORTED_MODULE_1__.renderAuthPage)(headerElement, pageElement);\n    });\n  }\n\n  const signupBtn = document.querySelector('.js-header-btns__signup');\n  if (signupBtn) {\n    signupBtn.addEventListener('click', (e) => {\n      e.preventDefault();\n      headerElement.classList.add('header-hidden');\n      pageElement.classList.add('main-no-padding');\n      headerElement.innerHTML = '';\n      window.removeEventListener('scroll', window.scrollFunc);\n      (0,_Registration_RegPage_js__WEBPACK_IMPORTED_MODULE_2__.renderRegPage)(headerElement, pageElement);\n    });\n  }\n\n  const menuBtn = document.querySelector('.header__nav-create__menu');\n  if (menuBtn) {\n    const navCreate = document.querySelector('.nav-create');\n    const navCreateLineOne = document.querySelector('.header__nav-create__menu-line1');\n    const navCreateLineTwo = document.querySelector('.header__nav-create__menu-line2');\n    const navCreateLineThree = document.querySelector('.header__nav-create__menu-line3');\n    const links = document.querySelector('.header__nav-create__btns');\n    menuBtn.addEventListener('click', () => {\n        navCreate.classList.toggle('nav-open');\n        navCreateLineOne.classList.toggle('line-cross');\n        navCreateLineTwo.classList.toggle('line-fade-out');\n        navCreateLineThree.classList.toggle('line-cross');\n        links.classList.toggle('fade-in');\n    });\n  }\n\n  const headerUserData = document.querySelector('.js-header-user__data');\n  if (headerUserData) {\n    const navUser = document.querySelector('.nav-user');\n    const links = document.querySelector('.header__nav-user__btns');\n    headerUserData.addEventListener('click', (e) => {\n      if (!navUser.contains(e.target)) {\n        navUser.classList.toggle('nav-open');\n        links.classList.toggle('fade-in');\n      }\n    });\n  }\n\n  const profileBtn = document.querySelector('.js-header-btns__profile');\n  if (profileBtn) {\n    profileBtn.addEventListener('click', (e) => {\n      e.preventDefault();\n      window.removeEventListener('scroll', window.scrollFunc);\n      (0,_Profile_Profile_js__WEBPACK_IMPORTED_MODULE_4__.renderProfilePage)(headerElement, pageElement);\n    });\n  }\n\n  /**\n  * Создает функцию с задержкой для предотвращения слишком частых вызовов.\n  */\n  function debounce(f, ms) {\n    let isCooldown = false;\n\n    return function() {\n      if (isCooldown) return;\n\n      f.apply(this, arguments);\n      isCooldown = true;\n\n      setTimeout(() => isCooldown = false, ms);\n    };\n  }\n\n  /**\n  * Обработчик скролла страницы.\n  * Загружает дополнительные пины при достижении нижней части страницы.\n  */\n  function handleScroll() {\n    const documentHeight = document.documentElement.scrollHeight;\n    const windowHeight = window.innerHeight;\n    const scrollY = window.scrollY;\n    \n    if (scrollY + windowHeight >= documentHeight - 1000) {\n      _utils_api_js__WEBPACK_IMPORTED_MODULE_0__.API.generatePins(PINS_REQUEST, PIN_LAST_ID)\n          .then(({images, lastID}) => {\n            if (PIN_LAST_ID == lastID) {\n              window.removeEventListener('scroll', window.scrollFunc);\n              return;\n            }\n\n            if (lastID > PINS_MAX) {\n              const pinsToDelete = document.querySelectorAll('.gallery__item');\n              pinsToDelete.forEach(pin => {\n                const pinID = pin.getAttribute('class').replace('gallery__item js-pin-id-', '');\n\n                if (pinID < lastID - PINS_MAX) {\n                  pin.remove();\n                  console.log(`remove element ${pinID}}`);\n                }\n              })\n            }\n\n            const section = document.getElementById('pins');\n            (0,_utils_renderPins_js__WEBPACK_IMPORTED_MODULE_3__.renderPins)(section, images);\n            PIN_LAST_ID = lastID;\n          })\n          .catch((error) => {\n            console.error('Ошибка при рендеринге пинов:', error);\n          });\n    }\n  }\n\n  const scrollFunc = debounce(handleScroll, 100);\n  window.scrollFunc = scrollFunc;\n  scrollFunc();\n  window.addEventListener('scroll', window.scrollFunc);\n}\n\n\n//# sourceURL=webpack://2023_2_ond_team/./public/components/Feed/Feed.js?");

/***/ }),

/***/ "./public/components/Profile/Profile.js":
/*!**********************************************!*\
  !*** ./public/components/Profile/Profile.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderProfilePage: () => (/* binding */ renderProfilePage)\n/* harmony export */ });\n\n\nfunction renderProfilePage(headerElement, pageElement) {\n    const profile = Handlebars.templates['Profile.hbs'];\n    const context = {};\n\n    pageElement.innerHTML = profile(context);\n}\n\n//# sourceURL=webpack://2023_2_ond_team/./public/components/Profile/Profile.js?");

/***/ }),

/***/ "./public/components/Registration/RegPage.js":
/*!***************************************************!*\
  !*** ./public/components/Registration/RegPage.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderRegPage: () => (/* binding */ renderRegPage)\n/* harmony export */ });\n/* harmony import */ var _Authorization_AuthPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Authorization/AuthPage.js */ \"./public/components/Authorization/AuthPage.js\");\n/* harmony import */ var _Feed_Feed_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Feed/Feed.js */ \"./public/components/Feed/Feed.js\");\n/* harmony import */ var _utils_valid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/valid.js */ \"./public/utils/valid.js\");\n/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/api.js */ \"./public/utils/api.js\");\n\n\n\n\n\n/**\n * Рендерит страницу регистрации.\n *\n * @param {HTMLElement} headerElement - Элемент заголовка.\n * @param {HTMLElement} pageElement - Элемент страницы.\n *\n * @return {void}\n */\nfunction renderRegPage(headerElement, pageElement) {\n  document.body.style.overflow = 'hidden';\n\n  const regPage = Handlebars.templates['Reg.hbs'];\n  const context = {};\n\n  pageElement.innerHTML = regPage(context);\n  const passwordInput = pageElement.querySelector('#password');\n  const emailInput = pageElement.querySelector('#email');\n  const usernameInput = pageElement.querySelector('#username');\n  const RegButton = pageElement.querySelector('.button');\n  const cancelButton = pageElement.querySelector('.cancel-button');\n\n  const signInLink = pageElement.querySelector('.already-registered a');\n  signInLink.addEventListener('click', function(e) {\n    e.preventDefault();\n    (0,_Authorization_AuthPage_js__WEBPACK_IMPORTED_MODULE_0__.renderAuthPage)(headerElement, pageElement);\n  });\n\n  const usernameErrorSpan = document.querySelector('.username-error-message');\n  const emailErrorSpan = document.querySelector('.email-error-message');\n  const passwordErrorSpan = document.querySelector('.password-error-message');\n  const wrongDataErrorSpan = document.querySelector('.wrong-data-error-message');\n\n  RegButton.addEventListener('click', function(e) {\n    e.preventDefault();\n\n    const username = document.getElementById('username').value;\n    const email = document.getElementById('email').value;\n    const password = document.getElementById('password').value;\n\n    usernameInput.style.borderColor = '';\n    emailInput.style.borderColor = '';\n    passwordInput.style.borderColor = '';\n\n    const usernameValidationResult = (0,_utils_valid_js__WEBPACK_IMPORTED_MODULE_2__.nameValid)(username);\n    const emailValidationResult = (0,_utils_valid_js__WEBPACK_IMPORTED_MODULE_2__.emailValid)(email);\n    const passwordValidationResult = (0,_utils_valid_js__WEBPACK_IMPORTED_MODULE_2__.passwordValid)(password);\n\n    if (!usernameValidationResult.valid) {\n      usernameInput.style.borderColor = 'var(--error-50, #F4210B)';\n      usernameInput.style.color = 'var(--error-50, #F4210B)';\n      usernameErrorSpan.textContent = usernameValidationResult.message;\n    } else {\n      usernameErrorSpan.textContent = '';\n    }\n\n    if (!emailValidationResult.valid) {\n      emailInput.style.borderColor = 'var(--error-50, #F4210B)';\n      emailInput.style.color = 'var(--error-50, #F4210B)';\n      emailErrorSpan.textContent = emailValidationResult.message;\n    } else {\n      emailErrorSpan.textContent = '';\n    }\n\n    if (!passwordValidationResult.valid) {\n      passwordInput.style.borderColor = 'var(--error-50, #F4210B)';\n      passwordInput.style.color = 'var(--error-50, #F4210B)';\n      passwordErrorSpan.textContent = passwordValidationResult.message;\n    } else {\n      passwordErrorSpan.textContent = '';\n    }\n\n    if (usernameValidationResult.valid && emailValidationResult.valid && passwordValidationResult.valid) {\n      _utils_api_js__WEBPACK_IMPORTED_MODULE_3__.API.registerUser(username, email, password)\n          .then((status) => {\n            if (status) {\n              headerElement.classList.remove('header-hidden');\n              pageElement.classList.remove('main-no-padding');\n              (0,_Feed_Feed_js__WEBPACK_IMPORTED_MODULE_1__.renderFeedPage)();\n            } else {\n              usernameInput.style.borderColor = 'var(--error-50, #F4210B)';\n              emailInput.style.borderColor = 'var(--error-50, #F4210B)';\n              passwordInput.style.borderColor = 'var(--error-50, #F4210B)';\n              wrongDataErrorSpan.textContent = 'Пользователь уже заригистрирован';\n            }\n          });\n    }\n  });\n\n  cancelButton.addEventListener('click', function(e) {\n    e.preventDefault();\n    headerElement.classList.remove('header-hidden');\n    pageElement.classList.remove('main-no-padding');\n    (0,_Feed_Feed_js__WEBPACK_IMPORTED_MODULE_1__.renderFeedPage)();\n  });\n}\n\n\n//# sourceURL=webpack://2023_2_ond_team/./public/components/Registration/RegPage.js?");

/***/ }),

/***/ "./public/index.js":
/*!*************************!*\
  !*** ./public/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Feed_Feed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Feed/Feed.js */ \"./public/components/Feed/Feed.js\");\n/**\n * Отображает основную страницу.\n *\n * @function\n * @param {HTMLElement} headerElement - Элемент заголовка страницы.\n * @param {HTMLElement} pageElement - Элемент основной части страницы.\n * @throws {Error} Если произошла ошибка при отображении основной страницы.\n */\n\n\n(0,_components_Feed_Feed_js__WEBPACK_IMPORTED_MODULE_0__.renderFeedPage)();\n\n\n//# sourceURL=webpack://2023_2_ond_team/./public/index.js?");

/***/ }),

/***/ "./public/utils/api.js":
/*!*****************************!*\
  !*** ./public/utils/api.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API: () => (/* binding */ API)\n/* harmony export */ });\nclass API {\n  static #config = [\n    {name: 'loginUser', url: '//pinspire.online:8080/api/v1/auth/login'},\n    {name: 'logoutUser', url: '//pinspire.online:8080/api/v1/auth/logout'},\n    {name: 'registerUser', url: '//pinspire.online:8080/api/v1/auth/signup'},\n  ];\n\n  static async loginUser(username, password) {\n    try {\n      const configItem = this.#config.find((item) => item.name === 'loginUser');\n      if (!configItem) {\n        throw new Error('Не найдена конфигурация для loginUser');\n      }\n\n      const response = await fetch(configItem.url, {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify({username, password}),\n        credentials: 'include',\n      });\n\n      const res = await response.json();\n      if (res.status === 'ok') {\n        return true;\n      }\n\n      return false;\n    } catch (error) {\n      console.error('Ошибка при выполнении запроса loginUser:', error);\n      throw error;\n    }\n  }\n\n  /**\n    * Проверяет статус авторизации пользователя.\n    *\n    * @async\n    * @function\n    * @return {Promise<{ isAuthorized: boolean, username: string }>} Объект с информацией о статусе авторизации и именем пользователя.\n    * @throws {Error} Если произошла ошибка при запросе или обработке данных.\n    */\n  static async checkLogin() {\n    try {\n      const configItem = this.#config.find((item) => item.name === 'loginUser');\n      if (!configItem) {\n        throw new Error('Не найдена конфигурация для checkLogin');\n      }\n\n      const response = await fetch(configItem.url, {\n        credentials: 'include',\n      });\n\n      const res = await response.json();\n      let isAuthorized = false;\n      let username = '';\n\n      if (res.status === 'ok') {\n        username = res.body.username;\n        isAuthorized = true;\n      }\n\n      return {isAuthorized, username};\n    } catch (error) {\n      console.error('Ошибка при получении данных об авторизации:', error);\n    }\n  }\n\n  static async logoutUser() {\n    try {\n      const configItem = this.#config.find((item) => item.name === 'logoutUser');\n      if (!configItem) {\n        throw new Error('Не найдена конфигурация для logoutUser');\n      }\n\n      const response = await fetch(configItem.url, {\n        method: 'DELETE',\n        credentials: 'include',\n      });\n\n      const res = await response.json();\n      if (res.status === 'ok') {\n        return true;\n      }\n\n      return false;\n    } catch (error) {\n      console.error('Ошибка при выполнении запроса:', error);\n    }\n  }\n\n  /**\n    * Регистрирует пользователя с указанными данными.\n    * Если регистрация успешна, устанавливает куки `registered` и отправляет их на сервер.\n    * @param {string} username - Имя пользователя.\n    * @param {string} email - Почта.\n    * @param {string} password - Пароль.\n    */\n  static async registerUser(username, email, password) {\n    try {\n      const configItem = this.#config.find((item) => item.name === 'registerUser');\n      if (!configItem) {\n        throw new Error('Не найдена конфигурация для registerUser');\n      }\n\n      const response = await fetch(configItem.url, {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify({username, email, password}),\n        credentials: 'include',\n      });\n\n      const res = await response.json();\n      if (res.status === 'ok') {\n        return this.loginUser(username, password);\n      }\n\n      return false;\n    } catch (error) {\n      console.error('Ошибка при выполнении запроса:', error);\n    }\n  }\n\n  /**\n    * Генерирует изображения (пины) для отображения на странице.\n    *\n    * @async\n    * @function\n    * @throws {Error} Если произошла ошибка при запросе или обработке данных.\n    * @return {Promise<{ images: { picture: string }[] }>} Объект с массивом изображений.\n    */\n  static async generatePins(num=20, id=0) {\n    try {\n      const configItem = `//pinspire.online:8080/api/v1/pin?count=${num}&lastID=${id}`;\n      const response = await fetch(configItem);\n      const res = await response.json();\n      let images = [];\n      let lastID;\n\n      if (res.status === 'ok') {\n        images = res.body.pins;\n        lastID = res.body.lastID;\n\n        return {images, lastID};\n      } else {\n        throw new Error('Ошибка при получении данных из API');\n      }\n    } catch (error) {\n      console.error('Ошибка при получении пинов:', error);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://2023_2_ond_team/./public/utils/api.js?");

/***/ }),

/***/ "./public/utils/renderPins.js":
/*!************************************!*\
  !*** ./public/utils/renderPins.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderPins: () => (/* binding */ renderPins)\n/* harmony export */ });\n/**\n* Рендерятся пины на главной странице.\n* @param {HTMLElement} parent - Родительский элемент для отображения изображений\n* @param {Array} images - Массив объектов с информацией о пинах.\n*/\nfunction renderPins(parent, images) {\n  const template = Handlebars.templates['Pins.hbs'];\n  images.forEach((image) => {\n    const context = {src: image.picture, id: image.id};\n\n    parent.insertAdjacentHTML('beforeend', template(context));\n  });\n}\n\n\n//# sourceURL=webpack://2023_2_ond_team/./public/utils/renderPins.js?");

/***/ }),

/***/ "./public/utils/valid.js":
/*!*******************************!*\
  !*** ./public/utils/valid.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   emailValid: () => (/* binding */ emailValid),\n/* harmony export */   nameValid: () => (/* binding */ nameValid),\n/* harmony export */   passwordValid: () => (/* binding */ passwordValid)\n/* harmony export */ });\n/**\n* Проверяется, является ли имя пользователя валидным.\n* @param {string} username - Введеное имя пользователя.\n* @return {object} - Объект с полем `valid` (true/false) и полем\n* `message` (сообщение об ошибке, если есть).\n*/\nfunction nameValid(username) {\n  const regex = /^[a-zA-Z0-9_-]+$/;\n  const allowedChars = /^[a-zA-Zа-яА-Я0-9!@#$%^&*()_+{}[]|:<>,.?~=-]+$/;\n  let validation = {valid: true, message: ''};\n\n  if (!username) {\n    validation = {\n      valid: false,\n      message: 'Заполните это поле',\n    };\n  } else if (!regex.test(username) || !allowedChars.test(username)) {\n    validation = {\n      valid: false,\n      message: 'Имя пользователя содержит недопустимые символы',\n    };\n  } else if (username.length < 4) {\n    validation = {\n      valid: false,\n      message: 'Имя пользователя должно содержать не менее 4 символов',\n    };\n  } else if (username.length >= 50) {\n    validation = {\n      valid: false,\n      message: 'Имя пользователя должно содержать менее 50 символов',\n    };\n  }\n\n  return validation;\n}\n\n/**\n* Проверяется, является ли адрес электронной почты валидным.\n* @param {string} email - Введенный адрес электронной почты.\n* @return {object} - Объект с полем `valid` (true/false) и\n* полем `message` (сообщение об ошибке, если есть).\n*/\nfunction emailValid(email) {\n  const allowedChars = /^[a-zA-Zа-яА-Я0-9!@#$%^&*()_+{}[]|:<>,.?~=-]+$/;\n  let validation = {valid: true, message: ''};\n\n  if (!email) {\n    validation = {\n      valid: false,\n      message: 'Заполните это поле',\n    };\n  } else if (!allowedChars.test(email)) {\n    validation = {\n      valid: false,\n      message: 'Email содержит недопустимые символы',\n    };\n  } else if (email.length >= 50) {\n    validation = {\n      valid: false,\n      message: 'Email должен содержать не более 50 символов',\n    };\n  } else if (!email.includes('@')) {\n    validation = {\n      valid: false,\n      message: 'Email должен содержать символ @',\n    };\n  } else {\n    const parts = email.split('@');\n    if (parts.length !== 2) {\n      validation = {\n        valid: false,\n        message: 'Email должен содержать только один символ @',\n      };\n    } else {\n      const domainParts = parts[1].split('.');\n      if (domainParts.length < 2) {\n        validation = {\n          valid: false,\n          message: 'Некорректный формат домена в email',\n        };\n      }\n    }\n  }\n\n  return validation;\n}\n\n/**\n* Проверяется, является ли пароль валидным.\n* @param {string} password - Введенный пароль для проверки.\n* @return {object} - Объект с полем `valid` (true/false) и полем\n* `message` (сообщение об ошибке, если есть).\n*/\nfunction passwordValid(password) {\n  const allowedChars = /^[a-zA-Zа-яА-Я0-9!@#$%^&*()_+{}[]|:<>,.?~=-]+$/;\n  let validation = {valid: true, message: ''};\n\n  if (!password) {\n    validation = {\n      valid: false,\n      message: 'Заполните это поле',\n    };\n  } else if (!allowedChars.test(password)) {\n    validation = {\n      valid: false,\n      message: 'Пароль содержит недопустимые символы',\n    };\n  } else if (password.length < 8) {\n    validation = {\n      valid: false,\n      message: 'Пароль должен содержать не менее 8 символов',\n    };\n  } else if (password.length >= 50) {\n    validation = {\n      valid: false,\n      message: 'Пароль должен содержать менее 50 символов',\n    };\n  } else if (!/[a-z]/.test(password)) {\n    validation = {\n      valid: false,\n      message: 'Пароль должен содержать хотя бы одну букву в нижнем регистре',\n    };\n  } else if (!/[A-Z]/.test(password)) {\n    validation = {\n      valid: false,\n      message: 'Пароль должен содержать хотя бы одну букву в верхнем регистре',\n    };\n  }\n  \n  return validation;\n}\n\n\n//# sourceURL=webpack://2023_2_ond_team/./public/utils/valid.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/index.js");
/******/ 	
/******/ })()
;
/**
 * Модуль для создания и настройки Express.js сервера.
 * @module server
 */
'use strict';

const express = require('express');
const https = require('https');
var fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

/**
 * Параметры для настройки HTTPS сервера.
 * @type {object}
 * @property {string} key - Путь к приватному ключу сервера.
 * @property {string} cert - Путь к сертификату сервера.
 */
//const httpsOptions = {
//   key: fs.readFileSync("/home/ond_team/cert/privkey.pem"), // путь к ключу
//   cert: fs.readFileSync("/home/ond_team/cert/fullchain.pem") // путь к сертификату
//}

//https.createServer(httpsOptions, app).listen(1443);

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

/**
 * Объект, представляющий пользователей приложения.
 * @type {Object.<string, { name: string, email: string, password: string, images: { src: string, likes: number }[] }>}
 */
const users = {
    'driver_on_lips@mail.ru': {
        name: 'driver_on_lips',
        email: 'driver_on_lips@mail.ru',
        password: 'password',
        images: [
            {src: 'https://i.pinimg.com/564x/e2/43/10/e24310fe1909ec1f1de347fedc6318b0.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/91/39/51/913951d97d3cc3ac5a4ecb58da2ffdf5.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/32/80/5e/32805ec1935f0e4d2e4544d328512e03.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/f7/f8/d4/f7f8d4200cb60af122be89a39fd45c57.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/49/23/a9/4923a9a174fc87ab806121e79fda51e4.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/ec/b9/ca/ecb9cae2e1f174aca65d5d369f9a71d9.jpg', likes: 350},
            {src: 'https://i.pinimg.com/564x/43/67/15/4367152cd5654e8e74afab54823732ef.jpg', likes: 100500},
            {src: 'https://i.pinimg.com/564x/57/21/90/5721907848655c918c667d84defb99f8.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/f8/bd/0a/f8bd0aeae74e94e12eb57b6ae3280d6c.jpg', likes: 250},
            {src: 'https://i.pinimg.com/564x/ff/03/1f/ff031f62ad3e9e3733ed78216064978c.jpg', likes: 201},
            {src: 'https://i.pinimg.com/564x/b0/17/fe/b017fea78ff90de1187b857166f12af8.jpg', likes: 300},
            {src: 'https://i.pinimg.com/564x/32/80/5e/32805ec1935f0e4d2e4544d328512e03.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/f7/f8/d4/f7f8d4200cb60af122be89a39fd45c57.jpg', likes: 120},
            {src: 'https://i.pinimg.com/564x/30/da/d2/30dad2f5d5923e7a7715fe25ea590d35.jpg', likes: 350},
            {src: 'https://i.pinimg.com/564x/bc/07/62/bc07626808f2f1385e6d38765ff115cc.jpg', likes: 100500},
            {src: 'https://i.pinimg.com/564x/ec/b9/ca/ecb9cae2e1f174aca65d5d369f9a71d9.jpg', likes: 350},
            {src: 'https://i.pinimg.com/564x/43/67/15/4367152cd5654e8e74afab54823732ef.jpg', likes: 100500},
            {src: 'https://i.pinimg.com/564x/30/da/d2/30dad2f5d5923e7a7715fe25ea590d35.jpg', likes: 350},
            {src: 'https://i.pinimg.com/564x/ff/03/1f/ff031f62ad3e9e3733ed78216064978c.jpg', likes: 201},
            {src: 'https://i.pinimg.com/564x/b0/17/fe/b017fea78ff90de1187b857166f12af8.jpg', likes: 300},
        ]
    },
};

/**
 * Обработчик GET-запроса для определенного маршрута.
 * @function
 * @param {string} '/some-route' - Маршрут, по которому выполняется GET-запрос.
 * @param {function} (req, res) - Функция-обработчик запроса.
 */
app.get('/some-route', (req, res) => {
    const filePath = path.resolve(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
});

/**
 * Обработчик GET-запроса для установки куки.
 * @function
 * @param {string} '/set-cookie' - Маршрут, по которому выполняется GET-запрос.
 * @param {function} (req, res) - Функция-обработчик запроса.
 */
app.get('/set-cookie', (req, res) => {
    res.cookie('loggedIn', 'true', { maxAge: 604800000, httpOnly: true });
    res.send('Куки успешно установлены на сервере');
});

/**
 * Обработчик GET-запроса для получения куки.
 * @function
 * @param {string} '/get-cookie' - Маршрут, по которому выполняется GET-запрос.
 * @param {function} (req, res) - Функция-обработчик запроса.
 */
app.get('/get-cookie', (req, res) => {
    const loggedInCookie = req.cookies.loggedIn;
    res.send(`Значение куки loggedIn: ${loggedInCookie}`);
});

/**
 * Обработчик POST-запроса для аутентификации пользователя.
 * @function
 * @param {string} '/api/login' - Маршрут, по которому выполняется POST-запрос.
 * @param {function} (req, res) - Функция-обработчик запроса.
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Имя пользователя:', username);
    console.log('Пароль:', password);

    if (username === 'test' && password === 'test') {
        res.status(200).json({ success: true, message: 'Найс' });
    } else {
        res.status(401).json({ success: false, message: 'Неверное имя пользователя или пароль' });
    }
});

/**
 * Обработчик POST-запроса для регистрации пользователя.
 * @function
 * @param {string} '/api/register' - Маршрут, по которому выполняется POST-запрос.
 * @param {function} (req, res) - Функция-обработчик запроса.
 */
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    console.log('Имя пользователя:', username);
    console.log('Почта:', email);
    console.log('Пароль:', password);

    if (username === 'test' && email === 'tets@test.ru' && password === 'test') {
        res.status(200).json({ success: true, message: 'Найс' });
    } else {
        res.status(401).json({ success: false, message: 'Неверное имя пользователя или пароль' });
    }
});

/**
 * Обработчик GET-запроса для получения списка пинов.
 * @function
 * @param {string} '/feed' - Маршрут, по которому выполняется GET-запрос.
 * @param {function} (req, res) - Функция-обработчик запроса.
 */
app.get('/feed', (req, res) => {
    const allImages = [];

    for (const userEmail in users) {
        if (users.hasOwnProperty(userEmail)) {
            const user = users[userEmail];
            if (user.images && Array.isArray(user.images)) {
                allImages.push(...user.images);
            }
        }
    }

    const result = Object
        .values(users)
        .filter(({ email }) => email !== "")
        .map(user => ({
            images: allImages,
            name: user.name
        }))
        .filter(Boolean)
        .flat();

    res.json(result);
});

/**
 * Обработчик GET-запроса для получения списка всех пинов.
 * @function
 * @param {string} '/pin' - Маршрут, по которому выполняется GET-запрос.
 * @param {function} (req, res) - Функция-обработчик запроса.
 */
app.get('/pin', (req, res) => {
    const allImages = [];

    for (const userEmail in users) {
        if (users.hasOwnProperty(userEmail)) {
            const user = users[userEmail];
            if (user.images && Array.isArray(user.images)) {
                allImages.push(...user.images);
            }
        }
    }

    res.json(allImages);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

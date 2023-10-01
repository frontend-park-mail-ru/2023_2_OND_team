'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.get('/some-route', (req, res) => {
    const filePath = path.resolve(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
});

app.get('/set-cookie', (req, res) => {
    res.cookie('loggedIn', 'true', { maxAge: 604800000, httpOnly: true });
    res.send('Куки успешно установлены на сервере');
});

app.get('/get-cookie', (req, res) => {
    const loggedInCookie = req.cookies.loggedIn;
    res.send(`Значение куки loggedIn: ${loggedInCookie}`);
});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

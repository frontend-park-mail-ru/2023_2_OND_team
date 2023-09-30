'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());

app.get('/some-route', (require, response) => {
    const filePath = path.resolve(__dirname, '..', 'public', 'index.html');
    response.sendFile(filePath);
});

app.post('/api/login', (require, response) => {
    const { username, password } = require.body;

    console.log('Имя пользователя:', username);
    console.log('Пароль:', password);

    if (username === 'test' && password === 'test') {
        response.status(200).json({ success: true, message: 'Найс' });
    } else {
        response.status(401).json({ success: false, message: 'Неверное имя пользователя или пароль' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

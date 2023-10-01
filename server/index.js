'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(body.json());
app.use(cookie());

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
const ids = {};

app.post('/signup', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const age = req.body.age;
    if (
        !password || !email || !age ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/)
    ) {
        return res.status(400).json({error: 'Не валидные данные пользователя'});
    }
    if (users[email]) {
        return res.status(400).json({error: 'Пользователь уже существует'});
    }

    const id = uuid();
    const user = {password, email, age, images: []};
    ids[id] = email;
    users[email] = user;

    res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.post('/login',  (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    if (!password || !email) {
        return res.status(400).json({error: 'Не указан E-Mail или пароль'});
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json({id});
});

app.get('/', (req, res) => {
    const id = req.cookies['cookie'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    res.status(200).json({id});
});

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

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
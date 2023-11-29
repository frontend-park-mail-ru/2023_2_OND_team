/**
* Модуль для создания и настройки Express.js сервера.
* @module server
*/
'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();

/**
* Параметры для настройки HTTPS сервера.
* @type {object}
* @property {string} key - Путь к приватному ключу сервера.
* @property {string} cert - Путь к сертификату сервера.
*/

const httpsOptions = {
  key: fs.readFileSync('/home/ond_team/cert/privkey.pem'),
  cert: fs.readFileSync('/home/ond_team/cert/fullchain.pem'),
};

https.createServer(httpsOptions, app).listen(1445);

app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.json());
app.use(cookieParser());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.use(cors());

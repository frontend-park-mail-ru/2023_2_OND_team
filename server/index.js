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

const httpsOptions = {
  key: fs.readFileSync("/home/ond_team/cert/privkey.pem"), // путь к ключу
  cert: fs.readFileSync("/home/ond_team/cert/fullchain.pem") // путь к сертификату
}

https.createServer(httpsOptions, app).listen(443);

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

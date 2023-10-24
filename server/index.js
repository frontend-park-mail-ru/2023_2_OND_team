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
  key: fs.readFileSync(path.resolve(__dirname+'/ssk/', 'selfsigned.key')),
  cert: fs.readFileSync(path.resolve(__dirname+'/ssk/', 'selfsigned.crt')),
};

// https.createServer(httpsOptions, app).listen(443);
https.createServer(httpsOptions, app).listen(1444);

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(cors());
// const server = https.createServer(httpsOptions, app);
// server.listen(3000);

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

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'selfsigned.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'selfsigned.crt')),
};

const server = https.createServer(httpsOptions, app);
server.listen(3000);
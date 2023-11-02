const express = require('express');
const router = express.Router();

const renderAuthPage = require('../components/Authorization/AuthPage.js');

function handleRequest(req, res) {
  const {method, url} = req;

  if (method === 'GET' && url === '/auth') {
    renderAuthPage(req, res);
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Страница не найдена</h1>');
  }
}

module.exports = handleRequest;

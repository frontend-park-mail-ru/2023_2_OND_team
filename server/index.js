'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/some-route', (require, response) => {
    const filePath = path.resolve(__dirname, '..', 'public', 'index.html');
    
    response.sendFile(filePath);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
})
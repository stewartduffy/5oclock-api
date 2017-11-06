const express = require('express');
const app = express();
module.exports = app;

const Controller = require('./Controller');

app.use('/cities', Controller);

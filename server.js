const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(morgan('dev'));
server.use(express.json());

server.use('/api/users', usersRouter);

module.exports = server;

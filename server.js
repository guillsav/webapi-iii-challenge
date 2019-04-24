const express = require('express');
const morgan = require('morgan');
const postsRouter = require('./posts/posts-router.js');
const usersRouter = require('./users/users-router.js');

const server = express();

// Global middleware
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send('<h2>Home</h2>');
});

module.exports = server;

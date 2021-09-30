const express = require('express');

const {logger} = require('./middleware/middleware');
const usersRouter = require('./users/users-router');

const server = express();

server.use(logger);
server.use(express.json());
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

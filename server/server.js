const express = require('express');
const { EchoBot } = require('./Bots/EchoBot');
const { IgnorBot } = require('./Bots/IgnorBot');
const { ReverseBot } = require('./Bots/ReverseBot');
const { SpamBot } = require('./Bots/SpamBot');
const conection = require('./listeners/conection');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    credentials: true,
  },
});

const PORT = 3000;
const users = [
  EchoBot,
  ReverseBot,
  SpamBot,
  IgnorBot,
];

conection(io, users);

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
});

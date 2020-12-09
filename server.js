const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let users = [];
// eslint-disable-next-line no-unused-vars
const messages = [];

io.on('connection', (socket) => {
  const user = socket.handshake.query;

  if (!user.id) {
    return;
  }

  const { id, name, img } = user;

  socket.join(id);

  if (!users.some(currentUser => id === currentUser.id)) {
    users.push({
      id,
      name,
      img,
    });
  }

  users.forEach((socketUser) => {
    if (socketUser.id === id) {
      socketUser.isOnline = true;
    }
  });

  if (users.length) {
    users.forEach((currentUser, i, allUsers) => {
      const contacts = [...allUsers]
        .filter(curUser => curUser.id !== currentUser.id);

      io.to(currentUser.id).emit('contacts', contacts);
    });
  }

  socket.on('send-message', ({ message, recipient }) => {
    socket.to(recipient).emit('receive-message', {
      sender: id,
      recipient,
      text: message,
    });
  });

  socket.on('disconnect', (reason) => {
    users = users.map(socketUser => (socketUser.id === id
      ? {
        ...socketUser, isOnline: false,
      }
      : socketUser));

    users.forEach((socketUser) => {
      io.to(socketUser.id).emit('update-users', users);
    });
  });
});

const PORT = 3000;

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
});

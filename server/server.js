const express = require('express');
const getDate = require('./getDate');
const EchoBot = require('./Bots/EchoBot');
const ReverseBot = require('./Bots/ReverseBot');
const SpamBot = require('./Bots/SpamBot');
const spamBotSendMessage = require('./Bots/spamBotSendMessage');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = 3000;
let users = [
  EchoBot,
  ReverseBot,
  SpamBot
];

io.on('connection', (socket) => {
  const user = socket.handshake.query;

  if (!user.id) {
    return;
  }

  const { id } = user;
  const isDefinedUser = users.some(currentUser => id === currentUser.id);

  socket.join(id);

  if (!isDefinedUser) {
    users.push(user);
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

  setInterval(() => {
    spamBotSendMessage(socket, id);
  }, 1000);

  socket.on('send-message', ({ text, recipient }) => {
    const message = {
      sender: id,
      recipient: recipient.id,
      text,
      date: getDate(),
    }

    user.messages = [ ...user.messages, message ];

    socket.emit('receive-message', message);

    if (recipient.type === 'bot') {
      switch (recipient.name) {
        case 'EchoBot': {
          console.log('send');

          socket.emit('receive-message', {
            sender: recipient.id,
            recipient: id,
            text,
            date: getDate(),
          });

          break;
        }

        case 'ReverseBot': {
          setTimeout(() => {
            socket.emit('receive-message', {
              sender: recipient.id,
              recipient: id,
              text: [...text].reverse().join(''),
              date: getDate(),
            });
          }, 3000);

          break;
        }
      }
    } else {
      socket.to(recipient.id).emit('receive-message', {
        sender: id,
        recipient: recipient.id,
        text,
        date: getDate(),
      });
    }
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

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
});

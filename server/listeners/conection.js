const { spamBotStartSendMessage } = require('../Bots/SpamBot');
const { EVENT_CONECT, EVENT_SEND_CONTACTS } = require("../events");
const sendMessages = require("./sendMessages");
const receiveMessage = require("./receiveMessage");
const disconnect = require("./disconnect");

function conection(io, users) {
  io.on(EVENT_CONECT, (socket) => {
    let user = socket.handshake.query;
    const { id } = user;
  
    if (!id) {
      return;
    }
  
    const isDefinedUser = users.some(currentUser => id === currentUser.id);
  
    socket.join(id);
  
    if (!isDefinedUser) {
      users.push({ ...user, messages: [] });
    }
  
    user = users.find(socketUser => socketUser.id === id);
  
    users.forEach((socketUser) => {
      if (socketUser.id === id) {
        socketUser.isOnline = true;
      }
    });
  
    if (users.length) {
      users.forEach((currentUser, i, allUsers) => {
        const contacts = [...allUsers]
          .filter(curUser => curUser.id !== currentUser.id);
  
        io.to(currentUser.id).emit(EVENT_SEND_CONTACTS, contacts);
      });
    }
  
    spamBotStartSendMessage(socket, user);
    sendMessages(socket, user);
    receiveMessage(socket, user, users);
    disconnect(socket, io, user, users);
  });
};

module.exports = conection;

const formatDate = require("../getDate");

const spamBotSendMessage = (socket, recipient) => {
  const randomInterval = Math.random() * (120000 - 10000) + 10000;

  setTimeout(() => {
    socket.emit('receive-message', {
      sender: 'SpamBot',
      recipient,
      text: 'message',
      date: formatDate(new Date()),
    });
  }, randomInterval);
}

module.exports = spamBotSendMessage;

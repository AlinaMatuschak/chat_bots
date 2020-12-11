const { EVENT_SEND_MESSAGES } = require("../events");

function sendMessages(socket, user) {
  socket.on(EVENT_SEND_MESSAGES, () => {
    socket.emit(EVENT_SEND_MESSAGES, user.messages);
  });
}

module.exports = sendMessages;

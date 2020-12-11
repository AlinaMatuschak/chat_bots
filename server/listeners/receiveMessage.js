const botSendMessage = require("../Bots/botSendMessage");
const { EVENT_RECEIVE_MESSAGE, EVENT_SEND_MESSAGE } = require("../events");
const getDate = require("../helpers/getDate");
const saveValue = require("../helpers/saveValue");

function receiveMessage(socket, user, users) {
  socket.on(EVENT_RECEIVE_MESSAGE, ({ text, recipient }) => {
    const newMessage = {
      sender: user.id,
      recipient: recipient.id,
      text,
      date: getDate(),
    };

    saveValue(user.messages, newMessage);

    socket.emit(EVENT_SEND_MESSAGE, newMessage);

    if (recipient.type === 'bot') {
      botSendMessage(socket, recipient.name, text, user);
    } else {
      const recipientMessages = users
        .find(userMap => userMap.id === recipient.id)
        .messages;

      saveValue(recipientMessages, newMessage);

      socket.to(recipient.id).emit(EVENT_SEND_MESSAGE, {
        sender: user.id,
        recipient: recipient.id,
        text,
        date: getDate(),
      });
    }
  });
};

module.exports = receiveMessage;

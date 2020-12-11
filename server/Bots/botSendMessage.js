const saveValue = require("../helpers/saveValue");
const { EchoBotGenerateMessage } = require("./EchoBot");
const { ReverseBotGenerateMessage } = require("./ReverseBot");

const botSendMessage = async(socket, botName, text, user) => {
  switch (botName) {
    case 'EchoBot': {
      const botMessage = EchoBotGenerateMessage(text, user.id);

      saveValue(user.messages, botMessage);

      socket.emit('receive-message', botMessage);

      break;
    }

    case 'ReverseBot': {
      await new Promise(() => setTimeout(() => {
        const botMessage = ReverseBotGenerateMessage(text, user.id);

        saveValue(user.messages, botMessage);

        socket.emit('receive-message', botMessage);
      }, 3000));

      break;
    }
  }
}

module.exports = botSendMessage;

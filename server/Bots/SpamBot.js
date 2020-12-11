const { EVENT_SEND_MESSAGE } = require("../events");
const getDate = require("../helpers/getDate");
const getRandomLink = require("../helpers/getRandomLink");
const saveValue = require("../helpers/saveValue");

const SpamBot = {
  id: 'SpamBot',
  name: 'SpamBot',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. In vero, qui odit cumque reprehenderit distinctio mollitia maiores odio non laboriosam nam, quis ducimus ex atque aspernatur quas exercitationem, animi sunt quidem expedita beatae ratione doloribus? Repudiandae incidunt architecto voluptatum, perferendis sint, eum accusamus quam culpa similique labore maxime debitis ipsum?',
  isOnline: true,
  img: 'https://i.ibb.co/bF1jC4r/Layer-3.png',
  type: 'bot',
}

const spamBotStartSendMessage = (socket, user) => {
  const message = {
    sender: 'SpamBot',
    recipient: user.id,
    text: getRandomLink(),
    date: getDate(),
  };
  const randomInterval = Math.random() * (120000 - 10000) + 10000;

  setTimeout(() => {
    socket.emit(EVENT_SEND_MESSAGE, message);

    saveValue(user.messages, message);
    spamBotStartSendMessage(socket, user);
  }, randomInterval);
}

module.exports = { SpamBot, spamBotStartSendMessage };

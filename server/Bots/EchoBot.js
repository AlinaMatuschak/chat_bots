const getDate = require("../helpers/getDate");

const EchoBot = {
  id: 'EchoBot',
  name: 'EchoBot',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. In vero, qui odit cumque reprehenderit distinctio mollitia maiores odio non laboriosam nam, quis ducimus ex atque aspernatur quas exercitationem, animi sunt quidem expedita beatae ratione doloribus? Repudiandae incidunt architecto voluptatum, perferendis sint, eum accusamus quam culpa similique labore maxime debitis ipsum?',
  isOnline: true,
  img: 'https://i.ibb.co/S78LCv9/Layer-1.png',
  type: 'bot',
  messages: []
}

const EchoBotGenerateMessage = (text, recipient) => {
  return {
    sender: EchoBot.id,
    recipient,
    text,
    date: getDate(),
  };
}

module.exports = { EchoBot, EchoBotGenerateMessage };

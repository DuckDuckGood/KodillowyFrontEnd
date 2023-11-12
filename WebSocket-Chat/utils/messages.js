const messages = [];

const handleMessage = message => {
  messages.push(message);
};

module.exports = { messages, handleMessage };
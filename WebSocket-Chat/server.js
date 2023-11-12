const express = require('express');
const path = require('path');
const socket = require('socket.io');
const { registerInstance, clients, reserveLogin, unregisterInstance, reservedLogins } = require('./utils/users');
const { handleMessage, messages } = require('./utils/messages');

// EXPRESS
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server started!', process.env.PORT || 8000);
});

// WebSocket
const io = socket(server);
io.on('connection', instance => {
  registerInstance(instance);
  instance.on('login', login => {
    reserveLogin(instance, login);
    instance.broadcast.emit('newUser', login);
    instance.broadcast.emit('reservedLogins', reservedLogins);
  });
  instance.on('message', message => {
    handleMessage(message);
    instance.broadcast.emit('message', message);
  });
  instance.on('disconnect', () => {
    unregisterInstance(instance);
    instance.broadcast.emit('reservedLogins', reservedLogins);
  });
});
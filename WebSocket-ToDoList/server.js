const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const { storeElement, removeElement, list } = require('./utils');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('I live!');
});

const io = socketIO(server);

io.on('connection', socket => {
  console.log('hello');

  socket.on('newElement', element => {
    storeElement(element);
    socket.emit('list', list);
  });

  socket.on('removeElement', element => {
    removeElement(element);
    socket.emit('list', list);
  });

  socket.on('disconnect', () => {
    console.log('bye');
  });
});
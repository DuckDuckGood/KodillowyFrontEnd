import { globals, fields } from './globals.js';
import { createMessage, createSelfMessage } from './utils.js';
import { send, join, validateLogin, showNewUser } from './domUtils.js';
let reservedLogins = [];

const receiveMessage = message => {
  fields.messagesList.append(createMessage(message));
}

const addMessage = message => {
  socket.emit('message', { user: globals.userName, message: message });
  fields.messagesList.append(createSelfMessage(message));
}

const socket = io();
socket.on('message', receiveMessage);
socket.on('reservedLogins', received => reservedLogins = received);
socket.on('newUser', newUser => showNewUser(newUser));

fields.userNameInput.addEventListener('input', () => validateLogin(reservedLogins));

fields.loginForm.querySelector('.btn').addEventListener('click', e => join(e, socket));
fields.addMessageForm.querySelector('.btn').addEventListener('click', e => send(e, addMessage));
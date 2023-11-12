import { globals, fields } from './globals.js';
import { createSelfMessage } from './utils.js';

const addMessage = message => {
  fields.messagesList.append(createSelfMessage(message));
}

const join = e => {
  e.preventDefault();

  if (fields.userNameInput.value) {
    globals.userName = fields.userNameInput.value;
    fields.loginForm.classList.remove('show');
    fields.messagesSection.classList.add('show');
  }
}
fields.loginForm.querySelector('.btn').addEventListener('click', e => join(e));

const send = e => {
  e.preventDefault();
  if (fields.messageContentInput.value) {
    addMessage(fields.messageContentInput.value);
    fields.messageContentInput.value = '';
  }
}
fields.addMessageForm.querySelector('.btn').addEventListener('click', e => send(e));
import { fields, globals } from "./globals.js";

export let couldJoin = false;

export const send = (e, addMessage) => {
  e.preventDefault();
  if (fields.messageContentInput.value) {
    addMessage(fields.messageContentInput.value);
    fields.messageContentInput.value = '';
  }
}

export const join = (e, socket) => {
  e.preventDefault();

  if (fields.userNameInput.value && couldJoin) {
    globals.userName = fields.userNameInput.value;
    socket.emit('login', { user: globals.userName });
    fields.loginForm.classList.remove('show');
    fields.messagesSection.classList.add('show');
  }
}

export const validateLogin = reservedLogins => {
  const login = fields.userNameInput.value;
  console.log(login);

  if (reservedLogins.length === 0 || !reservedLogins.some(reserved => reserved.user === login)) {
    console.log('yes');
    couldJoin = true;
    fields.reservedLogin.classList.remove('show');
  } else {
    console.log('no');
    couldJoin = false;
    fields.reservedLogin.classList.add('show');
  }
}

export const showNewUser = newUser => {
  console.log(newUser);
  fields.newUser.innerHTML = `User <span style="color: #128870">${newUser.user}</span> joined the Chat!`;
  fields.newUser.classList.add('show');

  setTimeout(() => {
    fields.newUser.classList.remove('show');

    setTimeout(() => {
      fields.newUser.innerHTML = '';
    }, 500);

  }, 5000);
}
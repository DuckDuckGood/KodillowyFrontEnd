export const createSelfMessage = messageContent => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--self');
  message.innerHTML = `
  <h3 class="message__author">You</h3>
  <div class="message__content">
    ${messageContent}
  </div>
`;

  return message;
}

export const createMessage = received => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.innerHTML = `
  <h3 class="message__author">${received.user}</h3>
  <div class="message__content">
    ${received.message}
  </div>
`;

  return message;
}
export const fields = {
  newElementInput: '#newElementInput',
  newElementButton: '#newElementButton',
  content: '#content',
}

const createElement = (listElement, socket) => {
  const element = document.createElement('div');
  element.classList.add('list-element');

  const elementBody = document.createElement('div');
  elementBody.classList.add('list-element-body');
  elementBody.innerHTML = listElement.value;

  const elementButton = document.createElement('div');
  elementButton.classList.add('list-element-remove-button');
  elementButton.innerHTML = 'Remove';
  elementButton.addEventListener('click', () => {
    socket.emit('removeElement', {id: listElement.id});
  });

  element.appendChild(elementBody);
  element.appendChild(elementButton);

  return element;
}

export const createElements = (list, socket) => {
  if (Array.isArray(list)) {
    const listContent = document.querySelector(fields.content);
    listContent.innerHTML = '';
    list.forEach(listElement => {
      listContent.appendChild(createElement(listElement, socket));
    });
  }
}

export const addListElement = socket => {
  const value = document.querySelector(fields.newElementInput).value;
  if (value) {
    socket.emit('newElement', value);
  }
}
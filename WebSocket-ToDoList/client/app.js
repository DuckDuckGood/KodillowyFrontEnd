import { fields, addListElement, createElements } from "./utils.js";

const socket = io();
socket.on('list', list => createElements(list, socket));

document.querySelector(fields.newElementButton).addEventListener('click', () => addListElement(socket));
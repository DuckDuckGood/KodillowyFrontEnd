const clients = {};
const reservedLogins = [];

const registerInstance = socket => {
  if (!clients || !clients[socket.id]) {
    clients[socket.id] = {};
  }
}

const unregisterInstance = socket => {
  const removedLoginId = reservedLogins.indexOf(clients[socket.id].login);
  if (parseInt(removedLoginId) !== -1) {
    reservedLogins.splice(removedLoginId, 1);
  }

  delete clients[socket.id];
}

const reserveLogin = ( socket, login ) => {
  console.log(login);
  clients[socket.id].login = login;
  reservedLogins.push(login);

  // console.log(clients);
  // console.log(reservedLogins);
};

module.exports = { clients, reservedLogins, registerInstance, unregisterInstance, reserveLogin };
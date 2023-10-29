const path = require('path');

const resolvePath = name => {
  return path.join(__dirname, `../images/${name}`);
}

const createImageEndpoints = app => {
  app.get('/background.jpg', (req, res) => {
    res.sendFile(resolvePath('background.jpg'));
  });
}

module.exports = { createImageEndpoints, ...module.exports };
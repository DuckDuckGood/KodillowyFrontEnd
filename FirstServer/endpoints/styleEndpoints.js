const path = require('path');

const resolvePath = req => {
  return path.join(__dirname, `../styles${req.path}`);
}

const createStyleEndpoints = app => {
  app.get('*.css', (req, res) => {
    res.sendFile(resolvePath(req));
  })
}

module.exports = { createStyleEndpoints, ...module.exports };
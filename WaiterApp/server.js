const express = require('express');
const db = require('./src/db/app');

const app = express();

app.get('/api/*', (req, res) => {
  return db.db[req.path.substring(5)];
});

app.listen(3131);
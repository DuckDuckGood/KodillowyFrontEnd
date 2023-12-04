const express = require('express');
const db = require('./src/db/app');
const path = require('path');
const cors = require('cors');

const app = express();
const appPort = process.env.PORT || 3131;

app.use(express.static(path.join(__dirname, '/build')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/api/*', (req, res) => {
  console.log(req.path, db.db[req.path.substring(5)]);
  res.json(db.db[req.path.substring(5)]);
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.listen(appPort, () => {
  console.log(`Server running on port ${appPort}`);
});
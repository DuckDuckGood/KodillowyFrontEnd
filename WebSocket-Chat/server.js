const express = require('express');
const path = require('path');

const messages = [];

// EXPRESS
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
app.listen(process.env.PORT || 8000, () => {
  console.log('Server started!', process.env.PORT || 8000);
});
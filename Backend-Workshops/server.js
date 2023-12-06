const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

app.all('*', (req, res) => {
  res.send('Siemanko!');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Workshop server started!', process.env.PORT || 8000);
});
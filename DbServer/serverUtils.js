const express = require('express');
const testimonialsRoutes = require('./testimonials/routes');
const concerts = require('./concerts/routes');
const seats = require('./seats/routes');
const cors = require('cors');
const path = require('path');
const { findSeats } = require('./controllers/seat.controller');
const sanitize = require('mongo-sanitize');
const helmet = require('helmet');
const app = express();

const runApp = db => {
  db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', err => console.log('Error ' + err));

  app.use(helmet());

  app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,DELETE,PUT',
    optionsSuccessStatus: 200,
  }));

  app.options('*', cors());

  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  app.use(express.static(path.join(__dirname, '/client/build')));

  app.use('/api/testimonials', testimonialsRoutes);
  app.use('/api/concerts', concerts);
  app.use('/api/seats', seats);

  // DEFAULT ENDPOINT
  app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

  const server = app.listen(process.env.PORT || 8000, () => {
    console.log('DbServer started!', process.env.PORT || 8000);
  });

  const socketConf = require('socket.io');
  const socketIO = socketConf(server);

  socketIO.on('connection', async socket => {
    console.log('siema');

    socket.emit('seats', (await findSeats()).get());

    socket.on('disconnect', () => {
      console.log('bye bye');
    })
  });
};

const sanitizeRequest = toSanitize => {
  const sanitized = {};
  Object.entries(toSanitize).forEach(entry => {
    const [key, value] = entry;
    body[key] = sanitize(value);
  });

  return sanitized;
}

module.exports = { runApp, sanitizeRequest };
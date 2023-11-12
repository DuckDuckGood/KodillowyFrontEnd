const express = require('express');
const testimonialsRoutes = require('./testimonials/routes');
const concerts = require('./concerts/routes');
const seats = require('./seats/routes');
const cors = require('cors');
const path = require('path');

const app = express();

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

app.listen(process.env.PORT || 8000, () => {
  console.log('DbServer started!', process.env.PORT || 8000);
});
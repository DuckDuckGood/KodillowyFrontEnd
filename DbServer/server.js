const express = require('express');
const testimonialsRoutes = require('./testimonials/routes');
const concerts = require('./concerts/routes');
const seats = require('./seats/routes');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/testimonials', testimonialsRoutes);
app.use('/concerts', concerts);
app.use('/seats', seats);

// DEFAULT ENDPOINT
app.all('*', (req, res) => {
  res.status(404).json({message: 'Error 404. There is no website with this address :)'});
});

app.listen(8000, () => {
  console.log('DbServer started!');
});
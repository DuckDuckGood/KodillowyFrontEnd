const mongoose = require('mongoose');
const runApp = require('./serverUtils');

const dbConnection = () => {

  mongoose.connect('mongodb://127.0.0.1:27017/concertsDb')
    .then(db => runApp(db.connection))
    .catch(err => {
      console.log('Error!', err);
    });
}

dbConnection();
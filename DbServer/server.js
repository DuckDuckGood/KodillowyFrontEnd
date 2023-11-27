const mongoose = require('mongoose');
const runApp = require('./serverUtils');

const dbConnection = () => {

  mongoose.connect('mongodb+srv://soma:Parapapapa123@siemanko.01aosln.mongodb.net/?retryWrites=true&w=majority')
    .then(db => runApp(db.connection))
    .catch(err => {
      console.log('Error!', err);
    });
}

dbConnection();
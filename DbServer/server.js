const mongoose = require('mongoose');
const { runApp } = require('./serverUtils');

const dbConnection = () => {

  mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PSSWD}@siemanko.01aosln.mongodb.net/?retryWrites=true&w=majority`)
    .then(db => runApp(db.connection))
    .catch(err => {
      if (process.env.DEBUG === true) {
        console.log('Error!', err);
      }
      console.log('Could not run app...');
    });
}

dbConnection();
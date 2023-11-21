const runApp = require('./serverUtils');

const mongoClient = require('mongodb').MongoClient;


const dbConnection = () => {

  mongoClient.connect('mongodb://127.0.0.1:27017')
    .then(client => {
      console.log('successfully connected!');
      return client.db('companyDb');
    })
    .then(db => runApp(db))
    .catch(err => {
      console.log('Error!', err);
    });
}

dbConnection();
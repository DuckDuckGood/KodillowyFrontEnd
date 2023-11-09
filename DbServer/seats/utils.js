const db = require('../db/db').seats;

const isAlreadyBooked = bookedSeat => {
  return db.some(dbElement => 
    parseInt(dbElement.seat) === parseInt(bookedSeat.seat)
    && parseInt(dbElement.day) === parseInt(bookedSeat.day)
  );
}

module.exports = isAlreadyBooked;
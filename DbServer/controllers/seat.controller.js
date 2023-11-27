const seatModel = require("../models/seat.model");
const MongoModel = require("./mongo.model");
const { ObjectId } = require('mongodb');

const findSeat = async param => {
  return new MongoModel(await seatModel.findOne(param || {}));
}

const findSeatById = async id => {
  return (await findSeat({ _id: new ObjectId(id) }));
}

const findSeats = async () => {
  return new MongoModel(await seatModel.find());
}

const saveSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;

  const alreadyExisting = await seatModel.find({ day, seat, client, email });
  if (!alreadyExisting || alreadyExisting.length === 0) {
    new seatModel({ day, seat, client, email })
      .save()
      .then(() => {
        res.json({ message: 'OK' });
      })
      .catch(error => {
        res.status(500).json({ message: error });
      });
  } else {
    res.status(500).json({ message: 'Seat already exists!' });
  }
}

const updateSeat = async (req, res) => {
  const id = req.params.id;
  const { day, seat, client, email } = req.body;
  const existingModel = (await findSeatById(id)).get();
  
  if (existingModel) {
    seatModel.updateOne(existingModel, { day, seat, client, email })
      .then(param => {
        res.json(param || { message: 'OK' });
      })
      .catch(error => {
        res.status(500).json({ message: error });
      });
  } else {
    res.json({ message: `Could not find seat with id ${id}` });
  }
}

const deleteSeat = async (req, res) => {
  const id = req.params.id;
  const existingModel = (await findSeatById(id)).get();

  if (existingModel) {
    seatModel.deleteOne(existingModel)
      .then(param => {
        res.json(param || { message: 'OK' });
      })
      .catch(error => {
        res.status(500).json({ message: error });
      });
  } else {
    res.json({ message: `Could not find seat with id ${id}` });
  }
}

module.exports = {
  findSeat,
  findSeats,
  saveSeat,
  updateSeat,
  deleteSeat
}
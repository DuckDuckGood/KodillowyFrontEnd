const { ObjectId } = require("mongodb");
const concertModel = require("../models/concert.model")
const MongoModel = require("./mongo.model")

const findConcert = async param => {
  return new MongoModel(await concertModel.findOne(param || {}));
}

const findConcertById = async id => {
  return (await findConcert({ _id: new ObjectId(id) }));
}

const findConcerts = async () => {
  return new MongoModel(await concertModel.find());
}

const saveConcert = (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  new concertModel({ performer, genre, price, day, image })
    .save()
    .then(() => {
      res.json({ message: 'OK' })
    })
    .catch(error => res.status(500).json({ message: error }));
}

const deleteConcert = async (req, res) => {
  const id = req.params.id;
  const existingModel = (await findConcertById(id)).get();
  if (existingModel) {
    concertModel.deleteOne(existingModel)
      .then(() => res.json({ message: 'OK' }))
      .catch(error => res.status(500).json({ message: error }))
  } else {
    res.status(500).json({ message: `Could not find concert with id ${id}` });
  }
}

const updateConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id;
  const existingModel = (await findConcertById(id)).get();

  if (existingModel) {
    concertModel.updateOne(existingModel, { performer, genre, price, day, image })
      .then(param => res.json({ message: param || {} }))
      .catch(error => res.status(500).json({ message: error }))
  } else {
    res.status(500).json({ message: `Could not find concert with id ${id}` });
  }
}

module.exports = {
  findConcert,
  findConcerts,
  saveConcert,
  deleteConcert,
  updateConcert
}
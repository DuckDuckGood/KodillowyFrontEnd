const express = require('express');
const router = express.Router();
const db = require('./../db');
const { ObjectId } = require('mongodb');

router.get('/departments', (req, res) => {
  req.db.departments
    .find()
    .toArray()
    .then(departments => res.json(departments))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/departments/random', (req, res) => {
  req.db.departments
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then(department => res.json(department))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/departments/:id', (req, res) => {
  const id = req.params.id;
  req.db.departments
    .findOne({ _id: new ObjectId(id) })
    .then(department => res.json(department))
    .catch(error => res.status(500).json({ message: error }));
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.departments
    .insertOne({ name })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.put('/departments/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  req.db.departments
    .updateOne({ _id: new ObjectId(id) }, { $set: { name } })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.delete('/departments/:id', (req, res) => {
  req.db.departments
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json(error));
});

module.exports = router;

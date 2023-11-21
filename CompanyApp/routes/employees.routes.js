const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/employees', (req, res) => {
  req.db.employees
    .find()
    .toArray()
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/employees/random', (req, res) => {
  req.db.employees
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then(employee => res.json(employee))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/employees/:id', (req, res) => {
  req.db.employees
    .findOne({ _id: new ObjectId(req.params.id) })
    .then(employee => res.json(employee))
    .catch(error => res.status(500).json({ message: error }));
});

router.post('/employees', (req, res) => {
  const { firstName, lastName, department } = req.body;
  req.db.employees
    .insertOne({ firstName, lastName, department })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  console.log('Hehee', id);
  const { firstName, lastName, department } = req.body;
  
  req.db.employees
    .updateOne({ _id: new ObjectId(id) }, { $set: { firstName, lastName, department } })
    .then(data => res.json({ message: data }))
    .catch(error => res.status(500).json(error));
});

router.delete('/employees/:id', (req, res) => {
  const id = req.params.id;

  req.db.employees
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json(error));
});

module.exports = router;

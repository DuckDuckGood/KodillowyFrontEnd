// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const { ObjectId } = require('mongodb');

router.get('/products', (req, res) => {
  req.db.products
    .find()
    .toArray()
    .then(products => res.json(products))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/products/random', (req, res) => {
  req.db.products
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then(product => res.json(product))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/products/:id', (req, res) => {
  const id = req.params.id;
  req.db.products
    .find({ _id: new ObjectId(id) })
    .toArray()
    .then(products => res.json(products))
    .catch(error => res.status(500).json({ message: error }));
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.products
    .insertOne({ name, client })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const { name, client } = req.body;

  req.db.departments
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, client } })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  req.db.departments
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

module.exports = router;

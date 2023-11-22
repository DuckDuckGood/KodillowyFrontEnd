// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const { ObjectId } = require('mongodb');
const productModel = require('../models/product.model');

router.get('/products', (req, res) => {
  productModel
    .find()
    .then(products => res.json(products))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/products/random', (req, res) => {
  productModel.countDocuments()
    .then(count => {
      const randomValue = parseInt((Math.random() * 100) % count );
      productModel.findOne().skip(randomValue)
        .then(product => res.json(product))
        .catch(error => res.status(500).json({ message: error }));
    });
});

router.get('/products/:id', (req, res) => {
  const id = req.params.id;
  
  productModel.findById(id)
    .then(products => res.json(products))
    .catch(error => res.status(500).json({ message: error }));
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;

  const model = new productModel({ name, client });
  model.save()
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const { name, client } = req.body;

  productModel.findById(id)
    .then(model => {
      if (model) {
        productModel
          .updateOne({ _id: new ObjectId(id) }, { $set: { name, client } })
          .then(() => res.json(model))
          .catch(error => res.status(500).json({ message: error }));
      } else {
        res.status(404).json({ message: `Could not find product with id ${id}` });
      }
    });
});

router.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  productModel.findById(id)
    .then(model => {
      if (model) {
        productModel.deleteOne(model)
          .then(() => res.json(model))
          .catch(error => res.status(500).json({ message: error }));
      } else {
        res.status(404).json({ message: `Could not find product with id ${id}` });
      } 
    })
  
});

module.exports = router;

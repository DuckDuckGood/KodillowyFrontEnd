// post.routes.js

const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const productModel = require('../models/product.model');
const { findProducts, findRandomProduct, findProduct, saveProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

router.get('/products', async (req, res) => {
  (await findProducts()).send(res);
});

router.get('/products/random', async (req, res) => {
  (await findRandomProduct()).send(res);
});

router.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  (await findProduct({ _id: new ObjectId(id) })).send(res);
});

router.post('/products', (req, res) => {
  saveProduct(req, res);
});

router.put('/products/:id', (req, res) => {
  updateProduct(req, res);
});

router.delete('/products/:id', (req, res) => {
  deleteProduct(req, res);  
});

module.exports = router;

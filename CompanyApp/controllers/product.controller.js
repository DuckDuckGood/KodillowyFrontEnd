const { ObjectId } = require('mongodb');
const MongoModel = require('./model.controller');
const productModel = require('../models/product.model');
const departmentModel = require('../models/department.model');

const findProducts = async () => {
  return new MongoModel(await productModel.find());
}

const findProduct = async param => {
  if (param) {
    return new MongoModel(await productModel.find(param));
  }
  return new MongoModel(await productModel.findOne());
}

const findRandomProduct = async () => {
  const count = await productModel.countDocuments();
  const randomValue = parseInt((Math.random() * 100) % count);
  return new MongoModel(await productModel.findOne().skip(randomValue));
}

const saveProduct = (req, res) => {
  const { name, client } = req.body;
  new productModel({ name, client })
    .save()
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
}

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, client } = req.body;
  const model = (await findProduct({ _id: new ObjectId(id) })).getModel();

  if (model) {
    departmentModel
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, client } })
      .then(() => res.json(model))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(404).json({ message: `Could not find product with id ${id}` });
  }
}

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const model = (await findProduct({ _id: new ObjectId(id) })).getModel();
  
  if (model) {
    productModel.deleteOne(model)
      .then(() => res.json(model))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(404).json({ message: `Could not find employee with id ${id}` });
  }
}

module.exports = { 
  findProduct, 
  findProducts, 
  findRandomProduct,
  saveProduct,
  updateProduct,
  deleteProduct
};
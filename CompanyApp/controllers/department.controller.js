const { ObjectId } = require('mongodb');
const departmentModel = require('../models/department.model');
const MongoModel = require('./model.controller');

const findDepartments = async () => {
  return new MongoModel(await departmentModel.find());
}

const findDepartment = async param => {
  if (param) {
    return new MongoModel(await departmentModel.find(param));
  }
  return new MongoModel(await departmentModel.findOne());
}

const findRandomDepartment = async () => {
  const count = await employeeModel.countDocuments();
  const randomValue = parseInt((Math.random() * 100) % count);
  return new MongoModel(await departmentModel.findOne().skip(randomValue));
}

const saveDepartment = (req, res) => {
  const { name } = req.body;
  new departmentModel({ name })
    .save()
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
}

const updateDepartment = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const model = (await findDepartment({ _id: new ObjectId(id) })).getModel();

  if (model) {
    departmentModel
      .updateOne({ _id: new ObjectId(id) }, { $set: { name } })
      .then(() => res.json(model))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(404).json({ message: `Could not find department with id ${id}` });
  }
}

const deleteDepartment = async (req, res) => {
  const id = req.params.id;
  const model = (await findDepartment({ _id: new ObjectId(id) })).getModel();
  
  if (model) {
    departmentModel.deleteOne(model)
      .then(() => res.json(model))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(404).json({ message: `Could not find employee with id ${id}` });
  }
}

module.exports = { 
  findDepartment, 
  findDepartments, 
  findRandomDepartment,
  saveDepartment,
  updateDepartment,
  deleteDepartment
};
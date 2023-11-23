const { ObjectId } = require('mongodb');
const employeeModel = require('../models/employee.model');
const MongoModel = require('./model.controller');

const findEmployees = async () => {
  return new MongoModel(await employeeModel.find().populate('department'));
}

const findEmployee = async param => {
  if (param) {
    return new MongoModel(await employeeModel.find(param).populate('department'));
  }
  return new MongoModel(await employeeModel.findOne().populate('department'));
}

const findRandomEmployee = async () => {
  const count = await employeeModel.countDocuments();
  const randomValue = parseInt((Math.random() * 100) % count);
  return new MongoModel(await employeeModel.findOne().skip(randomValue).populate('department'));
}

const saveEmployee = (req, res) => {
  const { firstName, lastName, department } = req.body;
  new employeeModel({ firstName, lastName, department })
    .save()
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
}

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, department } = req.body;
  const model = (await findEmployee({ _id: new ObjectId(id) })).getModel();

  if (model) {
    employeeModel
      .updateOne({ _id: new ObjectId(id) }, { $set: { firstName, lastName, department } })
      .then(() => res.json(model))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(404).json({ message: `Could not find employee with id ${id}` });
  }
}

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  const model = (await findEmployee({ _id: new ObjectId(id) })).getModel();
  
  if (model) {
    employeeModel.deleteOne(model)
      .then(() => res.json(model))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(404).json({ message: `Could not find employee with id ${id}` });
  }
}

module.exports = { 
  findEmployee, 
  findEmployees, 
  findRandomEmployee,
  saveEmployee,
  updateEmployee,
  deleteEmployee
};